//import data from './personasfamosas.json' assert { type: "json" };

var famosos = [];
fetch('./personasfamosas.json')
    .then(response => response.json())
    .then(data => {
        famosos = data;
    });

var contadoraciertos = 0;
var cambio = 1;

var famososmenores40 = [];
var famososmenores50 = [];
var famososxsalir = [];


var aciertos = document.getElementById("aciertos");

var imagen1 = document.getElementById("imagen1");
var titulo1 = document.getElementById("titulo1");
var edad1 = document.getElementById("edad1");
var fechanacimiento1 = document.getElementById("fechanacimiento1");



var imagen2 = document.getElementById("imagen2");
var titulo2 = document.getElementById("titulo2");
var edad2 = document.getElementById("edad2");
var fechanacimiento2 = document.getElementById("fechanacimiento2");



var personaje1;
var personaje2;






function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
};


function convertDateFormat(string) {
    var info = string.split('-').reverse().join('/');
    return info;
};




document.getElementById("siguiente").addEventListener("click", () => {

    resetPersonajes();


    //cambiarPersonaje();
    cambiarPersonajes();

    ocultarDatos();
    ocultarBotones();

})




function finJuego() {

    fechanacimiento1.innerHTML = "Fecha de nacimiento: " + convertDateFormat(personaje1.fecha_nacimiento);
    fechanacimiento2.innerHTML = "Fecha de nacimiento: " + convertDateFormat(personaje2.fecha_nacimiento);



    mostrarDatos();

    document.getElementById("siguiente").style.visibility = "hidden"
    document.getElementById("volverajugar").style.visibility = "visible"
}

function inicioJuego() {

    resetPersonajes();
    ocultarDatos();
    ocultarBotones();


    document.getElementById("startGame").style.visibility = "hidden"
    document.getElementById("containerpersonajes").style.visibility = "visible"

    contadoraciertos = 0;
    cambio = 1;


    famososmenores40 = [];
    famososmenores50 = [];
    famososxsalir = famosos;

    aciertos.innerText = "Aciertos: " + contadoraciertos;


    console.log(famososxsalir);

    famosos.forEach(element => {
        if (calcularEdad(element.fecha_nacimiento) < 40) {
            famososmenores40.push(element);
        } else if (calcularEdad(element.fecha_nacimiento) < 50) {
            famososmenores50.push(element);
        }
    });

    //cambiarPersonaje();
    //cambio = 2;
    //cambiarPersonaje();

    cambiarPersonajes();

    console.log(famososxsalir);

}





document.getElementById("volverajugar").addEventListener("click", () => {
    inicioJuego();
})

document.getElementById("startGame").addEventListener("click", () => {
    inicioJuego();
})


document.getElementById("personaje1").addEventListener("click", () => {
    comprobarAciertoPersonaje(1);
    edad1.innerHTML = "Edad: " + calcularEdad(personaje1.fecha_nacimiento);
    edad2.innerHTML = "Edad: " + calcularEdad(personaje2.fecha_nacimiento);

})

document.getElementById("personaje2").addEventListener("click", () => {
    comprobarAciertoPersonaje(2);
    edad1.innerHTML = "Edad: " + calcularEdad(personaje1.fecha_nacimiento);
    edad2.innerHTML = "Edad: " + calcularEdad(personaje2.fecha_nacimiento);

})




function cambiarPersonaje() {
    var personaje;

    if (contadoraciertos < 20) {
        personaje = famososmenores40[Math.floor(Math.random() * famososmenores40.length)];
    } else if (contadoraciertos < 40) {
        personaje = famososmenores50[Math.floor(Math.random() * famososmenores50.length)];
    } else {
        personaje = famososxsalir[Math.floor(Math.random() * famososxsalir.length)];
    }

    if (cambio == 1) {
        personaje1 = personaje;
        imagen1.setAttribute("src", personaje.imagen);
        titulo1.innerHTML = personaje.nombre;
        edad1.innerHTML = "Edad: " + calcularEdad(personaje.fecha_nacimiento);

    } else if (cambio == 2) {
        personaje2 = personaje;
        imagen2.setAttribute("src", personaje.imagen);
        titulo2.innerHTML = personaje.nombre;
        edad2.innerHTML = "Edad: " + calcularEdad(personaje.fecha_nacimiento);

    }


    famososmenores40 = famososmenores40.filter(x => x.id != personaje.id);
    famososmenores50 = famososmenores50.filter(x => x.id != personaje.id);
    famososxsalir = famososxsalir.filter(x => x.id != personaje.id);
}




