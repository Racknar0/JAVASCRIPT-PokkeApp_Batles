/* VARIABLES */
let eleccion;
let pokemon1 = "Squirtle";
let pokemon2 = "Bulbasaur";
let pokemon3 = "Charmander";
let tipopokemon;
let poke;
let peleas;
let powers;
let resultadoFinal;
let eleccionapi;
let imgpokeapi;
let userLocalStorage;

/* variables gif */
//! Bulbasaur
const bulbasaurBatleImg = './assets/gif/bulbasaur/b-fight.gif';
const bulbasaurWinImg = './assets/gif/bulbasaur/b-win.gif';
const bulbasaurLoseImg = './assets/gif/bulbasaur/b-lose.gif';
const objBulbasaurImg = {
  batleImg: bulbasaurBatleImg,
  winImg: bulbasaurWinImg,
  loseImg: bulbasaurLoseImg,
}

//! Charmander
const charmanderBatleImg = './assets/gif/charmander/c-figth.gif';
const charmanderWinImg = './assets/gif/charmander/c-win.gif';
const charmanderLoseImg = './assets/gif/charmander/c-lose.gif';
const objCharmanderImg = {
  batleImg: charmanderBatleImg,
  winImg: charmanderWinImg,
  loseImg: charmanderLoseImg,
}

//! Squirtle
const squirtleBatleImg = './assets/gif/squirtle/s-figth.gif';
const squirtleWinImg = './assets/gif/squirtle/s-win.gif';
const squirtleLoseImg = './assets/gif/squirtle/s-lose.gif';
const objSquirtleImg = {
  batleImg: squirtleBatleImg,
  winImg: squirtleWinImg,
  loseImg: squirtleLoseImg,
}


let resumeBatles = {
  total: 0,
  wins: 0,
  loses: 0,
}


//Arrays
const firePowers = [
  "Bola De Fuego",
  "Lanza LLamas",
  "Calcinacion",
  "Puño de fuego",
];

const waterPowers = ["Pistola de agua", "Hidro Bomba", "Hidro Pulso", "Surf"];
const plantPowers = [
  "Rayo solar",
  "Latigo Cepa",
  "Hojas Navaja",
  "Veneno Paralizador",
];

//Objeto
const pokemon = {
  nombre: "",
};

const inputNombre = document.querySelector("#inputNombre");
const btnGuardar = document.querySelector("#btnGuardar");
const mainContent = document.querySelector("#mainContent");
const vict = document.querySelector("#vict");
const derr = document.querySelector("#derr");
const total = document.querySelector("#total");


const divElegir = document.createElement("DIV");
divElegir.classList.add("box_container", "box_shadow_container");
divElegir.setAttribute("id", "divElegir");

const labelElegir = document.createElement("LABEL");
labelElegir.setAttribute("for", "inputElegir");
labelElegir.classList.add("question");
labelElegir.textContent = "Selecciona tu tipo de pokemon preferido ";
divElegir.appendChild(labelElegir);

const selectElegir = document.createElement("SELECT");
selectElegir.setAttribute("id", "inputElegir");
selectElegir.classList.add("form-control" , "input_select");
divElegir.appendChild(selectElegir);

const optionElegir1 = document.createElement("OPTION");
optionElegir1.setAttribute("value", "1");
optionElegir1.textContent = "Agua";
selectElegir.appendChild(optionElegir1);

const optionElegir2 = document.createElement("OPTION");
optionElegir2.setAttribute("value", "2");
optionElegir2.textContent = "Planta";
selectElegir.appendChild(optionElegir2);

const optionElegir3 = document.createElement("OPTION");
optionElegir3.setAttribute("value", "3");
optionElegir3.textContent = "Fuego";
selectElegir.appendChild(optionElegir3);

const buttonElegir = document.createElement("BUTTON");
buttonElegir.setAttribute("id", "buttonElegir");
buttonElegir.classList.add("btn", "btn-warning", "mb-2", "mt-2");
buttonElegir.textContent = "Elegir";
divElegir.appendChild(buttonElegir);

const divResultado = document.createElement("DIV");
divResultado.setAttribute("id", `divResultado`);
divResultado.classList.add("box_container", "box_shadow_container");
divResultado.style = "padding: 30px;";

/* EVENTOS */
/* EVENTO SELECCION DE TIPO */
document.addEventListener("DOMContentLoaded", domCargado);
btnGuardar.addEventListener("click", () => {
  preguntarNombre(inputNombre.value)
});
buttonElegir.addEventListener("click", elegirTipo);

