<script lang="ts">
	import InputRestrictions from '../../components/graphic/input-restrictions.svelte';
	import ButtonGenerateMatrix from '../../components/graphic/button-generate-matrix.svelte';
	import { createMatrix } from '../../services/matrix';

	let restricciones: number = 0;
	let newMatrix: boolean = false;

	function handleRestriction(event: { detail: { restrictions: any } }) {
		restricciones = event.detail.restrictions ?? 2;
		createMatrix(restricciones, 2);
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
<div id="matriz">_</div>
<p>x1,x2>=0</p>
<input class="button" type="submit" name="Submit" value="Continuar" />
