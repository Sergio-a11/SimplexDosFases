<script lang="ts">
	//import { getWeatherFrom } from '../services/weather.js';
	import { createEventDispatcher } from 'svelte';

	export let value: number = 0;
	let input: HTMLInputElement;
	const dispatch = createEventDispatcher();

	//funcion que se dispara al pulsar el boton, lee el valor del input y lo manda de respuesta
	function handleClick() {
		input = <HTMLInputElement>document.getElementById('txtRestriction');
		value = Number(input.value);
		if (value < 1) value = 1;
		dispatch('generate', {
			restrictions: value
		});
		console.log(value);
	}
</script>

<button
	on:click={handleClick}
	class="absolute px-1 py-1 ml-3 text-indigo-500 border-2 border-indigo-500 rounded-full"
	>Generar Modelo
</button>
