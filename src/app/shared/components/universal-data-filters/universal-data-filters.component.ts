import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PagingContainerDirective, PagingDataService, PagingSetting } from 'ng-treater';
import { UniversalFormItem } from '../../domain/form.interface';

@Component({
  selector: 'universal-data-filters',
  templateUrl: './universal-data-filters.component.html',
  styleUrls: ['./universal-data-filters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversalDataFiltersComponent implements OnInit {

  @Input() controls!: Array<UniversalFormItem> ;
  @Input() extractButtons: Array<{key: string; label: string; style?: string}> = [];
  @Output() btnClick = new EventEmitter<string>();
  filterFormGroup!: FormGroup;
  serverSelectPagingMap: {[prop: string]: PagingContainerDirective} = {};

  constructor(
    private fb: FormBuilder,
    private changeDef: ChangeDetectorRef,
    @Optional() private hostPaging: PagingDataService
  ) { }

  get state$() {
    console.log('dirty check', this)
    return this.hostPaging.loadingState$;
  }

  ngOnInit(): void {
    this.filterFormGroup = this.fb.group({});
    this.controls      
      .forEach(control => {
        this.filterFormGroup.addControl(control.key, new FormControl(''));
      })
    this.filterFormGroup.valueChanges.subscribe(console.log)
  }

  registerServerSelectorPaging(name: string, paging: PagingContainerDirective) {
    this.serverSelectPagingMap[name] = paging;
  }

  resetFilters() {
    for(let key in this.serverSelectPagingMap) {
      this.serverSelectPagingMap[key].reset();
    }
    this.filterFormGroup.reset();
    this.hostPaging.reset();
  }

  onBtnClick(key: string) {
    this.btnClick.emit(key);
  }

  search() {
    this.hostPaging.addFilter(this.filterFormGroup.value)
  }
}
