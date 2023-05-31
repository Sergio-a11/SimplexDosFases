<script>
	import { generarFilas } from '../../services/filas';
	import { generarIteracion } from '../../services/obj_ecuacion';
	let filas = generarFilas();
	console.log(generarIteracion(filas, 2, 1, 2, 1, 'min'));
</script>
