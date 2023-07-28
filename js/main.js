// E-Commerce Productos PC

//simulacion de peticion:
const BD = [
    {id: 1, nombre: 'Producto 1', precio: 1500},
    {id: 2, nombre: 'Producto 2', precio: 2500},
    {id: 3, nombre: 'Producto 3', precio: 3500},
    {id: 4, nombre: 'Producto 4', precio: 3500},
 ]
 
 const pedirProductos = () => {
    return new Promise( (res, rej) => {
        setTimeout(() => {
            res(BD)
        }, 3000)
    })
 }
 
 pedirProductos()
 .then((rta) => {
         let productos = rta
         console.log(productos)
         //render
     })
 .finally(()=>{
    console.log(`Termino la carga de la base de datos`)
 } )

// End simulacion de pedidos

// Fecha
const DateTime = luxon.DateTime
let fecha = document.getElementById("fecha")
setInterval(()=>{
   let fechaMostrar =  DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
   fecha.innerHTML = `${fechaMostrar}`

},1000)

// Capuramos DOM:

// Catalogo
let componentesDiv = document.getElementById("componentes")
// let showCatalogo = document.getElementById("verCatalogo")
// let hideCatalogo = document.getElementById("ocultarCatalogo")
// Loader
let loader = document.getElementById("loader")
let loaderTexto = document.getElementById("loaderTexto")
// Select Orden (Filtro Mayor Menor Etc)
let selectOrden = document.getElementById("selectOrden")
// Agregar componente
let tipoIngresado = document.getElementById("addTipo")
let versionIngresado = document.getElementById("addVersion")
let precioIngresado = document.getElementById("addPrecio")
let agregarComponenteBtn = document.getElementById("guardarComponente")
// Inputs FIltro
let tipoInput = document.getElementById("tipoInput")
let versionInput = document.getElementById("versionInput")
let precioInput = document.getElementById("precioInput")
let filtrarComponente = document.getElementById("filtrarComponente")
// Input buscador
let buscadorInput = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
// Carrito
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botoNCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")


// Funciones del Proyecto: | (Hoisting) 

// Input Buscador Funcion

function buscadorNav(buscado, array) {
    let busqueda = array.filter((componente) => componente.tipo.toLowerCase().includes(buscado.toLowerCase()) || componente.version.toLowerCase().includes(buscado.toLowerCase()))
    // Condicionales ternario
    busqueda.length == 0 ? (coincidencia.innerHTML = `<h3> No se encuentra coincidencia con nuestro catalogo </h3>`, mostrarCatalogo(busqueda)) :
        (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}



// Agregar componente Funcion
function agregarComponente(array) {
    const componenteNuevo = new ProductoStock(array.length + 1, tipoIngresado.value, versionIngresado.value, precioIngresado.value, "img/componentes.webp")
    array.push(componenteNuevo)
    // Setear en el storage el array con el componente 
    localStorage.setItem("allProductos", JSON.stringify(array))
    mostrarCatalogo(array)
    //resetear el form
    tipoIngresado.value = ""
    versionIngresado.value = ""
    precioIngresado.value = ""
    // Notificacion Toastify JS
    Toastify({
        text: `El componente ${componenteNuevo.version} se ha agregado`,
        duration: 3200,
        gravity: "bottom",
        position: "center",
        style: {
            color: "white",
            background: "black"
        }
    }).showToast()
}

// Al agrupar las tres variables de valor "tipo version precio coincide" en una sola funcion flecha, estas 3 entonces se relacionan entre si para conseguir un resultado. En cambio el codigo anterior comentado que hice, estas no se relacionaban y trabajaban de forma independiente.
function busqueda3I(array) {
    let busquedaFiltro = array.filter((componente) => {
        const tipoCoincide = componente.tipo.toLowerCase() == tipoInput.value.toLowerCase();
        const versionCoincide = componente.version.toLowerCase().includes(versionInput.value.toLowerCase());
        const precioCoincide = parseInt(componente.precio) <= parseInt(precioInput.value);
        return tipoCoincide && versionCoincide && precioCoincide;
    });
    if (busquedaFiltro.length === 0) {
          // Alert
          Swal.fire({
            icon: "error",
            title: `No hay coincidencias`,
            confirmButtonColor: "blue",
            confirmButtonText: "Ok",
            imageHeight: 300,
            timer: 2500
        })
    }
    else {
        mostrarCatalogo(busquedaFiltro);
        
    }
}

// Funcion con Metodo sort para ordenar de forma ascendente un array
function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}
// ordenarMenorMayor(allProductos)

// sort forma descendente | el elemento 2 va primero que el 1 para hacer lo contrario a la forma ascendente.
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((el1, el2) => el2.precio - el1.precio)
    mostrarCatalogo(mayorMenor)
}
// ordenarMayorMenor(allProductos)

// sort para ordenar alfabeticamente
// Entonces con esta estructura ordenamos alfabeticamenta el array. (estructura correcta)
function sortAlfabeticoTipo(array) {
    const arrayAnalfabetico = [].concat(array)
    arrayAnalfabetico.sort((a, b) => {
        if (a.tipo > b.tipo) {
            return 1;
        }
        if (a.tipo < b.tipo) {
            return -1;
        }
        // Y si no quiere decir que son iguales y me retorna 0
        return 0;
    })
    mostrarCatalogo(arrayAnalfabetico)
}

