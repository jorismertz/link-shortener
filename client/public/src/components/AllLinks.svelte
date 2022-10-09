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
    <h2>All previous created links</h2>
    <h3 on:click={() => (showAllLinks = false)}>Close</h3>
    <table>
      <tr>
        <th>id</th>
        <th>created at</th>
        <th>Link</th>
        <th>Shorthand</th>
      </tr>
      {#each allLinks as { id, createdAt, originalUrl, shorthand }, i}
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
        </tr>
      {/each}
    </table>
  </section>{/if}
