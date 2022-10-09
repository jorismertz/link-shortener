<script lang="ts">
  import { fly } from "svelte/transition";
  import { sineIn, sineOut } from "svelte/easing";
  import { secret } from "./modules/store";

  let output = "";
  let input = "";
  let message = "";

  const displayStates = {
    input: "unset",
    output: "none",
  };

  let lastLink = "";

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  const toggleInput = (shorthand?: string) => {
    if (!shorthand) {
      // If there's no shorthand provided reset style values
      output = "";
      input = "";
      message = "";

      displayStates.input = "unset";
      displayStates.output = "none";
    }
    // Error if something different than a string is provided
    else if (typeof shorthand !== "string") {
      console.error("function expected a string.");
    }
    // If a shorthand is provided apply the following
    else {
      output = document.location.href + shorthand;
      displayStates.input = "none";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(output);
      }
      displayStates.output = "unset";
      message = "Link copied to clipboard!";
    }
  };

  function keyUpHandler() {
    const valid = isValidUrl(input);
    const link = input;
    if (valid) {
      if (link == lastLink) return;
      lastLink = link;
      fetch("http://localhost:5123/api/create-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: link,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          toggleInput(res.data.shorthand);
        });
    }
  }

  interface Link {
    id: number;
    createdAt: string;
    originalUrl: string;
    shorthand: string;
  }

  let allLinks: Link[] = [];
  let showAllLinks = false;

  async function authenticate() {
    if ($secret === null) {
      const given_secret = await prompt("Provide secret");
      secret.set(given_secret);
    }
    return $secret;
  }

  async function fetchLinks() {
    if ($secret === null) await authenticate();
    showAllLinks = !showAllLinks;
    if (allLinks.length !== 0) return;
    fetch("http://localhost:5123/api/all-links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: $secret,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        allLinks = res.reverse();
      });
  }
</script>

<main
  style="--display-input: {displayStates.input};
         --display-output: {displayStates.output};
         align-self: {allLinks.length !== 0 ? 'unset' : 'center'}"
>
  <h1>Link shortener</h1>
  <p id="status-message">{message}</p>
  <input
    bind:value={input}
    on:keyup={keyUpHandler}
    type="text"
    id="user-input"
    placeholder="Website link to shorten..."
  />
  <input bind:value={output} id="shortened-url" type="text" readonly />
  <button on:click={() => toggleInput()} id="shorten-new"
    >Shorten a new url.</button
  >
  <p on:click={() => fetchLinks()}>
    {#if showAllLinks}
      Hide all previous created links.
    {:else}
      Show all previous created links.
    {/if}
  </p>
  {#if showAllLinks}
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
</main>
