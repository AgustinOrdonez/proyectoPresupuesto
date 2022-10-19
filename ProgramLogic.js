let productos = []
// $.getJSON('productos.json', function (data) {
//     for (let i = 0; i < 1000; i++) {
//         if (productos.find(produto => produto.nombre == data[i].nombre) === undefined) {
//             productos.push(data[i]);
//         }
//     }
//     crearPrimeraLineaTabla("tabla")
// });
// document.getElementById("noMásFilas").style.display = "none"

$.get("https://www.cfihoelters.com.ar/desarrollo/ordonez/productos.json")//https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf para que funque normal
    .done((data) => {
        for (let i = 0; i < 1000; i++) {
            if (productos.find(produto => produto.nombre == data[i].nombre) === undefined) {
                productos.push(data[i]);
            }
        }
        añadirProductoATabla("tabla")
    })
    .fail((error) => console.log("ERROR"))


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
        } else {
            document.getElementById("iva").innerText = "$" + subtotal * 0.21
        }
        document.getElementById("total").innerText = "$" + (subtotal + subtotal * 0.21)
        if ((subtotal * 1.21 / 12) % 1 !== 0) {
            document.getElementById("valCuotaSinI").innerText = "$" + (Math.round(subtotal * 1.21 / 12 * 100) / 100).toFixed(2);
        } else {
            document.getElementById("valCuotaSinI").innerText = "$" + subtotal * 1.21 / 12;
        }

        if (((subtotal * 1.75 * 1.21) / 12) % 1 !== 0) {
            document.getElementById("valCuotaConI").innerText = "$" + (Math.round((subtotal * 1.75 * 1.21) / 12 * 100) / 100).toFixed(2);
        } else {
            document.getElementById("valCuotaConI").innerText = "$" + (subtotal * 1.75 * 1.21) / 12;
        }
    } else {
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
        } else {
            document.getElementsByName("precioAgregado").item(numeroDeGrupo).innerText = "$" + precioProducto * cantidadDeProductos;
        }
    }
}

let filas = 1;

function conseguirContenidoSelect() {
    return new Promise((resolve) => {
        let contenidoSelect=""

        let productosSeleccionados = []//Las ids
        for (let i = 0; i < (filas - 1); i++) {
            if (document.getElementsByName("productos")[i] !== undefined) {
                productosSeleccionados.push(parseInt(document.getElementsByName("productos")[i].value));
            }
        }
        let disabled = "";
        for (let i = 0; i < productos.length; i++) {
            if (productosSeleccionados.includes(productos[i].id)) {
                disabled = "disabled";
            } else {
                disabled = ""
            }

            contenidoSelect += "<option value=\"" + productos[i].id + "\" " + disabled + " >" + productos[i].nombre + "</option>\n";
        }

        resolve(contenidoSelect)
    })
}


async function añadirProductoATabla(idTabla) {
    if (filas - 1 < productos.length) {
        let tabla = document.getElementById(idTabla);
        let tr = tabla.insertRow(filas++);
        let elemento = tr.insertCell(0);

        elemento.innerHTML = "<input style=\"width: 50%\" type=\"number\" name=\"cantidadProducto\" min=\"0\" onChange=\"calcularPrecioAgregado(" + (filas - 2) + ")\">";

        elemento = tr.insertCell(1);

        elemento.innerHTML = "<select class=\"js-example-basic-single\" name=\"productos\" onchange=\"establecerValoresDeProductos(),calcularPrecioAgregado(" + (filas - 2) + "),desabilitarOpcionesRepetidas()\">" + await conseguirContenidoSelect();

        elemento = tr.insertCell(2);
        elemento.innerHTML = "<label name=\"precioUnitario\"></label>";

        establecerValoresDeProductos();

        elemento = tr.insertCell(3);
        elemento.innerHTML = "<label name='precioAgregado'> </label>";
        /**Inicializar slect2*/
        $(document).ready(function () {
            $('.js-example-basic-single').select2({
                width: 'style'
            });
        });

        elemento = tr.insertCell(4);
        if (filas !== 2) {//Primera vez
            elemento.innerHTML =
                "<input class=\"btn btn-secondary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + tr.rowIndex + ")\" value=\"-\">";
            desabilitarOpcionesRepetidas()
        }
    } else {//Todo: Para que vuelva a aparecer es necesario borrar una linea
        document.getElementById("noMásFilas").style.display = "inline"
        document.getElementById("noMásFilas").classList.add("fade-out")
        document.getElementById("noMásFilas").classList.add("fadeOut")
    }
}


