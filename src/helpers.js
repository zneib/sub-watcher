export const handleClickOutside = (event, dialog) => {
  if (event.target.nodeName === "DIALOG") {
    dialog.close();
  }
}