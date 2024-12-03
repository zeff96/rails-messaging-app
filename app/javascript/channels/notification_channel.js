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
      console.log("Notification received:", data); // Log the received data

      const notification = data.notification; // Extract the notification object

      const notificationHtml = `<div class="notification">
        <p><a href="${notification.url}">${notification.actor.name} ${
        notification.action
      }: ${truncate(notification.notifiable.body, 50)}</a></p>
      </div>`;

      // Update the notification count
      const countElement = document.getElementById("notification-count");
      if (data.count > 0) {
        countElement.innerText = data.count;
        countElement.classList.remove("hidden");
      } else {
        countElement.classList.add("hidden");
      }

      // Insert the new notification into the dropdown menu
      const notificationsElement = document.getElementById("dropdown-menu");
      notificationsElement.insertAdjacentHTML("afterbegin", notificationHtml);
    },
  }
);

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
}
