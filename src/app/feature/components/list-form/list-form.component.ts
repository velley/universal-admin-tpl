import { Component, OnInit } from '@angular/core';
import { CustomeFormItemAccessor } from 'src/app/shared/domain/form.interface';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.less']
})
export class ListFormComponent implements OnInit, CustomeFormItemAccessor {

  val!: string;  
  pushValue!: (val: string) => void;

  constructor() { } 

  ngOnInit(): void {
  }

  writeValue(val: any): void {
    this.val = val;
  }
  
  registerValueChange(fn: (val: any) => void): void {
    this.pushValue = fn;
  }

  onChange(val: string ) {
    this.pushValue && this.pushValue(val)
  }
}
