import { Directive, Host, HostListener, Inject, Optional, Self } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormHandlerDirective } from './form-handler.directive';

@Directive({
  selector: 'button[type=submit]'
})
export class FormSubmitterDirective {

  constructor(
    @Optional() @Host() private formGroup: FormGroupDirective,
    @Optional() @Host() private formHandler: FormHandlerDirective,
    @Optional() @Self() private nzButton: NzButtonComponent    

  ) {
    console.log('button[type=submit] worked')
  }

  @HostListener('click')
  onClick() {
    this.nzButton.nzLoading = true;
    this.nzButton.disabled = true;
    console.log(this.formGroup.value)
  } 
}
