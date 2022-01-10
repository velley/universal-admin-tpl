import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, Host, Injector, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { PagingContainerDirective } from 'ng-treater';
import { NzTableSize } from 'ng-zorro-antd/table';
import { debounceTime, fromEvent, startWith } from 'rxjs';
import { UniversalFormItem } from '../../domain/form.interface';
import { UniversalTableColumn, UniversalTableEditOptions, UNIVERSAL_TABLE_CELL } from '../../domain/table.interfce';
import { UniversalFormModalService } from '../../service/universal-form-dialog.service';

interface NzTableOptions {
  nzBordered?: boolean;
  nzShowPagination?: boolean;
  nzSize?: NzTableSize;
}

const DEFAULT_TABLE_OPTIONS: NzTableOptions = {
  nzBordered: true,
  nzShowPagination: true,
  nzSize: 'middle'
}

@Component({
  selector: 'universal-data-table',
  templateUrl: './universal-data-table.component.html',
  styleUrls: ['./universal-data-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversalDataTableComponent implements OnInit, AfterViewInit {
  
  /** 表格的列信息 */
  @Input() columns!: UniversalTableColumn[];
  /** 表格的行数据 */
  @Input() sourceData: any[] = [];
  /** nzTable的配置参数，可参考ng-zorro的table组件 */
  @Input() nzOptions: NzTableOptions = DEFAULT_TABLE_OPTIONS;
  /** 针对表格数据的增/删/改配置 */
  @Input() editOptions!: UniversalTableEditOptions;
  /** 单元格渲染模板, 传入的模板会覆盖column中的渲染配置 */
  @Input() cellRender: {[prop: string]: TemplateRef<any>} = {};
  /** 是否让表格高度自动撑满页面的剩余空间 */
  @Input() autoFulledHeight: boolean = true;
  /** 操作列模板 */
  @ContentChild('colAction', {read: TemplateRef}) action!: TemplateRef<any>;  
  /** 行扩展模板 */
  @ContentChild('rowExpand', {read: TemplateRef}) expand!: TemplateRef<any>; 
  /** nzTable内容区域的滚动高度(autoFulledHeight为true时需要此属性) */
  scrollY!: string;

  get pageInfo() {
    return this.paging.page
  }

  get total() {
    return this.paging.total
  }

  get isLoading$() {
    return this.paging.state$;
  }  

  get pagingData$() {
    return this.paging.data$
  }

  constructor(
    @Optional() @Host() private paging: PagingContainerDirective,
    private injector: Injector,
    private element: ElementRef,
    private formModal: UniversalFormModalService
  ) {
    if(!this.paging) console.error('universal-data-talbe组件目前需要与ntPagingContainer或PagingDataService结合使用')
  }

  ngOnInit(): void {

  }  

  ngAfterViewInit() {
    fromEvent(window, 'resize')
      .pipe(startWith(null), debounceTime(350))
      .subscribe(_ => this.autoFulledHeight && this.setScrollY())
  }

  private setScrollY() {
    const host = this.element.nativeElement as HTMLElement;
    const rect = host.getBoundingClientRect();
    const tableHeaderHeight = 40; //nzTable的表头高度，暂时设为常量
    if (rect.width > 0 && rect.height > 0) {
      this.scrollY = window.innerHeight - host.getBoundingClientRect().top - (this.nzOptions.nzShowPagination ? 75 : 25) - tableHeaderHeight + 'px';
    }
  }

  onPageNoChange(index: number) {
    this.paging?.gotoPage(index);
  }

  createInjectorWithData(rowData: any, colData: UniversalTableColumn) {
    return Injector.create({
      providers: [
        {provide: UNIVERSAL_TABLE_CELL, useValue:{rowData, colData}}
      ],
      parent: this.injector
    })
  }

  openFormModal(title: string, url: string, rowData?: any) {
    const formItems = this.columns.map(col => col.formItem) as UniversalFormItem[];
    if(formItems.some(item => !!item)) {
      const ref = this.formModal.create({
        title,
        data: {formItems, editableData: rowData, actionUrl: url}
      })
      ref.afterClose.subscribe(r => r && (rowData ? this.paging.fresh() : this.paging.reset()))
    }else {
      console.error('openFormModal方法需要在colums中传入formItem配置，否则无法正常调用')
    }
  }
}
