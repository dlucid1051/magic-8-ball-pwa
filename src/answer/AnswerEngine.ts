import type { Answer } from "./Answer";
import type { AnswerSet } from "./AnswerSet";
import { AnswerSession } from "./AnswerSession";
import { resolveAnswerSet } from "./AnswerResolver";
import { selectRandomAnswer } from "./AnswerSelector";

export class AnswerEngine {
  private readonly fallback: AnswerSet;
  private readonly session: AnswerSession;

  constructor(
    fallback: AnswerSet,
    session = new AnswerSession()
  ) {
    this.fallback = fallback;
    this.session = session;
  }

  selectAnswer(): Answer {
    const answerSet = resolveAnswerSet({
      userImported: this.session.getUserImported(),
      fallback: this.fallback,
    });

    return selectRandomAnswer(answerSet);
  }

  setUserImported(answerSet: AnswerSet): void {
    this.session.setUserImported(answerSet);
  }

  clearUserImported(): void {
    this.session.clearUserImported();
  }

  getActiveAnswerSet(): AnswerSet {
    return resolveAnswerSet({
      userImported: this.session.getUserImported(),
      fallback: this.fallback,
    });
  }
}