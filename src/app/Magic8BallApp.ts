import type { Answer } from "../answer/Answer";
import { AnswerEngine } from "../answer/AnswerEngine";
import { defaultAnswerSet } from "../answer/defaultAnswers";
import type { AppEvent } from "./AppEvent";
import { AppState } from "./AppState";
import { transition } from "../state/StateMachine";

export class Magic8BallApp {
  private state: AppState = AppState.IDLE;
  private question = "";
  private selectedAnswer?: Answer;

  private readonly answerEngine = new AnswerEngine(
    defaultAnswerSet
  );

  getState(): AppState {
    return this.state;
  }

  getQuestion(): string {
    return this.question;
  }

  getSelectedAnswer(): Answer | undefined {
    return this.selectedAnswer;
  }

  ask(question = ""): void {
    this.question = question.trim();
    this.selectedAnswer = undefined;

    this.dispatch({ type: "ASK" });

    this.selectedAnswer = this.answerEngine.selectAnswer();
  }

  startShake(): void {
    this.dispatch({ type: "START_SHAKE" });
  }

  animationComplete(): void {
    this.dispatch({ type: "ANIMATION_COMPLETE" });
  }

  revealComplete(): void {
    this.dispatch({ type: "REVEAL_COMPLETE" });
  }

  reset(): void {
    this.question = "";
    this.selectedAnswer = undefined;

    this.dispatch({ type: "RESET" });
  }

  dispatch(event: AppEvent): void {
    this.state = transition(this.state, event);
  }
}