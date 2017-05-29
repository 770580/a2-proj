export class Popup {
  type: string = 'info';
  text: string;
  dismissible: boolean = true;
  delay: number = 2500;

  constructor(params: Popup) {
    Object.assign(this, params);
  }
}
