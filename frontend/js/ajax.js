function registerForm() {
  const xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", function () {
    if (this.status === 200) {
      let res = document.getElementById("app");
      let data = JSON.parse(this.responseText);

      res.innerHTML = "";

      res.innerHTML += `
      <!-- Modal Trigger -->
        <a class="waves-effect waves-light btn modal-trigger"  href="#modal1"
          >Modal</a
        >

        <!-- Modal Structure -->
        <div id="modal1" class="modal">
          <div class="modal-content">
            <img src="images/adr.jpg" class="avatar" alt="" />
          </div>
        </div>


      `;
    } else {
      let res = document.getElementById("app");
      res.innerHTML = `Hubo un error ${this.status}`;
    }
  });

  const app = document.getElementById("app");
  app.addEventListener("click", function () {
    console.log("si señor");

    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, {});
  });

  xhttp.open("GET", "../../backend/registerForm.json");
  xhttp.send();
}
