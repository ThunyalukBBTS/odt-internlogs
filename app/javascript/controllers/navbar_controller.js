import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navbar"
export default class extends Controller {
  static targets = ["slider", "link"];

  connect() {
    // เมื่อหน้าโหลดใหม่ (เปลี่ยน path แล้ว) ให้จัดตำแหน่ง Slider อัตโนมัติ
    this.updateSliderPosition();
  }

  handleClick(event) {
    // ถ้าคลิกปุ่มแล้ว path ไม่เปลี่ยน (กดซ้ำ) ให้ไม่ไปไหน
    const targetHref = event.currentTarget.getAttribute("href");
    const currentPath = window.location.pathname;
    const targetPath = new URL(targetHref, window.location.origin).pathname;

    if (currentPath === targetPath) {
      event.preventDefault(); 
    }
    // ถ้า path ต่าง -> ให้โหลดหน้าใหม่ตามปกติ -> เมื่อหน้าเสร็จ connect() -> updateSliderPosition()
  }

  updateSliderPosition() {
    // หา link ที่ class="active" (อิงจาก <%= current_page? %>)
    const activeLink = this.linkTargets.find(link => link.classList.contains("active"));
    if (!activeLink) return;
    
    // เอาตำแหน่ง/ขนาดของลิงก์ใน nav
    const linkRect = activeLink.getBoundingClientRect();
    // เอาตำแหน่ง/ขนาดของ nav (ซึ่งเป็น this.element)
    const navRect = this.element.getBoundingClientRect();

    // คำนวณตำแหน่งของ link แบบ relative ต่อ nav
    const left = linkRect.left - navRect.left;
    const top = linkRect.top - navRect.top;

    // กำหนดตำแหน่ง/ขนาด Slider
    this.sliderTarget.style.position = "absolute";
    this.sliderTarget.style.left = `${left}px`;
    this.sliderTarget.style.top = `${top}px`;
    this.sliderTarget.style.width = `${linkRect.width}px`;
    this.sliderTarget.style.height = `${linkRect.height}px`;
  }
}
