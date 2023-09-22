let datosCorrectos = false;
let moneda;
let nombre;
let apellido;
let error;
let resultado;
let correcto;
let usuario;

//llamada a la api y paso los datos a dos funciones, la de comprar moneda y la de mostrar cotizaciones.
const getCoins = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=es" //api de CoinGecko
  );
  const data = await response.json();

  showCards(data);
  buyCrypto(data);
};
const btnIngresar = document.getElementById("btnLogin");
if (btnIngresar) {
  btnIngresar.addEventListener("click", enterData);
}

//funcion que recibe como parámetro los datos de la api y los usa para calcular la compra
function buyCrypto(data) {
  const select = document.getElementById("crypto");
  let errorCompra = document.getElementById("errorCompra");
  //muestro las opciones de cripo de la api
  data.forEach((crypto) => {
    select.innerHTML += `
    <option value="${crypto.id}">${crypto.name}</option>
    `;
  });
  const buy = document.getElementById("convert");
  //cuando se hace click en comprar empieza a hacer los calculos
  buy.addEventListener("click", function () {
    const amountInput = document.getElementById("amount").value;
    const selectCrypto = select.value;
    if (isNaN(amountInput) || amountInput > 0) {
      const selectedCryptoValue = data.find(
        (crypto) => crypto.id === selectCrypto
      );
      if (selectedCryptoValue) {
        const cryptoPrice = selectedCryptoValue.current_price;
        const result = amountInput / cryptoPrice;
        errorCompra.style.display = "none"; //oculta el mensaje de error
        Swal.fire(
          "Compra Exitosa!",
          `Has realizado una compra de ${result} ${selectedCryptoValue.symbol}. 
          Puedes ver tus movimientos en "Mis Finanzas".`,
          "success"
        );
        document.getElementById("amount").value = "";
        addTransaction(selectedCryptoValue.name, amountInput, result);
      }
    } else {
      //muestro error si no se ingresa numero valido
      errorCompra.style.display = "block";
      errorCompra.textContent =
        "Por favor, ingresa un monto válido en pesos argentinos.";
    }
  });
}
//funcion para añadir las transacciones a un array y luego al localstorage
function addTransaction(coin, amountPesos, result) {
  let transacciones;
  let transaccion;
  let transaccionId = parseInt(localStorage.getItem("transaccionId")) || 1;
  if (localStorage.getItem("usuario")) {
    transaccion = {
      id: transaccionId,
      usuario: localStorage.getItem("usuario"),
      fecha: new Date().toLocaleString(),
      moneda: coin,
      cantidadPesos: amountPesos,
      cantidadCripto: result,
    };
    transaccionId++;
    localStorage.setItem("transaccionId", transaccionId.toString());

    transacciones = JSON.parse(localStorage.getItem("transacciones")) || []; //evalua si hay datos o está vacio el localstorage
    transacciones.push(transaccion); //guardo cada transaccion en un array
    localStorage.setItem("transacciones", JSON.stringify(transacciones)); //ingreso a local storage las transacciones
    console.log(transacciones);
    showTransaction();
  } else {
    window.location.href = "login.html";
    Toastify({
      text: "Ingrese sus datos antes de continuar.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
    }).showToast();
  }
}
//muestro las diferentes monedas a través de un carousel de tarjetas
function showCards(data) {
  const carouselContainer = document.querySelector(".carousel-inner");
  let groupCounter = 0;
  let cardRow;
  //aca hago que se muestren de a 3 tarjetas por vuelta de carousel (tengo 6 en total) y tambien para que se vean responsive
  data.forEach((monedas, index) => {
    if (index % 3 === 0) {
      const cardGroup = document.createElement("div");
      cardGroup.classList.add("carousel-item");
      if (groupCounter === 0) {
        cardGroup.classList.add("active");
      }
      cardRow = document.createElement("div");
      cardRow.classList.add("row", "carousel-monedas");

      cardGroup.appendChild(cardRow);
      carouselContainer.appendChild(cardGroup);
      groupCounter++;
    }
    const cardCol = document.createElement("div");
    cardCol.classList.add("col-md-4");
    cardCol.innerHTML = `
        <div
          class="card d-flex align-items-center justify-content-center"
        >
          <img
            src="${monedas.image}"
            class="card-img-top"
            alt="Imagen de la criptomoneda"
          />
          <div class="card-body text-center">
            <h5 class="card-title">${monedas.name}</h5>
            <h4 class="card-text">$${monedas.current_price} ARS</h4>
            <p>Últimas 24hs:  ${monedas.price_change_percentage_24h.toFixed(
              3
            )}%</p>
          </div>
        </div>
    `;
    cardRow.appendChild(cardCol);
  });
}

