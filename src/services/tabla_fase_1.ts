import type { EcuacionInicial, Iteracion } from '../services/obj_ecuacion';
import { Signo } from '../services/obj_ecuacion';

export function generarFuncionZyMatrizInicial() {
  let matrizInicial: Array<EcuacionInicial> = JSON.parse(localStorage.matrizInicial);
  let funcionZ: Array<number> = JSON.parse(localStorage.funcionZ);
  let signoZ: string = localStorage.signoZ;
  let div = `<p class="titulo">Funcion Z : ${signoZ}</p>`
  for (let i = 0; i < funcionZ.length; i++) {
    div += `<input type="number" class="input-after" disabled value="${funcionZ[i]}" /> X${i + 1}`;
    if (i < funcionZ.length - 1) {
      div += ` + `
    }
  }
  div += `<p class="titulo">Estado Inicial</p>`;
  div += `<table>`;
  for (let i = 0; i < matrizInicial.length; i++) {
    div += `<tr>`;
    for (let j = 0; j < matrizInicial[0].valores.length; j++) {
      div += `<td><input type="text" class="input-after" disabled value="${matrizInicial[i].valores[j]}"> X${j + 1}`;
      if (j < matrizInicial[0].valores.length - 1) {
        div += ` + `
      }
      div += `</td>`
    }
    div += `<td> ${retornarSigno(matrizInicial[i].signo)} </td><td><input type="text" class="input-after" disabled value="${matrizInicial[i].resultado}"/></td></tr>`;
  }
  div += `</table>`;

  let espacioDiv = <HTMLElement>document.getElementById('ecuaciones');
  espacioDiv.innerHTML = div;
  console.log(div);


}

function retornarSigno(signo: Signo): string {
  let x = ""
  if (Signo.Igual === signo) x = "="
  if (Signo.MenorQue === signo) x = "<="
  if (Signo.MayorQue === signo) x = ">="
  return x
}

export function generarTablaFase1(iteraciones: Array<Iteracion>, div: string) {
  //encabezado
  let tabla = ""
  tabla = `<table class="tabla-fase-1">
    <thead>
      <tr>
      <th class="cj">CJ</th>`
  //CJ
  iteraciones[0].valoresCj.forEach((cj) => {
    tabla += `<th class="valores-cj">${cj}</th>`
  })
  tabla += `<th rowspan="2" class="xb">xb</th><th rowspan="2" class="bi">bi</th></tr><tr>`;
  tabla += `<th class="cx">CX</th>`
  iteraciones[0].variablesArtificialesTexto.forEach((e) => {
    tabla += `<td class="valores-cj">${e}</td>`
  })
  tabla += `</tr>`

  //iteraciones
  for (let a = 0; a < iteraciones.length; a++) {
    //matriz interna
    //cada fila
    for (let b = 0; b < iteraciones[0].columnaPivote.length; b++) {
      tabla += `<tr><td class="valor-var-artificial" >${iteraciones[a].ecuaciones[b].artificial[0]}</td>`;
      //cada columna
      for (var i = 0; i < iteraciones[0].valoresCj.length; i++) {
        tabla += `<td class="celda ${iteraciones[a].indexPivote[0] === b && a < iteraciones.length - 1 ? "pivote" : ""} ${iteraciones[a].indexPivote[1] === i && a < iteraciones.length - 1 ? "pivote" : ""}">${iteraciones[a].ecuaciones[b].valores[i]}</td>`;
      }
      tabla += `<td class="letra-var-artificial">${iteraciones[a].ecuaciones[b].artificial[1]}</td>`;
      tabla += `<td class="valor-bi">${iteraciones[a].ecuaciones[b].resultado}</td></tr>`;
    }
    tabla += `<tr><td class="zj-cj">Zj-Cj</td>`
    for (var i = 0; i < iteraciones[0].ZjCj.length; i++) {
      tabla += `<td class="valores-zj-cj">${iteraciones[a].ZjCj[i]}</td>`;
    }
    tabla += `<td class="z">Z</td><td class="valor-z">${iteraciones[a].Z}</td></tr>`
  }

  let tablaFase1 = <HTMLElement>document.getElementById(div);
  tablaFase1.innerHTML = tabla;
}