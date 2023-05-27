<script lang="ts">
	let enable = false; //activar boton de genrar calculo
	import InputRestrictions from '../components/Method/input-restrictions.svelte';
	import ButtonGenerateMatrix from '../components/Method/button-generate-matrix.svelte';
	import { createMatrix } from '../services/matrix';
	import { generarInputsZ } from '../services/Z_funtion';
	import { leerInputsZ } from '../services/Z_funtion';
	import { test } from '../services/obj_ecuacion';

	test();
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
		leerInputsZ(variables);
		//alert('Generar Grafo' + zx1.value + zx2.value);
	}
</script>

<h1>Metodo Grafico</h1>
<small>maximo 2 variables</small>
<InputRestrictions />
<ButtonGenerateMatrix on:generate={handleRestriction} />
<p>¿Cuál es el objetivo de la función?</p>
<select name="operation">
	<option value="max">Maximizar</option>
	<option value="min">Minimizar</option>
</select>
<p>Función Objetivo:</p>
<span>Z = </span>
<div id="zFunction" />

<p>Restricciones</p>
<div id="matriz" />
<p>x1,x2>=0</p>

<!--default cero-->
{#if enable === true}
	<input
		class="button"
		type="submit"
		name="Submit"
		value="Continuar"
		on:click={GenerarGrafo}
	/>
{/if}
