import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="register"
export default class extends Controller {
  static targets = ["personal", "bank", "step", "step_name"]
  connect() {
  }

  show_personal() {
    this.personalTarget.classList.remove("hidden")
  }

  show_bank() {
    this.bankTarget.classList.remove("hidden")
    this.stepTarget.classList.remove("border-2", "border-gray-300", "text-gray-400")
    this.stepTarget.classList.add("bg-[#0056A9]", "text-white")
    this.step_nameTarget.classList.remove("text-gray-400")
    this.step_nameTarget.classList.add("font-semibold")
  }

  hide_personal() {
    this.personalTarget.classList.add("hidden")
  }

  hide_bank() {
    this.bankTarget.classList.add("hidden")
    this.stepTarget.classList.add("border-2", "border-gray-300", "text-gray-400")
    this.stepTarget.classList.remove("bg-[#0056A9]", "text-white")
    this.step_nameTarget.classList.add("text-gray-400")
    this.step_nameTarget.classList.remove("font-semibold")
  }

  go_bank() {
    this.hide_personal()
    this.show_bank()
  }

  go_personal() {
    this.hide_bank()
    this.show_personal()
  }
}
