import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["editTooltip"];

  connect() {
    this.element.addEventListener("mouseenter", () => this.show());
    this.element.addEventListener("mouseleave", () => this.hide());
  }

  show() {
    this.editTooltipTarget.style.display = "block";
  }

  hide() {
    this.editTooltipTarget.style.display = "none";
  }
}
