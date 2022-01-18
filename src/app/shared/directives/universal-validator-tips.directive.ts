import { AfterViewInit,  Directive, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { concat, debounceTime, mergeMap, Observable, Subscription } from 'rxjs';

// const VALIDATOR_TIPS = {
//   required: '请填写该字段',
//   maxLength: 
// }

@Directive({
  selector: 'nz-form-control[universalValidatorTips]'
})
export class UniversalValidatorTipsDirective implements AfterViewInit, OnDestroy {
  
  @Input() extract!: {[prop: string]: any};
  subscriber: Subscription | undefined;

  constructor(
    @Optional() @Self() private nzFormControl: NzFormControlComponent
  ) {
    if(!this.nzFormControl) throw new Error('指令universalValidatorTips同nz-form-control组件一起使用');
  }

  ngAfterViewInit(): void {
    const control = this.nzFormControl.defaultValidateControl;
    this.subscriber 
    = control?.valueChanges
      ?.subscribe( _ => {
        console.log(_)
        if(control?.hasError('required')) {
          this.nzFormControl.nzErrorTip = '此项为必填';
        } else if(control?.hasError('email')) {
          this.nzFormControl.nzErrorTip = '邮箱格式错误';      
        }
      })
    
  }
  
  ngOnDestroy(): void {
    if(this.subscriber) this.subscriber.unsubscribe()
  }

  // checkValidators(control: AbstractControl) {
  //   if(control?.hasError('required')) {
  //     this.nzFormControl.nzErrorTip = '此项为必填';
  //   } else if(control?.hasError('email')) {
  //     this.nzFormControl.nzErrorTip = '邮箱格式错误';      
  //   }
  // }
}
