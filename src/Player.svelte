<script>
  export let name;
  export let removeActivePlayer;
</script>

<div on:click={removeActivePlayer(name)}>
  {name}
</div>

<style>
  div {
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
  }
  div:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }
</style>