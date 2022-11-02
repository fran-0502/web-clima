const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado"); 
const aplicacion = document.getElementById("app");

const typewriter = new Typewriter(aplicacion, {
    loop: true,
    delay: 75,
  });
  
  typewriter
    .pauseFor(250)
    .typeString('Agrega tu ciudad y país, el resultado se mostrará <strong><span style="color: #FFF;">aqui</span></strong>')
    .start();

window.addEventListener("load",()=>{
    formulario.addEventListener("submit",buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector("#ciudad").value
    const pais = document.querySelector("#pais").value
    if(pais === ""|| ciudad == ""){
        // console.log("todos los campos son obligatorios")
        mostrarError("todos los campos son obligatorios");
        return
    }
    if(ciudad == "delta amacuro"){
        mostrarError("delta amacuro no existe");
        return
    }

    consultarAPI(ciudad,pais)
}


function mostrarError(texto) {


    const alert = document.querySelector('.bg-red-200');
    if(!alert){
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-200",'border-red-700','border-2','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center')
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class = 'block'>${texto}</span>
        `
        container.appendChild(alerta)

        setTimeout(() => {
                alerta.remove()
        }, 2500);

    }
}

function consultarAPI(ciudad, pais){
    // una vaina
    const id = 'c44c569d697c517896676bf9d5816454'

    // enviar datos como lo pide el api

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${id}`
    // console.log(url)

    Spinner()

    fetch(url).then(respuesta => respuesta.json()).then(datos=> {
        if(datos.cod === "404"){
            mostrarError("El ciudad no fue encontrado")
        }
        mostrarClima(datos);
    });

}

function mostrarClima(clima){

    limpiarHTML()
    console.log(clima)
    const {main:{temp,temp_max,temp_min}} = clima;

    const centigrados = parseInt(temp - 273)
    const centigrados_max = parseInt(temp_max - 273)
    const centigrados_min = parseInt(temp_min - 273)
    const name = document.querySelector('#ciudad').value;


    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451`
    actual.classList.add('font-bold','text-white','text-center','text-6xl');

    const actual_max = document.createElement("p");
    actual_max.innerHTML = `maxima: ${centigrados_max} &#8451`
    actual_max.classList.add('text-white','text-center','text-2xl');

    const actual_min = document.createElement("p");
    actual_min.innerHTML = `minima: ${centigrados_min} &#8451`
    actual_min.classList.add('text-white','text-center','text-2xl');

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `clima actual en ${name}`
    nombreCiudad.classList.add("font-bold",'text-2xl');

    const resultadoDiv = document.createElement("div")
    resultadoDiv.classList.add("text-center","text-white");
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(actual_max)
    resultadoDiv.appendChild(actual_min)
    resultado.appendChild(resultadoDiv)

    // resultado.appendChild(actual)

}


function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


function Spinner(){
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-folding-cube');
    divSpinner.innerHTML = `
    
    <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    </div>
    `
    resultado.appendChild(divSpinner)
}