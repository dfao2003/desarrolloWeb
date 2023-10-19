//recetas = ["Arroz"];
//recetas.push("Seco de Pollo");
//localStorage.setItem("recetas", recetas);
//localStorage.clear();
console.log(localStorage.getItem("recetas"));

//clase para guardar la receta
class Receta {
	nombre = "";
	ingredientes = new Map();
	pasos = "";
	personas = 0;

	constructor(nom){
		this.nombre = nom;
	}
}

//funcion para convertir el Map ingredientes en JSON
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

//funcion para convertir el objeto JSON en Map
function reviverMap(key, value) {
  	if(typeof value === 'object' && value !== null) {
 		if (value.dataType === 'Map') {
      			return new Map(value.value);
    		}
  	}
  	return value;
}

//funcion para crear la receta con los datos ingresados
function crearReceta(nombre, pasos, personas) {
	// se crea la receta
	recetaNueva = new Receta(nombre);
	recetaNueva.pasos = pasos;
	recetaNueva.personas = personas;
	//se obtienen los ingredientes y se guardan en el Map ingredientes
	const lista = document.getElementById("ingredientes");
	const ingredientes = lista.getElementsByTagName("input");
	var i;
	for (i = 0; i < ingredientes.length; i+=2) {
 		const ing = ingredientes[i].value;
		const cant = ingredientes[i+1].value;
		recetaNueva.ingredientes.set(ing, cant);
	}
	console.log(recetaNueva);
	//se conierte la receta en un objeto JSON y se guarda en el local Storage
	const receta = JSON.stringify(recetaNueva,replacerMap);
	localStorage.setItem(nombre, receta);
	//se accede al elemento recien guardado para comprobar que se haya guardado la receta
	var str = localStorage.getItem(nombre);
	console.log(str);
	//lo obtenido se vuelve a convertir en objeto de la clase Receta
	const nuevo = JSON.parse(str, reviverMap);
	console.log(nuevo);
	//se obtienen las recetas guardadas
	str = localStorage.getItem("recetas");
	console.log(str);
	//se comprueba si es que ya existen recetas guardadas
	if(str != null){
		//se agrega la nueva receta a la lista de recetas guardadas
		recetas = JSON.parse(str);
		if(str.includes(nombre)){
			console.log("Ya existe una receta con ese nombre");
			return;
		}
		recetas.push(nombre);
	}else{
		//se crea el array que nos sirve para la lista de recetas guardadas
		recetas = [nombre];
	}
	//se convierte la lista de recetas en un objeto JSON y se guarda en el localStorage
	str = JSON.stringify(recetas);
	console.log(str);
	localStorage.setItem("recetas",str);
}

//funcion para agregar nuevos ingredientes
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

//fu()ncion para quitar un ingrediente de la lista
function quitarIngrediente(){
	const ingredientes = document.getElementById("ingredientes");
	const ings = ingredientes.getElementsByTagName("input");
	const labels = ingredientes.getElementsByTagName("label");
	const breaks = ingredientes.getElementsByTagName("br");
	ingredientes.removeChild(ings[ings.length-1]);
	ingredientes.removeChild(ings[ings.length-1]);
	ingredientes.removeChild(labels[labels.length-1]);
	ingredientes.removeChild(labels[labels.length-1]);
	ingredientes.removeChild(breaks[breaks.length-1]);

}

