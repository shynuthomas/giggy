# giggy

Starter kit for adding and showcasing **trending study materials** on a learning portal.

This repository now includes:

- A materials catalog file you can edit (`content/study-materials.json`)
- A script to automatically compute trending rankings (`scripts/update_trending.py`)
- A generated trending output file (`content/trending-materials.json`)
- A drop-in frontend snippet to render trending cards (`snippets/trending-widget.html`)

## 1) Add or update study materials

Edit:

`content/study-materials.json`

Each material supports:

- `id`: unique key
- `title`: course/material name
- `category`: e.g. Data Science, AI, Programming
- `level`: Beginner, Intermediate, Advanced
- `price`: selling price
- `currency`: e.g. USD
- `rating`: average rating out of 5
- `enrollments_last_30_days`: popularity signal
- `wishlist_adds_last_30_days`: intent signal
- `published_at`: ISO date (`YYYY-MM-DD`)
- `image_url`: display image URL
- `product_url`: purchase/landing page URL

## 2) Generate trending materials

Run:

```bash
python3 scripts/update_trending.py
```

This creates/updates:

`content/trending-materials.json`

The ranking score currently uses:

- 50% enrollments (last 30 days)
- 20% wishlist adds (last 30 days)
- 20% rating
- 10% recency boost (newer materials score higher)

You can adjust weights in `scripts/update_trending.py`.

## 3) Render trending section on your website

Use the snippet:

`snippets/trending-widget.html`

It fetches `content/trending-materials.json` and displays cards with:

- image
- title/category/level
- rating and trend score
- price
- CTA button ("Purchase & Start Learning")

## Suggested next production steps

1. Replace local JSON files with your DB/CMS source.
2. Expose `/api/trending-materials` from your backend.
3. Schedule the ranking script (e.g. daily cron/job).
4. Track conversions to improve ranking quality.
