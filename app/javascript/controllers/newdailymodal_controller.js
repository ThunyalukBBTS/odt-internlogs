import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="newdailymodal"
export default class extends Controller {
  static targets = ["background", "add_button", "modal", "confirm_modal", "input_date", "input_hours", "input_mins", "input_detail", "output_date", "output_hours", "output_mins", "output_detail", "form"]

  connect() {
  }
  //  <%= @show_new_modal ? 'flex' : 'hidden' %>
  show_modal() {
    this.add_buttonTarget.classList.add("hidden")
    this.modalTarget.classList.remove("hidden")
    this.modalTarget.classList.add("flex")
    this.backgroundTarget.classList.add("blur-background")
  }

  close_modal() {
    this.add_buttonTarget.classList.remove("hidden")
    this.modalTarget.classList.remove("flex")
    this.modalTarget.classList.add("hidden")
    this.backgroundTarget.classList.remove("blur-background")
  }

  confirm() {
    // close new modal
    this.modalTarget.classList.remove("flex")
    this.modalTarget.classList.add("hidden")
    this.output_dateTarget.textContent = `${this.input_dateTarget.value}`
    this.output_hoursTarget.textContent = `${this.input_hoursTarget.value}`
    this.output_minsTarget.textContent = `${this.input_minsTarget.value}`
    this.output_detailTarget.textContent = `${this.input_detailTarget.value}`
    // show confirm modal
    this.confirm_modalTarget.classList.remove("hidden")
    this.confirm_modalTarget.classList.add("flex")
  }

  back_to_edit() {
    // close confirm modal
    this.confirm_modalTarget.classList.remove("flex")
    this.confirm_modalTarget.classList.add("hidden")
    // show new modal
    this.modalTarget.classList.remove("hidden")
    this.modalTarget.classList.add("flex")
  }

  submit() {
    this.add_buttonTarget.classList.remove("hidden")
    this.formTarget.submit()
  }
}