function eliminarProductoDeTabla(idTabla, fila) {
    let tabla = document.getElementById(idTabla)
    tabla.deleteRow((fila))
    filas--
    resetearIndicesDeFila(idTabla)
    document.getElementById("noMásFilas").style.display = "none"
}

function desabilitarOpcionesRepetidas() {
    let productosSeleccionados = []
    for (let i = 0; i < (filas - 1); i++) {
        productosSeleccionados.push(document.getElementsByName("productos")[i].value)
    }
    for (let i = 0; i < (filas - 1); i++) {
        for (let j = 0; j < document.getElementsByName("productos")[i].getElementsByTagName("option").length; j++) {
            if (productosSeleccionados.includes(document.getElementsByName("productos")[i].getElementsByTagName("option")[j].value)) {
                document.getElementsByName("productos")[i].getElementsByTagName("option")[j].disabled = true;
            } else {
                document.getElementsByName("productos")[i].getElementsByTagName("option")[j].disabled = false;

            }
        }
    }

}

function resetearIndicesDeFila(idTabla) {
    let filasTabla = document.getElementById(idTabla).childNodes[2].childNodes

    for (let i = 5; i < filasTabla.length; i++) {
        filasTabla[i].childNodes[4].innerHTML = "<input class=\"btn btn-secondary btn-sm\" type=\"button\" onClick=\"eliminarProductoDeTabla('" + idTabla + "'," + (i - 3) + ")\" value=\"-\">"
    }
}

function establecerValoresDeProductos() {
    for (let i = 0; i < (filas - 1); i++) {//Todo:Ineficiente actualizar todos en vez de solo el que cambia
        document.getElementsByName("precioUnitario")[i].innerText = "$" + productos.find(x => x.id == document.getElementsByName("productos")[i].value).precio
    }
}


function exportarPDF() {
    html2canvas(document.querySelector("#tabla"), {
        scale: 4
    }).then(canvas => {//Todo: Se puede quedar una imagen entre 2 hojas y queda cortado, habría que recortarlo e inciar desde ese punto......
        let doc = new jsPDF("l", "px");
        let img = canvas.toDataURL("image/png");
        doc.addImage(img, 'JPEG', 27, 15, doc.internal.pageSize.getWidth() * 1.125, 0);
        let alturaActual = 15 + canvas.height * (doc.internal.pageSize.getWidth() * 1.125 / canvas.width)
        let i = 1
        while ((alturaActual) > doc.internal.pageSize.getHeight()) {//while
            doc.addPage("a4", "l")
            doc.addImage(img, 'JPEG', 27, 15 - doc.internal.pageSize.getHeight() * i, doc.internal.pageSize.getWidth() * 1.125, 0);
            alturaActual -= doc.internal.pageSize.getHeight()
            i++
        }

        html2canvas(document.querySelector("#cuotas"), {
            scale: 4
        }).then(canvas2 => {
            let img2 = canvas2.toDataURL("image/png");
            doc.addImage(img2, 'JPEG', 27, alturaActual, doc.internal.pageSize.getWidth() * 1.125, 0);
            alturaActual += canvas2.height * (doc.internal.pageSize.getWidth() * 1.125 / canvas2.width)
            if (alturaActual > doc.internal.pageSize.getHeight()) {
                doc.addPage("a4", "l")
                doc.addImage(img2, 'JPEG', 27, 15 + (canvas.height * (doc.internal.pageSize.getWidth() * 1.125 / canvas.width)) - doc.internal.pageSize.getHeight(), doc.internal.pageSize.getWidth() * 1.125, 0);
            }
            // doc.output("dataurlnewwindow")
            doc.save("presupuestoEquiposDeConstruccion.pdf");
        });
    });
}

function imprimir() {
    let div = document.getElementById("imprimir")
    div.innerHTML = "<html>" +
        "<body>" +
        document.getElementById("tabla").outerHTML +
        document.getElementById("cuotas").outerHTML +
        "</body></html>"

    document.body.style.visibility = "hidden"
    div.style.visibility = "visible"

    window.print()

    document.body.style.visibility = "visible"
    div.innerHTML = ""
}




