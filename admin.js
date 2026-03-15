const adminMessageEl = document.querySelector("#adminMessage");
const adminWelcomeEl = document.querySelector("#adminWelcome");
const adminResortsListEl = document.querySelector("#adminResortsList");
const adminEventsListEl = document.querySelector("#adminEventsList");
const adminBookingsListEl = document.querySelector("#adminBookingsList");
const resortForm = document.querySelector("#resortForm");
const eventForm = document.querySelector("#eventForm");
const adminLogoutBtn = document.querySelector("#adminLogoutBtn");

const resortNameEl = document.querySelector("#resortName");
const resortAreaEl = document.querySelector("#resortArea");
const resortPriceEl = document.querySelector("#resortPrice");
const resortDescriptionEl = document.querySelector("#resortDescription");

const eventNameEl = document.querySelector("#eventName");
const eventLocationEl = document.querySelector("#eventLocation");
const eventDateEl = document.querySelector("#eventDate");
const eventPriceEl = document.querySelector("#eventPrice");
const eventDescriptionEl = document.querySelector("#eventDescription");

function setAdminMessage(message, isError = false) {
  adminMessageEl.textContent = message;
  adminMessageEl.className = `form-message ${isError ? "error" : "success"}`;
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

function renderResorts() {
  const resorts = LocalEscapeData.getResorts();
  if (resorts.length === 0) {
    adminResortsListEl.innerHTML = "<p>No resorts available.</p>";
    return;
  }

  adminResortsListEl.innerHTML = resorts
    .map((resort) => {
      return `
        <article class="admin-item">
          <div>
            <p><strong>${resort.name}</strong></p>
            <p>${resort.area} · $${resort.pricePerNight}/night</p>
          </div>
          <button class="outline-btn small remove-btn" data-type="resort" data-id="${resort.id}" type="button">Remove</button>
        </article>
      `;
    })
    .join("");
}

function renderEvents() {
  const events = LocalEscapeData.getEvents();
  if (events.length === 0) {
    adminEventsListEl.innerHTML = "<p>No events available.</p>";
    return;
  }

  adminEventsListEl.innerHTML = events
    .map((event) => {
      return `
        <article class="admin-item">
          <div>
            <p><strong>${event.name}</strong></p>
            <p>${event.location} · ${formatDate(event.date)} · $${event.ticketPrice}/ticket</p>
          </div>
          <button class="outline-btn small remove-btn" data-type="event" data-id="${event.id}" type="button">Remove</button>
        </article>
      `;
    })
    .join("");
}

function renderBookings() {
  const bookings = LocalEscapeData.getBookings();
  if (bookings.length === 0) {
    adminBookingsListEl.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  adminBookingsListEl.innerHTML = bookings
    .map((booking) => {
      return `
        <article class="admin-item booking-row">
          <div>
            <p><strong>${booking.itemName}</strong> (${booking.type})</p>
            <p>${formatDate(booking.date)} · Count: ${booking.count}</p>
            <p>${booking.customerName} · ${booking.customerPhone}</p>
            <p>Booked by: ${booking.bookedByEmail || "N/A"}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function refreshAll() {
  renderResorts();
  renderEvents();
  renderBookings();
}

function onAddResort(event) {
  event.preventDefault();
  const name = resortNameEl.value.trim();
  const area = resortAreaEl.value.trim();
  const pricePerNight = Number(resortPriceEl.value);
  const description = resortDescriptionEl.value.trim();

  if (!name || !area || !description || Number.isNaN(pricePerNight) || pricePerNight < 1) {
    setAdminMessage("Please fill valid resort details.", true);
    return;
  }

  LocalEscapeData.addResort({
    id: `resort-${Date.now()}`,
    name,
    area,
    pricePerNight,
    rating: 4.5,
    description
  });

  resortForm.reset();
  setAdminMessage(`Resort "${name}" added successfully.`);
  renderResorts();
}

function onAddEvent(event) {
  event.preventDefault();
  const name = eventNameEl.value.trim();
  const location = eventLocationEl.value.trim();
  const date = eventDateEl.value;
  const ticketPrice = Number(eventPriceEl.value);
  const description = eventDescriptionEl.value.trim();

  if (!name || !location || !date || !description || Number.isNaN(ticketPrice) || ticketPrice < 1) {
    setAdminMessage("Please fill valid event details.", true);
    return;
  }

  LocalEscapeData.addEvent({
    id: `event-${Date.now()}`,
    name,
    location,
    date,
    ticketPrice,
    description
  });

  eventForm.reset();
  setAdminMessage(`Event "${name}" added successfully.`);
  renderEvents();
}

function onRemoveClick(event) {
  const target = event.target.closest(".remove-btn");
  if (!target) {
    return;
  }

  const type = target.dataset.type;
  const id = target.dataset.id;
  if (type === "resort") {
    LocalEscapeData.removeResort(id);
    setAdminMessage("Resort removed.");
    renderResorts();
    return;
  }

  LocalEscapeData.removeEvent(id);
  setAdminMessage("Event removed.");
  renderEvents();
}

function onLogout() {
  LocalEscapeData.clearSession();
  window.location.href = "./login.html";
}

function requireAdmin() {
  const session = LocalEscapeData.getSession();
  if (!session || session.role !== "admin") {
    window.location.href = "./login.html?role=admin";
    return null;
  }
  return session;
}

function init() {
  const session = requireAdmin();
  if (!session) {
    return;
  }

  adminWelcomeEl.textContent = `Welcome, ${session.name}`;
  eventDateEl.min = new Date().toISOString().slice(0, 10);

  refreshAll();

  resortForm.addEventListener("submit", onAddResort);
  eventForm.addEventListener("submit", onAddEvent);
  document.body.addEventListener("click", onRemoveClick);
  adminLogoutBtn.addEventListener("click", onLogout);
}

init();
