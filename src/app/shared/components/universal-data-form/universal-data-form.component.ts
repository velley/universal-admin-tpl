import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';
import { UniversalFormItem } from '../../domain/form.interface';
import { UniversalFormModal } from '../../domain/modal.interface';

@Component({
  selector: 'universal-data-form',
  templateUrl: './universal-data-form.component.html',
  styleUrls: ['./universal-data-form.component.less'],
  providers: [DatePipe]
})
export class UniversalDataFormComponent implements OnInit, UniversalFormModal {

  former!: FormGroup;
  modalRef!: NzModalRef;
  enableItems!: UniversalFormItem[];
  dateFormatMap: {[prop: string]: string} = {};
  @Input() formItems: Array<UniversalFormItem> = [];
  @Input() editableData: any;
  @Input() actionUrl!: string;
  @Input() successTip!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService,
    private datePipe: DatePipe
  ) { }  

  ngOnInit(): void {
    this.former = this.fb.group({});
    this.enableItems = this.formItems.filter(e => !!e);
    this.enableItems.forEach(item => {
      this.former.addControl(item.key, new FormControl(null, item.validators))
    })
    if(this.editableData) this.former.patchValue(this.editableData);
  }

  onDateChange(date: Date, key: string, format?: string) {
    this.dateFormatMap[key] = this.datePipe.transform(date, format || 'yyyy-MM-dd HH:mm') as string;
  }

  modalCreated?(modal: NzModalRef<any, any>): void {
    this.modalRef = modal;
  }

  modalApply() {
    Object.values(this.former.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    })
    if(this.former.invalid) return false;
    const data = this.former.value;

    return this.http.post(this.actionUrl, {...this.former.value, ...this.dateFormatMap})
      .pipe(tap(_ => this.successTip && this.message.success(this.successTip)))
  }
  
  modalCancel() {
    return true;
  }
}
