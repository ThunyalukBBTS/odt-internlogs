class HomeController < ApplicationController
  def index
    @users = User.all
    @dailytask = DailyTask.all
  end
end
