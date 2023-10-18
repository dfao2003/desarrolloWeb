
class Receta {
	nombre = "";
	ingredientes = new Map();
	pasos = "";

	constructor(nom){
		this.nombre = nom;
	}
}


function crearReceta(nombre, pasos) {
	recetaNueva = new Receta(nombre);
	//recetaNueva.ingredientes = ingredientes;
	recetaNueva.pasos = pasos;
	
}

function agregarIngrediente(){
	const nom = document.createElement("label");
	const nomval = document.createTextNode("Nombre");
	const field1 = document.createElement("input");
	const att = document.createAttribute("type");
	att.value = "text";
	field1.setAttributeNode(att);
	const cant = document.createElement("label");
	const cantval = document.createTextNode("Cantidad");
	const field2 = document.createElement("input");
	const att2 = document.createAttribute("type");
	att2.value = "text";
	field2.setAttributeNode(att2);
	const ingredientes = document.getElementById("ingredientes");
	const boton = document.getElementById("addIng");
	const br = document.createElement("br");
	nom.append(nomval);
	cant.append(cantval);
	ingredientes.insertBefore(nom,boton);
	ingredientes.insertBefore(field1,boton);
	ingredientes.insertBefore(cant,boton);
	ingredientes.insertBefore(field2,boton);
	ingredientes.insertBefore(br,boton);
}

