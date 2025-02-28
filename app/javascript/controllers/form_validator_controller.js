import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["date", "hours", "mins", "detail", "continueButton", "date_error",];

  connect() {
    this.validateForm()
  }

  validateForm() {
    const dateFilled = this.dateTarget.value.trim() !== "";
    const hoursFilled = this.hoursTarget.value.trim() !== "";
    const minsFilled = this.minsTarget.value.trim() !== "";
    // const detailFilled = this.detailTarget.value.trim() !== "";
    const isZeroZero = this.hoursTarget.value.trim() == 0 && this.minsTarget.value.trim() == 0;
    const dateNotDuplicate = this.check_date();

    if (dateFilled && hoursFilled && minsFilled && !isZeroZero && !dateNotDuplicate) {
      this.continueButtonTarget.disabled = false;
      this.continueButtonTarget.classList.remove("bg-gray-400", "cursor-not-allowed");
      this.continueButtonTarget.classList.add("bg-[#7d58bf]");
      this.continueButtonTarget.classList.add("cursor-pointer");
    } else {
      this.continueButtonTarget.disabled = true;
      this.continueButtonTarget.classList.remove("bg-[#7d58bf] cursor-pointer");
      this.continueButtonTarget.classList.add("bg-gray-400", "cursor-not-allowed");
    }
  }

  check_date() {
    let now_input = this.dateTarget.value
    let ctr = false
    Array.from(document.querySelectorAll(".task-date")).some(td => {
      let parts = td.innerText.split("/");
      let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
      if (now_input === formattedDate) {
        ctr = true
      }
    })
    if (ctr) {
      this.date_errorTarget.classList.remove("hidden")
      this.date_errorTarget.classList.add("grid")
    } else {
      this.date_errorTarget.classList.add("hidden")
      this.date_errorTarget.classList.remove("grid")
    }
    return ctr
  }
}
