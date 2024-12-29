export default class Bubble {
  constructor(relative) {
    this.relative = relative;
    this.element = this.relative.querySelector('[bubble-element]');
    this.anchors = [...this.relative.querySelectorAll('[bubble-anchor]')];
    this.defaultAnchor = this.relative.querySelector('[default-bubble-anchor]');

    if (!this.defaultAnchor) this.defaultAnchor = this.anchors[0];

    this.init();
  }

  static activeClass = '-active';

  get relativeRect() {
    return this.relative.getBoundingClientRect();
  }
  get elementRect() {
    return this.element.getBoundingClientRect();
  }
  get defaultAnchorRect() {
    return this.defaultAnchor.getBoundingClientRect();
  }
  get defaultPosition() {
    return {
      left: this.defaultAnchorRect.left - this.relativeRect.left,
      top: this.defaultAnchorRect.top - this.relativeRect.top,
    };
  }

  set position({ left, top }) {
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
  set dimension({ width, height }) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  createBubble() {
    const bubble = Object.assign(document.createElement('span'), {
      classList: ['bubble'],
    });

    this.relative.appendChild(bubble);
    this.element = bubble;
  }

  getDimension(element) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
  }
  calculatePosition(element) {
    const elementRect = element.getBoundingClientRect();

    return {
      left: elementRect.left - this.relativeRect.left,
      top: elementRect.top - this.relativeRect.top,
    };
  }

  updatePosition(anchor) {
    this.position = this.calculatePosition(anchor);
    this.dimension = this.getDimension(anchor);
  }
  resetPosition() {
    this.position = this.defaultPosition;
    this.dimension = this.getDimension(this.defaultAnchor);

    this.defaultAnchor.classList.add(Bubble.activeClass);
  }

  setAnchorEvents(anchor) {
    anchor.addEventListener('mouseenter', () => {
      this.updatePosition(anchor);
      this.defaultAnchor.classList.remove(Bubble.activeClass);
      anchor.classList.add(Bubble.activeClass);
    });

    anchor.addEventListener('mouseleave', () => {
      anchor.classList.remove(Bubble.activeClass);
    });

    anchor.addEventListener('click', () => {
      this.defaultAnchor = anchor;
      this.updatePosition(anchor);
    });
  }

  init() {
    if (!this.element) this.createBubble();
    this.resetPosition();

    this.anchors.forEach((anchor) => this.setAnchorEvents(anchor));
    this.relative.addEventListener('mouseleave', () => this.resetPosition());
    window.addEventListener('resize', () => this.resetPosition());
  }
}
