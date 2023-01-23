<script>
  import colorStore from "./stores/color-store.js";

  import selecteColor from "./stores/select-color.js";

  import { rgbToHex } from "./helpers/color-helpers.js";

  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import { onMount } from "svelte";
  import Textfield from "@smui/textfield";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";

  let colors = [];
  $: tableColors = filterRow(colors, favoriteOnly, filterName);

  let filterName = "";
  let favoriteOnly = false;

  colorStore.subscribe(cs => {
    colors = cs;
  });

  function filterRow(colors, favOnly, name) {
    return colors
      .filter(c => c.isFavorite || !favOnly)
      .filter(c => c.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  function fav(id) {
    colorStore.favColor(id, true);
  }

  function unFav(id) {
    colorStore.favColor(id, false);
  }

  function deleteColor(id) {
    colorStore.deleteColor(id);
  }

  function selectColor(red, green, blue, name, id) {
    selecteColor.setColor(red, green, blue, name, id);
  }
</script>

<style>
  :global(.favorite) {
    float: right;
  }
  div[bp="grid"] {
    margin-top: 20px;
  }
  :global(.mdc-data-table__header-cell, .mdc-data-table__content) {
    text-align: center;
  }
  .material-icons {
    cursor: pointer;
  }
  :global(tbody > tr) {
    cursor: pointer;
  }
  .heart {
    color: red;
  }
</style>

<div bp="grid vertical-end">
  <div bp="offset-2 5">
    <Textfield bind:value={filterName} label="Filter colors" fullwidth="true" />
  </div>
  <div bp="5">
    <FormField class="favorite">
      <Switch bind:checked={favoriteOnly} />
      <span slot="label">Favorite</span>
    </FormField>
  </div>
</div>

<div bp="grid">
  <div bp="offset-2 10">
    <DataTable style="width: 100%;">
      <Head>
        <Row>
          <Cell>Fav</Cell>
          <Cell>Name</Cell>
          <Cell>Color</Cell>
          <Cell>Hex</Cell>
          <Cell />
        </Row>
      </Head>
      <Body>
        {#each tableColors as color (color.id)}
          <Row
            on:click={selectColor(color.red, color.green, color.blue, color.name, color.id)}>
            <Cell>
              {#if color.isFavorite}
                <i
                  on:click|stopPropagation={unFav(color.id)}
                  class="material-icons heart">
                  favorite
                </i>
              {:else}
                <i
                  on:click|stopPropagation={fav(color.id)}
                  class="material-icons heart">
                  favorite_border
                </i>
              {/if}
            </Cell>
            <Cell>{color.name}</Cell>
            <Cell
              style="background-color: rgb({color.red}, {color.green}, {color.blue})" />
            <Cell>{rgbToHex(color.red, color.green, color.blue)}</Cell>
            <Cell>
              <i
                on:click|stopPropagation={deleteColor(color.id)}
                class="material-icons">
                delete
              </i>
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</div>
