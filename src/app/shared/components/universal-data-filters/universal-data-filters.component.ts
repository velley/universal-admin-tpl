import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PagingContainerDirective, PagingDataService, PagingSetting } from 'ng-treater';
import { UniversalFormItem } from '../../domain/form.interface';
import { PreDefinedFormItem } from '../../service/pre-defined-form-field.service';

@Component({
  selector: 'universal-data-filters',
  templateUrl: './universal-data-filters.component.html',
  styleUrls: ['./universal-data-filters.component.less']
})
export class UniversalDataFiltersComponent implements OnInit {

  @Input() controls: Array<UniversalFormItem> ;
  @Input() extractButtons: Array<{key: string; label: string; style?: string}> = [];
  @Output() btnClick = new EventEmitter<string>();
  enableControls: UniversalFormItem[];
  filterFormGroup: FormGroup;
  serverSelectPagingMap: {[prop: string]: PagingContainerDirective} = {};

  constructor(
    private fb: FormBuilder,
    @Optional() private hostPaging: PagingDataService
  ) { }

  get isLoading() {
    return this.hostPaging.loadingState$.value === 'pending';
  }

  ngOnInit(): void {
    this.filterFormGroup = this.fb.group({});
    // this.enableControls = this.controls.map(control => {
    //   if(typeof control === 'string') {
    //     return this.preDefinedFormItem.get(control)
    //   } else {
    //     return control
    //   }
    // }).filter(e => !!e);
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
