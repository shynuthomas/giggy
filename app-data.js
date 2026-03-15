const LocalEscapeData = (() => {
  const STORAGE_KEYS = {
    resorts: "local_escape_resorts",
    events: "local_escape_events",
    bookings: "local_escape_bookings",
    session: "local_escape_session"
  };

  const DEFAULT_RESORTS = [
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

  const DEFAULT_EVENTS = [
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

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function ensureSeedData() {
    if (!Array.isArray(readJson(STORAGE_KEYS.resorts, null))) {
      writeJson(STORAGE_KEYS.resorts, DEFAULT_RESORTS);
    }
    if (!Array.isArray(readJson(STORAGE_KEYS.events, null))) {
      writeJson(STORAGE_KEYS.events, DEFAULT_EVENTS);
    }
    if (!Array.isArray(readJson(STORAGE_KEYS.bookings, null))) {
      writeJson(STORAGE_KEYS.bookings, []);
    }
  }

  function getResorts() {
    ensureSeedData();
    return readJson(STORAGE_KEYS.resorts, []);
  }

  function setResorts(items) {
    writeJson(STORAGE_KEYS.resorts, items);
  }

  function addResort(item) {
    const resorts = getResorts();
    resorts.push(item);
    setResorts(resorts);
  }

  function removeResort(id) {
    const resorts = getResorts().filter((item) => item.id !== id);
    setResorts(resorts);
  }

  function getEvents() {
    ensureSeedData();
    return readJson(STORAGE_KEYS.events, []);
  }

  function setEvents(items) {
    writeJson(STORAGE_KEYS.events, items);
  }

  function addEvent(item) {
    const events = getEvents();
    events.push(item);
    setEvents(events);
  }

  function removeEvent(id) {
    const events = getEvents().filter((item) => item.id !== id);
    setEvents(events);
  }

  function getBookings() {
    ensureSeedData();
    return readJson(STORAGE_KEYS.bookings, []);
  }

  function saveBooking(item) {
    const bookings = getBookings();
    bookings.unshift(item);
    writeJson(STORAGE_KEYS.bookings, bookings);
  }

  function getSession() {
    return readJson(STORAGE_KEYS.session, null);
  }

  function setSession(session) {
    writeJson(STORAGE_KEYS.session, session);
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEYS.session);
  }

  return {
    getResorts,
    addResort,
    removeResort,
    getEvents,
    addEvent,
    removeEvent,
    getBookings,
    saveBooking,
    getSession,
    setSession,
    clearSession
  };
})();

window.LocalEscapeData = LocalEscapeData;
