class NotificationsController < ApplicationController
  def index
    @notifications = Notification.where(recipient: current_user).order(created_at: :desc)
  end

  def mark_as_read
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.update_all(read: Time.zone.now)
    render json: { sucess: true }
  end
end
