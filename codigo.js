const path = "./database";
var baseDeDatos = new Array();
var busquedaDatos = new Array();
var bdcargada = false;
var aBuscar = "";
var indice;
const formdia = document.forms['dia'];

const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo',];

class dia{
    constructor(fecha, clima, dia, destacado){
        this.fecha = fecha;
        this.clima = clima;
        this.dia = dia;
        this.destacado = destacado;
    }
}

function consultar(){
    // if (!logueado) {
    //     alert("Debes loguearte");
    //     return;        
    // }

    if (formdia.fecha.value == "") {
        alert("Debe ingresar fecha a buscar.");
        return;
    }

    mostrarDia(formdia.fecha.value +".txt");
}

function limpiar(){
    formdia.fecha.value = "";
    formdia.date.value = "";
    formdia.buscado.value = "";
    busquedaDatos = [];
    var aBuscar = "";
}

function buscar(){

    // if (!logueado) {
    //     alert("Debes loguearte");
    //     return;        
    // }

    if (formdia.buscado.value == "") {
        alert("Debe escrbir la palabra o texto a buscar.");
        return;
    } 
    
    formdia.date.value = "Procesando... ";
    // setTimeout(function(){ console.log ("timeout") }, 2000);      
                
    aBuscar = formdia.buscado.value
    busquedaDatos = []; 
    
    if (!bdcargada) {        
        // Cargando Base de Datos
        cargarBaseDeDatos(baseDeDatos, fechas);
    }
    
    for (let index = 0; index < baseDeDatos.length; index++) {
        
        if (baseDeDatos[index].dia.includes(aBuscar) || baseDeDatos[index].destacado.includes(aBuscar)) {             
            busquedaDatos.push(baseDeDatos[index]);          
        }       
    }
    
    if (busquedaDatos.length != 0) {
        let c = busquedaDatos[0].fecha.split('');
        let fechaEnFormato = c[8]+c[9]+c[7]+c[5]+c[6]+c[4]+c[2]+c[3]+".txt";
        
        mostrarDia(fechaEnFormato);
        indice = 0;
        formdia.buscado.value = "Resultado "+(indice + 1)+" de " + busquedaDatos.length + " para: " +'"'+ aBuscar +'"';
        
    } else {
        formdia.date.value = "No Se Encotraron Resultados... :(";
    }
}

function anterior(){

    // if (!logueado) {
    //     alert("Debes loguearte");
    //     return;        
    // }
    let fechaEnFormato;

    if (busquedaDatos.length != 0) {

        if (indice ==0) {
            indice = busquedaDatos.length-1
        } else {
            indice = indice-1
        }  
        let c = busquedaDatos[indice].fecha.split('');
        fechaEnFormato = c[8]+c[9]+c[7]+c[5]+c[6]+c[4]+c[2]+c[3]+".txt";
        mostrarDia(fechaEnFormato);
        formdia.buscado.value = "Resultado "+(indice + 1)+" de " + busquedaDatos.length + " para: " +'"'+ aBuscar +'"';

    } else {
        formdia.date.value = "Nada Para Mostrar...";
    }    
}

function siguiente(){
    // if (!logueado) {
    //     alert("Debes loguearte");
    //     return;        
    // }
    let fechaEnFormato;

    if (busquedaDatos.length != 0) {

        if (indice == busquedaDatos.length-1 ) {
            indice = 0;
        } else {
            indice = indice+1
        }  
       
        let c = busquedaDatos[indice].fecha.split('');
        fechaEnFormato = c[8]+c[9]+c[7]+c[5]+c[6]+c[4]+c[2]+c[3]+".txt";
        mostrarDia(fechaEnFormato);
        formdia.buscado.value = "Resultado "+(indice + 1)+" de " + busquedaDatos.length + " para: " +'"'+ aBuscar +'"';

    } else {
        formdia.date.value = "Nada Para Mostrar...";
    }    
}

