<?php
header('Content-Type: application/json; charset:utf-8');
if($_SERVER['REQUEST_METHOD'] != 'POST'){
    http_response_code(405);
    echo json_encode(['success'=>false, 'message'=>'Metodo no permitido']);
}

$datos = json_decode(file_get_contents('php://input'), true);
$correo = trim($datos['correo'] ?? '');
$clave = trim($datos['clave'] ?? '');

if(!filter_var($correo, FILTER_VALIDATE_EMAIL) || $clave === ''){
    http_response_code(400);
    echo json_encode(['success'=>false, 'message'=>'Complete correo y contraseña validos']);
    exit;
}

require 'conexion.php';
$consulta = $pdo->prepare('SELECT id, nombre, correo, clave_hash 
                    FROM usuarios WHERE correo = ? AND activo = 1
                    LIMIT 1');

$consulta->execute([$correo]);
$usuario = $consulta->fetch();

if(!$usuario || !password_verify($clave, $usuario['clave_hash'])){
    http_response_code(401);
    echo json_encode(['success'=>false, 'message'=>'Credenciales incorrectas']);
    exit;

}

session_start();
session_regenerate_id(true);
$_SESSION['usuario_id'] = $usuario['id'];
$_SESSION['nombre'] = $usuario['nombre'];
echo json_encode(['success'=>true, 'message'=>'Bienvenido, ' . $usuario['nombre']]);

?>