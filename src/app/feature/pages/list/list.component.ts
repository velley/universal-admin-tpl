import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UniversalFormItem } from 'src/app/shared/domain/form.interface';
import { UniversalTableColumn } from 'src/app/shared/domain/table.interfce';
import { PreDefinedFormItem } from 'src/app/shared/service/pre-defined-form-field.service';
import { UniversalFormModalService } from 'src/app/shared/service/universal-form-dialog.service';
import { list_grid } from '../../const/list.const';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(
    private formDialog: UniversalFormModalService,
    private http: HttpClient
  ) { }

  get val() {
    console.log('parent dirty check')
    return ''
  }

  columns: UniversalTableColumn[] = list_grid.columns;
  filters: Array<UniversalFormItem>  = list_grid.filters;
  formOptions = list_grid.formOptions;

  ngOnInit(): void {
    // this.http.get('/api/heroes').subscribe(res => console.log(res))
  }

  onClick(key: string) {
    if(key === 'add') {
      this.formDialog.create({
        title: '新增',
        data: {formItems: [
          {type: 'input', key: 'name', label: '条码名称'},
          PreDefinedFormItem.get('orgFormItem')
        ]}
      })
    }
  }

  onClick2() {

  }

}
