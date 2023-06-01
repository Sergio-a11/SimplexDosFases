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

<h1 class="titulo">Metodo Grafico</h1>
<InputRestrictions />
<ButtonGenerateMatrix on:generate={handleRestriction} />
<p class="titulo">¿Cuál es el objetivo de la función?</p>
<select name="operation" id="signoZ" class="Deslizable">
	<option value="max">Maximizar</option>
	<option value="min">Minimizar</option>
</select>
<p class="titulo">Función Objetivo:</p>
<span class="titulo">Z = </span>
<div id="zFunction" />

<p class="titulo">Restricciones</p>
<div id="matriz" />
<p>x1,x...>=0</p>

<!--default cero-->
{#if enable === true}
	<a href="/methodTwoPhasesSolution">
		<button class="button" type="submit" name="Submit" on:click={GenerarGrafo}>
			Continuar
		</button>
	</a>
{/if}
