import { writable } from 'svelte/store';

const colorStore = writable([]);

const addColor = (red, green, blue, name) => {
  colorStore.update((colors) => {
    colors.push({
      red,
      green,
      blue,
      name,
      isFavorite: false,
      id: Date.now()
    });

    return colors;
  });
};

const favColor = (id, favorite) => {
  colorStore.update((colors) => {
    const colorIndex = colors.findIndex((c) => c.id === id);

    colors[colorIndex].isFavorite = favorite;

    return colors;
  });
};

const deleteColor = (id) => {
  colorStore.update((colors) => {
    return colors.filter((c) => c.id !== id);
  });
};

const editColor = (red, green, blue, name, id) => {
  colorStore.update((colors) => {
    const colorIndex = colors.findIndex((c) => c.id === id);

    colors[colorIndex].blue = blue;
    colors[colorIndex].red = red;
    colors[colorIndex].green = green;
    colors[colorIndex].name = name;

    return colors;
  });
};

const savedColors = localStorage.getItem('colors');

if (savedColors) {
  colorStore.set(JSON.parse(savedColors));
}

colorStore.subscribe((colors) => {
  localStorage.setItem('colors', JSON.stringify(colors));
});

export default {
  subscribe: colorStore.subscribe,
  addColor,
  favColor,
  deleteColor,
  editColor
};
