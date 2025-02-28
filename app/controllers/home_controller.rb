class HomeController < ApplicationController
  before_action :set_task, only: [ :edit, :update ]

  def index
    @user = Current.session.user
    @tasks = DailyTask.find_by(user_id: @user.id)
  # กำหนดคอลัมน์ที่อนุญาตให้ใช้เรียงลำดับได้
  sortable_columns = [ "date", "title", "priority" ] # แก้ให้ตรงกับ Model

  # กำหนดทิศทางที่อนุญาต (asc หรือ desc)
  sort_column = sortable_columns.include?(params[:sort]) ? params[:sort] : "date"
  sort_direction = %w[asc desc].include?(params[:direction]) ? params[:direction] : "desc"
  @tasks = DailyTask.where(user_id: @user.id).order(Arel.sql("#{sort_column} #{sort_direction}"))

  @show_new_modal = params[:show_new_modal] == "true"
    @task = DailyTask.new # Initialize new task for form
  end

def create
  @user = Current.session.user
  
  @task = DailyTask.new(task_params)
  
  @task.user_id = @user.id  

  if @task.save
      @tasks = DailyTask.find_by(user_id: @user.id)
      redirect_to root_path
  else
    @tasks = DailyTask.find_by(user_id: @user.id)  
    @show_new_modal = true
      render :index  # Re-render index instead of redirecting
  end
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


  def comfirm_modal
    redirect_to root_path(show_confirm_modal: "false")
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
