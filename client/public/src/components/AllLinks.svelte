<script lang="ts">
  export let showAllLinks;
  export let allLinks;

  import { fly } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";
</script>

{#if showAllLinks && allLinks.length !== 0}
  <section
    in:fly={{
      y: 200,
      easing: sineIn,
    }}
    out:fly={{
      y: 25,
      easing: sineOut,
    }}
  >
    <header>
      <h2>All previous created links</h2>
      <h2 style="cursor:pointer" on:click={() => (showAllLinks = false)}>
        Close
      </h2>
    </header>
    <table>
      <tr>
        <th>id</th>
        <th>created at</th>
        <th>Link</th>
        <th>Shorthand</th>
        <th>Times visited</th>
      </tr>
      {#each allLinks as { id, createdAt, originalUrl, shorthand, visitedAmount }, i}
        <tr
          in:fly={{
            y: 100,
            delay: 100 * i,
            easing: sineIn,
          }}
        >
          <td>{id}</td>
          <td>{new Date(createdAt).toDateString()}</td>
          <td><input type="text" readonly value={originalUrl} /></td>
          <td
            ><input
              type="text"
              readonly
              value={window.location + shorthand}
            /></td
          >
          <td>{visitedAmount}</td>
        </tr>
      {/each}
    </table>
  </section>{/if}

<style>
  section header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
</style>
