export enum Signo {
  MenorQue = "lt", MayorQue = "gt", Igual = "eq"
}

export type EcuacionInicial = {
  valores: Array<Number>;
  signo: Signo;
  resultado: number;
}

export type EcuacionPrimal = {
  valores: Array<Number>;
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
  artificial: [number, string]
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
export function ecuacionPrimalAFila(ecuacion: EcuacionPrimal, rNumber: number = 2, signoZ: string = "min"): Fila {
  let elementos: Array<Number> = []
  elementos.push(...ecuacion.valores)
  elementos.push(ecuacion.variablesArtificiales.S)
  elementos.push(ecuacion.variablesArtificiales.R)
  elementos.push(ecuacion.variablesArtificiales.H)
  // for (let i = 0; i < rNumber; i++) {
  //   let aux: Array<number> = []
  //   aux.length = rNumber;
  //   aux.fill(0)
  //   aux[i] = 1;//valr de R
  //   elementos.push(...aux);
  //   aux[i] = 0;
  //   //console.log(aux)
  // }

  //let artificial = []
  let fila: Fila = {
    valores: elementos,
    artificial: [0, ""]
  }

  if (ecuacion.variablesArtificiales.H === 1) { fila.artificial[0] = 0; fila.artificial[1] = "H" }
  if (ecuacion.variablesArtificiales.R === 1) { fila.artificial[0] = ecuacion.variablesArtificiales.R; fila.artificial[1] = "R" }
  if (ecuacion.variablesArtificiales.S === -1) { fila.artificial[0] = 0; fila.artificial[1] = "S" }


  return fila
}