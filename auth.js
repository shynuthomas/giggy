const loginForm = document.querySelector("#loginForm");
const roleEl = document.querySelector("#role");
const fullNameEl = document.querySelector("#fullName");
const nameFieldEl = document.querySelector("#nameField");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const loginMessageEl = document.querySelector("#loginMessage");

const ADMIN_EMAIL = "admin@localescape.com";
const ADMIN_PASSWORD = "admin123";

function setMessage(message, isError = false) {
  loginMessageEl.textContent = message;
  loginMessageEl.className = `form-message ${isError ? "error" : "success"}`;
}

function updateNameField() {
  if (roleEl.value === "admin") {
    nameFieldEl.style.display = "none";
    fullNameEl.value = "";
  } else {
    nameFieldEl.style.display = "flex";
  }
}

function redirectForRole(role) {
  if (role === "admin") {
    window.location.href = "./admin.html";
  } else {
    window.location.href = "./index.html";
  }
}

function onSubmit(event) {
  event.preventDefault();

  const role = roleEl.value;
  const name = fullNameEl.value.trim();
  const email = emailEl.value.trim().toLowerCase();
  const password = passwordEl.value.trim();

  if (!email || !password) {
    setMessage("Email and password are required.", true);
    return;
  }

  if (role === "admin") {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setMessage("Invalid admin credentials.", true);
      return;
    }

    LocalEscapeData.setSession({
      role: "admin",
      name: "Administrator",
      email,
      loggedInAt: new Date().toISOString()
    });
    setMessage("Admin login successful. Redirecting...");
    setTimeout(() => redirectForRole(role), 700);
    return;
  }

  if (!name) {
    setMessage("Please enter your full name for user login.", true);
    return;
  }

  if (password.length < 4) {
    setMessage("Password should be at least 4 characters.", true);
    return;
  }

  LocalEscapeData.setSession({
    role: "user",
    name,
    email,
    loggedInAt: new Date().toISOString()
  });
  setMessage("User login successful. Redirecting...");
  setTimeout(() => redirectForRole(role), 700);
}

function init() {
  const currentSession = LocalEscapeData.getSession();
  if (currentSession) {
    setMessage(`Already logged in as ${currentSession.name} (${currentSession.role}).`);
  }

  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get("role");
  if (roleParam === "admin" || roleParam === "user") {
    roleEl.value = roleParam;
  }

  updateNameField();
  roleEl.addEventListener("change", updateNameField);
  loginForm.addEventListener("submit", onSubmit);
}

init();
