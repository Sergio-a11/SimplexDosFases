import {
  IncialAprimal,
  ecuacionPrimalAFila,
  generarColumnas
} from '../services/obj_ecuacion';
import type { Fila } from '../services/obj_ecuacion';

export function generarFilas(): Array<Fila> {

  let funcionZ: Array<number> = JSON.parse(localStorage.funcionZ) ?? []; //Array of numbers
  let matrizInicial = JSON.parse(localStorage.matrizInicial); // Array of Ecuaciones Inciales
  console.log(matrizInicial);
  let numerosR = (Number.isNaN(Number.parseInt(localStorage.numeroR))) ? 2 : Number.parseInt(localStorage.numeroR);
  let numerosS = (Number.isNaN(Number.parseInt(localStorage.numeroS))) ? 1 : Number.parseInt(localStorage.numeroS);
  let numerosH = (Number.isNaN(Number.parseInt(localStorage.numeroH))) ? 1 : Number.parseInt(localStorage.numeroH);
  let signoZ = localStorage.signoZ;


  let numeroDeColumnas = numerosH + numerosS + numerosR + funcionZ.length;

  //matriz con los datos de que variables artificiales tiene cada ecuaion
  let matrizPrimal = IncialAprimal(matrizInicial);
  //->>TODO--> Array final de filas desde donde construir la tabla
  let matrizOperable: Array<Fila> = [];

  //cantidad de variables artificiles
  let contR: number = 0;
  let contH: number = 0;
  let contS: number = 0;

  //ultimo indice a ubicar
  let lastR: number = 0;
  let lastH: number = 0;
  let lastS: number = 0;


  //columna por columna va iterando y contruyendo de a poco cada fila
  for (let i = 0; i < numeroDeColumnas; i++) {
    //S
    if (i < (numerosS + funcionZ.length) && i >= funcionZ.length) {
      //todos los elementos con S
      let arrAux = matrizPrimal.filter(e =>
        e.variablesArtificiales.S === -1
      )
      lastS = matrizPrimal.indexOf(arrAux[contS]);
      contS += 1;
    }
    //R
    if (i < (numerosR + numerosS + funcionZ.length) && i >= (numerosS + funcionZ.length)) {

      //todos los elementos con R
      let arrAux = matrizPrimal.filter(e =>
        e.variablesArtificiales.R === 1
      )
      //a partir del array anterior que tiene todos los elementos con R,
      // el contador va diciendole a cual buscar el indice de la ecuaion y hay se manda poner la R
      lastR = matrizPrimal.indexOf(arrAux[contR]);
      contR += 1;
      //asignar valores de variables artificiales
      (signoZ === "min") ? matrizOperable[lastR].artificial[0] = 1 : matrizOperable[lastR].artificial[0] = -1
      matrizOperable[lastR].artificial[1] = `R${contR}`
    }
    //H
    if (i < (numerosH + numerosR + numerosS + funcionZ.length) && i >= (numerosS + funcionZ.length + numerosR)) {
      //todos los elementos con H
      let arrAux = matrizPrimal.filter(e =>
        e.variablesArtificiales.H === 1
      )
      lastH = matrizPrimal.indexOf(arrAux[contH]);
      contH += 1;
      //asignar valores de variables artificiales
      matrizOperable[lastH].artificial[0] = 0;
      matrizOperable[lastH].artificial[1] = `H${contH}`
    }
    //se van agregando las filas
    matrizOperable = ecuacionPrimalAFila(
      generarColumnas(
        matrizPrimal,
        numerosR,
        lastR,
        numerosS,
        lastS,
        numerosH,
        lastH,
        i,
        funcionZ.length,
        signoZ
      ),
      matrizOperable,
      numeroDeColumnas
    );
  }

  //agregar resultado o bi
  matrizOperable.forEach((e, i) => {
    e.resultado = matrizPrimal[i].resultado;
  })

  console.log(matrizOperable);
  return matrizOperable;
}

