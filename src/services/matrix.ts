
let menu = `
  <select name="signo" id="signo">
  <option value = "lq" > <= </option>
  <option value = "gq" > >= </option>
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
        string += `+`
      }
      string += ` </td>`
    }
    string += `<td>${menu}</td><td><input type="number" class="input" id="` + i + variablesRows + `"/></td></tr>`;
  }
  string += `</table>`;

  let matriz = <HTMLElement>document.getElementById('matriz');
  matriz.innerHTML = string;

}
