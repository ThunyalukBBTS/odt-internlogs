class DailyTasksController < ApplicationController
def history
  @task = DailyTask.find(params[:id])
  @versions = @task.versions.order(created_at: :desc) # เรียงจากใหม่ไปเก่า
end
def update
  @task = DailyTask.find(params[:id])
  PaperTrail.request.whodunnit = current_user.id if current_user # เพิ่มบรรทัดนี้

  if @task.update(task_params)
    redirect_to history_daily_task_path(@task), notice: "อัปเดตงานสำเร็จ!"
  else
    render :edit
  end
end
end
