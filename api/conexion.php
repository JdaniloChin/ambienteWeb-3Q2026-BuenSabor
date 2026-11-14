<?php
    $ruta_env = dirname(__DIR__) . '/.env';

    if(!file_exists($ruta_env)){
        return "No existe el archivo de configuracion";
    }

    $config = parse_ini_file($ruta_env,false,INI_SCANNER_RAW);
    /*$config[
            'DB_HOST'=> '127.0.0.1',
            ....]
    */
    
    if($config == false){
        return "No se pudo leer el archivo de configuracion";
    }

    try{
        $pdo = new PDO("mysql:host=". $config['DB_HOST'] . ";dbname=" . $config['DB_NAME'].";charset=utf8mb4", $config['DB_USER'], $config['DB_PASSWORD'],[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false

        ]);
    }catch(PDOException $e){
        error_log($e->getMessage());
        http_response_code(500);
        header('Content-Type: application/json; charset=utf8');
        echo json_encode(['success'=>false, 'message'=> 'Error de conexion con la base de datos']);
    }

?>