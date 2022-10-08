const userInput = document.getElementById("user-input");
const output = document.getElementById("shortened-url");
const shortenNew = document.getElementById("shorten-new");

let lastLink = "";

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const setMessage = (msg) => {
  return (document.getElementById("status-message").innerText = msg);
};

const toggleInput = (shorthand) => {
  if (!shorthand) {
    // If there's no shorthand provided reset style values
    output.value = "";
    userInput.value = "";
    setMessage("");
    userInput.style.display = "unset";
    output.style.display = "none";
    shortenNew.style.display = "none";
  }
  // Error if something different than a string is provided
  else if (typeof shorthand !== "string") {
    console.error("function expected a string.");
  }
  // If a shorthand is provided apply the following
  else {
    output.value = document.location.href + shorthand;
    userInput.style.display = "none";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(output.value);
    }
    output.style.display = "unset";
    shortenNew.style.display = "unset";
    setMessage("Link copied to clipboard!");
    output.select();
  }
};

userInput.addEventListener("keyup", function (event) {
  const valid = isValidUrl(userInput.value);
  const link = userInput.value;
  if (valid) {
    if (link == lastLink) return;
    lastLink = link;
    fetch("/api/create-link", {
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
});

shortenNew.addEventListener("click", (event) => {
  toggleInput();
});
