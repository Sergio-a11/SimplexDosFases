<script>
	import { estadoBoton } from '../../services/matrix';
	function update() {
		estadoBoton();
	}
</script>

<p class="restricciones-texto">Inserte el numero de restricciones</p>
<input
	type="number"
	name="txtRestriction"
	id="txtRestriction"
	placeholder="2"
	class="input placeholder:text-gray-300"
	min="1"
	on:change={update}
/>
<p class="restricciones-texto">Inserte el numero de variables</p>
<input
	type="number"
	name="txtvariables"
	id="txtvariables"
	placeholder="2"
	class="input placeholder:text-gray-300"
	min="1"
	on:change={update}
/>
