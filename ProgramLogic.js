/**Inicializar slect2*/
$(document).ready(function () {
    $('.js-example-basic-single').select2({
        width: 'style'
    });
});

function calcularTotal() {//Todo falta tener en cuenta las cuotas
    let subtotal = 0
    for (let i = 0; i < document.getElementsByName("precioAgregado").length; i++) {
        let precioAgregadoActual = parseInt(document.getElementsByName("precioAgregado")[i].innerText)
        if (!isNaN(precioAgregadoActual)) {
            subtotal += precioAgregadoActual
        }
    }

    if (subtotal !== 0) {
        if ((subtotal / 12) % 1 !== 0) {
            document.getElementById("valCuotaSinI").innerText = "$"+(Math.round(subtotal / 12 * 100) / 100).toFixed(2);
        }
        else {
            document.getElementById("valCuotaSinI").innerText ="$"+ subtotal / 12;
        }

        if (((subtotal * 1.75) / 12) % 1 !== 0) {
            document.getElementById("valCuotaConI").innerText = "$"+(Math.round((subtotal * 1.75) / 12 * 100) / 100).toFixed(2);
        }
        else {
            document.getElementById("valCuotaConI").innerText = "$"+(subtotal * 1.75) / 12;
        }

        document.getElementById("subtotal").innerText ="$"+ subtotal;

        if ((subtotal * 0.21) % 1 !== 0) {
            document.getElementById("iva").innerText = "$"+(Math.round(subtotal * 0.21 * 100) / 100).toFixed(2);
        }
        else {
            document.getElementById("iva").innerText ="$"+ subtotal * 0.21
        }
        document.getElementById("total").innerText ="$"+ (subtotal + subtotal * 0.21)
    }
    else {
        document.getElementById("valCuotaSinI").innerText = ""
        document.getElementById("valCuotaConI").innerText = ""
        document.getElementById("subtotal").innerText = ""
        document.getElementById("iva").innerText = ""
        document.getElementById("total").innerText = ""

    }

}

function calcularPrecioAgregado(numeroDeGrupo) {
    let cantidadDeProductos = parseInt(document.getElementsByName("cantidadProducto")[numeroDeGrupo].value)
    let precioProducto = document.getElementsByName("precioUnitario")[numeroDeGrupo].innerText.slice(1)

    if (!isNaN(precioProducto) && !isNaN(cantidadDeProductos)) {
        if (cantidadDeProductos === 0) {
            document.getElementsByName("precioAgregado").item(numeroDeGrupo).innerText = "";
        }
        else {
            document.getElementsByName("precioAgregado").item(numeroDeGrupo).innerText = precioProducto * cantidadDeProductos;
        }
    }
}

let filas = 2;

function añadirProductoATabla(idTabla) {//Todo:Puede haber más pedidos de producto que cantidad de productos, pidiendo 2 veces el mismo
    let tabla = document.getElementById(idTabla)
    let tr = tabla.insertRow(filas++)
    let elemento = tr.insertCell(0)

    elemento.innerHTML = "<input type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularPrecioAgregado(" + (filas - 2) + ")\">";

    elemento = tr.insertCell(1)
    elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos(),calcularPrecioAgregado(" + (filas - 2) + ")\">" +
        "            <option value=\"P1\"> Producto 1</option>\n" +
        "            <option value=\"P2\"> Producto 2</option>\n" +
        "            <option value=\"P3\"> Producto 3</option>\n" +
        "            <option value=\"P4\"> Producto 4</option>\n" +
        "            <option value=\"P5\"> Producto 5</option>\n" +
        "        </select>";//Todo:Pueden haber repetidos, idrc rn

    elemento = tr.insertCell(2)
    elemento.innerHTML = "<label name=\"precioUnitario\">$10000</label>";

    elemento = tr.insertCell(3)
    elemento.innerHTML = "<label name='precioAgregado'> </label>";
    /**Inicializar slect2*/
    $(document).ready(function () {
        $('.js-example-basic-single').select2({
            width: 'style'
        });
    });

    elemento = tr.insertCell(4)
    elemento.innerHTML =
        "<input class=\"btn btn-secondary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + tr.rowIndex + ")\" value=\"-\">"

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
        filasTabla[i].childNodes[4].innerHTML = "<input class=\"btn btn-secondary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + (i - 2) + ")\" value=\"-\">"
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
