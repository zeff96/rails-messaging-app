import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "count"];

  connect() {
    this.loadNotifications();
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden");
  }

  loadNotifications() {
    fetch("/notifications.json")
      .then((response) => response.json())
      .then((data) => {
        this.updateNotification(data);
        this.updateCount(data.length);
      })
      .catch((error) => console.error(error.message));
  }

  updateNotification(notifications) {
    this.menuTarget.innerHTML = notifications
      .map(
        (notification) =>
          `<a class="block text-sm text-gray-700" href=${notification.url}>${notification.actor} ${notification.action} ${notification.notifiable.type}</a>`
      )
      .join(" ");
  }

  updateCount(length) {
    this.countTarget.innerHTML = length;
  }
}
