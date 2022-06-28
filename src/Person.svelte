<script>
  export let name;
  export let addActivePlayer;
  export let deletePerson;
  let showConfirmation = false;
</script>

<div class="wrapper" on:pointerdown={addActivePlayer(name)}>
  {name}
  {#if !showConfirmation}
    <svg on:pointerdown={(e) => {showConfirmation = true; e.stopPropagation()}} xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  {:else}
    <div class="btn-wrapper">
      <button class="confirm" on:pointerdown={(e) => {deletePerson(name); e.stopPropagation()}}>Delete</button>
      <button class="cancel" on:pointerdown={(e) => {showConfirmation = false; e.stopPropagation()}}>Cancel</button>
    </div>
  {/if}
</div>

<style>
  div.wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 10px 0px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
  }
  div.wrapper:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }

  div.btn-wrapper {
    display: flex;
  }

  button {
    width: auto;
    height: 100%;
    background: #fff;
    border: 2px solid #eee;
    border-radius: 5px;
    font-size: 12px;
    margin: 0 0 0 5px;
    transition: border .2s ease-in;
    cursor: pointer;
  }
  button.confirm:hover {
    border: 2px solid red;
  }

  button.cancel:hover {
    border: 2px solid #ccc;
  }
</style>