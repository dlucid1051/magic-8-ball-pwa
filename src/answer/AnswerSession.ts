import type { AnswerSet } from "./AnswerSet";

export class AnswerSession {
  private userImported?: AnswerSet;

  setUserImported(answerSet: AnswerSet): void {
    this.userImported = answerSet;
  }

  clearUserImported(): void {
    this.userImported = undefined;
  }

  getUserImported(): AnswerSet | undefined {
    return this.userImported;
  }
}