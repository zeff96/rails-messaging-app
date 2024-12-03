import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="showmore"
export default class extends Controller {
  connect() {}

  more(post) {
    console.log(post);
  }
}
