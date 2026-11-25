const form = document.querySelector("#account-form");
const loginTab = document.querySelector("#login-tab");
const signupTab = document.querySelector("#signup-tab");
const message = document.querySelector("#form-message");
let mode = "login";

function setMode(nextMode) {
  mode = nextMode;
  const signingUp = mode === "signup";
  document.querySelector("#form-title").textContent = signingUp ? "Create your account" : "Welcome back";
  document.querySelector("#form-intro").textContent = signingUp ? "Join us for a more personal shopping experience." : "Sign in to view your orders and save your favourites.";
  document.querySelector("#submit-label").textContent = signingUp ? "CREATE ACCOUNT" : "LOG IN";
  document.querySelector("#password").autocomplete = signingUp ? "new-password" : "current-password";
  document.querySelectorAll(".signup-only").forEach((field) => {
    field.hidden = !signingUp;
    if (field.id === "full-name") field.required = signingUp;
  });
  document.querySelectorAll(".login-only").forEach((field) => { field.hidden = signingUp; });
  document.querySelector("#terms").required = signingUp;
  loginTab.classList.toggle("active", !signingUp);
  signupTab.classList.toggle("active", signingUp);
  loginTab.setAttribute("aria-selected", String(!signingUp));
  signupTab.setAttribute("aria-selected", String(signingUp));
  message.textContent = "";
}

loginTab.addEventListener("click", () => setMode("login"));
signupTab.addEventListener("click", () => setMode("signup"));
document.querySelector("#toggle-password").addEventListener("click", (event) => {
  const password = document.querySelector("#password");
  const showing = password.type === "text";
  password.type = showing ? "password" : "text";
  event.currentTarget.textContent = showing ? "Show" : "Hide";
  event.currentTarget.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});
document.querySelector("#forgot-link").addEventListener("click", (event) => {
  event.preventDefault();
  message.textContent = "Password reset will be available once account services are connected. Contact us on WhatsApp for help.";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = mode === "signup"
    ? "Your details are ready. Account creation will work once account services are connected."
    : "Your details are ready. Sign-in will work once account services are connected.";
});
