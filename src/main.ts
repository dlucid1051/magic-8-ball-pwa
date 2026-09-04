import "./styles.css";

import { bootstrapTheme } from "./theme/ThemeBootstrap";

import {
  resolveThemeBackground,
} from "./theme/ThemeBackgroundResolver";

import {
  getViewportOrientation,
} from "./theme/ViewportOrientation";

import {
  ThemeVisualAssetResolver,
} from "./theme/ThemeVisualAssetResolver";

import {
  createThemeBackgroundResizeHandler,
} from "./theme/ThemeBackgroundResizeHandler";

import { QuestionInput } from './ui/QuestionInput';

async function startApplication(): Promise<void> {
  const app =
    document.querySelector<HTMLDivElement>("#app");

  if (!app) {
    throw new Error(
      "Application root element #app was not found."
    );
  }

  try {
    const themeRegistry = await bootstrapTheme(
      "/themes/sample-theme/"
    );

    const activeTheme =
      themeRegistry.getActiveTheme();

    const visualAssetResolver =
      new ThemeVisualAssetResolver(activeTheme);

    const visualAssets =
      visualAssetResolver.resolveVisualAssets();

    const orientation =
      getViewportOrientation(
        window.innerWidth,
        window.innerHeight
      );

    const backgroundAsset =
      resolveThemeBackground(
        visualAssets,
        orientation
      );

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

          <p>
            Active theme:
            <strong>${activeTheme.manifest.name}</strong>
          </p>

          <section aria-labelledby="theme-assets-title">
            <h2 id="theme-assets-title">
              Theme Asset Preview
            </h2>
  
          <section aria-labelledby="question-section-title" class="question-section">
            <h2 id="question-section-title" class="sr-only">Ask a Question</h2>
            <div id="question-input-container"></div>
          </section>

            <p>
              Current orientation:
              <strong id="theme-orientation">${orientation}</strong>
            </p>

            <figure>
              <figcaption>
                Active Background
              </figcaption>

              <img
                id="theme-background"
                src="${backgroundAsset}"
                alt="Sample theme ${orientation} background"
              />
            </figure>

            <figure>
              <figcaption>
                Hero
              </figcaption>

              <img
                src="${visualAssets.hero}"
                alt="Sample theme hero artwork"
              />
            </figure>
          </section>
        </section>
      </main>
    `;

    const backgroundImage =
      document.querySelector<HTMLImageElement>(
        "#theme-background"
      );

    if (!backgroundImage) {
      throw new Error(
        "Theme background image was not found."
      );
    }


  const questionContainer = document.querySelector<HTMLElement>("#question-input-container");
  if (questionContainer) {
    const questionInput = new QuestionInput({
      id: 'user-question',
      label: 'Your Question',
      placeholder: 'Type, ask, or concentrate on a question...',
      initialValue: '',
    });
    questionContainer.appendChild(questionInput.getElement());
  }


    const orientationElement =
      document.querySelector<HTMLElement>(
        "#theme-orientation"
      );

    if (!orientationElement) {
      throw new Error(
        "Theme orientation element was not found."
      );
    }

    const cleanupBackgroundResize =
      createThemeBackgroundResizeHandler(
        backgroundImage,
        orientationElement,
        visualAssets,
        window
      );

    void cleanupBackgroundResize;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown application startup error.";

    app.innerHTML = `
      <main class="app-shell">
        <section
          class="app-shell__content"
          aria-labelledby="app-title"
        >
          <h1 id="app-title">Magic 8-Ball</h1>

          <p role="alert">
            Failed to load application theme:
            ${message}
          </p>
        </section>
      </main>
    `;
  }
}

void startApplication();