import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["monthFilter", "taskRow"];

    connect() {
        console.log("filer controller connect")
    }

    filterTasks() {
        const selectedMonth = this.monthFilterTarget.value;
        this.taskRowTargets.forEach((row) => {
            const taskMonth = row.dataset.month;
            console.log("filter===\n", taskMonth);

            if (selectedMonth === "" || taskMonth === selectedMonth) {
                row.classList.remove("hidden");
            } else {
                row.classList.add("hidden");
            }
        });
    }
}
