document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  body.style.margin = "0";
  body.style.fontFamily = "'Arial', sans-serif";
  body.style.direction = "rtl";
  body.style.textAlign = "center";
  body.style.background = "linear-gradient(to bottom right, black, green, white, red)";
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";

  const h1 = document.querySelector("h1");
  if (h1) {
    h1.style.fontSize = "2.5em";
    h1.style.fontWeight = "900";
    h1.querySelector(".hunger").style.color = "green"
    h1.querySelector(".station").style.color = "red";
  }

  const p = document.querySelector("p");
  if (p) {
    p.style.fontSize = "2em";
    p.innerHTML = `
      <span style="color: red;">هـ</span>
      <span style="color: green;">نـجـ</span>
      <span style="color: white;">رستيشـن</span>`;
  }

  const form = document.querySelector("form");
  if (form) {
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.alignItems = "center";
    form.style.marginTop = "20px";
    form.style.gap = "10px";

    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
      input.style.width = "80%";
      input.style.maxWidth = "300px";
      input.style.padding = "12px";
      input.style.borderRadius = "30px";
      input.style.border = "none";
      input.style.fontSize = "1em";
      input.style.outline = "none";
    });

    const passwordInput = inputs[1];
    passwordInput.setAttribute("type", "password");

    const button = form.querySelector("button");
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "30px";
    button.style.padding = "12px 30px";
    button.style.fontSize = "1em";
    button.style.cursor = "pointer";
    button.style.display = "inline-block";
    button.style.width = "80%";
    button.style.maxWidth = "300px";

    const imgs = button.querySelectorAll("img");
    imgs.forEach(img => {
      img.style.display = "none";
    });

    const a = form.querySelector("a");
    a.style.color = "white";
    a.style.fontSize = "0.9em";
    a.style.textDecoration = "none";
  }
});
