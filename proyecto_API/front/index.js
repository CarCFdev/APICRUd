const formElement = document.getElementById("feriadoForm");

formElement.addEventListener("submit",(event)=>{
event.preventDefault();
let fecha = document.getElementById("fecha").value;
let nombre = document.getElementById("nombre").value;
let feriado ={fecha: fecha, nombre:nombre}
let feriadoJson= JSON.stringify(feriado);
console.log(feriadoJson);
//MANDAR LOS DATOS AL BACKEND
})