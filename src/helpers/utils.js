export const toggleDarkBody = (state) => {
  state
    ? document.body.classList.add("darkModeBG")
    : document.body.classList.remove("darkModeBG");
};
