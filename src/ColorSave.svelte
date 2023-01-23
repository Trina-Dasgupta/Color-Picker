<script>
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  import { onMount } from "svelte";
  import Slider from "./Slider.svelte";
  import { rgbToHex } from "./helpers/color-helpers.js";
  import colorStore from "./stores/color-store.js";
  import selecteColor from "./stores/select-color.js";

  let mode = "add";
  let id = null;
  let name = "";
  let red = 100;
  let green = 0;
  let blue = 100;

  $: canSaveColor = name.length >= 3;
  $: hexColor = rgbToHex(red, green, blue);

  onMount(() => {
    selecteColor.subscribe(c => {
      if (!c) {
        return;
      }
      name = c.name;
      id = c.id;
      red = c.red;
      blue = c.blue;
      green = c.green;
      mode = "edit";
    });
  });

  function reset() {
    name = "";
    red = 100;
    green = 0;
    blue = 100;
    id = null;
    mode = "add";
  }

  function addColor() {
    colorStore.addColor(red, green, blue, name);
    reset();
  }

  function editColor() {
    colorStore.editColor(red, green, blue, name, id);
    reset();
  }

  function submit() {
    if (mode === "add") {
      addColor();
      return;
    }

    if (mode === "edit") {
      editColor();
      return;
    }
  }

  reset();
</script>

<style>
  .color-display {
    height: 100px;
  }
  .color-controls {
    margin-top: 20px;
  }
  .color-numbers {
    margin-top: 20px;
  }
  .color-numbers > div {
    height: 50px;
    border: solid 1px gray;
    border-radius: 2px;
    text-align: center;
    justify-content: space-around;
    padding: 5px;
  }
</style>

<div bp="grid vertical-end">
  <div bp="8 offset-2">
    <form on:submit|preventDefault={submit}>
      <Textfield bind:value={name} label="name" fullwidth="true" />
    </form>
  </div>
  {#if mode === 'add'}
    <div bp="2">
      <Button
        on:click={addColor}
        disabled={!canSaveColor}
        variant="unelevated"
        color="primary">
        <Label>Save Color</Label>
      </Button>
    </div>
  {/if}

  {#if mode === 'edit'}
    <div bp="1">
      <Button
        on:click={editColor}
        disabled={!canSaveColor}
        variant="unelevated"
        color="primary">
        <Label>Edit</Label>
      </Button>
    </div>
    <div bp="1">
      <Button
        on:click={reset}
        disabled={!canSaveColor}
        variant="unelevated"
        color="secondary">
        <Label>cancel</Label>
      </Button>
    </div>
  {/if}
</div>

<div class="color-controls">
  <Slider bind:color={red} bgColor="#AA0000" />
  <Slider bind:color={green} bgColor="#00AA00" />
  <Slider bind:color={blue} bgColor="#0000AA" />
</div>

<div bp="grid">
  <div
    style="background-color: rgb({red}, {green}, {blue})"
    class="color-display"
    bp="10 offset-2" />
</div>
<div bp="grid" class="color-numbers">
  <div bp="offset-2 5">
    RGB
    <br />
    r={red}, g={green}, b={blue}
  </div>
  <div bp="5">
    HEX
    <br />
    {hexColor}
  </div>

</div>
