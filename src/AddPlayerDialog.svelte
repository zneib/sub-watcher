<script>
  import { onMount } from 'svelte';
  export let addPlayer;

  let addPlayerDialog;
  onMount(() => {
    addPlayerDialog = document.getElementById('addPlayerDialog');
  })

  const handleClickOutside = (event, dialog) => {
    if (event.target.nodeName === "DIALOG") {
      dialog.close();
    }
  }
</script>

<dialog id="addPlayerDialog" on:click={(e) => handleClickOutside(e, addPlayerDialog)}>
  <div class="wrapper">
    <form on:submit|preventDefault={addPlayer}>
      <h3>Add Another Player</h3>
      <div>
        <label for="firstName">Name</label>
        <input type="text" name="firstName">
      </div>
      <div class="button-wrapper">
        <button type="submit">Add</button>
        <button value="cancel" on:click|preventDefault={addPlayerDialog.close()}>Close</button>
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
</style>