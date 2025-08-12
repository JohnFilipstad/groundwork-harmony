function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update button text
  const button = document.querySelector(".theme-toggle");
  if (button) {
    button.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  console.log("Theme switched to:", newTheme);
}

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Set initial button text
  const button = document.querySelector(".theme-toggle");
  if (button) {
    button.textContent =
      savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  console.log("Theme loaded:", savedTheme);
});
