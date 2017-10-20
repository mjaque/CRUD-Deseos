console.log("JavaScript cargado");

var appDeseo = {	//Creamos un objeto.
	
	lista : [],

	empezar : function(){
		console.log("Empezando");
		document.getElementById("aNuevo").addEventListener("click", appDeseo.anadir);
		console.log(localStorage.getItem("listaDeseos"));
		if (localStorage.getItem("listaDeseos") != null)
			appDeseo.lista = JSON.parse(localStorage.getItem("listaDeseos"));
		document.getElementById("tablaDeseos").appendChild(document.createElement("tbody"));
		appDeseo.mostrar();
	},
	
	mostrar : function(){
		//document.getElementById("tablaDeseos").clear();
		for(let i = 0; i < appDeseo.lista.length; i++){
			if (appDeseo.lista[i] == null)
				continue;
			var deseo = appDeseo.lista[i];
			//Creamos la fila <tr>
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.textContent = deseo.texto;
			tr.appendChild(td1);
			var td2 = document.createElement("td");
			var a2 = document.createElement("a");
			a2.className = "text-success glyphicon glyphicon-pencil";
			td2.appendChild(a2);
			tr.appendChild(td2);
			var td3 = document.createElement("td");
			var a3 = document.createElement("a");
			a3.className = "text-warning glyphicon glyphicon-trash btnBorrar";
			a3.setAttribute("data-id", i);
			a3.addEventListener("click", function(evt){
				console.log(evt.target.getAttribute("data-id"));
				
				//PARA EL VIERNES
				
				
			});
			td3.appendChild(a3);
			tr.appendChild(td3);
			document.querySelector("#tablaDeseos>tbody").appendChild(tr);
		}
	},
	
	anadir : function(){
		console.log("Añadiendo Deseo");
		
		//Creamos la fila <tr>
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var campo = document.createElement("input");
		campo.setAttribute("type", "text");
		campo.addEventListener("keypress", function(evt){
			if (evt.keyCode != 13)	//El código 13 es el ENTER
				return;
			var campo = evt.target;
			var texto = campo.value;
			var td = campo.parentNode;
			td.innerHTML = texto;
			var tr = td.parentNode;
			var td2 = document.createElement("td");
			var a2 = document.createElement("a");
			a2.className = "text-success glyphicon glyphicon-pencil";
			td2.appendChild(a2);
			tr.appendChild(td2);
			
			var td3 = document.createElement("td");
			var a3 = document.createElement("a");
			a3.className = "text-warning glyphicon glyphicon-trash";
			td3.appendChild(a3);
			tr.appendChild(td3);
			
			appDeseo.lista.push(new Deseo(texto));
			localStorage.setItem("listaDeseos", JSON.stringify(appDeseo.lista));
			console.log("Fin añadir");
		});
		
		td1.appendChild(campo);
		tr.appendChild(td1);
		document.getElementById("tablaDeseos").appendChild(tr);
		campo.focus();
	}
};

class Deseo{
	constructor(texto){
		this.texto = texto;
	}
}


window.onload = appDeseo.empezar;
