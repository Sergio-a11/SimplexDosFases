export function generarInputsZ(values: number) {
  if (values > 0) {
    let Zfunction: string = '';

    for (let i = 0; i < values; i++) {
      Zfunction += `<input type="number" class="input" min="1" id="zx${i + 1}" />X${i + 1}`;
      if (i < values - 1) {
        Zfunction += ` + `
      }
    }

    let espacioHTMLfuncion = <HTMLElement>document.getElementById('zFunction');
    espacioHTMLfuncion.innerHTML = Zfunction;

  }


}


export function leerInputsZ(variables: number): Array<Number> {
  //numero de X = variables
  if (variables > 0) {
    let values = [];
    for (let i = 0; i < variables; i++) {
      let aux = <HTMLInputElement>document.getElementById(`zx${i + 1}`);
      values.push(Number.parseFloat(aux.value));
    }
    console.log(values);
    return values;
    // let espacioHTMLfuncion = <HTMLElement>document.getElementById('zFunction');
    // espacioHTMLfuncion.innerHTML = Zfunction;
  }
  return []
}
