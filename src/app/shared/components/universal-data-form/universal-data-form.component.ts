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
  styleUrls: ['./universal-data-form.component.less']
})
export class UniversalDataFormComponent implements OnInit, UniversalFormModal {

  former: FormGroup;
  modalRef: NzModalRef;
  enableItems: UniversalFormItem[];
  @Input() formItems: Array<UniversalFormItem> = [];
  @Input() editableData: any;
  @Input() actionUrl: string;
  @Input() successTip: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
  ) { }  

  ngOnInit(): void {
    this.former = this.fb.group({});
    this.enableItems = this.formItems.filter(e => !!e);
    this.enableItems.forEach(item => {
      this.former.addControl(item.key, new FormControl(null, item.validators))
    })
    if(this.editableData) this.former.patchValue(this.editableData);
  }

  modalCreated?(modal: NzModalRef<any, any>): void {
    this.modalRef = modal;
  }

  modalApply() {
    this.former.markAsDirty();
    this.former.markAllAsTouched();
    if(this.former.invalid) return false;
    return this.http.post(this.actionUrl, this.former)
      .pipe( tap(_ => this.successTip && this.message.success(this.successTip)))
  }
  
  modalCancel() {
    return true;
  }
}
