import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  updateMinutes(event) {
    const hours = parseInt(event.target.value);
    const minutesSelect = document.getElementById("worktime-minutes");

    // ✅ ล้างค่าปัจจุบัน
    minutesSelect.innerHTML = "";

    // ✅ ถ้า hours = 8 ให้แสดงเฉพาะ 00 นาที[["00 minute", 0], ["30 minutes", 30]]
    if (hours === 8) {
      minutesSelect.innerHTML += `<option value="0">00 minute</option>`;
    } else {
      minutesSelect.innerHTML += `<option value="0">00 minute</option>`;
      minutesSelect.innerHTML += `<option value="30">30 minutes</option>`;
    }
  }  
}
