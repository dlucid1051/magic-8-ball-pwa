import { describe, expect, it } from "vitest";

import type { AppEvent } from "../../src/app/AppEvent";
import { AppState } from "../../src/app/AppState";
import { transition } from "../../src/state/StateMachine";

describe("Magic 8-Ball state machine", () => {
  it("moves from IDLE to PREPARING when asked", () => {
    const nextState = transition(
      AppState.IDLE,
      { type: "ASK" }
    );

    expect(nextState).toBe(AppState.PREPARING);
  });

  it("completes the full Magic 8-Ball lifecycle", () => {
    let state: AppState = AppState.IDLE;

    state = transition(state, { type: "ASK" });
    expect(state).toBe(AppState.PREPARING);

    state = transition(state, { type: "START_SHAKE" });
    expect(state).toBe(AppState.SHAKING);

    state = transition(
        state,
        { type: "ANIMATION_COMPLETE" }
  );
  expect(state).toBe(AppState.REVEALING);

    state = transition(
        state,
        { type: "REVEAL_COMPLETE" }
  );
  expect(state).toBe(AppState.ANSWER_VISIBLE);
});

  it("moves from PREPARING to SHAKING", () => {
    const nextState = transition(
      AppState.PREPARING,
      { type: "START_SHAKE" }
    );

    expect(nextState).toBe(AppState.SHAKING);
  });

  it("moves from SHAKING to REVEALING when animation completes", () => {
    const nextState = transition(
      AppState.SHAKING,
      { type: "ANIMATION_COMPLETE" }
    );

    expect(nextState).toBe(AppState.REVEALING);
  });

  it("moves from REVEALING to ANSWER_VISIBLE when reveal completes", () => {
    const nextState = transition(
      AppState.REVEALING,
      { type: "REVEAL_COMPLETE" }
    );

    expect(nextState).toBe(AppState.ANSWER_VISIBLE);
  });

  it("allows a new question after an answer is visible", () => {
    const nextState = transition(
      AppState.ANSWER_VISIBLE,
      { type: "ASK" }
    );

    expect(nextState).toBe(AppState.PREPARING);
  });

  it("allows reset from ANSWER_VISIBLE to IDLE", () => {
    const nextState = transition(
      AppState.ANSWER_VISIBLE,
      { type: "RESET" }
    );

    expect(nextState).toBe(AppState.IDLE);
  });

  it("moves to ERROR from any normal state", () => {
    const normalStates = [
      AppState.IDLE,
      AppState.PREPARING,
      AppState.SHAKING,
      AppState.REVEALING,
      AppState.ANSWER_VISIBLE,
    ];

    for (const state of normalStates) {
      const event: AppEvent = {
        type: "ERROR",
        error: new Error("Test error"),
      };

      expect(transition(state, event)).toBe(AppState.ERROR);
    }
  });

    it("remains in ERROR when another error occurs", () => {
    const nextState = transition(
        AppState.ERROR,
        {
        type: "ERROR",
        error: new Error("Another error"),
        }
    );

    expect(nextState).toBe(AppState.ERROR);
    });

  it("allows reset from ERROR to IDLE", () => {
    const nextState = transition(
      AppState.ERROR,
      { type: "RESET" }
    );

    expect(nextState).toBe(AppState.IDLE);
  });

  it("throws when an invalid transition is attempted", () => {
    expect(() =>
      transition(
        AppState.IDLE,
        { type: "ANIMATION_COMPLETE" }
      )
    ).toThrow(
      'Invalid transition: state "idle" cannot handle event "ANIMATION_COMPLETE".'
    );
  });

});