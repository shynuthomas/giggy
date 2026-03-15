#!/usr/bin/env python3
"""
Builds a ranked list of trending study materials from content/study-materials.json.
"""

from __future__ import annotations

import json
from datetime import UTC, date, datetime
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parents[1]
SOURCE_PATH = ROOT_DIR / "content" / "study-materials.json"
OUTPUT_PATH = ROOT_DIR / "content" / "trending-materials.json"


WEIGHTS = {
    "enrollments": 0.50,
    "wishlist_adds": 0.20,
    "rating": 0.20,
    "recency": 0.10,
}


def _safe_max(values: list[float]) -> float:
    return max(values) if values else 1.0


def _days_since_published(iso_date: str) -> int:
    published = datetime.strptime(iso_date, "%Y-%m-%d").date()
    return max((date.today() - published).days, 0)


def _recency_score(days_old: int) -> float:
    # Linear decay over 180 days, clamped between 0 and 1.
    return max(0.0, min(1.0, 1 - (days_old / 180)))


def calculate_trending(materials: list[dict[str, Any]]) -> list[dict[str, Any]]:
    max_enrollments = _safe_max(
        [float(m.get("enrollments_last_30_days", 0)) for m in materials]
    )
    max_wishlist = _safe_max(
        [float(m.get("wishlist_adds_last_30_days", 0)) for m in materials]
    )

    ranked: list[dict[str, Any]] = []
    for item in materials:
        enrollments_norm = float(item.get("enrollments_last_30_days", 0)) / max_enrollments
        wishlist_norm = float(item.get("wishlist_adds_last_30_days", 0)) / max_wishlist
        rating_norm = min(max(float(item.get("rating", 0)) / 5.0, 0.0), 1.0)
        recency_norm = _recency_score(_days_since_published(item.get("published_at", "1970-01-01")))

        trend_score = (
            WEIGHTS["enrollments"] * enrollments_norm
            + WEIGHTS["wishlist_adds"] * wishlist_norm
            + WEIGHTS["rating"] * rating_norm
            + WEIGHTS["recency"] * recency_norm
        )

        ranked_item = dict(item)
        ranked_item["trend_score"] = round(trend_score, 4)
        ranked.append(ranked_item)

    ranked.sort(key=lambda material: material["trend_score"], reverse=True)
    return ranked


def main() -> None:
    with SOURCE_PATH.open("r", encoding="utf-8") as source_file:
        payload = json.load(source_file)

    materials = payload.get("materials", [])
    ranked_materials = calculate_trending(materials)

    output = {
        "generated_at": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "total": len(ranked_materials),
        "weights": WEIGHTS,
        "materials": ranked_materials,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PATH.open("w", encoding="utf-8") as output_file:
        json.dump(output, output_file, indent=2)
        output_file.write("\n")

    print(f"Generated trending list for {len(ranked_materials)} materials.")
    print(f"Output: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
