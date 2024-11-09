class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification)
    NotificationChannel.broadcast_to(
      notification.recipient,
      notification: serialize_notification(notification),
      count: notification.recipient.notifications.unread.count
    )
  end

  private

  def serialize_notification(notification)
    {
      id: notification.id,
      action: notification.action,
      actor: {
        id: notification.actor.id,
        name: notification.actor.name
      },
      notifiable: {
        id: notification.notifiable.id,
        type: notification.notifiable_type,
        body: notification.notifiable.body
      },
      url: notification.notifiable
    }
  end
end
