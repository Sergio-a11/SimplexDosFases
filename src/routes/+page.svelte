<script lang="ts">
	let enable = false; //activar boton de genrar calculo
	import InputRestrictions from '../components/Method/input-restrictions.svelte';
	import ButtonGenerateMatrix from '../components/Method/button-generate-matrix.svelte';
	import { createMatrix, leerMatrix } from '../services/matrix';
	import { generarInputsZ, leerInputsZ } from '../services/Z_funtion';
	import { contarR, contarS, contarH } from '../services/obj_ecuacion';

	let restricciones: number = 0;
	let variables: number = 0;

	//lee las restricciones y crea la matriz
	function handleRestriction(event: {
		detail: { restrictions: any; variables: any };
	}) {
		restricciones = event.detail.restrictions ?? 2;
		variables = event.detail.variables ?? 2;
		createMatrix(restricciones, variables);
		generarInputsZ(variables);
		enable = true;
	}

	function GenerarGrafo() {
		let funcionZ = leerInputsZ(variables); //Array of numbers
		let matrizInicial = leerMatrix(restricciones, variables); // Array of Ecuaciones Inciales

		let numerosR = contarR(matrizInicial);
		let numerosS = contarS(matrizInicial);
		let numerosH = contarH(matrizInicial);

		let auxSignoZ = <HTMLSelectElement>document.getElementById(`signoZ`);
		localStorage.signoZ = auxSignoZ.value;
		localStorage.funcionZ = JSON.stringify(funcionZ);
		//localStorage.setItem('matrizInicial', JSON.stringify(matrizInicial));
		localStorage.matrizInicial = JSON.stringify(matrizInicial);
		localStorage.numeroR = numerosR;
		localStorage.numeroS = numerosS;
		localStorage.numeroH = numerosH;
	}
</script>
<div class="container">
  <div class="titulo">
    <h1 class="titulo-texto">Método De Dos Fases</h1>
  </div>

  <div class="maximo-variables">
  
  </div>

  <div class="input-restrictions">
    <InputRestrictions class="input-restrictions-input" />
	</div>
	<div class="botonge">
    <ButtonGenerateMatrix on:generate={handleRestriction} class="input-restrictions-button" />
  </div>

  <p class="funcion-titulo">¿Cuál es el objetivo de la función?</p>
  <select name="operation" id="signoZ" class="funcion-select">
    <option value="max">Maximizar</option>
    <option value="min">Minimizar</option>
  </select>

  <p class="funcion-titulo">Función Objetivo:</p>
  <span class="funcion-texto">Z = </span>
  <div id="zFunction" class="funcion-input" />

  <p class="restricciones-titulo">Restricciones</p>
  <div id="matriz" class="restricciones-matriz" />

  <p class="restricciones-texto">x1, x2 &gt;= 0</p>
</div>

<!--default cero-->
{#if enable === true}
	<a href="/methodTwoPhasesSolution">
		<button class="button" type="submit" name="Submit" on:click={GenerarGrafo}>
			Continuar
		</button>
	</a>
{/if}
