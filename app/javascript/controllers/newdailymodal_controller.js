import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="newdailymodal"
export default class extends Controller {
  static targets = ["background", "add_button", "modal", "confirm_modal", "input_date", "input_hours", "input_mins", "input_detail", "output_date", "output_time", "output_detail", "form"]

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
    this.input_detailTarget.value = ""
    this.add_buttonTarget.classList.remove("hidden")
    this.modalTarget.classList.remove("flex")
    this.modalTarget.classList.add("hidden")
    this.backgroundTarget.classList.remove("blur-background")

  }

  confirm() {
    // close new modal
    this.modalTarget.classList.remove("flex")
    this.modalTarget.classList.add("hidden")
    let objectDate = new Date(this.input_dateTarget.value)
    let date = objectDate.getDate()
    let month = objectDate.getMonth() + 1
    let year = objectDate.getFullYear()
    this.output_dateTarget.textContent = `${date}/${month}/${year}`
    let out_str = ""
    // format work hours
    let minutes = parseInt(this.input_minsTarget.value)
    let hours = parseInt(this.input_hoursTarget.value)
    if (hours === 0 && minutes === 0) {
      out_str = ""
    }
    else if (hours === 0) {
      out_str = `${this.input_minsTarget.value} minutes`
    }
    else if (hours === 1 && minutes === 0) {
      out_str = `${this.input_hoursTarget.value} hour`
    } else if (hours === 1) {
      out_str = `${this.input_hoursTarget.value} hour ${this.input_minsTarget.value} minutes`
    } else if (hours >= 2 && minutes === 0) {
      out_str = `${this.input_hoursTarget.value} hours`
    } else {
      out_str = `${this.input_hoursTarget.value} hours ${this.input_minsTarget.value} minutes`
    }
    this.output_timeTarget.textContent = out_str
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
