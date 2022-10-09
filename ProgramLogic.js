/**Inicializar slect2*/
$(document).ready(function () {
    $('.js-example-basic-single').select2({
        width: 'style'
    });
});

const mapaPreciosProductos = new Map();
$.getJSON('productos.json', function (data) {

    for (let i = 0; i < 1000; i++) {
        mapaPreciosProductos.set(data[i].producto, data[i].precio);
    }
    crearPrimeraLineaTabla("tabla")
});


async function crearPrimeraLineaTabla(idTabla) {//TODO: es igual que la otra función pero con menos lineas, debería hacerlo bien
    let filas = 1
    let tabla = document.getElementById(idTabla)
    let tr = tabla.insertRow(filas++)
    let elemento = tr.insertCell(0)

    elemento.innerHTML = "<input style=\"width: 50% \" type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularPrecioAgregado(" + (filas - 2) + ")\">";

    elemento = tr.insertCell(1)

    elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos(),calcularPrecioAgregado(" + (filas - 2) + ")\">" + await conseguirContenidoSelect();

    elemento = tr.insertCell(2)
    elemento.innerHTML = "<label name=\"precioUnitario\">$10000</label>";

    establecerValoresDeProductos()

    elemento = tr.insertCell(3)
    elemento.innerHTML = "<label name='precioAgregado'> </label>";
    /**Inicializar slect2*/
    $(document).ready(function () {
        $('.js-example-basic-single').select2({
            width: 'style'
        });
    });
    tr.insertCell(4)

}

function calcularTotal() {
    let subtotal = 0
    for (let i = 0; i < document.getElementsByName("precioAgregado").length; i++) {
        let precioAgregadoActual = parseInt(document.getElementsByName("precioAgregado")[i].innerText.slice(1))
        if (!isNaN(precioAgregadoActual)) {
            subtotal += precioAgregadoActual
        }
    }

    if (subtotal !== 0) {

        document.getElementById("subtotal").innerText = "$" + subtotal;

        if ((subtotal * 0.21) % 1 !== 0) {
            document.getElementById("iva").innerText = "$" + (Math.round(subtotal * 0.21 * 100) / 100).toFixed(2);
        }
        else {
            document.getElementById("iva").innerText = "$" + subtotal * 0.21
        }
        document.getElementById("total").innerText = "$" + (subtotal + subtotal * 0.21)
        if ((subtotal * 1.21 / 12) % 1 !== 0) {
            document.getElementById("valCuotaSinI").innerText = "$" + (Math.round(subtotal * 1.21 / 12 * 100) / 100).toFixed(2);
        }
        else {
            document.getElementById("valCuotaSinI").innerText = "$" + subtotal * 1.21 / 12;
        }

        if (((subtotal * 1.75 * 1.21) / 12) % 1 !== 0) {
            document.getElementById("valCuotaConI").innerText = "$" + (Math.round((subtotal * 1.75 * 1.21) / 12 * 100) / 100).toFixed(2);
        }
        else {
            document.getElementById("valCuotaConI").innerText = "$" + (subtotal * 1.75 * 1.21) / 12;
        }
    }
    else {
        document.getElementById("subtotal").innerText = "$0"
        document.getElementById("iva").innerText = "$0"
        document.getElementById("total").innerText = "$0"
        document.getElementById("valCuotaSinI").innerText = "$0"
        document.getElementById("valCuotaConI").innerText = "$0"

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
            document.getElementsByName("precioAgregado").item(numeroDeGrupo).innerText = "$" + precioProducto * cantidadDeProductos;
        }
    }
}

let filas = 2;

