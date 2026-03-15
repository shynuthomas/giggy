# Local Escape - Resort & Event Booking Website

A simple and modern starter website for booking:

- Resorts (stay bookings)
- Local events (ticket bookings)

This project is built with plain **HTML + CSS + JavaScript** so you can run it anywhere without extra setup.

## Features

- Hero landing section with clear call-to-action
- Resort and event listing cards
- "Book Now" quick action from each card
- Unified booking form for resorts/events
- Validation for required fields and past-date prevention
- Instant booking confirmation message
- "My Bookings" modal
- Local persistence using browser `localStorage`

## Run Locally

1. Clone this repository
2. Open `index.html` in your browser

Or run a small local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize for Your Place

Edit `script.js`:

- Update the `resorts` array with your local resorts
  - `name`, `area`, `pricePerNight`, `description`
- Update the `events` array with your local events
  - `name`, `location`, `date`, `ticketPrice`, `description`

You can also adjust colors and styles in `styles.css`.

## Next Recommended Steps

To make this production-ready:

1. Add user login (customers + admin)
2. Replace `localStorage` with a real database
3. Add online payment integration
4. Add booking availability calendar
5. Add email/SMS booking notifications
