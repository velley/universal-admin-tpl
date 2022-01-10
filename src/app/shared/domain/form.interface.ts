import { InjectionToken, Type } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { PagingSetting } from "ng-treater";

export type FormItemType = 'select' | 'radio' | 'input' | 'textarea' | 'imgUpload' | 'component';

export interface BasedFormItem {
  /** 表单控件类型 */
  type: FormItemType;
  /** 表单控件输出值时的键名 */
  key: string;
  /** 表单控件label描述 */
  label: string;
  validators?: ValidatorFn[];
  [prop: string]: any;
}

export interface ServerSelectorOptions {
  /** selector数据的请求地址 */
  url: string;
  /** 快速收索时传入的key名 */
  searchKey?: string;
  /** 是否分页加载 */
  isPaging: boolean;  
  /** 分页配置项 */
  pagingSetting: PagingSetting;
}

export interface SelectFormItem extends BasedFormItem {
  type: 'select';
  /** 是否多选 */
  isMulti?: boolean;
  /** selector选项数据 */
  optionsData?: any[];
  /** selector远程数据获取配置,与optionsDat互斥 */
  serverGetter?: ServerSelectorOptions;
  /** 选项的label key名 */
  optionLabel?: string;
  /** 选项的value key名 */
  optionValue?: string;
  /** selector是否允许搜索 */
  allowSearch?: boolean;
  [prop: string]: any;
}

export interface RadioFormItem extends BasedFormItem {
  type: 'radio';
  options: any[];
  /** 选项label键名，默认为label */
  optionLabel?: string;
  /** 选项value键名，默认为value */
  optionValue?: string;
}

export interface ComponentFormItem extends BasedFormItem {
  type: 'component';
  render: Type<any>;
}

export type UniversalFormItem = BasedFormItem | SelectFormItem | RadioFormItem | ComponentFormItem;

export interface CustomeFormItemAccessor {
  writeValue(val: any): void;
  registerValueChange(fn: (val: any) => void): void;
}