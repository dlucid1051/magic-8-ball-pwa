import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Application root element #app was not found.");
}

app.innerHTML = `
  <main class="app-shell">
    <section
      class="app-shell__content"
      aria-labelledby="app-title"
    >
      <h1 id="app-title">Magic 8-Ball</h1>

      <p>
        Application shell initialized.
      </p>
    </section>
  </main>
`;