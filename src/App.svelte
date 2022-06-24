<script>
  import Person from './Person.svelte';
  import Player from './Player.svelte';

  let showPlayersForm = false;
  let people = JSON.parse(localStorage.getItem('people')) ?? [];
  let activePlayers = JSON.parse(localStorage.getItem('activePlayers')) ?? [];

  console.log(showPlayersForm);

  const addPlayer = (e) => {
    for (const field of e.target) {
      if (field?.type !== 'submit') {
       people = [...people, field?.value];
       field.value = '';
       localStorage.setItem('people', JSON.stringify(people));
      }
    }
  }
  
  const addActivePlayer = (player) => {
    activePlayers = [...activePlayers, player];
    people = people.filter((name) => name !== player);
  }

  const removeActivePlayer = (player) => {
    activePlayers = activePlayers.filter((name) => name !== player);
    people = [...people, player];
  }
</script>

<main>
  <article>
    <h2>Inactive Players</h2>
    {#each people as person}
      <Person name={person} addActivePlayer={addActivePlayer} />
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
    {#each activePlayers as player}
      <Player name={player} removeActivePlayer={removeActivePlayer} />
    {/each}
  </article>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  main {
    display: flex;
  }

  article {
    padding: 15px;
    margin: 0 auto;
    background-color: #eee;
    max-width: 400px;
    border-radius: 5px;
    flex: 1;
  }

  h2 {
    margin-top: 0;
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

  div.center {
    display: flex;
    justify-content: center;
  }
  div.center > button {
    margin: 10px 0;
  }

  @media (min-width: 480px) {}
</style>
