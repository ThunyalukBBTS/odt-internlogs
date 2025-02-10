class HomeController < ApplicationController
  def index
    # @user = current_user  # ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่

    @user = User.find_by(id: 1) # ดึงข้อมูลผู้ใช้ทั้งหมดจาก Database
    @tasks = DailyTask.all# ดึงข้อมูลงานทั้งหมดจาก Database
    # Rails จะมองหา app/views/home/index.html.erb โดยอัตโนมัติ
  end
end
