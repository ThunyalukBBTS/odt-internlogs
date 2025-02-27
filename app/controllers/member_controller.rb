class MemberController < ApplicationController
  def index
    @all_users = User.joins(:daily_tasks)
                     .select("users.id, users.username,
                              (SUM(daily_tasks.hours) + FLOOR(SUM(daily_tasks.mins) / 60)) AS total_hours,
                              (SUM(daily_tasks.mins) % 60) AS total_minutes")
                     .group("users.id, users.username")
                     .order("total_hours DESC, total_minutes DESC")
  end

  def show
    @user = User.find_by(id: params[:id]) || User.find_by(username: params[:id])
    @tasks = @user.daily_tasks if @user

    if @user.nil?
      flash[:alert] = "User not found"
      redirect_to root_path
    end
  end
end
