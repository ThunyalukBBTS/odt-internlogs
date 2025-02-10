// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editTaskModal");
    const closeModal = document.getElementById("closeModal");
    const form = document.getElementById("editTaskForm");

    // เมื่อกดปุ่มแก้ไข
    document.querySelectorAll(".edit-task-btn").forEach((button) => {
        button.addEventListener("click", function () {
            // ดึงข้อมูลจาก data-* attributes
            const taskId = this.dataset.id;
            const taskDate = this.dataset.date;
            const taskHours = this.dataset.hours;
            const taskMins = this.dataset.mins;
            const taskDetail = this.dataset.detail;

            // ใส่ข้อมูลลงในฟอร์ม
            document.getElementById("edit_task_id").value = taskId;
            document.getElementById("edit_date").value = taskDate;
            document.getElementById("edit_hours").value = taskHours;
            document.getElementById("edit_minutes").value = taskMins;
            document.getElementById("edit_detail").value = taskDetail;

            // ตั้ง URL ของฟอร์ม
            form.action = `/home/${taskId}`;

            // แสดง Modal
            modal.classList.remove("hidden");
        });
    });

    // ปิด Modal เมื่อกดปุ่มยกเลิก
    closeModal.addEventListener("click", function () {
        modal.classList.add("hidden");
    });
});
