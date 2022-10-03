function calcularTotal(){
    document.getElementById("precioTotal").innerText="HOLA";
}

function calcularSubTotal(numeroDeGrupo) {
    let cantidadDeProductos=parseInt(document.getElementsByName("cantidadProducto")[numeroDeGrupo].value)
    let precioProducto =parseInt(document.getElementsByName("precioUnitario")[numeroDeGrupo].value)

    if(!isNaN(precioProducto) && !isNaN(cantidadDeProductos)){
    document.getElementsByName("subtotal").item(numeroDeGrupo).innerText=precioProducto*cantidadDeProductos
    }

}