import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["tbody", "icon"];

  connect() {
    this.sortDirection = true; // ค่าเริ่มต้นให้เรียง Ascending
  }

  sortTable() {
    let rows = Array.from(this.tbodyTarget.getElementsByTagName("tr"));

    rows.sort((rowA, rowB) => {
      let cellA = rowA.getElementsByTagName("td")[0].innerText.trim();
      let cellB = rowB.getElementsByTagName("td")[0].innerText.trim();

      let dateA = cellA.split('/').reverse().join('');
      let dateB = cellB.split('/').reverse().join('');

      return this.sortDirection ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
    });

    // เปลี่ยนทิศทางการเรียงลำดับ
    this.sortDirection = !this.sortDirection;

    // ✅ ใช้ Path ของรูปจาก `data-icon-up` และ `data-icon-down`
    this.iconTarget.src = this.sortDirection ? this.iconTarget.dataset.iconUp : this.iconTarget.dataset.iconDown;

    // ✅ อัปเดตตารางหลังเรียง
    this.tbodyTarget.innerHTML = "";
    rows.forEach(row => this.tbodyTarget.appendChild(row));
  }
}
