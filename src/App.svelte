<script>
  import { onMount } from 'svelte';
  import Person from './Person.svelte';
  import Player from './Player.svelte';
  import Helper from './Helper.svelte';

  let deleteDialog;
  onMount(() => {
    deleteDialog = document.getElementById('deleteDialog');
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
  <article class="inactive">
    <h2>Inactive Players</h2>
    <Helper />
    <div class="person-container">
      {#each people as person}
        <Person name={person} addActivePlayer={addActivePlayer} showDialogElement={showDialogElement} />
      {/each}
    </div>
    {#if showPlayersForm}
      <form class="add-player-form" on:submit|preventDefault={addPlayer}>
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
      <button class="add" on:click={() => showPlayersForm = true}>
        Add Player
      </button>
    {/if}
  </article>
  <article>
    <h2>Active Players</h2>
    {#if activePlayers?.length > 0}
      <div class="labels">
        <span>Name</span>
        <span>MM:SS</span>
      </div>
    {/if}
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
  :global(:root) {
    --danger: #d64545;
    --grey-one: #102A43;
    --grey-two: #243B53;
    --grey-three: #334E68;
    --grey-four: #486581;
    --grey-five: #627D98;
    --grey-six: #829AB1;
    --grey-seven: #9FB3C8;
    --grey-eight: #BCCCDC;
    --grey-nine: #D9E2EC;
    --grey-ten: #F0F4F8;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  article {
    padding: 15px 15px 30px;
    margin: 25px;
    max-width: 500px;
    border-radius: 5px;
    flex: 1;
  }

  div.person-container {
    max-height: 350px;
    overflow-y: auto;
    padding-right: 5px;
  }

  article.inactive {
    position: relative;
  }

  div.labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  div.labels > span:nth-child(1) {
    margin-left: 40px;
  }
  div.labels > span:nth-child(2) {
    margin-right: 10px;
  }

  .add {
    width: 150px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -15px;
    margin: auto;
    z-index: 1;
  }

  dialog {
    border: 2px solid rgb(175, 175, 175);
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
    width: 90%;
  }

  form.add-player-form {
    border: 2px solid #ccc;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -95px;
    margin: auto;
    z-index: 1;
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

    dialog {
      width: 90%;
    }

    article {
      width: 90%;
      margin-top: 25px;
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: var(--grey-one);
    }
    article {
      background-color: var(--grey-three);
    }

    div.labels {
      color: var(--grey-eight);
    }

    dialog {
      color: var(--grey-nine);
      background-color: var(--grey-four);
      border: 2px solid var(--grey-six);
    }

    dialog::backdrop {
      background-color: rgba(0,0,0,0.4);
    }

    h2 {
      color: var(--grey-nine);
    }

    p.message-text {
      color: var(--grey-nine);
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

    input {
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 15px;
      padding: 5px 10px;
      width: 100%;
    }
  }
  @media (prefers-color-scheme: light) {
    article {
      background-color: #eee;
    }
  }
</style>
