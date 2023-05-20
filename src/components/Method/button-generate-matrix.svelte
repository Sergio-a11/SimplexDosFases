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
	on:click={handleClick}
	class="absolute px-1 py-1 ml-3 text-indigo-500 border-2 border-indigo-500 rounded-full"
	>Generar Campos a llenar
</button>
