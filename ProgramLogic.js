function calcularTotal(){
    document.getElementById("precioTotal").innerText="HOLA";
}

function calcularSubTotal(numeroDeGrupo) {
    let cantidadDeProductos=parseInt(document.getElementsByName("cantidadProducto")[numeroDeGrupo].value)
    let precioProducto =parseInt(document.getElementsByName("precioUnitario")[numeroDeGrupo].value)
    document.getElementsByName("subtotal").item(numeroDeGrupo).innerText=precioProducto*cantidadDeProductos
}