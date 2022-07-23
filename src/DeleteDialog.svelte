<script>
  import { onMount } from 'svelte';
  export let personToDelete = '';
  export let deletePerson;

  let deleteDialog;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog');
  })

  const handleClickOutside = (event, dialog) => {
    if (event.target.nodeName === "DIALOG") {
      dialog.close();
    }
  }
</script>

<dialog id="deleteDialog" on:click={(e) => handleClickOutside(e, deleteDialog)}>
  <div class="wrapper">
    <form method="dialog">
      <p>Remove <span style="font-weight: bold">{personToDelete}</span> as a player?</p>
    </form>
    <div class="button-wrapper">
      <button value="cancel" on:click={deleteDialog.close()}>Cancel</button>
      <button type="submit" value="default" on:click={deletePerson}>Confirm</button>
    </div>
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