import type { Iteracion } from '../services/obj_ecuacion';
import { eliminarReferenciaIteracion } from '../services/obj_ecuacion';


export function faseDos(iteracion: Iteracion): Iteracion {

  let primeraIteracionFase2 = eliminarReferenciaIteracion(iteracion)

  let numerosR = Number.isNaN(Number.parseInt(localStorage.numeroR)) ? 0 : Number.parseInt(localStorage.numeroR);
  let indexR = primeraIteracionFase2.valoresCj.findIndex(a => a === 1)
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
    primeraIteracionFase2.ecuaciones[i].artificial[0] = e
  })
  let arr: Array<number> = [];

  arr.length = iteracion.ZjCj.length;
  arr.fill(0);
  //agrgar valores de X

  funcionZ.forEach((e, i) => {
    arr[i] = e
  });

  primeraIteracionFase2.valoresCj = arr;
  //iterar(iteracion);
  console.log(primeraIteracionFase2);
  return primeraIteracionFase2;
}







