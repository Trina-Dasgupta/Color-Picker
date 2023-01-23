import { writable } from 'svelte/store';

const selectColor = writable(undefined);

const setColor = (red, green, blue, name, id) => {
  selectColor.set({ red, green, blue, name, id });
};

export default {
  subscribe: selectColor.subscribe,
  setColor
};
