<script lang="ts">
	//import { getWeatherFrom } from '../services/weather.js';
	import { createEventDispatcher } from 'svelte';

	export let valueRestricciones: number = 0;
	export let valueVariables: number = 0;
	let inputRestricciones: HTMLInputElement;
	let inputVariables: HTMLInputElement;
	const dispatch = createEventDispatcher();

	//funcion que se dispara al pulsar el boton, lee el valor del input y lo manda de respuesta
	function handleClick() {
		inputRestricciones = <HTMLInputElement>(
			document.getElementById('txtRestriction')
		);
		inputVariables = <HTMLInputElement>document.getElementById('txtvariables');
		valueRestricciones = Number(inputRestricciones.value);
		valueVariables = Number(inputVariables.value);
		if (valueRestricciones < 1) valueRestricciones = 1;
		if (valueVariables < 1) valueVariables = 1;
		dispatch('generate', {
			restrictions: valueRestricciones,
			variables: valueVariables
		});
		console.log(valueRestricciones);
	}
</script>

<button
	disabled
	on:click={handleClick}
	id="botonGenerarMatriz"
	class="BotonGenerarCampos disabled:border-gray-500 disabled:text-gray-500"
	>Generar Campos a llenar
</button>
