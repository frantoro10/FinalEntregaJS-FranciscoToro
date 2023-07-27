

// Bienvenido a simulador de E-commerce basado en venta de hardware de PC.

// Funcion para que el visitante pueda pedir un compenente. 
function pedirComponente() {
    let iTipo = prompt(`Ingrese el tipo de Hardware que le interesa. (Placa de video - Procesador - Memoria Ram - Etc)`)
    let iMarca = prompt(`Ingrese la marca`);
    let iSerie = prompt(`Ingrese la version o serie del producto`);
    mostrarDatos(iTipo, iMarca, iSerie)
}
// Funcion de mostrar los datos ingresados por el usuario
function mostrarDatos(tipo, marca, serie) {
    alert(`Datos ingresados: Tipo de componente: ${tipo} | Marca: ${marca} | Version o Serie: ${serie} | Gracias por hacernoslo saber, nos comunicaremos con usted de inmediato en caso de tener Stock de este producto.`)

}
// Funcion para calcular el interes del plan de cuotas elegida por el usuario
function cuotas() {
    let precioInicial = parseInt(prompt("Ingrese el precio que acordo con el vendedor del componente de PC deseado."));
    while (isNaN(precioInicial)) {
        alert("Ingrese un numero por favor")
        precioInicial = parseInt(prompt("Ingrese el precio que acordo con el vendedor del componente de PC deseado."));
    } while (precioInicial < 50000) {
        alert(`Ingrese un monto igual o mayor a 50000 para acceder a la financiacion en cuotas`)
        precioInicial = parseInt(prompt("Ingrese el precio que acordo con el vendedor del componente de PC deseado."));
    }
    let cuotas = parseInt(prompt("Ahora ingrese el plan de cuotas que desea. SOLO DISPONIBLE: 3 - 6 o 12"));
    switch (cuotas) {
        case 3:
            precioFinal = precioInicial * 1.3;
            valorCuotas = precioFinal / 3;
            alert(`El total final que usted va a pagar es ${precioFinal} en 3 cuotas de ${valorCuotas.toFixed(2)} INTERES SUMADO: 30%`);
            salirMenu = true
            break;

        case 6:
            precioFinal = precioInicial * 1.5;
            valorCuotas = precioFinal / 6;
            alert(`El total final que usted va a pagar es ${precioFinal} en 6 cuotas de ${valorCuotas.toFixed(2)} INTERES SUMADO: 50%`);
            break;

        case 12:
            precioFinal = precioInicial * 1.7;
            valorCuotas = precioFinal / 12;
            alert(`El total final que usted va a pagar es ${precioFinal} en 12 cuotas de ${valorCuotas.toFixed(2)} INTERES SUMADO: 70%`);
            break;
        case 0:
            salirMenu = true
            break;
        default:
            alert(`Ingrese un plan de cuotas correctos ( 3 - 6 - 12 )`)
            break;

    }

}

// For each para mostrar catalogo
function verCatalogo(array) {
    array.forEach(
        (producto) => console.log(producto.id, producto.tipo, producto.marca, producto.version, producto.precio)
    )
}

// Filter para buscar productos por tipo de componente
function busquedaTipo(array) {
    let tipoBusqueda = prompt("Ingrese el tipo de componente que usted esta buscando | Procesador - Placa de video , Memoria Ram, Etc.")
    // Llamamos en la funcion de llamada vinculado al filter, la propiedad "tipo"  del constructor - molde de objetos (clases constructora) que contiene el objeto vinculado al array llamado. 
    let busqueda = array.filter((componente) => componente.tipo.toLowerCase() == tipoBusqueda.toLowerCase())
    if (busqueda.length == 0) {
        alert(`TIPO INGRESADO: ${tipoBusqueda} | No hay ningun producto de este tipo en STOCK.`);
    } else {
        alert("Si tenemos productos en STOCK de este tipo!")
        verCatalogo(busqueda)
    }
}

function busquedaPrecio(array) {
    let precioBusqueda = parseInt(prompt(`Ingrese el presupuesto que usted esta dispuesto a utilizar para ver que productos estan disponibles por menor o igual a ese monto`))
    let busqueda = array.filter((componente) => componente.precio <= precioBusqueda)
    while (isNaN(precioBusqueda)) {
        alert(`Por favor ingrese el precio en NUMEROS.`)
        precioBusqueda = parseInt(prompt(`Ingrese el presupuesto que usted está dispuesto a utilizar para ver qué productos están disponibles por menor o igual a ese monto`));
    }
    if (busqueda.length == 0) {
        alert(`No tenemos ningun producto en Stock por ese rango de precio. `)
    } else {
        alert(`Tenemos estos productos en STOCK por ese rango de precio para ofrecerle`)
        verCatalogo(busqueda);
    }


// Menu
// Escape
let salirMenu = false

// Menu con do switch while (bucle)
function menu() {
    do {
        let opcionesIngresadas = parseInt(prompt(`Ingresa la opcion que desee 
    1) Pedir Placa de video
    2) Borrar Placa de video
    3) Pagar en plan de cuotas
    4) Mirar catalogo de productos hadware en venta
    5) Buscar producto por tipo de componente
    6) Buscar producto por rango de precio
    7) Ordenar catalogo
    0) Salir del menu`))
        switch (opcionesIngresadas) {
            case 1:
                pedirComponente()
                break
            case 2:
                prompt(`Borrar componente`)
                break
            case 3:
                cuotas()
                break;
            case 4:
                alert(`Nuestro catalogo contiene estos productos en stock`)
                verCatalogo(videoStock)
                verCatalogo(procesadorStock)
                verCatalogo(ramStock)
                break;
            case 5:
                busquedaTipo(allProductos)
                break;
            case 6:
                busquedaPrecio(allProductos)
                break;
            case 7:
                ordenar(allProductos)
                break;
            case 0:
                alert(`Gracias por su tiempo`)
                salirMenu = true
                break;
            default:
                alert(`Opcion no valida, ingrese una opcion numerica`)
                break
        }
    } while (!salirMenu)
}