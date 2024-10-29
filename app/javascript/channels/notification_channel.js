import consumer from "./consumer";

const notificationChannel = consumer.subscriptions.create(
  "NotificationChannel",
  {
    connected() {
      console.log("Connected to the notification channel");
    },

    disconnected() {
      console.log("Disconnected from the notification channel");
    },

    received(data) {
      // This method will be called whenever a new notification is received
      const notification = {
        url: data.url,
        actor: data.actor,
        action: data.action,
        notifiable: data.notifiable,
      };

      // Call the Stimulus controller method to update the UI
      const notificationController = document.querySelector(
        "[data-controller='notifications']"
      ).controller;

      notificationController.updateNotification([notification]);
      notificationController.updateCount(
        notificationController.countTarget.innerHTML + 1
      );
    },
  }
);
