//0.- Definir presets
document.querySelector("#usuarioCorrecto").style.display = "none";
document.querySelector("#usuarioIncorrecto").style.display = "none";
document.querySelector('#bienvenido').style.display= "none";
document.querySelector('#contenedor').style.display= "none";
document.querySelector('#montoIngresado').style.display= "none";
document.querySelector('#btnCalcular').style.display= "none";



//1.- Definir variables
var cuentas = [
    { nombre: 'Mali', password: '12345', saldo: 200 },
    { nombre: 'Gera', password: 'password', saldo: 290 },
    { nombre: 'Maui', password: 'panchovilla', saldo: 67 }
  ];

let btnLogin = document.querySelector('#btnLogin');
let btnConsultarSaldo = document.getElementById('consultarSaldo')
let btnIngresarMonto = document.getElementById('ingresarMonto')
let btnRetirarMonto = document.getElementById('retirarMonto')
let textoConsulta = document.getElementById('textoConsulta')
let btnCalcular = document.getElementById('btnCalcular')
let nombreUsuario = document.getElementById('nombreUsuario')
let loggedUser;
let seccionActiva = "";

//2.- Definir funciones


btnLogin.addEventListener('click', (e) => {
    let user = document.querySelector('#userName');
    let password = document.querySelector('#userPassword');
    let successLogin = false


    cuentas.forEach((cuenta) => {
        if(cuenta.nombre === user.value && cuenta.password === password.value){
            loggedUser = cuenta;
            document.querySelector("#usuarioCorrecto").style.display = "block";
            successLogin = true;
            setTimeout(() => {
                $("#usuarioCorrecto").alert('close')
             }, 5000)
        }   
    })

    if (!successLogin) {
        document.querySelector("#usuarioIncorrecto").style.display = "block";
        setTimeout(() => {
            $("#usuarioIncorrecto").alert('close')
         }, 5000)
    } else {
        nombreUsuario.textContent = `Bienvenid@ ${loggedUser.nombre}`
        document.querySelector('.login').style.display = "none";
        document.querySelector('#bienvenido').style.display= "block";
        document.querySelector('#contenedor').style.display= "block";

    }
})

btnConsultarSaldo.addEventListener('click', (e)=>{
    seccionActiva = "Consultar"
    document.querySelector('#montoIngresado').style.display= "none";
    document.querySelector('#btnCalcular').style.display= "none";

    textoConsulta.textContent = `Su saldo es de ${loggedUser.saldo}`
})

btnIngresarMonto.addEventListener('click', (e)=>{
    seccionActiva = "Ingresar"
    document.querySelector('#montoIngresado').style.display= "block";
    document.querySelector('#btnCalcular').style.display= "block";
    textoConsulta.textContent = `Favor de escribir monto a ingresar`;

})

btnRetirarMonto.addEventListener('click', (e)=>{
    seccionActiva = "Retirar"
    document.querySelector('#montoIngresado').style.display= "block";
    document.querySelector('#btnCalcular').style.display= "block";
    textoConsulta.textContent = `Favor de escribir monto a retirar`;

})

btnCalcular.addEventListener('click', (e) => {
    let montoIngresado = parseFloat(document.getElementById('montoIngresado').value)
    console.log(montoIngresado)
    console.log(isNaN(montoIngresado))
    if(isNaN(montoIngresado) || montoIngresado === ''){
        alert('Favor de ingresar un número valido')
    } else {
        if(seccionActiva === "Ingresar"){
            if((loggedUser.saldo + montoIngresado) > 990){
                alert('Su cuenta no puede superar 990')
            } else {
                agregarMonto(montoIngresado)
                textoConsulta.textContent = `Se han ingresado correctamente ${montoIngresado} a su cuenta. Su saldo actual es de ${loggedUser.saldo}.`
                document.getElementById('montoIngresado').value = ""
            }
        } else if(seccionActiva === "Retirar"){
            if((loggedUser.saldo - montoIngresado) < 10){
                alert('Su cuenta no puede ser menor a 10')
            } else {
                retirarMonto(montoIngresado)
                textoConsulta.textContent = `Se han retirado correctamente ${montoIngresado} de su cuenta. Su saldo actual es de ${loggedUser.saldo}.`
                document.getElementById('montoIngresado').value = ""
            }
        }
    }
})

function agregarMonto (monto){
    loggedUser.saldo += monto
}

function retirarMonto (monto){
    loggedUser.saldo -= monto

}


