import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "count"];

  connect() {
    this.loadNotifications();
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden");
    this.updateNotificationRead();
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
    notifications.forEach((notification) => {
      const newNotification = `<a class="block text-sm text-gray-700" href=${notification.url}>${notification.actor} ${notification.action} ${notification.notifiable.type}</a>`;
      this.menuTarget.insertAdjacentHTML("beforeend", newNotification);
    });
  }

  updateCount(length) {
    this.countTarget.innerHTML = length;
  }

  updateNotificationRead() {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    fetch("/notifications/mark_as_read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    })
      .then((response) => response.json())
      .then(() => {
        this.countTarget.innerHTML = "";
      });
  }
}
