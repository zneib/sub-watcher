<script>
  export let onChange
  let isOpen = true;
  $: onChange(isOpen);

  const toggleCollapse = () => {
    isOpen = !isOpen;
  }
</script>

{#if isOpen}
  <svg on:click={toggleCollapse} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
{:else}
  <svg on:click={toggleCollapse} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
{/if}

<style>
  svg {
    cursor: pointer;
    position: absolute;
    top: 15px;
    left: 15px;
    width: 20px;
    height: 20px;
  }
  @media (prefers-color-scheme: dark) {
    svg {
      color: var(--grey-nine);
    }
  }
</style>