class NotificationsController < ApplicationController
  # In the NotificationsController
  # def index
  #   @notifications = Notification.where(recipient: current_user).order(created_at: :desc)
  #   render partial: "notifications/notifications", locals: { notifications: @notifications } if turbo_frame_request?
  # end


  def mark_as_read
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.update_all(read: Time.zone.now)
    render json: { sucess: true }
  end
end
