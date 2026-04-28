// localStorage.clear();

const signupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".login-form");

const profileButton = document.getElementById("profile-button");

const signupButton = document.querySelector(
  '.sign-up-form button[type="submit"]',
);
const loginButton = document.querySelector('.login-form button[type="submit"]');

const logoutButton = document.getElementById("logout-button");

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("user")) || null;

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (name && email && password) {
      const newUser = { name, email, password, cars: [] };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      currentUser = { ...newUser };
      localStorage.setItem("user", JSON.stringify(currentUser));
      alert(`Account created for ${name}`);
      signupForm.reset();
      window.location.href = "cars.html";
    } else {
      alert("Please fill in all fields");
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    console.log("login form event listened");
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (email && password) {
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );
      if (user) {
        currentUser = { ...user };
        localStorage.setItem("user", JSON.stringify(currentUser));
        alert(`Logged in as ${user.name}`);
        loginForm.reset();
        window.location.href = "cars.html";
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("Please fill in all fields");
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    currentUser = null;
    localStorage.removeItem("user");
    alert("Logged out successfully");
    window.location.href = "index.html";
  });
}

if (profileButton) {
  profileButton.addEventListener("click", () => {
    if (currentUser) {
      window.location.href = "profile.html";
    } else {
      window.location.href = "login.html";
    }
  });
}

if (currentUser) {
  const fullNameElem = document.getElementById("fullNameP");
  const emailElem = document.getElementById("emailP");

  if (fullNameElem) fullNameElem.textContent = currentUser.name;
  if (emailElem) emailElem.textContent = currentUser.email;
}
