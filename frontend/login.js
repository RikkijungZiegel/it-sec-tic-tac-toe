let isLoginMode = true;

function toggleAuth() {
  isLoginMode = !isLoginMode;

  document.getElementById("auth-title").innerText = isLoginMode ? "Login" : "Registrieren";
  document.querySelector(".auth-btn").innerText = isLoginMode ? "Login" : "Registrieren";
  document.getElementById("toggle-auth").innerText = isLoginMode
    ? "Kein Konto? Registrieren"
    : "Schon registriert? Zum Login";

  // Zeige oder verstecke das Wiederholungsfeld
  const repeatField = document.getElementById("repeat-password");
  repeatField.classList.toggle("hide", isLoginMode);

  // Reset message and fields
  document.getElementById("auth-msg").innerText = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("repeat-password").value = "";
}

function handleAuth() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const repeatPass = document.getElementById("repeat-password").value.trim();
  const msg = document.getElementById("auth-msg");

  if (!user || !pass || (!isLoginMode && !repeatPass)) {
    showMessage("Bitte alle Felder ausfüllen.", "red");
    return;
  }

  if (isLoginMode) {
    const savedUser = localStorage.getItem("user");
    const savedPass = localStorage.getItem("pass");
    if (user === savedUser && pass === savedPass) {
      showMessage("Login erfolgreich ✅", "green");
      showGameUI();
    } else {
      showMessage("Login fehlgeschlagen ❌", "red");
    }
  } else {
    if (pass !== repeatPass) {
      showMessage("Passwörter stimmen nicht überein ❗", "red");
      return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    showMessage("Registrierung erfolgreich ✅ Jetzt einloggen.", "green");
    toggleAuth();
  }
}

function showMessage(text, color) {
  const msg = document.getElementById("auth-msg");
  msg.innerText = text;
  msg.style.color = color;
}

function showGameUI() {
  document.getElementById("auth").classList.add("hide");
  document.getElementById("game-ui").classList.remove("hide");
}
