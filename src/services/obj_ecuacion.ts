import {
  generarFilas,
} from '../services/filas';

export enum Signo {
  MenorQue = "lt", MayorQue = "gt", Igual = "eq"
}

export type EcuacionInicial = {
  valores: Array<number>;
  signo: Signo;
  resultado: number;
}

export type EcuacionPrimal = {
  valores: Array<number>;
  resultado: number;
  variablesArtificiales: VariablesArtificiales;
}

type VariablesArtificiales = { S: number, H: number, R: number }

export type Iteracion = {
  ecuaciones: Array<Fila>;//matriz, bi, cx y xb
  valoresCj: Array<number>
  columnaPivote: Array<number>;
  indexPivote: Array<number>
  filaPivote: Array<number>;
  ZjCj: Array<number>;
}

export type Fila = {
  valores: Array<number>;
  artificial: [number, string];
  resultado: number
}


function calcularValoresArtificiales(signo: Signo): VariablesArtificiales {
  let vars: VariablesArtificiales = {
    S: 0,
    H: 0,
    R: 0
  }

  if (signo === Signo.MenorQue) vars.H = 1
  if (signo === Signo.MayorQue) { vars.S = -1; vars.R = 1 }
  if (signo === Signo.Igual) vars.R = 1

  return vars
}

export function contarR(arr: Array<EcuacionInicial>): number {
  let cont = 0;
  arr.forEach((e, i) => {
    if (e.signo === Signo.Igual || e.signo === Signo.MayorQue) { cont += 1; }
  })
  return cont;
}

export function contarS(arr: Array<EcuacionInicial>): number {
  let cont = 0;
  arr.forEach((e, i) => {
    if (e.signo === Signo.MayorQue) { cont += 1; }
  })
  return cont;
}

export function contarH(arr: Array<EcuacionInicial>): number {
  let cont = 0;
  arr.forEach((e, i) => {
    if (e.signo === Signo.MenorQue) { cont += 1; }
  })
  return cont;
}

export function IncialAprimal(arr: Array<EcuacionInicial>): Array<EcuacionPrimal> {
  const arrP: Array<EcuacionPrimal> = []
  arr.forEach((e, i) => {
    arrP.push({
      valores: e.valores,
      resultado: e.resultado,
      variablesArtificiales: calcularValoresArtificiales(e.signo)
    })
  })
  return arrP;
}



//añadir params si es max o min y si el resulado es negativo donde todo pasa a ser *(-1)
//si es la primera columnas las inicializa, si no va a gregando cada valor a cada fila

//ecuaionesPrimales = valores a agragar
//filas = filas en proceso de construccion
//n = numero de columnas o items por ecucion o fila
export function ecuacionPrimalAFila(ecuacionesPrimales: Array<number>, filas: Array<Fila>, n: number) {
  if (filas.length === 0) {
    ecuacionesPrimales.forEach((e) => {
      //creador de columnas si es h, r, s y tiene en cuanta en que posicion pone el valor segun el maximo ejm rnumber
      filas.push({
        valores: [e],
        artificial: [0, ""],//aun no lo he puesto
        resultado: 0,
      })
    })
  }
  else {
    filas.forEach((e, i) => {
      e.valores.push(ecuacionesPrimales[i]);
    })
  }
  return filas;
}