function cargarBaseDeDatos(baseDeDatos, fechas){
    
    for (let i = 0; i < fechas.length; i++) {

        var archivoTxt = new XMLHttpRequest();
        var fileRuta = "../../database/"+ fechas[i];
        
        archivoTxt.open("GET", fileRuta,false);
        archivoTxt.send(null);
        
        var txt = archivoTxt.responseText;
        var diaBuscado = txt.split(/\r\n|\n/);

        let c = diaBuscado[0].split('');
        let fechaEnFormato = "20"+c[6]+c[7]+c[5]+c[3]+c[4]+c[2]+c[0]+c[1];

        hoy = new dia (fechaEnFormato, diaBuscado[1], diaBuscado[2], diaBuscado[3]);

        baseDeDatos.push(hoy);   
    } 
    
    //Ordenando 
    baseDeDatos.sortBy(function(o){ return o.fecha });

    //console.log("Primer elemento: " + baseDeDatos[0].fecha);
    //console.log("Ultimo elemento: " + baseDeDatos[baseDeDatos.length-2].fecha);

    bdcargada = true;
}
function guardar(){
    if ((formdia.fecha.value == "") || (formdia.date.value == "")) {
        alert("Debe ingresar fecha y texto a guardar.");
        return;
    }
}

function ultimaFechaAgendada(){
    // if (!logueado) {
    //     alert("Debes loguearte");
    //     return;        
    // }

    if (!bdcargada) {        
        // Cargando Base de Datos
        cargarBaseDeDatos(baseDeDatos, fechas);
    }

    let c = baseDeDatos[baseDeDatos.length-2].fecha.split('');
    fechaEnFormato = c[8]+c[9]+c[7]+c[5]+c[6]+c[4]+c[2]+c[3]+".txt";
    
    mostrarDia(fechaEnFormato);

}

function mostrarDia (fechatxt){

    var archivoTxt = new XMLHttpRequest();
    var fileRuta = "../../database/"+ fechatxt;
    
    archivoTxt.open("GET", fileRuta,false);
    archivoTxt.send(null);
    
    var txt = archivoTxt.responseText;
    var diaBuscado = txt.split(/\r\n|\n/);
        
    //Nombre del Dia
    let c = diaBuscado[0].split('');
    const fechaComoCadena = "20"+c[6]+c[7]+c[5]+c[3]+c[4]+c[2]+c[0]+c[1];
    const numeroDia = new Date(fechaComoCadena).getDay();   
    const nombreDia = dias[numeroDia];
    
    formdia.fecha.value = diaBuscado[0];
    formdia.date.value = nombreDia + " - " +diaBuscado[1] + '\n' +  diaBuscado[2] + '\n' + '\n' +  diaBuscado[3];
}

// Funcion para Ordenar
(function(){
    if (typeof Object.defineProperty === 'function'){
      try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
    }
    if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
  
    function sb(f){
      for (var i=this.length;i;){
        var o = this[--i];
        this[i] = [].concat(f.call(o,o,i),o);
      }
      this.sort(function(a,b){
        for (var i=0,len=a.length;i<len;++i){
          if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
        }
        return 0;
      });
      for (var i=this.length;i;){
        this[--i]=this[i][this[i].length-1];
      }
      return this;
    }
  })();

function prehide(){
    if (document.getElementById){
    document.getElementById('preload').style.visibility='hidden'}
}
function preshow(){
    if (document.getElementById){
    document.getElementById('preload').style.visibility='visible'}
}


function guardar(){
    if ((formdia.fecha.value == "")||(formdia.date.value == "")) {
        alert("Debe escrbir la fecha  y texto a guardar.");
        return;
    } 
} 





function guardar1()
{

// grab the content of the form field and place it into a variable
    var textToWrite = document.getElementById("inputTextToSave").value;
//  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
// Specify the name of the file to be saved
    var fileNameToSaveAs = "myNewFile.txt";
    
// Optionally allow the user to choose a file name by providing 
// an imput field in the HTML and using the collected data here
// var fileNameToSaveAs = txtFileName.text;
 
// create a link for our script to 'click'
    var downloadLink = document.createElement("a");
//  supply the name of the file (from the var above).
// you could create the name here but using a var
// allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
// provide text for the link. This will be hidden so you
// can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";
    
// allow our code to work in webkit & Gecko based browsers
// without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
          
// Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
// when link is clicked call a function to remove it from
// the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
// make sure the link is hidden.
    downloadLink.style.display = "none";
// add the link to the DOM
    document.body.appendChild(downloadLink);
    
// click the new link
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}
 
// EOF