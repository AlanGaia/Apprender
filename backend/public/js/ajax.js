function registerForm() {
  const xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", function () {
    if (this.status === 200) {
      let res = document.getElementById("main-content");
      // let data = JSON.parse(this.responseText);

      res.innerHTML = "";

      res.innerHTML += `
    <section id="registerForm">
      <div class="row">
        <form class="col s12">
        <div class="row">
          <h2>Registrate</h2>
          <h5>Datos Personales</h5>
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" class="validate">
              <label for="icon_prefix">Nombre</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">email</i>
              <input id="icon_email" type="email" class="validate">
              <label for="icon_email">Email</label>
            </div>
          <h5>Datos de la Cuenta</h5>
            <div class="input-field col s6">
              <i class="material-icons prefix">https</i>
              <input id="icon_password" type="password" class="validate">
              <label for="icon_password">Contraseña</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">done_all</i>
              <input id="icon_confirmPassword" type="password" >
              <label for="icon_confirmPassword" data-error="Las contraseñas no coinciden">Confirmar Contraseña</label>
            </div>
            <div id="errors" class="col s6 p-5 hide red lighten-4">
            <span class="red-text">Las contraseñas deben coincidir</span>
          </div>
            <div class="center-align mt-5 col s12">
              <button class="pink hoverable  waves-effect waves-light btn-large ">
              <span class="">Crear una cuenta</span>
              </button>    
            </div>
          </div>
        </form>
      </div>
    </section>


      `;
    } else {
      let res = document.getElementById("main-content");
      res.innerHTML = `Hubo un error ${this.status}`;
    }
  });

  const app = document.getElementById("main-content");
  app.addEventListener("click", function () {
    console.log("si señor"); //<--Borrar esto
    const passwordInput = document.getElementById('icon_password');
    const passwordConfirmInput = document.getElementById('icon_confirmPassword');
    const errors = document.getElementById('errors');

    if(passwordInput !== null){
      passwordInput.addEventListener('focusout' ,() => {
        if (passwordInput.value !== passwordConfirmInput.value){
          passwordConfirmInput.classList.remove('valid')
          passwordConfirmInput.classList.add('invalid')
        } else{
          passwordConfirmInput.classList.remove('invalid')
          passwordConfirmInput.classList.add('valid')
        }
      })

      passwordConfirmInput.addEventListener('keyup', () =>{
        if (passwordInput.value !== passwordConfirmInput.value){
          passwordConfirmInput.classList.remove('valid')
          passwordConfirmInput.classList.add('invalid')
          errors.classList.remove('hide')
        } else{
          passwordConfirmInput.classList.remove('invalid')
          passwordConfirmInput.classList.add('valid')
          errors.classList.add('hide')
        }
      })

    }
  });


  xhttp.open("GET", "http://localhost:8018/user/signin");
  xhttp.send();
}