//tener en cuenta max o min para voltear Rs y si el resultado es negativo voltear la ecucion
//ecuaciones = todas las ecuaciones primales
//numeroR = cuantas R hay
//numeroS = cuantas S hay
//numeroH = cuantas H hay
//numeroX = cuantas X hay
//lastR = indice donde agregar el valor para las R
//lastS = indice donde agregar el valor para las R
//lastH = indice donde agregar el valor para las R
//signoZ = signo de la ecuacion para ver si es min o max (no en uso)
export function generarColumnas(ecuaciones: Array<EcuacionPrimal>, numeroR: number = 2, lastR = 0, numeroS: number = 1, lastS: number = 0, numeroH: number = 1, lastH: number = 0, columnaActual: number = 0, numeroX: number = 2, signoZ: string = "min"): Array<number> {

  //fila que se va agregando 
  let arr: Array<number> = [];

  arr.length = ecuaciones.length;
  arr.fill(0);
  //agrgar valores de X
  if (columnaActual < numeroX) {
    ecuaciones.forEach((e, i) => {
      arr[i] = e.valores[columnaActual]
    })
  }
  //poner S
  if (columnaActual < (numeroS + numeroX) && columnaActual >= numeroX) {
    arr[lastS] = -1
  }
  //poner R
  if (columnaActual < numeroR + numeroS + numeroX && columnaActual >= numeroS + numeroX) {
    arr[lastR] = 1
  }
  //poner H
  if (columnaActual < numeroH + numeroR + numeroS + numeroX && columnaActual >= numeroS + numeroX + numeroR) {
    arr[lastH] = 1
  }

  return arr;
}

export function generarIteracion(ecuaciones: Array<Fila>, numeroX: number, numeroH: number, numeroR: number, numeroS: number, signoZ: string): Iteracion {

  let valoresCj = generarValoresCj(numeroX, numeroH, numeroR, numeroS, signoZ);
  let valoresZjCj = obtenerZjCj(ecuaciones, valoresCj);
  let columnaPivote = elegirColumnaPivote(signoZ, valoresZjCj, ecuaciones);
  let valoresBi: Array<number> = []
  ecuaciones.forEach((e) => {
    valoresBi.push(e.resultado);
  })
  let iteracion: Iteracion = {
    ecuaciones,
    valoresCj,
    columnaPivote,
    indexPivote: [],
    filaPivote: elegirFilaPivote(valoresBi, columnaPivote, ecuaciones),
    ZjCj: valoresZjCj
  };

  return iteracion;
}

function generarValoresCj(numeroX: number, numeroH: number, numeroR: number, numeroS: number, signoZ: string): Array<number> {
  let valoresCj: Array<number> = [];
  for (let i = 0; i < numeroX; i++) {
    valoresCj.push(0);
  }
  for (let i = 0; i < numeroH; i++) {
    valoresCj.push(0);
  }
  for (let i = 0; i < numeroR; i++) {
    if (signoZ === "min") valoresCj.push(1);
    if (signoZ === "max") valoresCj.push(-1);
  }
  for (let i = 0; i < numeroS; i++) {
    valoresCj.push(0);
  }
  return valoresCj;
}

/* export function generarTabla(IteracionObj: Iteracion) {

  let iteraciones = 0;
  let solucionOptima = false;

  while (!solucionOptima) {
    console.log(`Iteración ${iteraciones}`);

    const variableEntrada = elegircolumnapivote();
    const variableSalida = elegirfilapivote();
    console.log(`Variable de entrada: ${variableEntrada}`);
    console.log(`Variable de salida: ${variableSalida}`);

    Iterar(Iteracion);


    if (SolucionOptima() = true) {
      console.log("Se alcanzó la solución óptima.");
    }

    iteraciones++;
  }
} */


function elegirColumnaPivote(signoZ: string, ZjCj: Array<number>, ecuaciones: Array<Fila>): Array<number> {
  let auxZjCj: Array<number> = [...ZjCj];
  let ZjCjOrdenado = auxZjCj.sort();
  let index = 0;

  if (signoZ === "min") {
    index = ZjCj.indexOf(ZjCjOrdenado[ZjCj.length - 1])
  }
  else {
    index = ZjCj.indexOf(ZjCjOrdenado[0])
  }

  let columnaPivote: Array<number> = []

  ecuaciones.forEach((e) => {
    columnaPivote.push(e.valores[index])
  })

  return columnaPivote;
}



