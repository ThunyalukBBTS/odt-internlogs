import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["image"];

  connect() {
    // Get the images from data attribute
    this.images = JSON.parse(this.element.dataset.slideshowImages);
    this.index = 0;
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.index = (this.index + 1) % this.images.length;
      this.imageTarget.src = this.images[this.index];
    }, 3000); // Change every 3 seconds
  }
}
