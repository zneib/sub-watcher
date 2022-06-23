<script>
  import Person from './Person.svelte';

  let people = JSON.parse(localStorage.getItem('people')) ?? [];
  const addPerson = (e) => {
    for (const field of e.target) {
      if (field?.type !== 'submit') {
       people = [...people, field?.value];
       field.value = '';
       localStorage.setItem('people', JSON.stringify(people));
      }
    }
  }
  console.log(people);
</script>

<main>
  <form on:submit|preventDefault={addPerson}>
    <div>
      <label for="firstName">First Name</label>
      <input type="text" name="firstName">
    </div>
    <button type="submit">Add</button>
  </form>
  {#each people as person}
    <Person name={person} />
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    padding: 1em;
    margin: 0 auto;
    background-color: #eee;
  }

  label {
    display: block;
  }

  @media (min-width: 480px) {}
</style>