/* FUNCIONES */

function domCargado(){

  const resumenBatallas = JSON.parse(localStorage.getItem("resumenBatallas"));
  if (resumenBatallas) {
    Swal.fire({
      title: "Oohh... Ya has jugado anteriomente",
      text: "¿Deseas continar la partida anteriror o quieres iniciar una partida nueva?",
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: `Reiniciar`,
      cancelButtonColor: '#d33',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        resumeBatles = resumenBatallas;
        vict.textContent = `${resumeBatles.wins}`;
        derr.textContent = `${resumeBatles.loses}`;
        total.textContent = `${resumeBatles.total}`;
        userLocalStorage = localStorage.getItem("username");
        preguntarNombre(userLocalStorage);
        return;
      }
      localStorage.removeItem("resumenBatallas");
      localStorage.removeItem("username");
      
      return;
    })
  }
}

function preguntarNombre(input){
  if (validarVacio(input)){
    sweetAlertDinamic("error", "Campo vacio", "Tu nombre de maestro pokemon no puede estar vacio")
    return;
  }

  if (!userLocalStorage){
    sweetAlert(`¿Estas seguro de guardar el nombre ${inputNombre.value}?`, guardarNombre);  
    return;
  } 
  inputNombre.value = userLocalStorage;
  guardarNombre()
}

function guardarNombre() {
  const h2Saludo = document.createElement("H2");
  h2Saludo.textContent = `Hola maestro Pokemon `;
  h2Saludo.classList.add("text-center", "mt-2", "text-uppercase");
  const spanSaludo = document.createElement("SPAN");
  spanSaludo.textContent = inputNombre.value;
  spanSaludo.classList.add("fw-bold");
  h2Saludo.appendChild(spanSaludo);


  mainContent.appendChild(h2Saludo);


  btnGuardar.style.display = "none";
  inputNombre.setAttribute("disabled", "true");

  mainContent.appendChild(divElegir);
}

async function elegirTipo() {

    eleccion = parseInt(selectElegir.value);
    if (eleccion === 1) {
      poke = pokemon1;
      tipopokemon = "Agua";
      eleccionapi = await getDataFetch(pokemon1) 
      imgpokeapi = eleccionapi.sprites.front_default;
    } else if (eleccion === 2) {
      poke = pokemon2;
      tipopokemon = "Planta";
      eleccionapi = await getDataFetch(pokemon2)
      imgpokeapi = eleccionapi.sprites.front_default;
    } else if (eleccion === 3) {
      poke = pokemon3;
      tipopokemon = "Fuego";
      eleccionapi = await getDataFetch(pokemon3)
      imgpokeapi = eleccionapi.sprites.front_default;
  }

  const divmensaje1 = document.createElement("DIV");
  divmensaje1.setAttribute("id", "divmensaje1");
  divmensaje1.classList.add("box_container" , "box_shadow_container");
  mainContent.appendChild(divmensaje1);

  const tipomsg1 = document.createElement("P");
  tipomsg1.classList.add("text-center", "mt-2", "text-uppercase");
  if (eleccion === 1) {
    tipomsg1.innerHTML = `El pokemon que seleccionaste de tipo: <span class="fw-bold water_type">${tipopokemon}</span> es: <span class="fw-bold water_type">${poke}</span>`;
  } else if (eleccion === 2) {
    tipomsg1.innerHTML = `El pokemon que seleccionaste de tipo: <span class="fw-bold grass_type">${tipopokemon}</span> es: <span class="fw-bold grass_type">${poke}</span>`;
  } else if (eleccion === 3) {
    tipomsg1.innerHTML = `El pokemon que seleccionaste de tipo: <span class="fw-bold fire_type">${tipopokemon}</span> es: <span class="fw-bold fire_type">${poke}</span>`;
  }


  divmensaje1.appendChild(tipomsg1);

  const divImg = document.createElement("DIV");
  divImg.setAttribute("id", "divImg");
  divmensaje1.appendChild(divImg);

  const imgpoke = document.createElement("IMG");
  imgpoke.setAttribute("id", "imgpoke");
  imgpoke.setAttribute("src", imgpokeapi);
  imgpoke.setAttribute("width", "150px");
  divImg.appendChild(imgpoke);


  divElegir.style.display = "none";

  const divbutton1 = document.createElement("DIV");
  divbutton1.setAttribute("id", "divbutton1");
  divmensaje1.appendChild(divbutton1);

  const button1 = document.createElement("BUTTON");
  button1.setAttribute("id", "button1");
  button1.textContent = "continuar";
  button1.classList.add("btn", "btn-warning", "mb-2", "mt-2");
  divbutton1.appendChild(button1);

  button1.addEventListener("click", tipomsg2);

  
}

