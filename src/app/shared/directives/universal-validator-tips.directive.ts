import { Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { NzFormControlComponent } from 'ng-zorro-antd/form';

// const VALIDATOR_TIPS = {
//   required: '请填写该字段',
//   maxLength: 
// }

@Directive({
  selector: 'nz-form-control[universalValidatorTips]'
})
export class UniversalValidatorTipsDirective implements OnInit {
  
  @Input() extract!: {[prop: string]: any};

  constructor(
    @Optional() @Self() private nzFormControl: NzFormControlComponent
  ) {
    if(!this.nzFormControl) throw new Error('指令universalValidatorTips同nz-form-control组件一起使用');
  }
  
  ngOnInit(): void {
    const control = this.nzFormControl.validateControl;
  }

}
