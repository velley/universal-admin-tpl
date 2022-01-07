import { Component, OnInit } from '@angular/core';
import { UniversalFormItem } from 'src/app/shared/domain/form.interface';
import { UniversalTableColumn } from 'src/app/shared/domain/table.interfce';
import { PreDefinedFormItem } from 'src/app/shared/service/pre-defined-form-field.service';
import { UniversalFormModalService } from 'src/app/shared/service/universal-form-dialog.service';
import { CustomeCellRenderComponent } from '../../components/custome-cell-render/custome-cell-render.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(
    private formDialog: UniversalFormModalService
  ) { }

  columns: UniversalTableColumn[] = [
    {field: 'name', type: 'string', header: '名称' },
    {field: 'describe', type: 'component', header: '介绍', cellRender: CustomeCellRenderComponent },
    {field: 'time', type: 'date', header: '时间', dateFormat: 'yyyy-MM-dd HH:mm' },
  ]

  filters: Array<UniversalFormItem>  = [
    {type: 'input', key: 'name', label: '条目姓名'},
    {
      type: 'select', 
      key: 'classify', 
      label: '分类', 
      optionsData: [
        {title: 'ccc', code: '333'},
        {title: 'yyy', code: '222'}
      ],
      optionLabel: 'title',
      optionValue: 'code'
    },
    PreDefinedFormItem.get('orgItem')
  ]

  ngOnInit(): void { }

  onClick(key: string) {
    if(key === 'add') {
      this.formDialog.create({
        title: '新增',
        data: {formItems: [
          {type: 'input', key: 'name', label: '条码名称'},
          PreDefinedFormItem.get('orgItem')
        ]}
      })
    }
  }
}
