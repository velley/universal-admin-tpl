import { Inject, Injectable, Optional } from '@angular/core';
import { PREDEFINED_FORM_ITEM, UniversalFormItem } from '../domain/form.interface';

@Injectable()
export class PreDefinedFormItem {

  private static formItemMap: {[prop: string]: UniversalFormItem} = {};

  static add = (property: string, item: UniversalFormItem) => {
    PreDefinedFormItem.formItemMap[property] = item;
  }

  static get = (property: string) => {
    const item = PreDefinedFormItem.formItemMap[property];
    if(item) return item;
    throw new Error('无法匹配预定义的表单字段项: '+property)
  }

  constructor(
    @Optional() @Inject(PREDEFINED_FORM_ITEM) private formFields: UniversalFormItem[]
  ) {
    console.log('fields', this.formFields)
  }

  get(field: string) {
    if(!this.formFields) return null;
    const res = this.formFields.find(el => el.key === field);
    if(res) return res;
    console.error('无法匹配预定义的表单字段项: '+field);
    return null;
  }
}
