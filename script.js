const resorts = [
  {
    id: "resort-1",
    name: "Lakeview Retreat",
    area: "Hilltop District",
    pricePerNight: 120,
    rating: 4.7,
    description: "Peaceful cottages with lake-side breakfast and spa access."
  },
  {
    id: "resort-2",
    name: "Palm Breeze Resort",
    area: "Sunbay Coast",
    pricePerNight: 160,
    rating: 4.8,
    description: "Beachfront suites with infinity pool and evening bonfire."
  },
  {
    id: "resort-3",
    name: "Evergreen Mountain Stay",
    area: "Pine Valley",
    pricePerNight: 95,
    rating: 4.5,
    description: "Budget-friendly mountain stay with guided nature walks."
  }
];

const events = [
  {
    id: "event-1",
    name: "Night Food Festival",
    location: "Town Square",
    date: "2026-04-10",
    ticketPrice: 12,
    description: "Taste local street food, live music, and family activities."
  },
  {
    id: "event-2",
    name: "Sunset Beach Concert",
    location: "Golden Shore",
    date: "2026-04-18",
    ticketPrice: 20,
    description: "Open-air music concert by regional artists at the beach."
  },
  {
    id: "event-3",
    name: "Crafts & Culture Fair",
    location: "Heritage Park",
    date: "2026-05-03",
    ticketPrice: 8,
    description: "Traditional dance, hand-made crafts, and local workshops."
  }
];

const STORAGE_KEY = "local_escape_bookings";

const resortsGrid = document.querySelector("#resortsGrid");
const eventsGrid = document.querySelector("#eventsGrid");
const bookingTypeEl = document.querySelector("#bookingType");
const bookingItemEl = document.querySelector("#bookingItem");
const bookingDateEl = document.querySelector("#bookingDate");
const bookingCountEl = document.querySelector("#bookingCount");
const customerNameEl = document.querySelector("#customerName");
const customerPhoneEl = document.querySelector("#customerPhone");
const notesEl = document.querySelector("#notes");
const formMessageEl = document.querySelector("#formMessage");
const bookingForm = document.querySelector("#bookingForm");
const bookingsDialog = document.querySelector("#bookingsDialog");
const bookingsListEl = document.querySelector("#bookingsList");
const viewBookingsBtn = document.querySelector("#viewBookingsBtn");
const closeDialogBtn = document.querySelector("#closeDialogBtn");

function renderCards() {
  resortsGrid.innerHTML = resorts
    .map((resort) => {
      return `
        <article class="card">
          <span class="tag">Resort</span>
          <h4>${resort.name}</h4>
          <p>${resort.description}</p>
          <p><strong>Area:</strong> ${resort.area}</p>
          <div class="card-footer">
            <p><strong>$${resort.pricePerNight}</strong> / night</p>
            <button class="primary-btn book-btn" data-type="resort" data-id="${resort.id}" type="button">Book Now</button>
          </div>
        </article>
      `;
    })
    .join("");

  eventsGrid.innerHTML = events
    .map((event) => {
      return `
        <article class="card">
          <span class="tag">Event</span>
          <h4>${event.name}</h4>
          <p>${event.description}</p>
          <p><strong>Where:</strong> ${event.location}</p>
          <p><strong>Date:</strong> ${formatDate(event.date)}</p>
          <div class="card-footer">
            <p><strong>$${event.ticketPrice}</strong> / ticket</p>
            <button class="primary-btn book-btn" data-type="event" data-id="${event.id}" type="button">Book Now</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function getItemsByType(type) {
  return type === "event" ? events : resorts;
}

function updateBookingItems(type) {
  const items = getItemsByType(type);

  bookingItemEl.innerHTML = items
    .map((item) => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join("");
}

function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function saveBooking(bookingData) {
  const bookings = getStoredBookings();
  bookings.unshift(bookingData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function getItemDetails(type, id) {
  const items = getItemsByType(type);
  return items.find((item) => item.id === id);
}

function validateDate(value) {
  const selected = new Date(`${value}T00:00:00`);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return selected >= now;
}

function setFormMessage(message, isError = false) {
  formMessageEl.textContent = message;
  formMessageEl.className = `form-message ${isError ? "error" : "success"}`;
}

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function onQuickBookClick(event) {
  const button = event.target.closest(".book-btn");
  if (!button) {
    return;
  }

  const type = button.dataset.type;
  const itemId = button.dataset.id;

  bookingTypeEl.value = type;
  updateBookingItems(type);
  bookingItemEl.value = itemId;
  document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
}

function renderBookingsModal() {
  const bookings = getStoredBookings();

  if (bookings.length === 0) {
    bookingsListEl.innerHTML = `<p>No bookings yet. Make your first reservation from the booking form.</p>`;
    return;
  }

  bookingsListEl.innerHTML = bookings
    .map((booking) => {
      return `
        <article class="booking-item">
          <p><strong>${booking.itemName}</strong> (${booking.type})</p>
          <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
          <p><strong>Guests/Tickets:</strong> ${booking.count}</p>
          <p><strong>Name:</strong> ${booking.customerName}</p>
          <p><strong>Phone:</strong> ${booking.customerPhone}</p>
        </article>
      `;
    })
    .join("");
}

function onSubmitBooking(event) {
  event.preventDefault();
  const type = bookingTypeEl.value;
  const itemId = bookingItemEl.value;
  const date = bookingDateEl.value;
  const count = Number(bookingCountEl.value);
  const customerName = customerNameEl.value.trim();
  const customerPhone = customerPhoneEl.value.trim();
  const notes = notesEl.value.trim();

  if (!itemId || !date || !customerName || !customerPhone || Number.isNaN(count) || count < 1) {
    setFormMessage("Please complete all required fields correctly.", true);
    return;
  }

  if (!validateDate(date)) {
    setFormMessage("Booking date cannot be in the past.", true);
    return;
  }

  const selectedItem = getItemDetails(type, itemId);
  if (!selectedItem) {
    setFormMessage("Selected option is no longer available. Please try again.", true);
    return;
  }

  const bookingData = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    type,
    itemId,
    itemName: selectedItem.name,
    date,
    count,
    customerName,
    customerPhone,
    notes
  };

  saveBooking(bookingData);
  setFormMessage(`Booking confirmed for ${selectedItem.name} on ${formatDate(date)}.`);
  bookingForm.reset();
  bookingTypeEl.value = type;
  updateBookingItems(type);
  bookingCountEl.value = "2";
}

function openBookingsDialog() {
  renderBookingsModal();
  bookingsDialog.showModal();
}

function closeBookingsDialog() {
  bookingsDialog.close();
}

function init() {
  renderCards();
  updateBookingItems(bookingTypeEl.value);
  bookingDateEl.min = new Date().toISOString().slice(0, 10);

  document.body.addEventListener("click", onQuickBookClick);
  bookingTypeEl.addEventListener("change", () => {
    updateBookingItems(bookingTypeEl.value);
  });
  bookingForm.addEventListener("submit", onSubmitBooking);
  viewBookingsBtn.addEventListener("click", openBookingsDialog);
  closeDialogBtn.addEventListener("click", closeBookingsDialog);
}

init();
