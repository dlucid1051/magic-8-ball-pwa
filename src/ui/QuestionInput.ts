export type QuestionInputOptions = {
  id?: string;
  label?: string;
  placeholder?: string;
  initialValue?: string;
};

export class QuestionInput {
  private readonly element: HTMLInputElement;

  constructor(
    options: QuestionInputOptions = {}
  ) {
    const {
      id = "question-input",
      label = "Question",
      placeholder =
        "Type, ask, or concentrate on a question...",
      initialValue = "",
    } = options;

    const input = document.createElement("input");

    input.type = "text";
    input.id = id;
    input.name = id;
    input.value = initialValue;
    input.placeholder = placeholder;
    input.setAttribute("aria-label", label);
    input.autocomplete = "off";

    this.element = input;
  }

  getElement(): HTMLInputElement {
    return this.element;
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  clear(): void {
    this.element.value = "";
  }
}