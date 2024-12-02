class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_unread_notifications

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :image ])
  end

  private

  def set_unread_notifications
    if user_signed_in?
      @unread_notifications_count = current_user.notifications.unread.count
    end
  end
end