//funcion para crear la tarjeta que contiene a la receta
function crearTarjeta(str){
	//se obtienen los daots
	receta = localStorage.getItem(str);
	receta = JSON.parse(receta, reviverMap);
	//seccion
	const seccion = document.getElementById("recetas");
	//contenedor
	const contenedor = document.createElement("div");
	//atributos
	const attCont = document.createAttribute("class");
	//se asigna el atributo de contenedor
	attCont.value = "cont_recetas";
	contenedor.setAttributeNode(attCont);
	//se añade el contenedor de la tarjeta
	//seccion.appendChild(contenedor);
	//se crea otra division para la tarjeta
	const tarjeta = document.createElement("div");
	const attTar = document.createAttribute("class");
	attTar.value = 'card';
	tarjeta.setAttributeNode(attTar);
	contenedor.appendChild(tarjeta);
	//se crea otra division para el titulo
	const titulo = document.createElement("div");
	const attTit = document.createAttribute("class");
	attTit.value = 'titCard';
	titulo.setAttributeNode(attTit);
	tarjeta.appendChild(titulo);
	//se agrega el header y el texto
	const header2 = document.createElement("h2");
	header2.textContent = receta.nombre;
	titulo.appendChild(header2);
	//se crea la estructura
	const estructura = document.createElement("div");
	const attEstr = document.createAttribute("class");
	attEstr.value = "estrucCard";
	estructura.setAttributeNode(attEstr);
	tarjeta.appendChild(estructura);
	//se crea la division para la imagen
	const divImg = document.createElement('div');
	const attImg = document.createAttribute('class');
	attImg.value = 'imgCard';
	divImg.setAttributeNode(attImg);
	estructura.appendChild(divImg);
	//se crea la imagen
	const imagen = document.createElement('img');
	const attSrc = document.createAttribute('src');
	attSrc.value = '../img/recetasinfoto.png';
	const attAlt = document.createAttribute('alt');
	attAlt.value = 'Sin Foto';
	imagen.setAttributeNode(attSrc);
	imagen.setAttributeNode(attAlt);
	divImg.appendChild(imagen);
	//se crea la informacion
	const divInfo = document.createElement('div');
	const attInfo = document.createAttribute('class');
	attInfo.value = 'cardInfo';
	divInfo.setAttributeNode(attInfo);
	estructura.appendChild(divInfo);
	//se crea la division para las personas
	const divPer = document.createElement('div');
	const attPer = document.createAttribute('class');
	attPer.value = 'personas';
	divPer.setAttributeNode(attPer);
	divInfo.appendChild(divPer);
	//se crea el header para las personas
	const headerPer = document.createElement('h3');
	headerPer.textContent = receta.personas;
	divPer.appendChild(headerPer);
	//se crea la division para los ingredientes
	const divIng = document.createElement('div');
	const attIng = document.createAttribute('class');

	seccion.appendChild(contenedor);
}

//funcion para mostrar las recetas guardas
function mostrarRecetas(){
	const cuerpo = document.body;
	//se obtiene la lista de recetas
	lista = localStorage.getItem("recetas");
	if(lista === null){
		console.log("No existen recetas guardadas");
		return;
	}
	lista = JSON.parse(lista);
	console.log(lista);
	//se obtiene la receta guardada
	var i;
	for (i = 0; i < lista.length; i++) {
		str = lista[i];
		crearTarjeta(str);
		/*//console.log(str);
		receta = localStorage.getItem(str);
		receta = JSON.parse(receta,reviverMap);
		//console.log(receta);
		const nombre = document.createElement("label");
		const nomval = document.createTextNode(receta.nombre);
		nombre.append(nomval);
		cuerpo.appendChild(nombre);
		cuerpo.appendChild(document.createElement("br"));
		receta.ingredientes.forEach((value, key) => {
			const ing = document.createElement("label");
			const ingval = document.createTextNode(key);
			ing.append(ingval);
			cuerpo.appendChild(ing);
			const cant = document.createElement("label");
			const cantval = document.createTextNode(value);
			cant.append(cantval);
			cuerpo.appendChild(cant);
			cuerpo.appendChild(document.createElement("br"));

		})*/
 	}/*
	var str = localStorage.getItem(nombre);
	const nuevo = JSON.parse(str, reviverMap);
	*/
}

//funcion para abrir otra ventana
function abrirVentana(){
	var nuevaVentana = window.open("../html/recetas.html");

}

function otraVentana(){
	var nuevaVentana = window.location.assign("../html/formulario.html");
	console.log(nuevaVentana.localStorage);
}

//funcion para filtrar recetas
function busqueda(){
	var input = document.getElementById('busqueda');
	var filtro = input.value.toLowerCase();
	var contenedor = document.getElementById('recetas')
	var lista = contenedor.getElementsByClassName('card');
	console.log(lista);
	for (i = 0; i < lista.length; i++) {
   		var nombre = lista[i].getElementsByTagName('h2')[0];
		console.log(nombre);
		var texto = nombre.innerText;
		console.log(texto);
		if(texto.toLowerCase().indexOf(filtro) > -1){
			lista[i].style.display = "";
		}else{
			lista[i].style.display = "none";
		}
 	}
}