function conseguirContenidoSelect() {
    return new Promise((resolve) => {
        let contenidoSelect
        let itearator = mapaPreciosProductos.keys()
        let result = itearator.next()
        contenidoSelect = ""
        while (!result.done) {
            contenidoSelect += "<option value=\"" + result.value + "\">" + result.value + "</option>\n"
            result = itearator.next();
        }
        resolve(contenidoSelect)

        // $.getJSON('productos.json', function (data) {
        //     const mapaPreciosProductos = new Map();
        //     for (let i = 0; i < 1000; i++) {
        //         mapaPreciosProductos.set(data[i].producto, data[i].precio);
        //     }
        //     let itearator = mapaPreciosProductos.keys()
        //     let result = itearator.next()
        //     contenidoSelect = ""
        //     while (!result.done) {
        //         contenidoSelect += "<option value=" + result.value + ">" + result.value + "</option>\n"
        //         result = itearator.next();
        //     }
        //     resolve(contenidoSelect)
        // });
    })
}


async function añadirProductoATabla(idTabla) {//Todo:Puede haber más pedidos de producto que cantidad de productos, pidiendo 2 veces el mismo
    let tabla = document.getElementById(idTabla)
    let tr = tabla.insertRow(filas++)
    let elemento = tr.insertCell(0)

    elemento.innerHTML = "<input style=\"width: 50%\" type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularPrecioAgregado(" + (filas - 2) + ")\">";

    elemento = tr.insertCell(1)

    elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos(),calcularPrecioAgregado(" + (filas - 2) + ")\">" + await conseguirContenidoSelect();

    elemento = tr.insertCell(2)
    elemento.innerHTML = "<label name=\"precioUnitario\"></label>";
    establecerValoresDeProductos()

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
    let filasTabla = document.getElementById(idTabla).childNodes[2].childNodes

    for (let i = 5; i < filasTabla.length; i++) {
        filasTabla[i].childNodes[4].innerHTML = "<input class=\"btn btn-secondary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + (i - 3) + ")\" value=\"-\">"
    }
}

function establecerValoresDeProductos() {
    for (let i = 0; i < (filas - 1); i++) {//Todo:Ineficiente actualizar todos en vez de solo el que cambia
        document.getElementsByName("precioUnitario")[i].innerText = "$" + mapaPreciosProductos.get(document.getElementsByName("productos")[i].value)

    }
}


function exportarPDF() {
    html2canvas(document.querySelector("#tabla"), {
        scale: 4
    }).then(canvas => {//Todo: Si ocupa más de 2 hojas los números pueden quedar entre 2 hojas, habría que recortarlo e inciar desde ese punto......
        let doc = new jsPDF("l", "px");
        let img = canvas.toDataURL("image/png");
        doc.addImage(img, 'JPEG', 27, 15, doc.internal.pageSize.getWidth()*1.125, 0);
        if (canvas.height>2704) {
            doc.addPage("a4","l")
            doc.addImage(img, 'JPEG', 27, 15-doc.internal.pageSize.getHeight(), doc.internal.pageSize.getWidth()*1.125, 0);
            canvas.height-=doc.internal.pageSize.getHeight()*8
        }
        html2canvas(document.querySelector("#cuotas"), {
            scale: 4
        }).then(canvas2 => {
            var img2 = canvas2.toDataURL("image/png");
            doc.addImage(img2, 'JPEG', 27, 15 + canvas.height / (2 * 4), doc.internal.pageSize.getWidth()*1.125, 0);
            // doc.output("dataurlnewwindow")
            doc.save("test.pdf")
        });
    });
}

async function imprimir() {

    let nuevaVentana = window.open("", "PRINT");

    nuevaVentana.document.write("<html>");
    nuevaVentana.document.write(document.head.outerHTML);
    nuevaVentana.document.write("<body>");
    nuevaVentana.document.write(document.getElementById("tabla").outerHTML);
    nuevaVentana.document.write(document.getElementById("cuotas").outerHTML);

    nuevaVentana.document.write("</body></html>");

    nuevaVentana.document.close(); // necessary for IE >= 10
    nuevaVentana.focus(); // necessary for IE >= 10*/
    await new Promise(r => setTimeout(r, 100));//Todo: MUY VILLERO, pero no puedo solucinarlo
    nuevaVentana.print()
    nuevaVentana.close();
}


