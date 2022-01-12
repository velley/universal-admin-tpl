import { InjectionToken, TemplateRef, Type } from "@angular/core";
import { UniversalFormItem } from "./form.interface";

export const UNIVERSAL_TABLE_CELL = new InjectionToken('a injector token for universal table cell component')
/** 表格列类型 */
export type TableColumnType = 'text' | 'time' | 'img' | 'template' | 'component';
/** 表格列信息 */
export type UniversalTableColumn = BasedTableColumn | IntOrTextColumn | DateColumn | TemplateColumn | ComponentColumn;

export interface BasedTableColumn {
  type: TableColumnType;
  field: string;
  header: string;  
  width?: number;
  sort?: number;  
  formItem?: UniversalFormItem;
  [prop: string]: any;
}

export interface IntOrTextColumn extends BasedTableColumn {
  enum?: Array<{label: string; value: string | number}>;
  valueFormat: string | ((val: any) => any);
}

export interface DateColumn extends BasedTableColumn{
  type: 'time',
  timeFormat?: string;
}

export interface TemplateColumn extends BasedTableColumn {
  type: 'component';
  cellRender: TemplateRef<any>;
}

export interface ComponentColumn extends BasedTableColumn {
  type: 'component';
  cellRender: Type<unknown>;
}

export interface UniversalTableEditOptions {
  editUrl: string;
  editMethod?: 'post' | 'put';
  insertUrl: string;
  insertMethod?: 'get' | 'post' | 'put';
  deleteUrl?: string;
  deleteMethod?: 'get' | 'post' | 'delete';
  deleteKey?: string;
}

export interface UniversalDataGrid {
  name: string;
  desc?: string;
  columns: UniversalTableColumn[];
  filters: UniversalFormItem[];
  formOptions?: UniversalTableEditOptions;
}

export interface UniversalTableCell<T = any> {
  rowData: T;
  colData: UniversalTableColumn;
}

