export class ButtonDisabled {
  private readonly button : HTMLElement;

  constructor(button: HTMLElement) {
    this.button = button;
  }

  initialiseListeners: () => void = () => {
    this.button.addEventListener("click", this.handleClick);
  }

  handleClick: (ev : Event) => void = (ev) => {
    if(this.button.getAttribute('aria-disabled') == "true"){
      ev.preventDefault();
    }
  }
}


