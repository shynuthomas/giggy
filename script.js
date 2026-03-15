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
const sessionInfoEl = document.querySelector("#sessionInfo");
const loginNavLink = document.querySelector("#loginNavLink");
const logoutBtn = document.querySelector("#logoutBtn");

let resorts = [];
let events = [];

function renderCards() {
  if (resorts.length === 0) {
    resortsGrid.innerHTML = `<p>No resorts available yet. Admin can add new resorts from the admin page.</p>`;
  } else {
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
  }

  if (events.length === 0) {
    eventsGrid.innerHTML = `<p>No events available yet. Admin can add new events from the admin page.</p>`;
  } else {
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
}

function refreshCatalog() {
  resorts = LocalEscapeData.getResorts();
  events = LocalEscapeData.getEvents();
  renderCards();
  updateBookingItems(bookingTypeEl.value);
}

function getItemsByType(type) {
  return type === "event" ? events : resorts;
}

function updateBookingItems(type) {
  const items = getItemsByType(type);

  if (items.length === 0) {
    bookingItemEl.innerHTML = `<option value="">No options available</option>`;
    return;
  }

  bookingItemEl.innerHTML = items
    .map((item) => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join("");
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
  if (!dateString) {
    return "N/A";
  }

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
  const session = LocalEscapeData.getSession();
  const bookings = LocalEscapeData.getBookings();
  const filteredBookings = bookings.filter((booking) => {
    return booking.bookedByEmail === session.email;
  });

  if (filteredBookings.length === 0) {
    bookingsListEl.innerHTML = `<p>No bookings yet for this account. Make your first reservation from the booking form.</p>`;
    return;
  }

  bookingsListEl.innerHTML = filteredBookings
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
  const session = LocalEscapeData.getSession();
  if (!session) {
    setFormMessage("Please login first to confirm your booking.", true);
    return;
  }

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
    notes,
    bookedByEmail: session.email
  };

  LocalEscapeData.saveBooking(bookingData);
  setFormMessage(`Booking confirmed for ${selectedItem.name} on ${formatDate(date)}.`);
  bookingForm.reset();
  bookingTypeEl.value = type;
  updateBookingItems(type);
  bookingCountEl.value = "2";
  customerNameEl.value = session.name || "";
}

function openBookingsDialog() {
  const session = LocalEscapeData.getSession();
  if (!session) {
    setFormMessage("Login required to view your bookings.", true);
    return;
  }

  renderBookingsModal();
  bookingsDialog.showModal();
}

function closeBookingsDialog() {
  bookingsDialog.close();
}

function renderSessionState() {
  const session = LocalEscapeData.getSession();
  if (!session) {
    sessionInfoEl.textContent = "You are browsing as guest. Login to track bookings.";
    logoutBtn.style.display = "none";
    loginNavLink.style.display = "inline-flex";
    return;
  }

  sessionInfoEl.textContent = `Logged in as ${session.name} (${session.role}).`;
  logoutBtn.style.display = "inline-flex";
  loginNavLink.style.display = "none";
  customerNameEl.value = session.name || "";
}

function onLogout() {
  LocalEscapeData.clearSession();
  window.location.reload();
}

function init() {
  refreshCatalog();
  renderSessionState();
  bookingDateEl.min = new Date().toISOString().slice(0, 10);

  document.body.addEventListener("click", onQuickBookClick);
  bookingTypeEl.addEventListener("change", () => {
    updateBookingItems(bookingTypeEl.value);
  });
  bookingForm.addEventListener("submit", onSubmitBooking);
  viewBookingsBtn.addEventListener("click", openBookingsDialog);
  closeDialogBtn.addEventListener("click", closeBookingsDialog);
  logoutBtn.addEventListener("click", onLogout);
}

init();
