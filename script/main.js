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
mostrarTrasacciones(); //muestro la tabla de transacciones (si existen)

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

function calcularMoneda(moneda){
  let transacciones;
  let transaccion;
  let pesosBtc = parseInt(document.getElementById("montoPesosBTC").value);
  let pesosEth= parseInt(document.getElementById("montoPesosETH").value);
  let pesosXrp= parseInt(document.getElementById("montoPesosXRP").value);
  let pesosDai= parseInt(document.getElementById("montoPesosDAI").value);
  let pesosBch= parseInt(document.getElementById("montoPesosBCH").value);
  let pesosUsdt= parseInt(document.getElementById("montoPesosUSDT").value);
  //evaluo que se haya ingresado un nombre y apellido
  if(localStorage.getItem("datosCompletos")){
    switch(moneda){
      case "BTC":
        if (isNaN (pesosBtc) || pesosBtc <= 0){
          alert('Por favor, ingresa un monto válido en pesos argentinos.');
          return;
        }
        resultado = convertirMoneda(moneda, pesosBtc);
        transaccion = {
          usuario: localStorage.getItem("datosCompletos"),
          fecha: new Date().toLocaleString(),
          moneda: moneda,
          cantidadPesos: pesosBtc,
          cantidadCripto: resultado
        };
        break;
      case "ETH":
        if (isNaN (pesosEth) || pesosEth <= 0){
          alert('Por favor, ingresa un monto válido en pesos argentinos.');
          return;
        }
        resultado = convertirMoneda(moneda, pesosEth);
        transaccion = {
          usuario: localStorage.getItem("datosCompletos"),
          fecha: new Date().toLocaleString(),
          moneda: moneda,
          cantidadPesos: pesosEth,
          cantidadCripto: resultado
        };
        break;
      case "DAI":
        if (isNaN (pesosDai) || pesosDai <= 0){
          alert('Por favor, ingresa un monto válido en pesos argentinos.');
          return;
        }
        resultado = convertirMoneda(moneda, pesosDai);
        transaccion = {
          usuario: localStorage.getItem("datosCompletos"),
          fecha: new Date().toLocaleString(),
          moneda: moneda,
          cantidadPesos: pesosDai,
          cantidadCripto: resultado
        };
        break;
      case "XRP":
        if (isNaN (pesosXrp) || pesosXrp <= 0){
          alert('Por favor, ingresa un monto válido en pesos argentinos.');
          return;
        }
        resultado = convertirMoneda(moneda, pesosXrp);
        transaccion = {
          usuario: localStorage.getItem("datosCompletos"),
          fecha: new Date().toLocaleString(),
          moneda: moneda,
          cantidadPesos: pesosXrp,
          cantidadCripto: resultado
        };
        break;
      case "BCH":
        if (isNaN (pesosBch) || pesosBch <= 0){
          alert('Por favor, ingresa un monto válido en pesos argentinos.');
          return;
        }
        resultado = convertirMoneda(moneda, pesosBch);
        transaccion = {
          usuario: localStorage.getItem("datosCompletos"),
          fecha: new Date().toLocaleString(),
          moneda: moneda,
          cantidadPesos: pesosBch,
          cantidadCripto: resultado
        };
        break;
      case "USDT":
        if (isNaN (pesosUsdt) || pesosUsdt <= 0){
          alert('Por favor, ingresa un monto válido en pesos argentinos.');
          return;
        }
        resultado = convertirMoneda(moneda, pesosUsdt);
        transaccion = {
          usuario: localStorage.getItem("datosCompletos"),
          fecha: new Date().toLocaleString(),
          moneda: moneda,
          cantidadPesos: pesosUsdt,
          cantidadCripto: resultado
        };
      break;
    }
    
    transacciones = JSON.parse(localStorage.getItem('transacciones')) || []; //evalua si hay datos o está vacio el localstorage
    transacciones.push(transaccion); //guardo cada transaccion en un array
    localStorage.setItem('transacciones', JSON.stringify(transacciones)); //ingreso a local storage las transacciones

    mostrarTrasacciones(); //muestro la tabla de transacciones
  }
  else{
    window.location.href= "login.html";
  }
}

function mostrarTrasacciones(){
  let listado = document.getElementById("listado-transacciones");
  let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
  let usuarioExistente= false;
  //evalua si el usuario guardado en localstorage es igual al ingresado, si es true entonces me muestra las transacciones que realizó ese usuario
  transacciones.forEach((item) => {
    if (item.usuario === localStorage.getItem("datosCompletos")) {
      usuarioExistente = true;
    }
  });
  if (transacciones.length === 0){
    listado.innerHTML = '<p>¡No has realizado ninguna compra aún!</p>'
  }else if (transacciones.length < 6 && usuarioExistente) //le tuve que limitar las transacciones porque me daba error y no mostraba las nuevas
  {
    // listado.innerHTML = '';
    listado.innerHTML= `
    <thead class="table-light">
      <tr>
        <th>Fecha</th>
        <th>Moneda</th>
        <th>Pesos Ingresados ($) </th>
        <th>Monto Final</th>
      </tr>
    </thead>`;
    transacciones.forEach((item) => {
      listado.innerHTML += `
        <tbody>
          <tr>
            <td>${item.fecha}</td>
            <td>${item.moneda}</td>
            <td>${item.cantidadPesos}</td>
            <td>${item.cantidadCripto} ${item.moneda}</td>
          </tr>
        </tbody>`;
    });
  }else{
    localStorage.removeItem("transacciones");
    location.reload();
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

function calcularNada(datosCorrectos){
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


function validarNro (pesos){
    if(pesos != "" && pesos != 0){
        parseInt(pesos);
        datosCorrectos = true;
    }
    else{
        alert ("Los datos ingresados no son correctos, deben volver a ingresar.");
        datosCorrectos = false;
    }
}


