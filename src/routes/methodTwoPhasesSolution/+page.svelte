<script lang="ts">
	import {
		IncialAprimal,
		ecuacionPrimalAFila
	} from '../../services/obj_ecuacion';
	import type { Fila } from '../../services/obj_ecuacion';
	let funcionZ = JSON.parse(localStorage.funcionZ); //Array of numbers
	let matrizInicial = JSON.parse(localStorage.matrizInicial); // Array of Ecuaciones Inciales
	let numerosR = Number.parseInt(localStorage.numeroR);
	let signoZ = localStorage.signoZ;

	let matrizPrimal = IncialAprimal(matrizInicial);
	let matrizOperable: Array<Fila> = [];
	matrizPrimal.forEach((e, i) => {
		matrizOperable.push(ecuacionPrimalAFila(e, numerosR, signoZ));
	});
	console.log(matrizOperable);
</script>
