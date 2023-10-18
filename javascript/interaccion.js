
class Receta {
	nombre = "";
	ingredientes = new Map();
	pasos = "";

	constructor(nom){
		this.nombre = nom;
	}
}


function replacerMap(key, value) {

  	if(value instanceof Map) {
    		return {
      			dataType: 'Map',
      			value: Array.from(value.entries()), // or with spread: value: [...value]
   	 	};
  	} else {
    		return value;
  	}
}

function reviverMap(key, value) {
  	if(typeof value === 'object' && value !== null) {
 		if (value.dataType === 'Map') {
      			return new Map(value.value);
    		}
  	}
  	return value;
}

function crearReceta(nombre, pasos) {
	recetaNueva = new Receta(nombre);
	recetaNueva.pasos = pasos;
	
	const lista = document.getElementById("ingredientes");
	const ingredientes = lista.getElementsByTagName("input");
	var i;
	for (i = 0; i < ingredientes.length; i+=2) {
 		const ing = ingredientes[i].value;
		const cant = ingredientes[i+1].value;
		recetaNueva.ingredientes.set(ing, cant);
	}
	console.log(recetaNueva);
	const receta = JSON.stringify(recetaNueva,replacerMap);
	localStorage.setItem(nombre, receta);
	var str = localStorage.getItem(nombre);
	console.log(str);
	const nuevo = JSON.parse(str, reviverMap);
	console.log(nuevo);
	str = localStorage.getItem("recetas");
	console.log(str);
	if(str != null){
		recetas = JSON.parse(str);
		if(str.includes(nombre)){
			console.log("Ya existe una receta con ese nombre");
			return;
		}
		recetas.push(nombre);
	}else{
		recetas = [nombre];
	}
	str = JSON.stringify(recetas);
	localStorage.setItem("recetas",str);
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

