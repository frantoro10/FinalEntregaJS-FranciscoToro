// Dark Mode
// Mode selector DOM
let darkMode = document.getElementById("darkMode")
let lightMode = document.getElementById("lightMode")
let removeMode = document.getElementById("removeMode")

// Leer/consultar Storage
let modoOscuro = localStorage.getItem("modoOscuro")
// Condicional
if(modoOscuro == "true"){
    document.body.classList.add("darkMode")
    console.log(modoOscuro)
}

darkMode.addEventListener("click", () => {
    console.log("Funciona darkMode")
    // agregamos clase al body 
    document.body.classList.add("darkMode")
    // Agregamos localStorage para guardas la preferencia
    localStorage.setItem("modoOscuro", true)
})

// Lightmode
lightMode.addEventListener("click", () => {
    console.log("Funcionando correctamente lightMode")
    // removemos darkmode  al body
    document.body.classList.remove("darkMode")
    // Agregamos localStorage para guardas la preferencia | Misma clave en este caso | Sobreescribimos el anterior.
    localStorage.setItem("modoOscuro", false)
})

removeMode.addEventListener("click", () => {
    console.log("Funcionando")
    localStorage.removeItem("modoOscuro")
})