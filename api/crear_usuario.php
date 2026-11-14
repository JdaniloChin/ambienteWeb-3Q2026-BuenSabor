<?php
    require_once __DIR__ . '/helpers/response.php';

    //solo permitimos un metodos o solicitudes post

    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        response(405,false,'Metodo no permitido');
    }

    //recibir el JSON enviado por el frontend
    $datos = json_decode(file_get_contents('php://input'),true);

    //validamos que sea un json correcto
    if(!is_array($datos)){
        response(400,false,'Datos invalidos');
    }

    //Obtener los datos del formulario
    $nombre = trim($datos['nombre'] ?? '');
    $correo = trim($datos['correo'] ?? '');
    $clave = trim($datos['password'] ?? '');
    $confirmarClave = $datos['confirmPassword'] ?? '';
    

    //validamos el correo
    if(!filter_var($correo, FILTER_VALIDATE_EMAIL)){
        response(400,false,'El correo electronico no es valido');
    }

    //validamos longitud de la contraseña
    if(strlen($clave) < 8){
        response(400,false,'La contraseña debe tener al menos 8 caracteres');

    }

    if ($clave !== $confirmarClave) {
        response(400, false, 'Las contraseñas no coinciden');
    }
    
    //generamos el hash de la contraseña
    $hash = password_hash($clave, PASSWORD_DEFAULT);
   
    try{
        require_once __DIR__ . '/conexion.php';
        $stmt = $pdo->prepare('INSERT INTO usuarios (nombre, correo, clave_hash)
                            VALUES(?,?,?)');

        $stmt->execute([$nombre,$correo,$hash]);

        response(201,true,'Usuario registrado correctamente');


    }catch(PDOException $e){
        $message = '';
        error_log($e->getMessage());
        if($e->getCode() == '23000'){
            $errorCod = 409;
            $message =  'El correo electronico ya esta registrado';
        }else{
            $errorCod = 500;
            $message =  'Error(' . $e->getCode() .') al registrar el usuario.';
        }
        
        response($errorCod,false, $message );
    }

?>