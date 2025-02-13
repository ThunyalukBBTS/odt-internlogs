// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("turbo:load", function () {
    const editModal = document.getElementById("editTaskModal");
    const confirmModal = document.getElementById("confirmModal");
    const form = document.getElementById("editTaskForm");

    const closeModal = document.getElementById("closeModal");
    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");
    const confirmSave = document.getElementById("confirmSave");

    // ลบ Event Listener เก่าก่อน แล้วเพิ่มใหม่
    document.querySelectorAll(".edit-task-btn").forEach((button) => {
        button.removeEventListener("click", openEditModal); // ลบตัวเก่า
        button.addEventListener("click", openEditModal); // เพิ่มใหม่
    });

    function openEditModal(event) {
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

        // แสดง Edit Modal
        editModal.classList.remove("hidden");
    }

    // กด "Next" เพื่อไป Confirm Modal
    nextButton.addEventListener("click", function () {
        // ดึงค่าจากฟอร์ม
        document.getElementById("confirm_date").innerText = document.getElementById("edit_date").value;
        document.getElementById("confirm_hours").innerText = document.getElementById("edit_hours").value;
        document.getElementById("confirm_minutes").innerText = document.getElementById("edit_minutes").value;
        document.getElementById("confirm_detail").innerText = document.getElementById("edit_detail").value;

        // ปิด Edit Modal และเปิด Confirm Modal
        editModal.classList.add("hidden");
        confirmModal.classList.remove("hidden");
    });

    // กดปุ่มย้อนกลับ (Back) เพื่อกลับไปหน้าแก้ไข
    backButton.addEventListener("click", function () {
        confirmModal.classList.add("hidden");
        editModal.classList.remove("hidden");
    });

    // กดยืนยัน (Confirm) -> ส่งฟอร์ม
    confirmSave.addEventListener("click", function () {
        form.submit();
    });

    // ปิด Modal เมื่อกดปุ่มยกเลิก
    closeModal.addEventListener("click", function () {
        editModal.classList.add("hidden");
    });
});
