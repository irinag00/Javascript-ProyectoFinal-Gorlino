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
let error;
let resultado;
let correcto;
let usuario;

//cuando se clickea en el boton 'Iniciar sesión' de la página de 'login'
const btnIngresar = document.getElementById("btnLogin");
if (btnIngresar){
  btnIngresar.addEventListener("click", ingresarDatos);
}
mostrarDatos(); //muestra el nombre y apellido ingresado en la página 'finanzas'

function ingresarDatos() {
  nombre= document.getElementById("nombreInput").value;
  apellido= document.getElementById("apellidoInput").value;
  validarDatos(nombre, apellido); //valido datos ingresados
  let datosCompletos = `${apellido}, ${nombre}`; 
  localStorage.setItem("datosCompletos", datosCompletos); //datos almacenados en el localstorage

  if(datosCorrectos){
    correcto = document.getElementById("divCorrecto");
    correcto.style.display = "block";
    correcto.textContent = "¡Su usuario se ingresó correctamente!";
    //vacío los campos
    document.getElementById("nombreInput").value = "";
    document.getElementById("apellidoInput").value="";
  }

}

function mostrarDatos (){
  usuario = localStorage.getItem("datosCompletos");
  let mostrarNombre = document.getElementById("usuario");
  if(usuario){
    mostrarNombre.innerHTML= `Bienvenido señor/a: ${usuario}`;
  }else{
    mostrarNombre.innerHTML= "¡Aún no ha iniciacio sesión!"
  }
  //muestro datos en la página 'finanzas'
}

function validarDatos(nombre, apellido){
  error= document.getElementById("divError");
    if (nombre != "" && apellido != ""){
      datosCorrectos = true;
      error.style.display = "none"; //oculta el mensaje de error
    }
    else
    {
      error.style.display = "block";
      error.textContent= "Por favor, ingrese un nombre y un apellido válidos.";
      datosCorrectos= false;
    }
}




























// alert("¡Bienvenido a la Billetera de Cryptos!")
// ingresarDatos();
// calcularMoneda(datosCorrectos);

// function ingresarDatos(){
//     while (datosCorrectos == false){
//       nombre= prompt ("Ingrese su nombre");
//       apellido = prompt ("Ingrese su apellido");
//       validarDatos(nombre, apellido);
//     }
// }

function convertirMoneda (moneda, cantidad){
  const tasas = {
    BTC: bitcoin,
    ETH: etherium,
    DAI: dai,
    XRP: xrp,
    BCH: bch,
    USDT: usdt
  };
  return cantidad / tasas[moneda];
}

function calcularMoneda(datosCorrectos){
    if (datosCorrectos == true){
      
      let transacciones = [];
    
      let entrada = prompt("Ingresar la moneda a comprar (en mayúscula), indicando los símbolos (BTC, ETH, DAI, XRP, BCH, USDT). Cuando desea cancelar, escriba 'ESC'.");

      while (entrada != "ESC"){
        switch (entrada){
          case "BTC":
          case "ETH":
          case "DAI":
          case "XRP":
          case "BCH":
          case "USDT":
            moneda = prompt("Ingrese la cantidad de pesos argentinos ($) para comprar la moneda ingresada.");
            validarNro(moneda);
            resultado = convertirMoneda(entrada, parseInt(moneda));

            const transaccion = {
              moneda: entrada,
              cantidadPesos: moneda,
              cantidadCripto: resultado
            };

            transacciones.push(transaccion);
            break;

            default:
              alert("La moneda ingresada es incorrecta.");
              break;
        }
        entrada = prompt("Ingresar la moneda a comprar (en mayúscula), indicando los símbolos (BTC, ETH, DAI, XRP, BCH, USDT). Cuando desea cancelar, escriba 'ESC'.");
      }
      
      for (const transaccion of transacciones) {
        alert(`Usted señor/a: ${apellido}, ${nombre} ha ingresado:
        Cantidad de Pesos ingresados: $${transaccion.cantidadPesos}
        Cantidad de Cripto comprado: ${transaccion.cantidadCripto} ${transaccion.moneda}.
        `);
      }

      busquedaMoneda(transacciones);
      filtrarCrypto (transacciones);

      function busquedaMoneda (transacciones){
        let nombreMoneda= prompt("Ingrese el nombre de la moneda que desea buscar en sus compras");
        let compra= transacciones.find((item) => item.moneda === nombreMoneda); 
        if(compra){
          alert(`
            Moneda: ${compra.moneda}
            Cantidad de Pesos ingresados: $${compra.cantidadPesos}
            Cantidad de Cripto comprado: ${compra.cantidadCripto}
          `);
        } else {
          alert("No has adquirido la crypto ingresada.");
        };
      }
      function filtrarCrypto (transacciones){
        let crypto= parseInt(prompt("Ingrese el número mínimo de cryptos compradas para filtrarlos."));
        let filtrados= transacciones.filter((item) => item.cantidadCripto > crypto);

        filtrados.forEach((item) => {
          alert(`
            Moneda: ${item.moneda}
            Cantidad de Pesos ingresados: $${item.cantidadPesos}
            Cantidad de Cripto comprado: ${item.cantidadCripto}
          `);
        })
      }
    }
    datosCorrectos = false;
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


