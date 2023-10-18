
class Receta = {
	var nombre;
	var ingredientes = new Map();
	var pasos = new Array():

	constructor(){
	}
	
	constructor(nombre, ingredientes, pasos){
		this.nombre = nombre;
		this.ingredientes = ingredientes;
		this.pasos = pasos;
	}
	constructor(nombre){
		this.nombre = nombre;
	}
}

recetaNueva = class Receta();

function crearReceta(nombre, ingredientes, pasos) {
	recetaNueva.nombre = nombre;
	recetaNueva.ingredientes = ingredientes;
	recetaNueva.pasos = pasos;
	
	const p1 = document.createElement("p");
	const nom = document.createTextNode(nombre);
	p1.append(nom);
	document.appendChild(p1);

	//localStorage.setItem(recetaNueva);
}


