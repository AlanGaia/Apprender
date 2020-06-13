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
        <form action="/user/register" method="POST" class="col s12">
        <div class="row">
          <h2>Registrate</h2>
          <div id="errors" class="col s12 flex p-5 mb-5 hide red lighten-4">
          <i class="material-icons red-text">cancel</i>
          <span class="red-text">Las contraseñas deben coincidir</span>
          </div>
          <h5>Datos Personales</h5>
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" name="name" type="text" class="validate">
              <label for="icon_prefix">Nombre</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">email</i>
              <input id="icon_email" name="email"  type="email" class="validate">
              <label for="icon_email">Email</label>
            </div>
          <h5>Datos de la Cuenta</h5>
            <div class="input-field col s6">
              <i class="material-icons prefix">https</i>
              <input id="icon_password" name="password" type="password" class="validate">
              <label for="icon_password">Contraseña</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">done_all</i>
              <input id="icon_confirmPassword" name="confirmPassword"  type="password" >
              <label for="icon_confirmPassword">Confirmar Contraseña</label>
            </div>


            <div class="center-align mt-5 col s12">
              <button type="submit" id="registerFormBtn" class="pink hoverable  waves-effect waves-light btn-large disabled">
              <span>Crear una cuenta</span>
              </button>
              <br/>
              <span id="secretmsg" class="hide">check the console</span>
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
  

  app.addEventListener("change", function () {
  
    const passwordInput = document.getElementById('icon_password');
    const passwordConfirmInput = document.getElementById('icon_confirmPassword');
    const nameInput = document.getElementById('icon_prefix');
    const mailInput = document.getElementById('icon_email');
    const registerBtn = document.getElementById('registerFormBtn');
    const errors = document.getElementById('errors');

    const inputs = [nameInput,mailInput,passwordInput,passwordConfirmInput];


    const valid =  inputs.filter(input => input.classList.contains('valid'));

    
      passwordInput.addEventListener('keyup' ,() => {
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
        } else{
          passwordConfirmInput.classList.remove('invalid')
          passwordConfirmInput.classList.add('valid')
        }
      })

      if (valid.length === 4) {
        registerBtn.classList.remove('disabled')
      } else {
        registerBtn.classList.add('disabled')
      }


    })

    app.addEventListener('keyup', () => {

      const passwordInput = document.getElementById('icon_password');
      const passwordConfirmInput = document.getElementById('icon_confirmPassword');
      const nameInput = document.getElementById('icon_prefix');
      const mailInput = document.getElementById('icon_email');
      const registerBtn = document.getElementById('registerFormBtn');
      const errors = document.getElementById('errors');
  
      const inputs = [nameInput,mailInput,passwordInput,passwordConfirmInput];
  
  
  
      const valid =  inputs.filter(input => input.classList.contains('valid'));



      if (valid.length === 4) {
        registerBtn.classList.remove('disabled')
        document.getElementById('secretmsg').classList.remove('hide')
        console.log('Tipea secretcode y descubre el codigo oculto');
      } else {
        registerBtn.classList.add('disabled')
      }

    })

    

  xhttp.open("GET", "http://localhost:8018/user/signin");
  xhttp.send();
}