function tipomsg2() {
  const divmensaje2 = document.createElement("DIV");
  divmensaje2.setAttribute("id", "divmensaje2");
  mainContent.appendChild(divmensaje2);

  const tipomsg2 = document.createElement("label");
  tipomsg2.setAttribute("class", "tipomsg2");
  tipomsg2.innerHTML = `Los poderes asignados a tu pokemon  son ${asignarPowers()}`;
  divmensaje1.appendChild(tipomsg2);

  button1.style.display = "none";

  const divNombrePoke = document.createElement("DIV");
  divNombrePoke.setAttribute("id", "divNombrePoke");
  divNombrePoke.classList.add("box_container" , "box_shadow_container");
  mainContent.appendChild(divNombrePoke);

  const labelNombrePoke = document.createElement("LABEL");
  labelNombrePoke.setAttribute("for", "inputNombrePoke");
  labelNombrePoke.textContent = "Asignale un nombre de tu pokemon ";
  divNombrePoke.appendChild(labelNombrePoke);

  const inputNombrePoke = document.createElement("INPUT");
  inputNombrePoke.setAttribute("type", "text");
  inputNombrePoke.setAttribute("id", "inputNombrePoke");
  inputNombrePoke.setAttribute("placeholder", "Nombre");
  inputNombrePoke.classList.add("input" , "form-control");
  divNombrePoke.appendChild(inputNombrePoke);

  const buttonNombrePoke = document.createElement("BUTTON");
  buttonNombrePoke.setAttribute("id", "buttonNombrePoke");
  buttonNombrePoke.classList.add("btn", "btn-warning", "mb-2", "mt-2");
  buttonNombrePoke.textContent = "Aceptar";
  divNombrePoke.appendChild(buttonNombrePoke);

  buttonNombrePoke.addEventListener("click",  () => { guardarNombrePokemon(inputNombrePoke.value) }
    );
}

/* divNombrePoke.style.display = "none" */
//powers

function asignarPowers() {
  if (eleccion === 1) {
    powers = randomElements(waterPowers, 3);
  } else if (eleccion === 2) {
    powers = randomElements(plantPowers, 3);
  } else if (eleccion === 3) {
    powers = randomElements(firePowers, 3);
  }

  let text = "<br>";


  powers.forEach((power) => {
    text += power + "<br>";
  });

  return text;
}

function guardarNombrePokemon(input) {

    if (validarVacio(input)){
      sweetAlertDinamic("error", "Campo vacio", "El nombre de tu pokemon no puede estar vacio")
      return;
    }
  	sweetAlert(`Quieres confirmar ${inputNombrePoke.value} como el nombre para tu pokemon?`, pedirBatallas);
  }


function pedirBatallas() {
  const divbattle = document.createElement("DIV");
  divbattle.setAttribute("id", "divbattle");
  divbattle.classList.add("box_container" , "box_shadow_container");
  mainContent.appendChild(divbattle);

  const labelBatallas = document.createElement("LABEL");
  labelBatallas.setAttribute("for", "inputBatallas");
  labelBatallas.classList.add("question");
  labelBatallas.innerHTML = `¿Cuantas Batallas quieres que tu <span class="fw-bold">${inputNombrePoke.value}</span> luche?`;
  divbattle.appendChild(labelBatallas);

  divNombrePoke.style.display = "none";

  const inputBatallas = document.createElement("INPUT");
  inputBatallas.setAttribute("type", "number");
  inputBatallas.setAttribute("min", "1");
  inputBatallas.setAttribute("max", "10");
  inputBatallas.setAttribute("placeholder", "Batallas");
  inputBatallas.classList.add("input" , "form-control");
  inputBatallas.setAttribute("id", "inputBatallas");
  divbattle.appendChild(inputBatallas);

  const buttonBatallas = document.createElement("BUTTON");
  buttonBatallas.setAttribute("id", "buttonBatallas");
  buttonBatallas.classList.add("btn", "btn-warning", "mb-2", "mt-2");
  buttonBatallas.textContent = "Luchar";
  divbattle.appendChild(buttonBatallas);

  buttonBatallas.addEventListener("click",() => { 
    aleatorio(inputBatallas.value) });
}



