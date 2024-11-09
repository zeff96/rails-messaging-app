import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "count"];

  toggle() {
    this.menuTarget.classList.toggle("hidden");
    this.updateNotificationRead();
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
