import type { Iteracion } from '../services/obj_ecuacion';

export function generarTablaFase1(iteraciones: Array<Iteracion>) {
  //encabezado
  let tabla = ""
  tabla = `<table>
    <thead>
      <tr>
      <th>CJ</th>`
  //CJ
  iteraciones[0].valoresCj.forEach((cj) => {
    tabla += `<th>${cj}</th>`
  })
  tabla += `<th rowspan="2">xb</th><th rowspan="2">bi</th></tr><tr>`;
  tabla += `<th>CX</th>`
  iteraciones[0].variablesArtificialesTexto.forEach((e) => {
    tabla += `<td>${e}</td>`
  })
  tabla += `</tr>`

  //iteraciones
  for (let a = 0; a < iteraciones.length; a++) {
    //matriz interna
    //cada fila
    for (let b = 0; b < iteraciones[0].columnaPivote.length; b++) {
      tabla += `<tr><td>${iteraciones[a].ecuaciones[b].artificial[0]}</td>`;
      //cada columna
      for (var i = 0; i < iteraciones[0].valoresCj.length; i++) {
        tabla += `<td>${iteraciones[a].ecuaciones[b].valores[i]}</td>`;
      }
      tabla += `<td>${iteraciones[a].ecuaciones[b].artificial[1]}</td>`;
      tabla += `<td>${iteraciones[a].ecuaciones[b].resultado}</td></tr>`;
    }
    tabla += `<tr><td>Zj-Cj</td>`
    for (var i = 0; i < iteraciones[0].ZjCj.length; i++) {
      tabla += `<td>${iteraciones[a].ZjCj[i]}</td>`;
    }
    tabla += `<td>Z</td><td>${iteraciones[a].Z}</td></tr>`
  }

  let tablaFase1 = <HTMLElement>document.getElementById('espacioTablaFase1');
  tablaFase1.innerHTML = tabla;
}