async function aleatorio(input) {
  if (validarVacio(input)){
    sweetAlertDinamic("error", "Campo vacio", "El numero de batallas no puede estar vacio")
    return;
  }
  peleas = inputBatallas.value;
  let peleasTotalActual = resumeBatles.total;
  resumeBatles.total = parseInt(peleas) + peleasTotalActual;

  let result;

  mainContent.appendChild(divResultado);
  limpiarHtml(divResultado);

  for (let index = 0; index < peleas; index++) {
    setTimeout(() => {
      result = resultBatalla();
      switch (result) {
        case 1:
          imprimirPantalla(index, "Ganado" , result);
          resumeBatles.wins++;
          break;
        case 2:
          imprimirPantalla(index, "Perdido" , result);
          resumeBatles.loses++;
          break;
      }
      console.log(resumeBatles);
      vict.textContent = `${resumeBatles.wins}`;
      derr.textContent = `${resumeBatles.loses}`;
      total.textContent = `${resumeBatles.total}`;
    } , 6000 * index);
  }
  guardarLocalStorage( "resumenBatallas" , resumeBatles);
  guardarLocalStorage( "username" , inputNombre.value);

}



function resultBatalla() {
  const result = Math.floor(Math.random() * 2) + 1;
  return result;
}

function imprimirPantalla(index, resultado, result) {
  const divImgResultado = document.createElement("DIV");
  renderizarGif(eleccion, resultado, divImgResultado, index)
  divResultado.appendChild(divImgResultado);
}

//!Funcion para extraer un aleatorio de un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function randomElements(array, quantity) {
  return shuffleArray([...array]).slice(0, quantity);
}

//!limpiar html
function limpiarHtml(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

async function getDataFetch(namePokemon) {
  const fetchData = fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon.toLowerCase()}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return fetchData;
}

//! Funcion para mostrar alertas
function sweetAlert(titulo, funcion) {
  Swal.fire({
    title: titulo,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    denyButtonText: `No guardar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      funcion();
      return;
    } 
    return;
  })
}



function sweetAlertDinamic(icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  })
}



//! Funcion para guardar en el localstorage
function guardarLocalStorage(name, data) {
  if (typeof data === "string") {
    localStorage.setItem(name, data);
    return;
  }
  localStorage.setItem(name, JSON.stringify(data));
}

//!funcion para validar vacios
function validarVacio(input) {
  if (input === "") {
    return true;
  } else {
    return false;
  }
}

//! Funcion que renderiza el gif por batalla
function renderizarGif(eleccion ,resultado, divPadre, index) {

  const divGif = document.createElement("DIV");
  divGif.setAttribute("id", `divGif${index}`);
  const pBattle = document.createElement("P");
  pBattle.setAttribute("id", `pBattle${index}`);
  const pBatallando = document.createElement("P");
  pBatallando.setAttribute("id", `pBatallando${index}`);
  pBatallando.textContent = "En Pelea...";
  pBatallando.style = "color: black; font-size: 20px;  text-align: center; font-family: Pokemon";
  divPadre.appendChild(pBatallando);

  const imgGif = document.createElement("IMG");
  imgGif.setAttribute("alt", "gif");
  imgGif.style = "width: 250px; height: 250px; display: block; margin-left: auto; margin-right: auto;";
  divGif.appendChild(imgGif);

  if ( eleccion === 1 ){
    imgGif.setAttribute("src", objSquirtleImg.batleImg);
    TimingGif(objSquirtleImg, resultado, index);
  } else if ( eleccion === 2 ){
    imgGif.setAttribute("src", objBulbasaurImg.batleImg);
    TimingGif(objBulbasaurImg, resultado, index);
  } else if ( eleccion === 3 ){
    imgGif.setAttribute("src", objCharmanderImg.batleImg);
    TimingGif(objCharmanderImg, resultado, index);
  }

  function TimingGif(obj , res, ind) {
    setTimeout(() => {
      if (res === "Ganado") {
        imgGif.setAttribute("src", obj.winImg);
        pBattle.classList.add("win");
        pBatallando.remove();
        pBattle.innerHTML = `Tu pokemon ha ganado la batalla numero ${ind + 1}`;
      } else {
        imgGif.setAttribute("src", obj.loseImg);
        pBattle.classList.add("lose");
        pBatallando.remove();
        pBattle.innerHTML = `Tu pokemon ha perdido la batalla numero ${ind + 1}`;
      }
    } , 4000);
  }


  divPadre.appendChild(divGif);
  divPadre.appendChild(pBattle);
}