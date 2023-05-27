enum Signo {
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
  variablesArtificiales: variablesArtificiales;
}

type variablesArtificiales = { S: number, H: number, R: number }

export type iteracion = {
  ecuaciones: Array<EcuacionPrimal>;
  columnaPivote: Array<Number>;
  filaPivote: EcuacionPrimal;
  ZjCj: Array<Number>;
  Z: number;
}

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

function calcularValoresArtificiales(signo: Signo): variablesArtificiales {
  let vars: variablesArtificiales = {
    S: 0,
    H: 0,
    R: 0
  }

  if (signo === Signo.MenorQue) vars.H = 1
  if (signo === Signo.MayorQue) { vars.S = -1; vars.R = 1 }
  if (signo === Signo.Igual) vars.R = 1

  return vars
}



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

export function test() {
  console.log("inicial", obj1, obj2, obj3)
  console.log("primal", obj1_1, obj2_1, obj3_1)

}

