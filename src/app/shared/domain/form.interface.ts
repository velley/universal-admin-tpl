import { InjectionToken } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { PagingSetting } from "ng-treater";

export type FilterType = 'select' | 'radio' | 'input' | 'imgUpload';

export interface BasedFormItem {
  /** 筛选控件类型 */
  type: FilterType;
  /** 筛选控件输出值时的键名 */
  key: string;
  /** 筛选控件label描述 */
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

export type UniversalFormItem = BasedFormItem | SelectFormItem;

/** 预定义表单字段控件的依赖注入令牌 */
export const PREDEFINED_FORM_ITEM = new InjectionToken<UniversalFormItem>('pre defined form item');