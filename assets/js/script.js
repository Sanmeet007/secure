const randomPassword = (myLength = 32) => {
  const chars =
    "#!@#$%^&*AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

const loader = document.querySelector(".loader");
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".app-card");
const cpyBtn = document.querySelector("#copy");
const refreshBtn = document.querySelector("#refresh");
const textDiv = document.querySelector("#text");
const sidebarTabs = document.querySelectorAll(".pop-screen > div");
const modal = document.querySelector(".modal");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("load"), 500);

  setTimeout(() => screen.classList.add("screen-loaded"), 2550);

  textDiv.textContent = randomPassword();
});

buttons.forEach((btnEl, index) => {
  btnEl.setAttribute("data-id", index);
  btnEl.addEventListener("click", (e) => {
    const x = e.offsetX + "px";
    const y = e.offsetY + "px";

    const spanEl = document.createElement("span");
    if (btnEl.querySelectorAll("span").length <= 3) {
      btnEl.appendChild(spanEl);
      spanEl.style.left = x;
      spanEl.style.top = y;

      setTimeout(() => {
        spanEl.remove();
      }, 600);
    }
  });

  btnEl.addEventListener("click", (e) => {
    const id = btnEl.getAttribute("data-id");
    sidebarTabs.forEach((el, i) =>
      i == id ? el.classList.add("active") : el.classList.remove("active")
    );
    buttons.forEach((el, i) =>
      i == id ? el.classList.add("active") : el.classList.remove("active")
    );
  });
});

cpyBtn.addEventListener("click", (e) => {
  try {
    navigator.clipboard.writeText(textDiv.textContent);
    modal.classList.add("modal-visible");
    setTimeout(() => modal.classList.remove("modal-visible"), 1000);
  } catch (E) {
    console.log(E);
  }
});

refreshBtn.addEventListener("click", () => {
  refreshBtn.querySelector("i").classList.add("rotate");
  setTimeout(() => {
    refreshBtn.querySelector("i").classList.remove("rotate");
    textDiv.textContent = randomPassword();
  }, 500);
});

const inputs = document.querySelectorAll(".form-element");

inputs.forEach((formEL) => {
  const input = formEL.querySelector("input");
  const label = formEL.querySelector("label");
  const legend = formEL.querySelector("legend");
  const fieldset = formEL.querySelector("fieldset");

  input.addEventListener("focusin", () => {
    label.classList.add("label-focused");
    legend.classList.add("legend-focused");
    fieldset.classList.add("fieldset-focused");
  });
  input.addEventListener("focusout", () => {
    if (input.value === "") {
      label.classList.remove("label-focused");
      legend.classList.remove("legend-focused");
    }
    fieldset.classList.remove("fieldset-focused");
  });
});

const encDiv = document.querySelector(".enc-cipher");
const encForm = document.querySelector("#enc-form");
const encSuccess = document.querySelector(".encrypted-password");
const encText = document.querySelector("#enc-password-text");

const dencForm = document.querySelector("#denc-form");
const dencDiv = document.querySelector(".denc-cipher");
const dencSuccess = document.querySelector(".decrypted-password");
const dencText = document.querySelector("#denc-password-text");

encForm.encryption.addEventListener("change", (e) => {
  encDiv.querySelectorAll("div").forEach((div) => {
    if (div.getAttribute("data-name") === encForm.encryption.value) {
      div.classList.add("display");
    } else {
      div.classList.remove("display");
    }
  });
});

encForm.addEventListener("submit", (e) => {
  e.preventDefault();
  encSuccess.classList.add("display");
  const salt = encForm["enc-salt"].value;
  const password = encForm["normal-password"].value;
  const type =
    encForm.encryption.value === "" ? "AES" : dencForm.decryption.value;
  const encryptedPassword = CryptoJS[type].encrypt(password, salt);
  encText.textContent = encryptedPassword || "Invalid Credentials";
});

encForm.addEventListener("reset", (e) => {
  encSuccess.classList.remove("display");

  setTimeout(() => {
    inputs.forEach((formEL) => {
      const input = formEL.querySelector("input");
      const label = formEL.querySelector("label");
      const legend = formEL.querySelector("legend");
      const fieldset = formEL.querySelector("fieldset");
      if (input.value == "") {
        label.classList.remove("label-focused");
        legend.classList.remove("legend-focused");
      }
      fieldset.classList.remove("fieldset-focused");
    });
  }, 200);
});

dencForm.decryption.addEventListener("change", (e) => {
  dencDiv.querySelectorAll("div").forEach((div) => {
    if (div.getAttribute("data-name") === dencForm.decryption.value) {
      console.log("a");
      div.classList.add("display");
    } else {
      div.classList.remove("display");
    }
  });
});

dencForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dencSuccess.classList.add("display");

  const salt = dencForm["denc-salt"].value;
  const password = dencForm["enc-password"].value;
  const type =
    dencForm.decryption.value === "" ? "AES" : dencForm.decryption.value;
  const dencryptedPassword = CryptoJS[type].decrypt(password, salt);
  dencText.textContent =
    dencryptedPassword.toString(CryptoJS.enc.Utf8) || "Invalid Credentials";
});

dencForm.addEventListener("reset", () => {
  dencSuccess.classList.remove("display");
});

const copyEncPassBtn = document.querySelector("#copy-enc-password");
const encPassDiv = document.querySelector("#enc-password-text");

copyEncPassBtn.addEventListener("click", () => {
  try {
    navigator.clipboard.writeText(encPassDiv.textContent);
    modal.classList.add("modal-visible");
    setTimeout(() => modal.classList.remove("modal-visible"), 1000);
  } catch (E) {
    console.log(E);
  }
});

const copyDencPassBtn = document.querySelector("#copy-denc-password");
const dencPassDiv = document.querySelector("#denc-password-text");

copyDencPassBtn.addEventListener("click", () => {
  try {
    navigator.clipboard.writeText(dencPassDiv.textContent);
    modal.classList.add("modal-visible");
    setTimeout(() => modal.classList.remove("modal-visible"), 1000);
  } catch (E) {
    console.log(E);
  }
});
