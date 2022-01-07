import { InjectionToken, TemplateRef, Type } from "@angular/core";

export const UNIVERSAL_TABLE_CELL = new InjectionToken('a injector token for universal table cell component')

export type TableColumnType = 'int' | 'string' | 'date' | 'img' | 'template' | 'component';
export type UniversalTableColumn = BasedTableColumn | DateColumn | TemplateColumn | ComponentColumn;

export interface BasedTableColumn {
  type: TableColumnType;
  field: string;
  header: string;  
  width?: number;
  [prop: string]: any;
}

export interface DateColumn extends BasedTableColumn{
  type: 'date',
  dateFormat?: string;
}

export interface TemplateColumn extends BasedTableColumn {
  type: 'component';
  cellRender: TemplateRef<any>;
}

export interface ComponentColumn extends BasedTableColumn {
  type: 'component';
  cellRender: Type<unknown>;
}

const list: UniversalTableColumn[] = [
  {type: 'component', field: 'xx', header: '单独', cellRender: null},
  {type: 'int', field: 'yy', header: 'ccc'}
]

export interface UniversalTableCell<T = any> {
  rowData: T;
  colData: UniversalTableColumn;
}