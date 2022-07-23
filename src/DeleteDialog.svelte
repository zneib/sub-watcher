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