
let menu = `
  <select name="signo" id="signo">
  <option value = "lt" > <= </option>
  <option value = "gt" > >= </option>
  <option value = "eq" > = </option>
  </select>`

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
    string += `<td> ${menu} </td><td><input type="number" class="input" id="` + i + variablesRows + `"/></td></tr>`;
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

export function leerMatrix(restrictionsLines: number, variablesRows: number) {

}