//cuando estoy en "mis finanzas" evaluo si existe usuario hago un boton de "cerrar sesion" y de lo contrario de "iniciar sesion" lo que redigire a la pantalla de login
function loginButton() {
  const btnSesion = document.getElementById("btn-sesion");
  // const btn = document.createElement("button");
  if (localStorage.getItem("usuario")) {
    btnSesion.innerHTML = `
    <button type="button" class="btn btn-outline-info" id="btn-cerrar">
      Cerrar Sesión
      <i class="bi bi-box-arrow-in-right"></i>
    </button>`;
    const btnCerrar = document.getElementById("btn-cerrar");
    btnCerrar.addEventListener("click", deleteUser); //cuando hago click en cerrar sesion, se elimina el usuario
  } else {
    btnSesion.innerHTML = `
    <button type="button"class="btn btn-outline-info" id="btn-inicio">
      Iniciar Sesión
    </button>`;
    const btnInicio = document.getElementById("btn-inicio");
    btnInicio.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }
}
//datos ingresados por la pantalla de login
function enterData() {
  nombre = document.getElementById("nombreInput").value;
  apellido = document.getElementById("apellidoInput").value;
  validateData(nombre, apellido); //valido datos ingresados

  if (datosCorrectos) {
    Toastify({
      text: "¡Su usuario se ingresó correctamente!",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    let usuario = `${apellido}, ${nombre}`;
    // datos almacenados en el localstorage
    localStorage.setItem("usuario", usuario);
    //vacío los campos
    document.getElementById("nombreInput").value = "";
    document.getElementById("apellidoInput").value = "";
    location.reload();
    window.location.href = "finanzas.html";
  } else {
    Toastify({
      text: "Los datos ingresados son incorrectos. Intente nuevamente.",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
    }).showToast();
  }
}

function showData() {
  usuario = localStorage.getItem("usuario");
  let mostrarNombre = document.getElementById("usuario");
  if (usuario) {
    mostrarNombre.innerHTML = `Usuario: ${usuario}`;
  } else {
    mostrarNombre.innerHTML = "¡Aún no ha iniciacio sesión!";
  }
  //muestro datos en la página 'finanzas'
}
//valido que los datos ingresados no esten vacios, ni seas números
function validateData(nombre, apellido) {
  error = document.getElementById("divError");
  if (nombre != "" && apellido != "" && isNaN(nombre) && isNaN(apellido)) {
    datosCorrectos = true;
    error.style.display = "none"; //oculta el mensaje de error
  } else {
    error.style.display = "block";
    error.textContent = "Por favor, ingrese un nombre y un apellido válidos.";
    datosCorrectos = false;
  }
}
//muestro las transacciones (si es que existen) y sino muestro que no se ha realizado ninguna compra aun
function showTransaction() {
  let listado = document.getElementById("listado-transacciones");
  let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  let usuarioExistente = false;
  //evalua si el usuario guardado en localstorage es igual al ingresado, si es true entonces me muestra las transacciones que realizó ese usuario
  transacciones.forEach((item) => {
    if (item.usuario === localStorage.getItem("usuario")) {
      usuarioExistente = true;
    }
  });
  if (transacciones.length === 0) {
    listado.innerHTML = "<p>¡No has realizado ninguna compra aún!</p>";
  } else if (transacciones.length < 6 && usuarioExistente) {
    //le tuve que limitar las transacciones porque me daba error y no mostraba las nuevas
    listado.innerHTML = `
    <thead class="table-light">
      <tr>
        <th>Fecha</th>
        <th>Moneda</th>
        <th>Pesos Ingresados ($) </th>
        <th>Monto Final</th>
        <th></th>
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
            <td><button type="button" class="btn btn-danger" onclick="deleteTransactions(${item.id})">Eliminar</button></td>
          </tr>
        </tbody>`;
    });
  } else {
    localStorage.removeItem("transacciones");
    location.reload();
  }
}
//elimina transacciones a partir de al id que le corresponde el item seleccionado
function deleteTransactions(id) {
  let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  const eliminar = transacciones.filter((transaccion) => transaccion.id !== id);
  localStorage.setItem("transacciones", JSON.stringify(eliminar));
  location.reload();
}
//elimina el usuario (es el "cerrar sesión")
function deleteUser() {
  usuario = localStorage.getItem("usuario");
  localStorage.removeItem("usuario");
  location.reload();
}

getCoins();
showData();
showTransaction();
loginButton();
