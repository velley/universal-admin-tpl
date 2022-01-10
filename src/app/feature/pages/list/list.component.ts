import { Component, OnInit } from '@angular/core';
import { UniversalFormItem } from 'src/app/shared/domain/form.interface';
import { UniversalTableColumn } from 'src/app/shared/domain/table.interfce';
import { PreDefinedFormItem } from 'src/app/shared/service/pre-defined-form-field.service';
import { UniversalFormModalService } from 'src/app/shared/service/universal-form-dialog.service';
import { CustomeCellRenderComponent } from '../../components/custome-cell-render/custome-cell-render.component';
import { ListFormComponent } from '../../components/list-form/list-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(
    private formDialog: UniversalFormModalService
  ) { }

  get val() {
    console.log('parent dirty check')
    return ''
  }

  columns: UniversalTableColumn[] = [
    {field: 'name', type: 'text', width: 160, header: '名称' },
    {field: 'describe', type: 'component', header: '介绍', width: 300, cellRender: CustomeCellRenderComponent },
    {field: 'time', type: 'time', header: '时间', dateFormat: 'yyyy-MM-dd HH:mm' },
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
    PreDefinedFormItem.get('orgFormItem'),
    {
      type: 'component',
      label: '自定筛选',
      key: 'custome',
      render: ListFormComponent
    },
    {
      type: 'radio',
      key: 'state',
      label: '发布状态',
      options: [
        {label: '已发布', value: 'yes'}, 
        {label: '未发布', value: 'no'},
        {label: '草稿', value: 'caogao'}
      ]
    }
  ]

  ngOnInit(): void { }

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
