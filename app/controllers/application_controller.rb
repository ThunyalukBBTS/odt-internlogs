class ApplicationController < ActionController::Base
  include Authentication
  skip_before_action :verify_authenticity_token
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
