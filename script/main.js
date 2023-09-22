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

function buyCrypto(data) {
  const select = document.getElementById("crypto");
  let errorCompra = document.getElementById("errorCompra");
  // const showCalculation = document.getElementById("showCalculation");
  data.forEach((crypto) => {
    select.innerHTML += `
    <option value="${crypto.id}">${crypto.name}</option>
    `;
  });
  const buy = document.getElementById("convert");
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
        console.log(result);
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
      errorCompra.style.display = "block";
      errorCompra.textContent =
        "Por favor, ingresa un monto válido en pesos argentinos.";
    }
  });
}

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

//cuando se clickea en el boton 'Iniciar sesión' de la página de 'login'

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
    btnCerrar.addEventListener("click", deleteUser);
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
    // listado.innerHTML = '';
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
function deleteTransactions(id) {
  let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  const eliminar = transacciones.filter((transaccion) => transaccion.id !== id);
  localStorage.setItem("transacciones", JSON.stringify(eliminar));
  location.reload();
}
function deleteUser() {
  usuario = localStorage.getItem("usuario");
  localStorage.removeItem("usuario");
  location.reload();
}

getCoins();
showData();
showTransaction();
loginButton();
