<script>
  import { afterUpdate } from "svelte";
  export let index;
  export let name;
  export let removeActivePlayer;
  export let playTimeLimit;
  let seconds = 0;
  let minutes = 0;
  let timesUp = false;
  $: maxPlayers = 0;

  const timerTracker = setInterval(() => {
    if (seconds === 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }
  }, 1000);

  $: timer = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  afterUpdate(() => {
    if (+timer.replace(':', '') > +playTimeLimit.replace(':', '')) {
      clearInterval(timerTracker);
      timesUp = true;
    }
    // Prevent the timer from going forever.
    if (timer === playTimeLimit) {
      clearInterval(timerTracker);
      timesUp = true;
    }
  });
</script>

<div class:danger={timesUp} class="name" on:click={removeActivePlayer(name)}>
  <span class:danger={timesUp} class="index">{index + 1}</span>
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

  div.danger {
    border: 2px solid var(--danger)
  }

  span.danger {
    color: var(--danger);
  }

  @media (prefers-color-scheme: dark) {
    div.name {
      color: var(--grey-nine);
      background-color: var(--grey-four);
    }
  }
</style>