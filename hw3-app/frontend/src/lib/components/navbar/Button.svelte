<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let variant = "default";
	export let size = "md";
    
	
	let hover = false;
	
	function handleMouseEnter() {
		hover = true;
		dispatch('mouseenter');
	}
	
	function handleMouseLeave() {
		hover = false;
		dispatch('mouseleave');
	}
	
	let buttonProps = {
		class: [$$restProps.class, variant, size].filter(Boolean).join(' ')
	}
</script>

<button on:click
		on:mouseover
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		{...buttonProps}>
	<span class="button-content"><slot/></span>
</button>

<style>
	button {
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
	}
	
	.button-content {
		display: inline-block;
		position: relative;
		transition: 0.2s ease;
	}
	
	.nyt {
		font-family: 'Georgia', serif;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.4px;
		padding: 9px 16px;
		background-color: white;
		color: #121212;
		border: 1px solid #ebebeb;
		border-radius: 3px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	
	.nyt:hover {
		background-color: #f7f7f7;
		border-color: #cccccc;
	}
	
	.nyt:active {
		top: 1px;
		box-shadow: none;
	}
	
	.nyt .button-content::after {
		content: "";
		position: absolute;
		width: 0;
		height: 1px;
		bottom: -2px;
		left: 0;
		background-color: #121212;
		transition: width 0.2s ease;
	}
	
	.nyt:hover .button-content::after {
		width: 100%;
	}
</style>