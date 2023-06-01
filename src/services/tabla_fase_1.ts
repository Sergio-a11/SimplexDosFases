import type { Iteracion } from '../services/obj_ecuacion';

export function generarTablaFase1(iteraciones: Array<Iteracion>) {
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
  tabla += `<th rowspan="2" class="xb" >xb</th><th rowspan="2" class="bi">bi</th></tr><tr>`;
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
        tabla += `<td class="celda">${iteraciones[a].ecuaciones[b].valores[i]}</td>`;
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

  let tablaFase1 = <HTMLElement>document.getElementById('espacioTablaFase1');
  tablaFase1.innerHTML = tabla;
}