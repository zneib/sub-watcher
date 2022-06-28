<script>
  export let name;
  export let removeActivePlayer;
  let count = 0;
  let minutes = 0

  setInterval(() => {
    if (count === 59) {
      minutes += 1;
      count = 0;
    } else {
      count += 1;
    }
  }, 1000);

  $: timer = `${minutes < 10 ? `0${minutes}` : minutes}:${count < 10 ? `0${count}` : count}`;
</script>

<div on:click={removeActivePlayer(name)}>
  {name}
  <span>{timer}</span>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap');
  div {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 10px 0px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
  }
  div:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }

  span {
    font-family: 'Allerta Stencil', sans-serif;
  }
</style>