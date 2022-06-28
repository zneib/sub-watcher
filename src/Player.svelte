<script>
  export let index;
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

<div class="name" on:click={removeActivePlayer(name)}>
  <span class="index">{index + 1}</span>
  <span class="name">{name}</span>
  <span class="timer">{timer}</span>
</div>

<style>
  div.name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    margin: 10px 0px 10px 30px;
    padding: 5px 10px;
    transition: box-shadow ease-in .2s;
    position: relative;
  }
  div:hover {
    box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.2);
    cursor: pointer;
  }
  span.index {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 12px;
    border-radius: 5px;
    padding: 5px 10px;
    top: 0;
    bottom: 0;
    left: -35px;
    margin: auto;
  }
</style>