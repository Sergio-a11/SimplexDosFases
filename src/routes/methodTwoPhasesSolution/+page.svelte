<script lang="ts">
	import { generarFilas } from '../../services/filas';
	import {
		generarIteracion,
		iterar,
		SolucionOptima
	} from '../../services/obj_ecuacion';
	import type { Iteracion } from '../../services/obj_ecuacion';
	import { faseDos } from '../../services/fase_dos';

	import { generarTablaFase1 } from '../../services/tabla_fase_1';
	//primera iteracion
	let filas = generarFilas();
	let numerosR = Number.isNaN(Number.parseInt(localStorage.numeroR))
		? 2
		: Number.parseInt(localStorage.numeroR);
	let numerosS = Number.isNaN(Number.parseInt(localStorage.numeroS))
		? 1
		: Number.parseInt(localStorage.numeroS);
	let numerosH = Number.isNaN(Number.parseInt(localStorage.numeroH))
		? 1
		: Number.parseInt(localStorage.numeroH);
	let signoZ = localStorage.signoZ;
	let funcionZ = JSON.parse(localStorage.funcionZ); //Array of numbers
	let primeraIteracionFase1: Iteracion = generarIteracion(
		filas,
		funcionZ.length,
		numerosH,
		numerosR,
		numerosS,
		signoZ
	);

	//iterar

	let iteracionesFase1: Array<Iteracion> = [];
	iteracionesFase1.push(primeraIteracionFase1);
	let iteracionActual = primeraIteracionFase1; //segunda iteracion medio vacia
	//console.log(iteracionesFase1);
	let aux = 0; //pa que no se explote si falla la validacion
	while (SolucionOptima(primeraIteracionFase1, signoZ) === false && aux < 20) {
		iteracionActual = iterar(iteracionActual);
		iteracionActual = generarIteracion(
			iteracionActual.ecuaciones,
			funcionZ.length,
			numerosH,
			numerosR,
			numerosS,
			signoZ
		);
		iteracionesFase1.push(iteracionActual);
		//console.log(iteracionActual);
		if (SolucionOptima(iteracionActual, signoZ)) {
			break;
		}
		aux++;
	}

	//funcion hacer fase 2
	console.log(iteracionesFase1);

	function GenerarFase1() {
		generarTablaFase1(iteracionesFase1, 'espacioTablaFase1');
		let boton2 = <HTMLButtonElement>document.getElementById(`botonfase2`);
		boton2.disabled = false;
	}
	function GenerarFase2() {
		let iteracionesFase2: Array<Iteracion> = []; //array
		let primeraIteracionFase2 = faseDos(
			iteracionesFase1[iteracionesFase1.length - 1],
			signoZ
		); //maqueta primera iteracion;//sin referencia
		primeraIteracionFase2 = generarIteracion(
			primeraIteracionFase2.ecuaciones,
			funcionZ.length,
			numerosH,
			0,
			numerosS,
			signoZ
		);
		iteracionesFase2.push(primeraIteracionFase2);
		let iteracionActual = primeraIteracionFase2; //segunda iteracion medio vacia
		let aux = 0; //pa que no se explote si falla la validacion
		while (
			SolucionOptima(primeraIteracionFase2, signoZ) === false &&
			aux < 20
		) {
			iteracionActual = iterar(iteracionActual);
			iteracionActual = generarIteracion(
				iteracionActual.ecuaciones,
				funcionZ.length,
				numerosH,
				0,
				numerosS,
				signoZ
			);
			iteracionesFase2.push(iteracionActual);
			//console.log(iteracionActual);
			if (SolucionOptima(iteracionActual, signoZ)) {
				break;
			}
			aux++;
		}
		generarTablaFase1(iteracionesFase2, 'espacioTablaFase2');
	}
</script>

<button class="button" type="submit" name="Submit" on:click={GenerarFase1}>
	Ejecutar Fase 1
</button>

<div id="espacioTablaFase1" />

<button
	class="disabled:bg-gray-500 button disabled:text-gray-50"
	type="submit"
	name="Submit"
	on:click={GenerarFase2}
	disabled
	id="botonfase2"
>
	Ejecutar Fase 2
</button>

<div id="espacioTablaFase2" />
