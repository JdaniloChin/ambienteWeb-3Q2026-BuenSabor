console.log("Bienvenidos al Restaurante El Buen Sabor");

//alert("Sistema de pedidos iniciado");

const nombreProducto = "Hamburguesa";
let precio = 3500;
//var 
let disponible = true;
const usuarioDemo = "cliente@restaurante.com";
const passwordDemo = "123456";
let sesionIniciada = false;

console.log("Producto:", nombreProducto);
console.log("Precio:", precio);
console.log("Disponibilidad:", disponible);


let cantidad =1;

cantidad = 2;

console.log("Cantidad:", cantidad);

let subtotal = calcularSubtotal(precio,cantidad);

console.log("Subtotal:", subtotal);

let dia = "sabado";
let precioFinal = 0;
const porcentaje = 0.15;

if (dia === "sabado"){
    precioFinal = aplicarDescuento(subtotal, porcentaje);
    console.log("Descuento %:", porcentaje * 100)
    console.log("Descuento Dinero:", subtotal * porcentaje)
}else{
    precioFinal = subtotal;
}

let mensaje = dia === "sabado" ? "Aplica descuento" : "Precio Regular";

console.log("Precio Final:", precioFinal)
console.log(mensaje);


const productos = [
    "Hamburguesa",
    "Pizza",
    "Casado"
];

console.log(productos[0]);
console.log(productos[1]);
console.log(productos[2]);

console.log("FOR")
for (let i = 0; i < productos.length; i++){
    console.log(productos[i]);
}

console.log("FOR ... OF")

for( const producto of productos){
    console.log(producto);
}

const hamburguesa = {
    nombre: "Hamburguesa",
    precio: "3500",
    disponible: true
}

const pizza = {
    nombre: "Pizza",
    precio: "5000",
    disponible: true
}

const casado = {
    nombre: "Casado",
    precio: "4000",
    disponible: true
}

const platillos = [hamburguesa, pizza, casado];

console.log("Productos disponibles");
for( const platillo of platillos){
    
    console.log("Producto", platillo.nombre);
    console.log("Precio", platillo.precio);
    console.log("Disponibilidad", platillo.disponible);

}

/*const btnHamburguesa = document.getElementById("btnHamburguesa");

btnHamburguesa.addEventListener("click", function(){
    document.getElementById("tituloModal").textContent = "Ordenar Hamburguesa";
});*/

const btnsOrdenar = document.querySelectorAll(".btn-ordernar");
let precioSeleccionado = 0;

btnsOrdenar.forEach(function(boton){
    boton.addEventListener("click", function(){
        const producto = boton.dataset.producto;
        precioSeleccionado = boton.dataset.precio;
        seleccionarProducto(producto,precioSeleccionado);
    });
});


const inputCantidad = document.getElementById("cantidadProducto");

inputCantidad.addEventListener("input", function(){

    calcularSubtotal(precioSeleccionado,0);
});

const btnMostrarPassword = document.getElementById("btnMostrarPassword");
const inputPassword = document.getElementById("passwordLogin");

btnMostrarPassword.addEventListener("click", function() {
    if(inputPassword.type === "password"){
        inputPassword.type = "text";
        btnMostrarPassword.innerHTML = `<i class="bi bi-eye-slash"><i>`;
    }else{
        inputPassword.type = "password";
        btnMostrarPassword.innerHTML = `<i class="bi bi-eye"><i>`;
    }
});


const btnConfirmarPedido = document.getElementById("btnConfirmarPedido");

btnConfirmarPedido.addEventListener("click", function(){
    const cantidad = Number(inputCantidad.value);

    if(!Number.isInteger(cantidad) || cantidad <1){
        alert("Debe seleccionar una cantidad válida");
        return;
    }

    if(sesionIniciada){
        continuarPedido()
    }else{
        const modalOrdenar = bootstrap.Modal.getInstance(
            document.getElementById("modalOrdenar")
        );

        modalOrdenar.hide();

        const modalLogin = new bootstrap.Modal(
            document.getElementById("modalLogin")
        );

        document.getElementById("modalOrdenar").addEventListener("hidden.bs.modal", function(){
                modalLogin.show();
            }, {once: true});
    }
});

function continuarPedido(){
    const producto = document.getElementById("nombreProducto").textContent;
    const cantidad = Number(inputCantidad.value);
    const subtotal = calcularSubtotal(precioSeleccionado, cantidad);

    document.getElementById("resumenProducto").textContent = "Producto: " + producto;
    document.getElementById("resumenCantidad").textContent = "Cantidad: " + cantidad;
    document.getElementById("resumenSubtotal").textContent = "Total: ₡" + subtotal;

    const elementoModalOrdenar = document.getElementById("modalOrdenar");
    const modalOrdenar = bootstrap.Modal.getInstance(
        document.getElementById("modalOrdenar")
    );

    const modalEntrega = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalEntrega")
    );

    //abrir Entrega cuando termina de cerrarse Ordenar
    if(elementoModalOrdenar.classList.contains("show")){
        elementoModalOrdenar.addEventListener("hidden.bs.modal", function(){
            modalEntrega.show();
        },{once: true});

        document.activeElement.blur();
        modalOrdenar.hide();

    }else{
        modalEntrega.show();
    }
}

const formEntrega = document.getElementById("formEntrega");
const btnFinalizarPedido = document.getElementById("btnFinalizarPedido");

formEntrega.addEventListener("submit", function(event) {

    event.preventDefault();

    const direccion = document.getElementById("direccionEntrega").value.trim();
    const telefono = document.getElementById("telefonoEntrega").value.trim();

    const metodoPago = document.querySelector(
        'input[name="metodoPago"]:checked'
    ).value;

    if (direccion === "" || telefono === "") {
        alert("Complete los datos de entrega");
        return;
    }

    btnFinalizarPedido.disabled = true;

    btnFinalizarPedido.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Procesando pedido...
    `;

    setTimeout(function() {

        // Número aleatorio de demostración
        const numeroPedido = Math.floor(Math.random() * 90000) + 10000;

        btnFinalizarPedido.disabled = false;
        btnFinalizarPedido.textContent = "Confirmar y pagar";

        const modalEntrega = bootstrap.Modal.getInstance(
            document.getElementById("modalEntrega")
        );

        document.activeElement.blur();
        modalEntrega.hide();

        alert(
            "¡Pedido realizado exitosamente!\n\n" +
            "Número de pedido: #" + numeroPedido + "\n" +
            "Dirección: " + direccion + "\n" +
            "Teléfono: " + telefono + "\n" +
            "Método de pago: " + metodoPago
        );

        formEntrega.reset();

    }, 2000);

});

function seleccionarProducto(nombre, precio){
    document.getElementById("tituloModal").textContent = 
    "Ordenar " + nombre;

    document.getElementById("nombreProducto").textContent = nombre;
    document.getElementById("precioProducto").textContent = "₡" + precio;

    //reinicie la cantidad cada vez que seleccionamos un nuevo producto
    document.getElementById("cantidadProducto").value = 1;
    let cantidad = 0;
    //calcular subtotal inicial
    calcularSubtotal(precio,0)
}

function calcularSubtotal(precio, cantidad){
    let cantidadForm = Number(document.getElementById("cantidadProducto").value);

    if(cantidad === 0){
        cantidad = cantidadForm;

    }

    const subtotal = precio * cantidad;

    document.getElementById("subtotalProducto").textContent = "₡" + subtotal;

    return subtotal;
}

function aplicarDescuento(subtotal, porcentaje){
    let descuento = subtotal * porcentaje;

    return subtotal - descuento;
}

