<script lang="ts">
  import { secret } from "./modules/store";
  import Table from "./components/AllLinks.svelte";

  let output = "";
  let outputRef;

  let input = "";

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
      outputRef.select();
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

<div class="gui">
  <ul>
    <button on:click={() => toggleInput()}>Shorten new link</button>
    <button on:click={() => fetchLinks()}>Show all links</button>
  </ul>
</div>

<textarea
  placeholder="paste link here..."
  class="link-input"
  bind:value={input}
  on:keyup={keyUpHandler}
  style="--display-input: {displayStates.input}"
/>
<textarea
  class="link-output"
  bind:value={output}
  bind:this={outputRef}
  style="--display-output: {displayStates.output}"
  readonly
/>
<Table {showAllLinks} {allLinks} />
