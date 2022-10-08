<script lang="ts">
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
</script>

<main
  style="--display-input: {displayStates.input}; --display-output: {displayStates.output}"
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
</main>
