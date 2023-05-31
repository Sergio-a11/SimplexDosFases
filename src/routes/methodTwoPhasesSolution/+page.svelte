<script>
	import { generarFilas } from '../../services/filas';
	import { generarIteracion, iterar } from '../../services/obj_ecuacion';
	let filas = generarFilas();
	console.log(generarIteracion(filas, 2, 1, 2, 1, 'min'));
	iterar(generarIteracion(filas, 2, 1, 2, 1, 'min'));
</script>
