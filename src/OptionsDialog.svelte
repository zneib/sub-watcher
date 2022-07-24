<script>
  import { onMount } from 'svelte';
  import { handleClickOutside } from './helpers';
  export let maxActivePlayers;
  export let playTimeLimit;

  let optionsDialog;
  onMount(() => {
    optionsDialog = document.getElementById('optionsDialog');
  });
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

<style>
  dialog {
    border: 2px solid rgb(175, 175, 175);
    border-radius: 5px;
    padding: 0;
    min-width: 300px;
    max-width: 350px;
  }

  dialog::backdrop {
    background-color: rgba(0,0,0,0.2);
  }

  dialog > div.wrapper {
    padding: 16px;
  }

  form {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }

  h3 {
    margin-top: 0;
    text-align: center;
  }

  select {
    width: 100%;
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }

  button {
    color: black;
    font-weight: normal;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 5px 10px;
    transition: border .2s ease-in;
  }
  button:hover {
    border: 2px solid rgb(129, 129, 129);
  }
  
  .button-wrapper {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    dialog {
      width: 90%;
    }
  }
  @media (prefers-color-scheme: dark) {
    dialog {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }

    dialog::backdrop {
      background-color: rgba(0,0,0,0.4);
    }

    select {
      border: 2px solid var(--grey-six);
      color: var(--grey-nine);
      background-color: var(--grey-four);
    }

    button {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }
    form {
      background-color: var(--grey-four);
    }

    label {
      color: var(--grey-nine);
    }
  }

</style>