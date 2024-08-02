const cantidad_promedios_input = document.querySelector('#cantidad');
const KDAs_container = document.querySelector('#KDAs-container');
const calcular_btn = document.querySelector('#calcular-btn');
const juego_input = document.querySelector('#juego-input');
const promedios_anteriores_container = document.querySelector(
  '#promedios-anteriores'
);

juegos = {};

document.addEventListener('DOMContentLoaded', () => {
  loadJuegos();
  renderPromediosAnteriores();
});

cantidad_promedios_input.addEventListener('change', e => {
  renderKDAInputs(e.target.value);
});

calcular_btn.addEventListener('click', () => {
  calcularPromedioKDAs();
});

function loadJuegos() {
  ls_juegos = localStorage.getItem('juegos') || '{}';
  juegos = JSON.parse(ls_juegos);
}

function saveJuegos() {
  localStorage.setItem('juegos', JSON.stringify(juegos));
}

function renderPromediosAnteriores() {
  promedios_anteriores_container.innerHTML = '';
  const promedios_anteriores = [];

  for (juego of Object.keys(juegos)) {
    promedios_anteriores.push(createPromediosContainer(juego));
  }

  for (promedio_anterior of promedios_anteriores) {
    promedios_anteriores_container.appendChild(promedio_anterior);
  }
}

function createPromediosContainer(juego) {
  const li = document.createElement('li');

  li.textContent = juego + ': ' + juegos[juego];

  return li;
}

function createKDAInput(className) {
  const elem = document.createElement('input');
  elem.type = 'number';
  elem.min = 0;
  elem.placeholder = className;
  elem.classList.add(className);
  return elem;
}

function renderKDAInputs(cantidad) {
  KDAs_container.innerHTML = '';

  for (let i = 0; i < cantidad; i++) {
    const li = document.createElement('li');
    const K = createKDAInput('K');
    const D = createKDAInput('D');
    const A = createKDAInput('A');

    li.classList.add('KDA');

    li.appendChild(K);
    li.appendChild(D);
    li.appendChild(A);

    KDAs_container.appendChild(li);
  }
}

function sumarArray(arr) {
  let contador = 0;

  for (n of arr) {
    contador += n;
  }

  return contador;
}

function calcularPromedio(numeros) {
  return (sumarArray(numeros) / numeros.length).toFixed(1);
}

function calcularPromedioKDAs() {
  const KDAs = document.querySelectorAll('.KDA');
  const promedios = [];

  for (KDA of KDAs) {
    let K = Number(KDA.querySelector('input.K').value);
    let D = Number(KDA.querySelector('input.D').value);
    let A = Number(KDA.querySelector('input.A').value);

    if (D === 0) D = 1;

    let promedio = (K + A) / D;

    promedios.push(promedio);
  }

  let promedio = calcularPromedio(promedios);

  if (!juegos[juego_input.value]) juegos[juego_input.value] = [];

  console.log(juegos[juego_input.value], promedios);
  juegos[juego_input.value].push(promedio);

  saveJuegos();
  renderPromediosAnteriores();
}
