import { AfterViewInit, Component, ContentChild, ElementRef, Host, Injector, Input, OnInit, Optional, QueryList, TemplateRef } from '@angular/core';
import { PagingDataService } from 'ng-treater';
import { debounceTime, fromEvent, startWith } from 'rxjs';
import { UniversalTableColumn, UNIVERSAL_TABLE_CELL } from '../../domain/table.interfce';

interface NzTableOptions {
  nzBordered?: boolean;
  nzShowPagination?: boolean;
  nzSize?: 'middle' | 'small' | 'default';
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
})
export class UniversalDataTableComponent implements OnInit, AfterViewInit {
  
  /** 表格的列信息 */
  @Input() columns!: UniversalTableColumn[];
  /** 表格的行数据 */
  @Input() sourceData!: any[];
  /** nzTable的配置参数，看到ng-zorro的table组件 */
  @Input() options: NzTableOptions = DEFAULT_TABLE_OPTIONS;
  /** 是否让表格高度自动撑满页面的剩余空间 */
  @Input() autoFulledHeight: boolean = true;
  /** 操作列模板 */
  @ContentChild('columnAction', {read: TemplateRef}) action: TemplateRef<any>;  
  /** nzTable内容区域的滚动高度(autoFulledHeight为true时需要此属性) */
  scrollY: string;

  get pageInfo() {
    return this.paging.page
  }

  get total() {
    return this.paging.total
  }

  get isLoading() {
    return this.paging.loadingState$.value === 'pending';
  }  

  constructor(
    @Optional() @Host() private paging: PagingDataService<unknown>,
    private injector: Injector,
    private element: ElementRef
  ) {
    if(!this.paging) console.warn('universal-data-talbe组件需要与ntPagingContainer或PagingDataService结合使用')
  }

  ngOnInit(): void {

  }  

  ngAfterViewInit() {
    fromEvent(window, 'resize')
      .pipe(startWith(null), debounceTime(350))
      .subscribe(_ => this.autoFulledHeight && this.setScrollY())
  }

  setScrollY() {
    const host = this.element.nativeElement as HTMLElement;
    const rect = host.getBoundingClientRect();
    const tableHeaderHeight = 40; //nzTable的表头高度，暂时设为常量
    if (rect.width > 0 && rect.height > 0) {
      this.scrollY = window.innerHeight - host.getBoundingClientRect().top - (this.options.nzShowPagination ? 75 : 25) - tableHeaderHeight + 'px';
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
}
