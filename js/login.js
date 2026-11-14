const formLogin = document.getElementById("formLogin");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");


formLogin.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const correo =  document.getElementById("correoLogin").value;
    const password = document.getElementById("passwordLogin").value;
    const mensaje =  document.getElementById("mensaje");

    //deshabilitar el boton evitar multiples clics
    btnIniciarSesion.disabled = true;

    //mostar spinner
    btnIniciarSesion.innerHTML= `
        <span class="spinner-border spinner-border-sm"
        role="status" aria-hidden="true"></span>
        Validando...`;

    try{
        const respuesta = await fetch('api/login.php',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                correo: correo,
                clave: password
            })
        });
        const resultado = await respuesta.json();
        mensaje.textContent = resultado.message;
        if(resultado.success){
            sesionIniciada = true;
            btnIniciarSesion.disabled=false;
            btnIniciarSesion.textContent="Iniciar Sesión";
            setTimeout(function() {
                const modalLogin= bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
                modalLogin.hide();
            }, 3000);
        }else{
            setTimeout(function() {
                btnIniciarSesion.disabled=false;
                btnIniciarSesion.textContent="Iniciar Sesión";
                mensaje.textContent = '';
            }, 3000);
        }
    }catch(error){
        mensaje.textContent = 'No se pudo conectar con el servidor'
        console.error(error);

    }
    
});
