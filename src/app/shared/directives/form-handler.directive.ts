import { Directive, Host, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'form[nz-form][formGroup]'
})
export class FormHandlerDirective {
  @Input() actionUrl!: string;
  @Input() successTip!: string;

  constructor() { }

  @HostListener('ngSubmit')
  onSubmit(e: any) {
    console.log('xxxx', e)
  }

}
