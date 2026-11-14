$(document).ready(function(){
    $('#formRegistro').on('submit', function (evento){
        evento.preventDefault();

        const nombre = $('#nombre').val().trim();
        const correo = $('#correo').val().trim();
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirmPassword').val().trim();

        $('#mensajeRegistro')
            .attr('class','mt-3')
            .text('');

        if(!nombre || !correo || !password || !confirmPassword){
            $('#mensajeRegistro')
                .attr('class','alert alert-danger mt-3')
                .text('Todos los campos son obligatorios');
            return;
        }

        if(password.length < 8){
            $('#mensajeRegistro')
                .attr('class','alert alert-danger mt-3')
                .text('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if(password !== confirmPassword){
            $('#mensajeRegistro')
                .attr('class','alert alert-danger mt-3')
                .text('Las contraseñas no coinciden');
            return;
        }

        const usuario = {
            nombre: nombre,
            correo: correo,
            password: password,
            confirmPassword: confirmPassword
        };

        //emplear un ajax con JQuery
        $.ajax({
            url: './api/crear_usuario.php',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(usuario),

            success: function(resultado){
                if(resultado.success){
                    $('#mensajeRegistro')
                        .attr('class','alert alert-success mt-3')
                        .text(resultado.message);

                    $('#formRegistro')[0].reset();

                    setTimeout(function (){
                        window.location.href = './index.html';
                    },2000);

                }else{
                    $('#mensajeRegistro')
                        .attr('class','alert alert-danger mt-3')
                        .text(resultado.message || 'No se pudo resgistrar el usuario');
                }

            },
            error: function (xhr, status, error){
                console.error('Error al registar usuario:', error);

                const mensajeError = xhr.responseJSON?.message || 'Error al comunicarse con el servidor';

                $('#mensajeRegistro')
                        .attr('class','alert alert-danger mt-3')
                        .text(mensajeError);
            }
        });
    });
});

/*const formRegistro = document.getElementById('formRegistro');
const mensaje = document.getElementById('mensajeRegistro');

formRegistro.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    mensaje.className = 'mt-3';
    mensaje.textContent = '';

    if(!nombre || !correo || !password || !confirmPassword){
        mensaje.className = 'alert alert-danger mt-3';
        mensaje.textContent = 'Todos los campos son obligatorios';
    }

    if(password.length < 8){
        mensaje.className =  'alert alert-danger mt-3';
        mensaje.textContent = 'La contraseña debe tener al menos 8 caracteres';
    }

    if(password !== confirmPassword){
        mensaje.className =  'alert alert-danger mt-3';
        mensaje.textContent = 'Las contraseñas no coinciden';
    }

    const usuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        confirmPassword: confirmPassword
    };

    try{
        const respuesta = await fetch('./api/crear_usuario.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/jason'
            },
            body:JSON.stringify(usuario)
        });

        const resultado = await respuesta.json();

        if(respuesta.ok && resultado.success){
            mensaje.className =  'alert alert-success mt-3';
            mensaje.textContent = resultado.message;

            formRegistro.reset();

            setTimeout(()=>{
                window.location.href = './index.html';
            },2000);
        }else{
            mensaje.className =  'alert alert-danger mt-3';
            mensaje.textContent = resultado.message || 'No se pudo resgistrar el usuario';
        }
    }catch(error){
        console.error('Error al registar usuario:', error);

        mensaje.className =  'alert alert-danger mt-3';
        mensaje.textContent = 'Error al comunicarse con el servidor';
    }
    
});*/