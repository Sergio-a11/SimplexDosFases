import type { EcuacionInicial } from "./obj_ecuacion";
import { Signo } from "./obj_ecuacion";



function menuSigno(i: number = 0): string {
  return `
  <select name="signo" id="signo${i}">
  <option value = "lt" > <= </option>
  <option value = "gt" > >= </option>
  <option value = "eq" > = </option>
  </select>`;
}

export function createMatrix(restrictionsLines: number, variablesRows: number) {

  let string = `<table id="estadoPrePrimal">`;
  for (let i = 0; i < restrictionsLines; i++) {
    string += `<tr>`;
    for (let j = 0; j < variablesRows; j++) {
      string +=
        `<td><input type="number" class="input" id="` + i + j + `"/>X${j + 1}`;
      if (j < variablesRows - 1) {
        string += ` + `
      }
      string += ` </td>`
    }
    string += `<td> ${menuSigno(i)} </td><td><input type="number" class="input" id="` + i + variablesRows + `"/></td></tr>`;
  }
  string += `</table>`;

  let matriz = <HTMLElement>document.getElementById('matriz');
  matriz.innerHTML = string;

}

export function estadoBoton() {
  let button = <HTMLButtonElement>document.getElementById('botonGenerarMatriz');
  let restricciones = <HTMLInputElement>document.getElementById('txtRestriction');
  let variables = <HTMLInputElement>document.getElementById('txtvariables');
  if (restricciones.value.length > 0 && variables.value.length > 0) {
    button.disabled = false;
  }
}

export function leerMatrix(restrictionsLines: number, variablesRows: number): Array<EcuacionInicial> {
  let entrada: Array<EcuacionInicial> = []
  let inputAux: HTMLInputElement;
  for (let i = 0; i < restrictionsLines; i++) {
    const arrayEcu: Array<number> = []; //array donde se almacenan los valores de X
    let resulado = 0; //el resultado de la ecuacion
    let signo: HTMLSelectElement //signo de la ecuacion
    //lectura de inputs
    for (let j = 0; j < variablesRows; j++) {
      //valores de X
      inputAux = <HTMLInputElement>document.getElementById(`${i}${j}`);
      arrayEcu.push(Number(inputAux.value) ?? 0);
    }
    //guardar el resultado de la ecuacion en un lugar aparte
    inputAux = <HTMLInputElement>document.getElementById(`${i}${variablesRows}`);
    //Leer y convertir el signo de la ecuacion
    signo = <HTMLSelectElement>document.getElementById(`signo${i}`)
    let auxSingo: Signo = Signo.Igual;
    if (signo.value === Signo.Igual) auxSingo = Signo.Igual;
    if (signo.value === Signo.MenorQue) auxSingo = Signo.MenorQue;
    if (signo.value === Signo.MayorQue) auxSingo = Signo.MayorQue;

    //crear la ecuacion de forma inicial
    let entradaAux: EcuacionInicial = {
      valores: arrayEcu,
      signo: auxSingo,
      resultado: Number(inputAux.value)
    }
    //validar ecuaion negativa
    if (entradaAux.resultado < 0) {
      entradaAux.valores = entradaAux.valores.map(x => x * -1);
      entradaAux.resultado = entradaAux.resultado * -1;
      (entradaAux.signo === Signo.MenorQue) ? entradaAux.signo = Signo.MayorQue : entradaAux.signo = Signo.MenorQue
    }
    //agregar ecuacion
    entrada.push(entradaAux);
  }
  //devolver array de ecuaciones
  return entrada;
}