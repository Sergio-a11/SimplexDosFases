<script>
	import '../app.css';
</script>

<slot />

<style>
	:global(body) {
		place-content: center;
		display: grid;
		min-height: 100vh;
		min-width: 80vh;
	}
</style>
