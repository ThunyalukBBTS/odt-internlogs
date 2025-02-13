import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["date", "hours", "mins", "detail", "continueButton"];

  validateForm() {
    const dateFilled = this.dateTarget.value.trim() !== "";
    const hoursFilled = this.hoursTarget.value.trim() !== "";
    const minsFilled = this.minsTarget.value.trim() !== "";
    // const detailFilled = this.detailTarget.value.trim() !== "";
    const isZeroZero =  this.hoursTarget.value.trim() == 0 && this.minsTarget.value.trim() == 0;

    if (dateFilled && hoursFilled && minsFilled && !isZeroZero) {
      this.continueButtonTarget.disabled = false;
      this.continueButtonTarget.classList.remove("bg-gray-400", "cursor-not-allowed");
      this.continueButtonTarget.classList.add("bg-blue-400");
    } else {
      this.continueButtonTarget.disabled = true;
      this.continueButtonTarget.classList.remove("bg-blue-400");
      this.continueButtonTarget.classList.add("bg-gray-400", "cursor-not-allowed");
    }
  }
}
