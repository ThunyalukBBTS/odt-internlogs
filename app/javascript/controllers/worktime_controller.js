import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  updateMinutes(event) {
    const hours = parseInt(event.target.value);
    const minutesSelect = document.getElementById("worktime-minutes");

    // ✅ ล้างค่าปัจจุบัน
    minutesSelect.innerHTML = "";

    // ✅ ถ้า hours = 8 ให้แสดงเฉพาะ 00 นาที
    if (hours === 8) {
      minutesSelect.innerHTML += `<option value="0">00</option>`;
    } else {
      minutesSelect.innerHTML += `<option value="0">00</option>`;
      minutesSelect.innerHTML += `<option value="30">30</option>`;
    }
  }
}
