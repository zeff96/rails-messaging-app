import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="flash"
export default class extends Controller {
  static targets = ["message"];
  connect() {
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.messageTarget.remove();
  }
}
