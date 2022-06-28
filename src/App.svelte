<script>
  import { onMount } from 'svelte';
  import Person from './Person.svelte';
  import Player from './Player.svelte';

  let deleteDialog;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog');
    console.log(deleteDialog);
  })

  let showPlayersForm = false;
  let personToDelete = '';
  let people = JSON.parse(localStorage.getItem('people')) ?? [];
  let activePlayers = JSON.parse(localStorage.getItem('activePlayers')) ?? [];

  const deletePerson = () => {
    people = people.filter((name) => name !== personToDelete);
    localStorage.setItem('people', JSON.stringify(people));
    deleteDialog.close();
  }

  const addPlayer = (e) => {
    for (const field of e.target) {
      if (field?.type !== 'submit') {
       people = [...people, field?.value];
       field.value = '';
       localStorage.setItem('people', JSON.stringify(people));
      }
    }
  }

  const showDialogElement = (person) => {
    personToDelete = person;
    deleteDialog.showModal();
  }
  
  const addActivePlayer = (player) => {
    activePlayers = [...activePlayers, player];
    people = people.filter((name) => name !== player);
    localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
    localStorage.setItem('people', JSON.stringify(people));
  }

  const removeActivePlayer = (player) => {
    activePlayers = activePlayers.filter((name) => name !== player);
    people = [...people, player];
    localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
    localStorage.setItem('people', JSON.stringify(people));
  }

  const removeAllActivePlayers = () => {
    people = [people, ...activePlayers].flat();
    activePlayers = [];
    localStorage.removeItem('activePlayers');
    localStorage.setItem('people', JSON.stringify(people));
  }
</script>

<main>
  <dialog id="deleteDialog">
    <form method="dialog">
      <p>Remove <span style="font-weight: bold">{personToDelete}</span> as a player?</p>
    </form>
    <div class="button-wrapper">
      <button value="cancel" on:click={deleteDialog.close()}>Cancel</button>
      <button type="submit" value="default" on:click={deletePerson}>Confirm</button>
    </div>
  </dialog>
  <article>
    <h2>Inactive Players</h2>
    {#each people as person}
      <Person name={person} addActivePlayer={addActivePlayer} showDialogElement={showDialogElement} />
    {/each}
    {#if showPlayersForm}
      <form on:submit|preventDefault={addPlayer}>
        <div>
          <label for="firstName">Name</label>
          <input type="text" name="firstName">
        </div>
        <div class="button-wrapper">
          <button type="submit">Add</button>
          <button on:click={() => showPlayersForm = false}>Close</button>
        </div>
      </form>
    {/if}
    {#if !showPlayersForm}
      <div class="center">
        <button on:click={() => showPlayersForm = true}>
          Add Player
        </button>
      </div>
    {/if}
  </article>
  <article>
    <h2>Active Players</h2>
    {#each activePlayers as player, index}
      <Player index={index} name={player} removeActivePlayer={removeActivePlayer} />
    {/each}
    {#if activePlayers?.length > 1}
      <div class="center">
        <button on:click={removeAllActivePlayers}>Remove All Players</button>
      </div>
    {/if}
    {#if activePlayers?.length === 0}
      <p class="message-text">No Players Selected</p>
    {/if}
  </article>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  article {
    padding: 15px;
    margin: 25px;
    background-color: #eee;
    max-width: 500px;
    border-radius: 5px;
    flex: 1;
  }

  dialog {
    border: none;
    border-radius: 5px;
  }

  dialog::backdrop {
    background-color: rgba(0,0,0,0.2);
  }

  h2 {
    margin-top: 0;
    text-align: center;
  }

  form {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }

  label {
    display: block;
    text-transform: uppercase;
    font-size: 10px;
    margin-bottom: 5px;
  }

  input {
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    padding: 5px 10px;
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

  p.message-text {
    font-size: 12px;
    text-align: center;
  }

  div.center {
    display: flex;
    justify-content: center;
  }
  div.center > button {
    margin: 10px 0;
  }

  main {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
    }

    article {
      width: 90%;
      margin-top: 25px;
    }
  }
</style>
