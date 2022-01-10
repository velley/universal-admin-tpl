import { Type } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";
import { UniversalFormItem } from "./form.interface";

export interface UniversalFormModal {
  /** 对话框创建成功的钩子函数 */
  modalCreated?(modal: NzModalRef): void;
  /** 
   * 对话框确认按钮被点击时会调用该方法,需要返回一个Observable或boolean值
   * */
  modalApply(): Observable<any>  | any | void;
  /** 
   * 对话框取消按钮被点击时会调用该方法,需要返回一个Observable或boolean值
   * */
  modalCancel(): Observable<any> | any | void;
}

export interface UniversalFormDialogOptions {
  title: string;
  component?: Type<any>;
  data?: {formItems?: Array<UniversalFormItem>, [prop: string]: any};
}