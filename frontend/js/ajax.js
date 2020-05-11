function registerForm() {
  const xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", function () {
    if (this.status === 200) {
      let res = document.getElementById("app");
      let data = JSON.parse(this.responseText);

      res.innerHTML = "";

      res.innerHTML += `
      `;
    } else {
      let res = document.getElementById("app");
      res.innerHTML = `Hubo un error ${this.status}`;
    }
  });

  xhttp.open("GET", "../../backend/registerForm.json");
  xhttp.send();
}
