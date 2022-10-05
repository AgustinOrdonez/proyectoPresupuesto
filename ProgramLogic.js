/**Inicializar slect2*/
$(document).ready(function () {
    $('.js-example-basic-single').select2({
        width: 'style'
    });
});

function calcularTotal() {
    console.log(document.getElementsByName("productos")[0].innerHTML)
    // document.getElementById("precioTotal").innerText = "HOLA";
}

function calcularSubTotal(numeroDeGrupo) {
    let cantidadDeProductos = parseInt(document.getElementsByName("cantidadProducto")[numeroDeGrupo].value)
    let precioProducto = parseInt(document.getElementsByName("precioUnitario")[numeroDeGrupo].value)

    if (!isNaN(precioProducto) && !isNaN(cantidadDeProductos)) {
        document.getElementsByName("subtotal").item(numeroDeGrupo).innerText = precioProducto * cantidadDeProductos
    }
}

let filas = 2;

function añadirProductoATabla(idTabla) {//Todo:Puede haber más pedidos de producto que cantidad de productos, pidiendo 2 veces el mismo
    let tabla = document.getElementById(idTabla)
    let tr = tabla.insertRow(filas++)
    let elemento = tr.insertCell(0)

    elemento.innerHTML = "<input type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularSubTotal(" + (filas - 2) + ")\">";

    elemento = tr.insertCell(1)
    elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos()\">" +
        "            <option value=\"P1\"> Producto 1</option>\n" +
        "            <option value=\"P2\"> Producto 2</option>\n" +
        "            <option value=\"P3\"> Producto 3</option>\n" +
        "            <option value=\"P4\"> Producto 4</option>\n" +
        "            <option value=\"P5\"> Producto 5</option>\n" +
        "        </select>";//Todo:Pueden haber repetidos, idrc rn

    elemento = tr.insertCell(2)
    elemento.innerHTML = "<label name=\"precioUnitario\">$10000</label>";

    elemento = tr.insertCell(3)
    elemento.innerHTML = "<label name='subtotal'> </label>";
    /**Inicializar slect2*/
    $(document).ready(function () {
        $('.js-example-basic-single').select2({
            width: 'style'
        });
    });

    elemento = tr.insertCell(4)
    elemento.innerHTML =
        "<input class=\"btn btn-primary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + tr.rowIndex + ")\" value=\"-\">"

}


function eliminarProductoDeTabla(idTabla, fila) {
    let tabla = document.getElementById(idTabla)
    tabla.deleteRow((fila))
    filas--
    resetearIndicesDeFila(idTabla)
}

function resetearIndicesDeFila(idTabla) {
    let filasTabla = document.getElementById(idTabla).childNodes[1].childNodes

    for (let i = 4; i < filasTabla.length; i++) {
        filasTabla[i].childNodes[4].innerHTML = "<input class=\"btn btn-primary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + (i - 2) + ")\" value=\"-\">"
    }
}

function establecerValoresDeProductos() {
    const mapaPreciosProductos = new Map();
    //Todo:Forma rara de conseguir precios, se requiere ingresar aca todos los precios de los productos
    mapaPreciosProductos.set('P1', 10000);
    mapaPreciosProductos.set('P2', 12345);
    mapaPreciosProductos.set('P3', 18885);
    mapaPreciosProductos.set('P4', 1488);
    mapaPreciosProductos.set('P5', 899856);
    for (let i = 0; i < (filas - 1); i++) {//Todo:Ineficiente actualizar todos en vez de solo el que cambia
        document.getElementsByName("precioUnitario")[i].innerText = "$" + mapaPreciosProductos.get(document.getElementsByName("productos")[i].value)
    }
}
