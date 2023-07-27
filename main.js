const bitcoin= 7956436.92;
const etherium= 507851.38;
const dai= 272.78;
const xrp= 194.46;
const bch= 66254.49;
const usdt= 273.11;
let datosCorrectos= false;
let moneda;
let nombre;
let apellido;
let resultado;

while (datosCorrectos == false){
    nombre= prompt ("Ingrese su nombre");
    apellido = prompt ("Ingrese su apellido");
    validarDatos(nombre, apellido);
}

if (datosCorrectos == true){
    
    let entrada = prompt("Ingresar la moneda a comprar (en mayúscula), indicando los símbolos como menciona la tabla de abajo. Cuando desea cancelar, presione 'ESC'.");

    while (entrada != "ESC") {
      switch (entrada) {
        case "BTC":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) que desea usar para comprar BITCOIN.");
            validarNro(moneda);
            resultado= parseInt(moneda) / bitcoin;
            alert (`Usted señor/a: ${apellido}, ${nombre} ha ingresado una cantidad de: $${moneda} y ha adquirido ${resultado} BTC.`)
          break;
    
        case "ETH":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) que desea usar para comprar ETHERIUM.");
            validarNro(moneda);
            resultado= parseInt(moneda) / etherium;
            alert (`Usted señor/a: ${apellido}, ${nombre} ha ingresado una cantidad de: $${moneda} y ha adquirido ${resultado} ETH.`)
          break;
    
        case "DAI":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) que desea usar para comprar DAI.");
            validarNro(moneda);
            resultado= parseInt(moneda) / dai;
            alert (`Usted señor/a: ${apellido}, ${nombre} ha ingresado una cantidad de: $${moneda} y ha adquirido ${resultado} DAI.`)
          break;
    
        case "XRP":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) que desea usar para comprar XRP.");
            validarNro(moneda);
            resultado= parseInt(moneda) / xrp;
            alert (`Usted señor/a: ${apellido}, ${nombre} ha ingresado una cantidad de: $${moneda} y ha adquirido ${resultado} XRP.`)
          break;
    
        case "BCH":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) que desea usar para comprar BITCOIN CASH.");
            validarNro(moneda);
            resultado= parseInt(moneda) / bch;
            alert (`Usted señor/a: ${apellido}, ${nombre} ha ingresado una cantidad de: $${moneda} y ha adquirido ${resultado} BCH.`)
          break;
        
        case "USDT":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) que desea usar para comprar TETHER.");
            validarNro(moneda);
            resultado= parseInt(moneda) / usdt;
            alert (`Usted señor/a: ${apellido}, ${nombre} ha ingresado una cantidad de: $${moneda} y ha adquirido ${resultado} USDT`)
            break;
        
        default:
          alert("La moneda ingresada es incorrecta.");
          break;
      }
      entrada = prompt("Ingresar la moneda a comprar (en mayúscula), indicando los símbolos como menciona la tabla de abajo. Cuando desea cancelar, presione 'ESC'.");
    }
}
datosCorrectos = false;

function validarDatos(nombre, apellido){
    if (nombre != "" && apellido != ""){
        alert("Los datos se ingresaron correctamente.");
        datosCorrectos = true;
    }else{
        alert ("Los datos ingresados no son correctos, deben volver a ingresar.");
        datosCorrectos= false;
    }
}
function validarNro (moneda){
    if(moneda != "" && moneda != 0){
        parseInt(moneda);
        datosCorrectos = true;
    }
    else{
        alert ("Los datos ingresados no son correctos, deben volver a ingresar.");
        datosCorrectos = false;
    }
}


