class RegisterController < ApplicationController
  allow_unauthenticated_access

  def index
    @reg = Register.new
  end

  def create
    # Initialize @reg with form data
    @reg = Register.new(register_params)
    
    if @reg.save
      redirect_to root_path
    else
      puts "error"
    end
  end

  private

  def register_params
    # Allow only the necessary parameters to be passed in
    params.require(:register).permit(:first_name, :last_name, :email, :password, :password_confirmation, :bank_name, :account_name, :account_number)
  end
end
