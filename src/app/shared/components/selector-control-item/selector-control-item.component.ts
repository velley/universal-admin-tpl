import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PagingContainerDirective, PagingSetting } from 'ng-treater';

@Component({
  selector: 'app-selector-control-item',
  templateUrl: './selector-control-item.component.html',
  styleUrls: ['./selector-control-item.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SelectorControlItemComponent ),
      multi: true
    }
  ]
})
export class SelectorControlItemComponent implements OnInit, ControlValueAccessor {

  @Input() control: any;
  @Output() pagingSelectorCreated = new EventEmitter<PagingContainerDirective>();
  selectValue: any;

  pushFormChange!: (val: any) => void;
  pushFormTouched!: (touch: any) => void;

  constructor() { }  

  ngOnInit(): void {
  }

  setServerSelectorPagingSetting(setting: Partial<PagingSetting> ) {
    return {scrollLoading: true, ...(setting || {})}   
  }

  addFilterForServerSelector(paging: PagingContainerDirective, key: string, value: string) {    
    paging.addFilter({ [key]: value });
  }

  onValueChange(val: any) {
    this.pushFormChange(val);
    this.pushFormTouched(true);
  }

  writeValue(val: any): void {
    this.selectValue = val;
  }

  registerOnChange(fn: any): void {
    this.pushFormChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.pushFormTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

}