function elegirFilaPivote(resultadosBi: Array<number>, columnaPivote: Array<number>, ecuaciones: Array<Fila>): Array<number> {
  let arrValoresBiDivididoColumnaPivote: Array<number> = []
  for (var i = 0; i < resultadosBi.length; i++) {
    arrValoresBiDivididoColumnaPivote.push(resultadosBi[i] / columnaPivote[i]);
  }
  let aux: Array<number> = arrValoresBiDivididoColumnaPivote;
  aux.sort();
  let menorPositivo = aux.find(i => i >= 0) //menor positivo

  let filaPivote = new Array<number>();

  filaPivote.push(...ecuaciones[arrValoresBiDivididoColumnaPivote.indexOf(menorPositivo || 0)].valores)

  return filaPivote;

  // Lógica para seleccionar la variable de salida
  // Fila con el menor cociente entre bi y el valor correspondiente en la columna de la variable de entrada

  /* const matrizOperable =
  const columnaVariableEntrada = columnapivote;

  let menorCociente = Infinity;

  matrizOperable.forEach((fila) => {

    if (fila[columnaVariableEntrada] !== 0) {
      const cociente = fila.resultado / fila[columnaVariableEntrada];
      if (cociente < menorCociente) {
        menorCociente = cociente;
        filapivote = fila[i];
      }
    }
  }
  ) */

  //return filapivote
};


/* function Iterar(Iteracion: Iteracion.columnaPivote, Iteracion: Iteracion.filaPivote) {

  const matrizOperable = /* Obtener la matriz operable */;
  /*const variables = /* Obtener la lista de variables */;
/*const indicefila = variables.indexOf(filaPivote);
const indicecolumna = variables.indexOf(columnaPivote);

// Paso 2: Dividir la fila pivote por el elemento pivote
const filaPivote = matrizOperable[indicefila];
const elementoPivote = filaPivote[indicecolumna];

for (let i = 0; i < filaPivote.length; i++) {
  filaPivote[i] /= elementoPivote;
}

// Paso 3: Actualizar las demás filas 
for (let i = 0; i < matrizOperable.length; i++) {
  if (i !== indicefila) {
    const filaActual = matrizOperable[i];
    const fa = filaActual[indicecolumna];

    for (let j = 0; j < filaActual.length; j++) {
      filaActual[j] -= fa * filaPivote[j];
    }
  }
}

// Actualizar la lista de variables y sus coeficientes
variables[indicefila] = Iteracion.columnapivote;

for (let i = 0; i < matrizOperable.length; i++) {
  if (i !== indicefila) {
    matrizOperable[i][indicecolumna] = 0;
  }
}


return matrizOperable;
}
*/

//#TODO testear
function obtenerZjCj(matrizOperable: Array<Fila>, valoresCj: Array<number>) {
  const zjCj = [];
  //hastas numero de columnas
  for (let i = 0; i < matrizOperable[0].valores.length; i++) {
    let suma = 0;
    //hasta numero de filas
    for (let j = 0; j < matrizOperable.length; j++) {
      console.log(j);

      console.log(matrizOperable[j].valores[i]);
      console.log(matrizOperable[j].artificial[0]);
      console.log(valoresCj[i]);

      suma += (matrizOperable[j].valores[i] * matrizOperable[j].artificial[0]);
      console.log(suma);

    }
    let auxSuma = suma - valoresCj[i]
    console.log(auxSuma);

    zjCj.push(auxSuma);
  }
  return zjCj;
}

/*
SolucionOptima(zjCj, generarFilas)
{

  const operation = document.getElementById("signoZ").value;

  for (let i = 0; i < zjCj.length;) {
    if (operation == "min") {
      if (zjCj[i] <= 0) {
        SolucionOptima = True
      }
      else {
        SolucionOptima = False
      }
    }

    else {
      if (zjCj[i] > 0) {
        SolucionOptima = True
      }
      else {
        SolucionOptima = False
      }

    }
  }
  return SolucionOptima

}

*/


