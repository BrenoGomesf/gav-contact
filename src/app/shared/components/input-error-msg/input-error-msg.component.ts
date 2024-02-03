import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-input-error-msg',
  templateUrl: './input-error-msg.component.html',
  styleUrls: ['./input-error-msg.component.css']
})
export class InputErrorMsgComponent implements OnInit {

  @Input('control')
  control: FormControl | any;

  @Input('label')
  label: string = '';

  @Input('for')
  for: string = '';

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  get errorMessage() {
    for (const propertyName in this.control!.errors) {
      if (this.control!.errors.hasOwnProperty(propertyName) && (this.control!.touched || this.control!.dirty)) {
        this.elementRef.nativeElement.parentElement.querySelector(`[formControlName="${this.for}"]`).classList.add('is-invalid');
        return Utils.getErrorMsg(this.label, propertyName, this.control!.errors[propertyName]);
      }

      try {
        this.elementRef.nativeElement.parentElement.querySelector(`[formControlName="${this.for}"]`).classList.remove('is-invalid');        
      } catch (error) {
        console.error(`Impossible to remove is-invalid class for ${this.for}`, error);
      }
    }

    try {
      this.elementRef.nativeElement.parentElement.querySelector(`[formControlName="${this.for}"]`).classList.remove('is-invalid');      
    } catch (error) {
      console.error(`Impossible to remove is-invalid class for ${this.for}`, error);
    }
    return null;
  }

}