function comprobarAciertoPersonaje(opcion) {

    var cumpleanospersonaje1 = new Date(personaje1.fecha_nacimiento);
    var cumpleanospersonaje2 = new Date(personaje2.fecha_nacimiento);

    if (opcion == 1) {

        if (cumpleanospersonaje1 >= cumpleanospersonaje2) {
            cambio = 1;
            finJuego();
            document.getElementById("personaje1").classList.remove("personaje");
            document.getElementById("personaje1").classList.add("error");
            document.getElementById("personaje2").classList.remove("personaje");
            document.getElementById("personaje2").classList.add("acierto");
        } else if (cumpleanospersonaje1 < cumpleanospersonaje2) {
            cambio = 2;
            contadoraciertos++;
            aciertos.innerText = "Aciertos: " + contadoraciertos;

            fechanacimiento1.innerHTML = "Fecha de nacimiento: " + convertDateFormat(personaje1.fecha_nacimiento);
            fechanacimiento2.innerHTML = "Fecha de nacimiento: " + convertDateFormat(personaje2.fecha_nacimiento);

            mostrarDatos();

            document.getElementById("siguiente").style.visibility = "visible"

            document.getElementById("personaje1").classList.remove("personaje");
            document.getElementById("personaje1").classList.add("acierto");
            document.getElementById("personaje2").classList.remove("personaje");
            document.getElementById("personaje2").classList.add("error");

        }
    } else if (opcion == 2) {

        if (cumpleanospersonaje1 >= cumpleanospersonaje2) {
            cambio = 1;
            contadoraciertos++;
            aciertos.innerText = "Aciertos: " + contadoraciertos;

            fechanacimiento1.innerHTML = "Fecha de nacimiento: " + convertDateFormat(personaje1.fecha_nacimiento);
            fechanacimiento2.innerHTML = "Fecha de nacimiento: " + convertDateFormat(personaje2.fecha_nacimiento);

            mostrarDatos();

            document.getElementById("siguiente").style.visibility = "visible"

            document.getElementById("personaje2").classList.remove("personaje");
            document.getElementById("personaje2").classList.add("acierto");
            document.getElementById("personaje1").classList.remove("personaje");
            document.getElementById("personaje1").classList.add("error");
        } else if (cumpleanospersonaje1 < cumpleanospersonaje2) {
            cambio = 2
            finJuego();
            document.getElementById("personaje2").classList.remove("personaje");
            document.getElementById("personaje2").classList.add("error");
            document.getElementById("personaje1").classList.remove("personaje");
            document.getElementById("personaje1").classList.add("acierto");
        }
    }



};

function resetPersonajes() {

    document.getElementById("personaje1").classList.remove("acierto");
    document.getElementById("personaje1").classList.remove("error");
    document.getElementById("personaje1").classList.add("personaje");
    document.getElementById("personaje2").classList.remove("acierto");
    document.getElementById("personaje2").classList.remove("error");
    document.getElementById("personaje2").classList.add("personaje");

}

function mostrarDatos() {

    document.getElementById("edad1").style.visibility = "visible"
    document.getElementById("fechanacimiento1").style.visibility = "visible"
    document.getElementById("edad2").style.visibility = "visible"
    document.getElementById("fechanacimiento2").style.visibility = "visible"

}

function ocultarDatos() {

    document.getElementById("edad1").style.visibility = "hidden"
    document.getElementById("fechanacimiento1").style.visibility = "hidden"
    document.getElementById("edad2").style.visibility = "hidden"
    document.getElementById("fechanacimiento2").style.visibility = "hidden"

}

function ocultarBotones() {

    document.getElementById("siguiente").style.visibility = "hidden"
    document.getElementById("volverajugar").style.visibility = "hidden"

}



function cambiarPersonajes() {

    var random = Math.floor(Math.random() * 3);
    console.log(random);

    if (random == 1 && famososmenores40.length >= 2) {

        personaje1 = famososmenores40[Math.floor(Math.random() * famososmenores40.length)];

        famososmenores40 = famososmenores40.filter(x => x.id != personaje1.id);
        famososmenores50 = famososmenores50.filter(x => x.id != personaje1.id);
        famososxsalir = famososxsalir.filter(x => x.id != personaje1.id);

        personaje2 = famososmenores40[Math.floor(Math.random() * famososmenores40.length)];

        famososmenores40 = famososmenores40.filter(x => x.id != personaje2.id);
        famososmenores50 = famososmenores50.filter(x => x.id != personaje2.id);
        famososxsalir = famososxsalir.filter(x => x.id != personaje2.id);

    } else if (random == 2 && famososmenores50.length >= 2) {

        personaje1 = famososmenores50[Math.floor(Math.random() * famososmenores40.length)];

        famososmenores40 = famososmenores40.filter(x => x.id != personaje1.id);
        famososmenores50 = famososmenores50.filter(x => x.id != personaje1.id);
        famososxsalir = famososxsalir.filter(x => x.id != personaje1.id);

        personaje2 = famososmenores50[Math.floor(Math.random() * famososmenores40.length)];

        famososmenores40 = famososmenores40.filter(x => x.id != personaje2.id);
        famososmenores50 = famososmenores50.filter(x => x.id != personaje2.id);
        famososxsalir = famososxsalir.filter(x => x.id != personaje2.id);

    } else {

        personaje1 = famososxsalir[Math.floor(Math.random() * famososmenores40.length)];

        famososmenores40 = famososmenores40.filter(x => x.id != personaje1.id);
        famososmenores50 = famososmenores50.filter(x => x.id != personaje1.id);
        famososxsalir = famososxsalir.filter(x => x.id != personaje1.id);

        personaje2 = famososxsalir[Math.floor(Math.random() * famososmenores40.length)];

        famososmenores40 = famososmenores40.filter(x => x.id != personaje2.id);
        famososmenores50 = famososmenores50.filter(x => x.id != personaje2.id);
        famososxsalir = famososxsalir.filter(x => x.id != personaje2.id);

    }

    imagen1.setAttribute("src", personaje1.imagen);
    titulo1.innerHTML = personaje1.nombre;
    edad1.innerHTML = "Edad: " + calcularEdad(personaje1.fecha_nacimiento);


    imagen2.setAttribute("src", personaje2.imagen);
    titulo2.innerHTML = personaje2.nombre;
    edad2.innerHTML = "Edad: " + calcularEdad(personaje2.fecha_nacimiento);
}



