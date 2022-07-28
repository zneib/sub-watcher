import { render, screen } from "@testing-library/svelte";
import Player from "./Player.svelte";

describe("Player", () => {
  const index = 0;
  const name = 'Han';
  const removeActivePlayer = () => {};
  const playTimeLimit = '05:00';

  test("shows the name when the person component is rendered", () => {
    render(Player, { props: { index, name, removeActivePlayer, playTimeLimit }});

    expect(screen.getByText("Han")).toBeTruthy();
  });
});
