<script lang="ts">
	import { generarFilas } from '../../services/filas';
	import {
		generarIteracion,
		iterar,
		SolucionOptima
	} from '../../services/obj_ecuacion';
	import type { Iteracion } from '../../services/obj_ecuacion';

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
	let iteracionActual = iterar(primeraIteracionFase1);
	console.log(iteracionesFase1);
	let aux = 0;
	do {
		iteracionActual = generarIteracion(
			iteracionActual.ecuaciones,
			funcionZ.length,
			numerosH,
			numerosR,
			numerosS,
			signoZ
		);
		iteracionesFase1.push(iteracionActual);
		console.log(iteracionActual);
		iteracionActual = iterar(iteracionActual);
		console.log(iteracionActual);
		aux++;
	} while (SolucionOptima(iteracionActual, signoZ) === false);
	console.log(iteracionesFase1);

	function GenerarFase1() {
		generarTablaFase1(iteracionesFase1);
	}
</script>

<button class="button" type="submit" name="Submit" on:click={GenerarFase1}>
	Continuar
</button>

<div id="espacioTablaFase1">
	<table>
		<thead>
			<tr>
				<th>CJ</th>
				<th>0</th>
				<th>0</th>
				<th>0</th>
				<th>1</th>
				<th>1</th>
				<th>0</th>
				<th rowspan="2">xb</th>
				<th rowspan="2">bi</th>
			</tr>
			<tr>
				<td>Cx</td>
				<td>X1</td>
				<td>X2</td>
				<td>S1</td>
				<td>R1</td>
				<td>R2</td>
				<td>H1</td>
			</tr>
		</thead>
		<!--Encabezado-->
		<tr>
			<td>1</td>
			<td>3</td>
			<td>1</td>
			<td>0</td>
			<td>1</td>
			<td>0</td>
			<td>0</td>
			<td>R1</td>
			<td>3</td>
		</tr>
		<tr>
			<td>1</td>
			<td>3</td>
			<td>1</td>
			<td>0</td>
			<td>1</td>
			<td>0</td>
			<td>0</td>
			<td>R1</td>
			<td>3</td>
		</tr>
		<tr>
			<td>1</td>
			<td>3</td>
			<td>1</td>
			<td>0</td>
			<td>1</td>
			<td>0</td>
			<td>0</td>
			<td>R1</td>
			<td>3</td>
		</tr>
		<!--Cuerpo-->
		<tr>
			<td>Zj-Cj</td>
			<td>7</td>
			<td>4</td>
			<td>-1</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>Z</td>
			<td>9</td>
		</tr>
		<!--Final-->
	</table>
</div>