// Imprimimos array de objetos (all) en catalogo HTML
//  for of para imprimir todo el array 
function mostrarCatalogo(array) {
    // reset DOM
    componentesDiv.innerHTML = ``
    for (let componentes of array) {
        let newComponenteDiv = document.createElement("div")
        newComponenteDiv.className = "col-12 col-md-6 col-lg-4"
        newComponenteDiv.innerHTML = `<div id="${componentes.id}" style="width: 18rem;">
                                    <img src="${componentes.img}" class="card-img-top img-card" alt="${componentes.version}">
                                        <div class="card-body">
                                             <h4 class="card-title">${componentes.tipo}</h4>
                                                <p>Version: ${componentes.version}</p>
                                                <p> Precio: ${componentes.precio}</p>
                                     <button id="agregarBtn${componentes.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                         </div>
                                    </div>`
        componentesDiv.appendChild(newComponenteDiv)
        // carrito de compras
        let agregarBtn = document.getElementById(`agregarBtn${componentes.id}`)
        agregarBtn.addEventListener("click", () => {
            console.log("Producto agregado correctamente")
            agregarAlCarrito(componentes)
        })

    }
}

// para agregar producto al carrito Funcion 

function agregarAlCarrito(componentes) {
    let componenteAgregado = productosCarrito.find((elem) => elem.id == componentes.id)
    if (componenteAgregado == undefined) {
        productosCarrito.push(componentes)
        localStorage.setItem("carrito", JSON.stringify(productosCarrito))
        console.log(productosCarrito)
        // Alert
        Swal.fire({
            title: `Producto agregado con exito`,
            text: `Componente: ${componentes.version}`,
            titleColor: "green",
            confirmButtonColor: "blue",
            confirmButtonText: "Ok",
            imageUrl: `${componentes.img}`,
            imageHeight: 300,
            timer: 5000
        })
    } else {
        console.log(`El componente ${componentes.version} no esta en Stock.`)
        // Alert
        Swal.fire({
            title: `El componente ${componentes.version} ya esta en el carrito.`,
            icon: "info",
            timer: 5000
        })
    }
}

// Cargar producto al carrito funcion

function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ``;
    array.forEach((productoCarritoo) => {
        modalBodyCarrito.innerHTML += `<div class="card border-primary mb-3 cardCarrito" id ="productoCarrito${productoCarritoo.id}" style="max-width: 540px;">
        <img class="card-img-top carrito-img" src="${productoCarritoo.img}" alt="">
        <div class="card-body">
               <h4 class="card-title">${productoCarritoo.tipo}</h4>
               <p class="card-text">${productoCarritoo.version}</p>
                <p class="card-text">$${productoCarritoo.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar${productoCarritoo.id}"><i class="fas fa-trash-alt"></i></button>
        </div>    
   </div>`
    })
    calcularTotal(array)

    array.forEach((productoCarritoo) => {
        // Eliminamos del DOM
        document.getElementById(`botonEliminar${productoCarritoo.id}`).addEventListener("click", () => {
            console.log(`Producto Eliminado`)
            let cardProducto = document.getElementById(`productoCarrito${productoCarritoo.id}`)
            cardProducto.remove()
            // Borramos del array
            // Se busca el objeto a eliminar
            let productoEliminar = array.find((componente) => componente.id == productoCarritoo.id)
            console.log (productoEliminar)
            // Buscar indice
            let posicion = array.indexOf(productoEliminar)
            // Eliminamos del array con splice
            array.splice(posicion,1) 
            console.log(array)
            // Eliminar LocalStorage
            localStorage.setItem("carrito", JSON.stringify(array))
            calcularTotal(array)
        })
    })
}

// Calcular total funcion

function calcularTotal(array) {
    let total = array.reduce((acc, productoCarritoo) => acc + productoCarritoo.precio, 0)
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carro de compras` : precioTotal.innerHTML = `El total es <strong>${total}</strong>`

}

// Eventos del proyecto:
// Buscador (Input)
buscadorInput.addEventListener("input", () => {
    console.log(buscadorInput.value)
    buscadorNav(buscadorInput.value, allProductos)
})
// Agregar componente
agregarComponenteBtn.addEventListener("click", function (event) {
    //nos permite que no se actualice al ejecutar el evento
    event.preventDefault()
    // event.target
    agregarComponente(allProductos)
})
// Boton de filtrar
filtrarComponente.addEventListener("click", () => { busqueda3I(allProductos) })
//  Mostrar Catalogo

// showCatalogo.addEventListener("click", () => { mostrarCatalogo(allProductos) })
// Ocultar catalogo

// hideCatalogo.addEventListener("click", () => { componentesDiv.innerHTML = `` })

// Agregamos interactividad al select y sus opciones (menor mayor) etc
selectOrden.addEventListener("change", () => {
    switch (selectOrden.value) {
        case "1":
            ordenarMayorMenor(allProductos)
            break
        case "2":
            ordenarMenorMayor(allProductos)
            break
        case "3":
            sortAlfabeticoTipo(allProductos)
            break
        default:
            mostrarCatalogo(allProductos)
            break
    }
})
// Carrito de compra
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosCarrito)
})

// Time out - Intervalos
setTimeout(() => {
    loaderTexto.remove()
    loader.remove()
    mostrarCatalogo(allProductos)
},2000)






