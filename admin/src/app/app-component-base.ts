import { Injector } from "@angular/core";
import { FormControl } from "@angular/forms";

export abstract class AppComponentBase {
  year = new Date().getFullYear();
  
  constructor(injector: Injector) {
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
