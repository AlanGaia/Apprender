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
              <label for="icon_confirmPassword">Confirmar Contraseña</label>
            </div>


            <div class="center-align mt-5 col s12">
              <button id="registerFormBtn" class="pink hoverable  waves-effect waves-light btn-large disabled">
              <span>Crear una cuenta</span>
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



  app.addEventListener("keyup", function () {
  
    const passwordInput = document.getElementById('icon_password');
    const passwordConfirmInput = document.getElementById('icon_confirmPassword');
    const nameInput = document.getElementById('icon_prefix');
    const mailInput = document.getElementById('icon_email');
    const registerBtn = document.getElementById('registerFormBtn');
    const errors = document.getElementById('errors');

    const inputs = [nameInput,mailInput,passwordInput,passwordConfirmInput];



    const valid =  inputs.filter(input => input.classList.contains('valid'));

    console.log(valid.length);
    
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

      if (valid.length === 4) {
        registerBtn.classList.remove('disabled')
      } else {
        registerBtn.classList.add('disabled')
      }


    })

  


  xhttp.open("GET", "http://localhost:8018/user/signin");
  xhttp.send();
}
