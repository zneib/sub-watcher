<script>
  import Person from './Person.svelte';
  import Player from './Player.svelte';

  let people = JSON.parse(localStorage.getItem('people')) ?? [];
  let inactivePlayers = JSON.parse(localStorage.getItem('inactivePlayers')) ?? [];
  let activePlayers = JSON.parse(localStorage.getItem('activePlayers')) ?? [];

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
  }

  const removeActivePlayer = (player) => {
    activePlayers = activePlayers.filter((name) => name !== player)
  }
</script>

<main>
  <form on:submit|preventDefault={addPlayer}>
    <div>
      <label for="firstName">First Name</label>
      <input type="text" name="firstName">
    </div>
    <button type="submit">Add</button>
  </form>
  {#each people as person}
    <Person name={person} addActivePlayer={addActivePlayer} />
  {/each}
</main>
<div>
  <h2>Active Players</h2>
  {#each activePlayers as player}
    <Player name={player} removeActivePlayer={removeActivePlayer} />
  {/each}
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    padding: 1em;
    margin: 0 auto;
    background-color: #eee;
    max-width: 400px;
  }

  label {
    display: block;
  }

  @media (min-width: 480px) {}
</style>
