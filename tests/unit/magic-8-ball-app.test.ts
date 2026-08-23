import { describe, expect, it } from "vitest";

import { AppState } from "../../src/app/AppState";
import { Magic8BallApp } from "../../src/app/Magic8BallApp";

describe("Magic8BallApp", () => {
  it("starts in the idle state", () => {
    const app = new Magic8BallApp();

    expect(app.getState()).toBe(AppState.IDLE);
  });

  it("starts without a question", () => {
    const app = new Magic8BallApp();

    expect(app.getQuestion()).toBe("");
  });

  it("starts without a selected answer", () => {
    const app = new Magic8BallApp();

    expect(app.getSelectedAnswer()).toBeUndefined();
  });

  it("stores a question when asked", () => {
    const app = new Magic8BallApp();

    app.ask("Will this work?");

    expect(app.getQuestion()).toBe("Will this work?");
  });

  it("moves to preparing when asked a valid question", () => {
    const app = new Magic8BallApp();

    app.ask("Will this work?");

    expect(app.getState()).toBe(AppState.PREPARING);
  });

  it("selects an answer when asked a valid question", () => {
    const app = new Magic8BallApp();

    app.ask("Will this work?");

    expect(app.getSelectedAnswer()).toBeDefined();
  });

  it("trims the question", () => {
    const app = new Magic8BallApp();

    app.ask("  Will this work?  ");

    expect(app.getQuestion()).toBe("Will this work?");
  });

  it("allows an empty question", () => {
  const app = new Magic8BallApp();

  app.ask("");

  expect(app.getQuestion()).toBe("");
  expect(app.getState()).toBe(AppState.PREPARING);
  expect(app.getSelectedAnswer()).toBeDefined();
  });

  it("allows a whitespace-only question", () => {
    const app = new Magic8BallApp();

    app.ask("   ");

    expect(app.getQuestion()).toBe("");
    expect(app.getState()).toBe(AppState.PREPARING);
    expect(app.getSelectedAnswer()).toBeDefined();
  });

  it("allows asking without providing a question argument", () => {
    const app = new Magic8BallApp();

    app.ask();

    expect(app.getQuestion()).toBe("");
    expect(app.getState()).toBe(AppState.PREPARING);
    expect(app.getSelectedAnswer()).toBeDefined();
  });

  it("moves from preparing to shaking", () => {
    const app = new Magic8BallApp();

    app.ask();

    app.startShake();

    expect(app.getState()).toBe(AppState.SHAKING);
  });

  it("moves from shaking to revealing", () => {
    const app = new Magic8BallApp();

    app.ask();
    app.startShake();

    app.animationComplete();

    expect(app.getState()).toBe(AppState.REVEALING);
  });

  it("moves from revealing to answer visible", () => {
    const app = new Magic8BallApp();

    app.ask();
    app.startShake();
    app.animationComplete();

    app.revealComplete();

    expect(app.getState()).toBe(
      AppState.ANSWER_VISIBLE
    );
  });

  it("preserves the selected answer through the full lifecycle", () => {
    const app = new Magic8BallApp();

    app.ask();

    const selectedAnswer = app.getSelectedAnswer();

    expect(selectedAnswer).toBeDefined();

    app.startShake();

    expect(app.getSelectedAnswer()).toBe(selectedAnswer);

    app.animationComplete();

    expect(app.getSelectedAnswer()).toBe(selectedAnswer);

    app.revealComplete();

    expect(app.getSelectedAnswer()).toBe(selectedAnswer);
  });

  it("resets from answer visible to idle", () => {
    const app = new Magic8BallApp();

    app.ask("A question");
    app.startShake();
    app.animationComplete();
    app.revealComplete();

    expect(app.getState()).toBe(
      AppState.ANSWER_VISIBLE
    );

    app.reset();

    expect(app.getState()).toBe(AppState.IDLE);
  });

  it("clears the question and selected answer when reset", () => {
    const app = new Magic8BallApp();

    app.ask("A question");
    app.startShake();
    app.animationComplete();
    app.revealComplete();

    expect(app.getQuestion()).toBe("A question");
    expect(app.getSelectedAnswer()).toBeDefined();

    app.reset();

    expect(app.getQuestion()).toBe("");
    expect(app.getSelectedAnswer()).toBeUndefined();
  });

});