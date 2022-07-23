<script>
  import { onMount } from 'svelte';
  export let maxActivePlayers;
  export let playTimeLimit;

  let optionsDialog;
  onMount(() => {
    optionsDialog = document.getElementById('optionsDialog');
  })

  const handleClickOutside = (event, dialog) => {
    if (event.target.nodeName === "DIALOG") {
      dialog.close();
    }
  }
</script>

<dialog id="optionsDialog" on:click={(e) => handleClickOutside(e, optionsDialog)}>
  <div class="wrapper">
    <h3>Player Options</h3>
    <form>
      <div>
        <label for="activePlayerLimit">Active Players Limit</label>
        <select name="activePlayerLimit" on:change={(e) => maxActivePlayers = e.target.value} value={maxActivePlayers}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7} selected>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div>
        <label for="playTimeLimit">Player Time Limit - MM:SS</label>
        <select name="playTimeLimit" on:change={(e) => playTimeLimit = e.target.value} value={playTimeLimit}>
          <option value="01:00">01:00</option>
          <option value="03:00">03:00</option>
          <option value="05:00" selected>05:00</option>
          <option value="10:00">10:00</option>
          <option value="15:00">15:00</option>
          <option value="20:00">20:00</option>
          <option value="25:00">25:00</option>
          <option value="30:00">30:00</option>
        </select>
      </div>
      <div class="button-wrapper">
        <button on:click|preventDefault={optionsDialog.close()}>Close</button>
      </div>
    </form>
  </div>
</dialog>