<script lang="ts">
	let enable = false; //activar boton de genrar calculo
	import InputRestrictions from '../components/Method/input-restrictions.svelte';
	import ButtonGenerateMatrix from '../components/Method/button-generate-matrix.svelte';
	import { createMatrix } from '../services/matrix';

	let restricciones: number = 0;
	let variables: number = 0;

	function handleRestriction(event: {
		detail: { restrictions: any; variables: any };
	}) {
		restricciones = event.detail.restrictions ?? 2;
		variables = event.detail.variables ?? 2;
		createMatrix(restricciones, variables);
		enable = true;
	}

	function GenerarGrafo() {
		let zx1 = <HTMLInputElement>document.getElementById('zx1');
		let zx2 = <HTMLInputElement>document.getElementById('zx2');
		alert('Generar Grafo' + zx1.value + zx2.value);
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
<p>Función:</p>
<input type="number" class="input" id="zx1" />X1 +
<input type="number" class="input" id="zx2" />X2
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
