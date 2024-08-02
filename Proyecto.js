let promedios = [];

let juegos = [
  {
    nombre: 'League of Legends',
    promedios: [],
  },
  {
    nombre: 'Dota 2',
    promedios: [],
  },
  {
    nombre: 'Counter Strike 2',
    promedios: [],
  },
  {
    nombre: 'Valorant',
    promedios: [],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  let juegosLS = localStorage.getItem('juegos');
  if (juegosLS) {
    juegos = JSON.parse(juegosLS);
  }
  main();
});

function obtenerJuego() {
  let texto = '';
  let i;
  for (i = 0; i < juegos.length; i++) {
    texto += '* ' + juegos[i].nombre + '\n';
  }

  let juegoSeleccionado = prompt(texto + 'Selecciona una opción');

  juegoSeleccionado = juegoSeleccionado.replaceAll(' ', '').toLowerCase();

  let juegoEncontrado = juegos.find(
    juego => juego.nombre.replaceAll(' ', '').toLowerCase() == juegoSeleccionado
  );

  if (juegoEncontrado) {
    return juegos.indexOf(juegoEncontrado);
  } else {
    return obtenerJuego();
  }
}

function mostrarResultados() {
  let texto = 'Tus promedios son: \n';

  for (let i = 0; i < juegos.length; i++) {
    texto += juegos[i].nombre + ': ';

    if (juegos[i].promedios.length > 0) {
      texto += juegos[i].promedios;
      let buenosPromedios = juegos[i].promedios.filter(
        promedio => promedio > 2
      );
      if (buenosPromedios) {
        texto +=
          ' (Cantidad de buenos promedios: ' + buenosPromedios.length + ')';
      }
    } else {
      texto += 'No hay datos cargados';
    }

    texto += '\n';
  }
  alert(texto);
  main();
}

function renderizarPromedios() {
  const listaDeJuegos = document.querySelector('#listaJuegos');

  juegos = JSON.parse(localStorage.getItem('juegos'));

  for (juego of juegos) {
    /**
     * <li>
     *    <h3>Nombre juego</h3>
     *    <span> 3.5, 4.3</span>
     * </li>
     */

    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');

    h3.textContent = juego.nombre;

    for (promedio of juego.promedios) {
      span.textContent += '* ' + promedio + ' ';
    }

    li.appendChild(h3);
    li.appendChild(span);
    listaDeJuegos.appendChild(li);
  }
}

function guardarJuegos() {
  localStorage.setItem('juegos', JSON.stringify(juegos));
}

function main() {
  let juegoSeleccionado = obtenerJuego();

  const partidasIngresadas = prompt(
    'Ingrese cuantas partidas desea evaluar (min:2 / max:6)'
  );

  let sumatoriadepartidas = 0;
  if (partidasIngresadas < 7 && partidasIngresadas > 1) {
    for (let i = 0; i < partidasIngresadas; i++) {
      sumatoriadepartidas += Number(
        prompt('Ingrese el KDA de la partida ' + (i + 1))
      );
    }
    const calculoDeKDA = sumatoriadepartidas / partidasIngresadas;

    juegos[juegoSeleccionado].promedios.push(calculoDeKDA);

    guardarJuegos();

    let respuesta = prompt('¿Volver al menu? (S/N)').toUpperCase();
    if (respuesta == 'S') {
      main();
    } else {
      renderizarPromedios();
    }
  } else {
    alert(
      'Hay un error con los datos ingresados, por favor reiniciar la pagina...'
    );
  }
}
