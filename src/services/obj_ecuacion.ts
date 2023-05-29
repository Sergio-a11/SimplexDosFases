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

export type iteracion = {
  ecuaciones: Array<EcuacionPrimal>;
  columnaPivote: Array<Number>;
  filaPivote: EcuacionPrimal;
  ZjCj: Array<Number>;
  Z: number;
}

export type Fila = {
  valores: Array<Number>;
  artificial: [number, string];
  resultado: number
}

/* //testing
const obj1: EcuacionInicial = {
  valores: [3, 1],
  signo: Signo.Igual,
  resultado: 3
}
const obj2: EcuacionInicial = {
  valores: [4, 3],
  signo: Signo.MayorQue,
  resultado: 6
}
const obj3: EcuacionInicial = {
  valores: [1, 2],
  signo: Signo.MenorQue,
  resultado: 4
}
//testing */

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


/* //testing
const obj1_1: EcuacionPrimal = {
  valores: obj1.valores,
  resultado: obj1.resultado,
  variablesArtificiales: calcularValoresArtificiales(obj1.signo)
}


const obj2_1: EcuacionPrimal = {
  valores: obj2.valores,
  resultado: obj2.resultado,
  variablesArtificiales: calcularValoresArtificiales(obj2.signo)
}

const obj3_1: EcuacionPrimal = {
  valores: obj3.valores,
  resultado: obj3.resultado,
  variablesArtificiales: calcularValoresArtificiales(obj3.signo)
}
//testing */


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


//tener en cuneta max o min para voltear Rs y si el resultado es negativo voltear la ecucion
//ecuaciones = todas las ecuaciones primales
//numeroR = cuantas R hay
//numeroS = cuantas S hay
//numeroH = cuantas H hay
//numeroX = cuantas X hay
//lastR = indice donde agregar el valor para las R
//lastS = indice donde agregar el valor para las R
//lastH = indice donde agregar el valor para las R
//signoZ = signo de la ecuaion para ver si es min o max (no en uso)
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
