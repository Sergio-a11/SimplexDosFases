import type { Iteracion } from '../services/obj_ecuacion';
import { eliminarReferenciaIteracion } from '../services/obj_ecuacion';


export function faseDos(iteracion: Iteracion, signoZ: string): Iteracion {

  let numerosR = Number.isNaN(Number.parseInt(localStorage.numeroR)) ? 0 : Number.parseInt(localStorage.numeroR);
  console.log(iteracion);
  let indexR = (signoZ === "min") ? iteracion.valoresCj.findIndex(a => a === 1) : iteracion.valoresCj.findIndex(a => a === -1)
  let primeraIteracionFase2 = eliminarReferenciaIteracion(iteracion)

  console.log(indexR);
  primeraIteracionFase2.ZjCj.push(...iteracion.ZjCj);
  primeraIteracionFase2.ZjCj.splice(indexR, numerosR);
  primeraIteracionFase2.variablesArtificialesTexto.splice(indexR, numerosR);
  primeraIteracionFase2.valoresCj.splice(indexR, numerosR);
  primeraIteracionFase2.filaPivote.splice(indexR, numerosR);
  primeraIteracionFase2.ecuaciones.forEach(filas => {
    filas.valores.splice(indexR, numerosR)
  });

  let funcionZ: Array<number> = JSON.parse(localStorage.funcionZ) ?? [];

  funcionZ.forEach((e, i) => {
    if (!primeraIteracionFase2.ecuaciones[i].artificial[1].includes("X")) {
      primeraIteracionFase2.ecuaciones[i].artificial[0] = 0
    }
    else {
      primeraIteracionFase2.ecuaciones[i].artificial[0] = e
    }
  })
  let arr: Array<number> = [];

  arr.length = primeraIteracionFase2.ZjCj.length;
  arr.fill(0);
  console.log(arr.length);

  //agrgar valores de X

  funcionZ.forEach((e, i) => {
    arr[i] = e
  });

  primeraIteracionFase2.valoresCj = arr;
  //iterar(iteracion);
  console.log(primeraIteracionFase2);
  return primeraIteracionFase2;
}







