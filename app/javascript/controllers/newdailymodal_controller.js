import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="newdailymodal"
export default class extends Controller {
  static targets = ["background", "modal_header", "date_error", "length_output", "add_button", "edit_button", "modal_content", "modal", "confirm_modal", "input_date", "input_hours", "input_mins", "input_detail", "output_date", "output_time", "output_hour", "output_min", "output_detail", "form", "success", "success_child"]

  connect() {
    this.length_outputTarget.textContent = this.input_detailTarget.value.length
  }

  update_length() {
    this.length_outputTarget.textContent = this.input_detailTarget.value.length
  }
  //  <%= @show_new_modal ? 'flex' : 'hidden' %>
  show_modal() {
    this.modal_headerTarget.textContent = "Add Daily Task"
    this.modal_contentTarget.classList.remove('translate-y-full')
    this.modal_contentTarget.classList.add('translate-y-full')
    this.add_buttonTarget.classList.add("hidden")
    this.modalTarget.classList.remove("hidden")
    this.check_date();
    this.length_outputTarget.textContent = this.input_detailTarget.value.length
    this.input_dateTarget.disabled = false;

    setTimeout(() => {
      this.modal_contentTarget.classList.remove('opacity-0')
      this.modal_contentTarget.classList.remove('translate-y-full')
      this.modal_contentTarget.classList.remove('scale-150')
    }, 100);
    this.modalTarget.classList.add("flex")
  }

  check_date() {
    let now_input = this.input_dateTarget.value
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

  show_edit_modal(event) {
    this.modal_headerTarget.textContent = "Edit Daily Task"
    this.date_errorTarget.classList.add("hidden")
    this.input_dateTarget.disabled = true;
    const form = document.getElementById("form");
    const button = event.currentTarget;
    const taskId = button.dataset.id;
    const taskDate = button.dataset.date;
    const taskHours = button.dataset.hours;
    const taskMins = button.dataset.mins;
    const taskDetail = button.dataset.detail;

    this.input_dateTarget.value = taskDate;
    this.input_hoursTarget.value = taskHours;
    this.input_minsTarget.value = taskMins;
    this.input_detailTarget.value = taskDetail;
    form.action = `/home/${taskId}`;
    this.modal_contentTarget.classList.remove('translate-y-full')
    this.modal_contentTarget.classList.add('translate-y-full')
    this.modalTarget.classList.remove("hidden")
    this.length_outputTarget.textContent = this.input_detailTarget.value.length
    setTimeout(() => {
      this.modal_contentTarget.classList.remove('opacity-0')
      this.modal_contentTarget.classList.remove('translate-y-full')
      this.modal_contentTarget.classList.remove('scale-150')
    }, 100);
    this.modalTarget.classList.add("flex")
  }

  close_modal() {
    this.add_buttonTarget.classList.remove("hidden")

    this.modal_contentTarget.classList.add('translate-y-full')
    setTimeout(() => {
      this.modal_contentTarget.classList.add('opacity-0')
    }, 100);
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0]
      this.input_dateTarget.value = today
      this.input_hoursTarget.value = 0
      this.input_minsTarget.value = 0
      this.input_detailTarget.value = ""
      this.modalTarget.classList.add('hidden')
    }, 300);
  }

  submit_form() {
    this.add_buttonTarget.classList.remove("hidden")
    this.modal_contentTarget.classList.add('translate-y-full')
    setTimeout(() => {
      this.modal_contentTarget.classList.add('opacity-0')
    }, 100);
    setTimeout(() => this.modalTarget.classList.add('hidden'), 300);
  }

  confirm() {
    // close new modal
    this.modalTarget.classList.remove("flex")
    this.modalTarget.classList.add("hidden")
    let objectDate = new Date(this.input_dateTarget.value)
    let date
    if (objectDate.getDate() < 10)
      date = `0${objectDate.getDate()}`
    else (
      date = objectDate.getDate()
    )
    let month
    if (objectDate.getMonth() < 9)
      month = `0${objectDate.getMonth() + 1}`
    else (
      month = objectDate.getMonth() + 1
    )
    let year = objectDate.getFullYear()
    this.output_dateTarget.textContent = `${date}/${month}/${year}`
    let out_str = ""
    let out_hour = ""
    let out_min = ""
    // format work hours
    let minutes = parseInt(this.input_minsTarget.value)
    let hours = parseInt(this.input_hoursTarget.value)
    if (hours === 0 && minutes === 0) {
      out_str = ""
    }
    else if (hours === 0) {
      out_str = `00 hour/${this.input_minsTarget.value} minutes`
    }
    else if (hours === 1 && minutes === 0) {
      out_str = `0${this.input_hoursTarget.value} hour/00 minute`
    } else if (hours === 1) {
      out_str = `0${this.input_hoursTarget.value} hour /${this.input_minsTarget.value} minutes`
    } else if (hours >= 2 && minutes === 0) {
      out_str = `0${this.input_hoursTarget.value} hours/00 minutes`
    } else {
      out_str = `0${this.input_hoursTarget.value} hours /${this.input_minsTarget.value} minutes`
    }
    let parts = out_str.split("/");
    out_hour = parts[0]?.trim() || "";
    out_min = parts[1]?.trim() || "";
    this.output_hourTarget.textContent = out_hour
    this.output_minTarget.textContent = out_min
    // this.output_timeTarget.textContent = out_str
    this.output_detailTarget.textContent = `${this.input_detailTarget.value}`
    // show confirm modal
    this.confirm_modalTarget.classList.remove("hidden")
    this.confirm_modalTarget.classList.add("flex")
    console.log("open confirm")
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

  // submit() {
  //   this.close_confirm_modal()
  //   this.success_childTarget.classList.remove("hidden")
  //   this.success_childTarget.classList.add("flex")
  //   this.successTarget.classList.remove("translate-x-full", "opacity-0")
  //   setTimeout(() => {
  //     this.successTarget.classList.add("translate-x-full", "opacity-0")
  //   }, 500)
  //   setTimeout(() => {
  //     this.successTarget.classList.add("hidden")
  //     this.formTarget.submit()
  //     this.success_childTarget.classList.remove("flex")
  //     this.success_childTarget.classList.add("hidden")
  //   }, 1000)
  // }

  submit() {
    this.submit_form()
    this.success_childTarget.classList.remove("hidden")
    this.success_childTarget.classList.add("flex")
    this.confirm_modalTarget.classList.remove("flex")
    this.confirm_modalTarget.classList.add("hidden")
    this.successTarget.classList.remove("translate-x-full", "opacity-0")
    setTimeout(() => {
      this.successTarget.classList.add("translate-x-full", "opacity-0")
    }, 3000)
    setTimeout(() => {
      this.successTarget.classList.add("hidden")
      this.formTarget.submit()
      this.success_childTarget.classList.remove("flex")
      this.success_childTarget.classList.add("hidden")
    }, 3000)
  }
}
