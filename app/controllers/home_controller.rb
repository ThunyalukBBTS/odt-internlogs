class HomeController < ApplicationController
  before_action :set_task, only: [ :edit, :update ]

  def index
    @user = User.find_by(id: 1)
    @tasks = DailyTask.all
    @show_new_modal = params[:show_new_modal] == "true"
  end

  def edit
    # ตรวจสอบว่ามีค่า @task หรือไม่
    puts "Editing Task: #{@task.inspect}"
  end

  def update
    if @task.update(task_params)
      redirect_to root_path, notice: "อัปเดตงานสำเร็จ!"
    else
      render :edit
    end
  end

  def new_modal
    redirect_to root_path(show_new_modal: "true")

  end

  def close_modal
    redirect_to root_path(show_new_modal: "false")
  end

  private

  def set_task
    @task = DailyTask.find(params[:id]) # ตรวจสอบว่าพารามิเตอร์ id ถูกส่งมาหรือไม่
    puts "Set Task: #{@task.inspect}"
  end

  def task_params
    params.require(:daily_task).permit(:date, :hours, :mins, :detail)
  end
end
