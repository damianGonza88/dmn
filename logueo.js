
// Clases
class logueo{
    constructor(user, password){
        this.user = user;
        this.password = password;
    }
}
function login(){

    const formlogin = document.forms['formulario']
    var usuarioLeido = formlogin.usuario.value;
    var passwordLeido = formlogin.contrasena.value;

    var archivoTxt = new XMLHttpRequest();
    var fileRuta = './file/logueo.txt';
    
    archivoTxt.open("GET", fileRuta,false);
    archivoTxt.send(null);
    
    var txt = archivoTxt.responseText;
    var lines = txt.split(/\r\n|\n/);

    const login = new logueo();
    login.user = lines[0];
    login.password = lines[1]; 

    if (usuarioLeido == login.user && passwordLeido == login.password) {
        
        window.location.href = "./pages/dmn/agenda.html";
        logueado = true;   
                
    } else {
        alert("ERROR: Usuario y/o Contraseña Incorrectos");
    }    
}
