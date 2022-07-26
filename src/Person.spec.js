import { render, screen } from "@testing-library/svelte";
import Person from "./Person.svelte";

describe("Person", () => {
  const person = "Han";
  const addActivePlayer = () => {};
  const showDialogElement = () => {};
  const maxActivePlayers = 2;
  const activePlayers = 4;
  const limitMessageShowing = false;

  test("shows the name when the person component is rendered", () => {
    render(Person, { props: { name: person, addActivePlayer, showDialogElement, maxActivePlayers, activePlayers, limitMessageShowing }});

    expect(screen.getByText("Han")).toBeTruthy();
  });
});