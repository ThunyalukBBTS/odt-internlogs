import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="newdailymodal"
export default class extends Controller {
  static targets = ["background", "add_button", "modal_content", "modal", "confirm_modal", "input_date", "input_hours", "input_mins", "input_detail", "output_date", "output_time", "output_detail", "form", "success", "success_child"]

  connect() {
  }
  //  <%= @show_new_modal ? 'flex' : 'hidden' %>
  show_modal() {
    this.modal_contentTarget.classList.remove('translate-y-full')
    this.modal_contentTarget.classList.add('translate-y-full')
    this.add_buttonTarget.classList.add("hidden")
    this.modalTarget.classList.remove("hidden")
    setTimeout(() => {
      this.modal_contentTarget.classList.remove('opacity-0')
      this.modal_contentTarget.classList.remove('translate-y-full')
      this.modal_contentTarget.classList.remove('scale-150')
    }, 100);
    this.modalTarget.classList.add("flex")
    this.backgroundTarget.classList.add("blur-background")
  }

  close_modal() {
    this.input_detailTarget.value = ""
    this.add_buttonTarget.classList.remove("hidden")
    this.backgroundTarget.classList.remove("blur-background")
    this.modal_contentTarget.classList.add('translate-y-full')
    setTimeout(() => {
      this.modal_contentTarget.classList.add('opacity-0')
      // this.modal_contentTarget.classList.add('scale-150')
    }, 100);
    setTimeout(() => this.modalTarget.classList.add('hidden'), 300);
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

  close_confirm_modal() {
    this.confirm_modalTarget.classList.remove("flex")
    this.confirm_modalTarget.classList.add("hidden")
    this.add_buttonTarget.classList.remove("hidden")
    this.backgroundTarget.classList.remove("blur-background")
  }

  submit() {
    this.close_confirm_modal()
    this.success_childTarget.classList.remove("hidden")
    this.success_childTarget.classList.add("flex")
    this.successTarget.classList.remove("translate-x-full", "opacity-0")
    setTimeout(() => {
      this.successTarget.classList.add("translate-x-full", "opacity-0")
    }, 500)
    setTimeout(() => {
      this.successTarget.classList.add("hidden")
      this.formTarget.submit()
      this.success_childTarget.classList.remove("flex")
      this.success_childTarget.classList.add("hidden")
    }, 1000)
  }
}
