import { writable } from "svelte/store";

let stored_secret = localStorage.getItem("secret");
if (stored_secret === "null") stored_secret = null;

export const secret = writable<string | null>(stored_secret);

secret.subscribe((value) => {
  localStorage.setItem("secret", value);
});
