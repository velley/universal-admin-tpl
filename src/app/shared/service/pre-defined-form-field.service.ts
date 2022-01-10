import { Injectable } from '@angular/core';
import { UniversalFormItem } from '../domain/form.interface';

interface FormItemMap {
  [prop: string]: UniversalFormItem
}
@Injectable()
export class PreDefinedFormItem {

  private static formItemMap: FormItemMap = {};

  /**
   * 静态方法，用于新增预定义表单项控件
   * @param property 表单项名称, 必须以FormItem结尾
   * @param item 表单项数据
   */
  static add = (property: string, item: UniversalFormItem) => {
    if(!property.endsWith('FormItem')) {
      throw new Error('调用PreDefinedFormItem.add方法添加预定义表单项时,控件名property必须以FormItem结尾')
    }
    PreDefinedFormItem.formItemMap[property] = item;
  }

  /** 根据名称获取表单项数据 */
  static get = (property: keyof FormItemMap) => {
    const item = PreDefinedFormItem.formItemMap[property];
    if(item) return item;
    throw new Error('无法匹配预定义的表单项控件: '+property)
  }

  constructor() {}

}
