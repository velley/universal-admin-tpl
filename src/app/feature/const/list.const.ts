import { Validators } from "@angular/forms";
import { UniversalDataGrid } from "src/app/shared/domain/table.interfce";
import { PreDefinedFormItem } from "src/app/shared/service/pre-defined-form-field.service";
import { ListFormComponent } from "../components/list-form/list-form.component";


export const list_grid: UniversalDataGrid = {
  name: 'list',
  columns: [
    {
      header: '名称',
      field: 'name',
      type: 'text',
      width: 160,
      formItem: {
        type: 'input',
        key: 'name',
        label: '输入名称',
        validators: [Validators.required]
      }
    },
    {
      header: '介绍',
      field: 'describe',
      type: 'text',
      formItem: {
        type: 'textarea',
        key: 'describe',
        label: '输入介绍'
      }
    },
    {field: 'time', type: 'time', header: '时间', dateFormat: 'yyyy-MM-dd HH:mm', formItem: {
      type: 'datepicker',
      showTime: true,
      key: 'time',
      label: '输入时间'
    } },
  ],
  filters: [
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
  ],
  formOptions: {
    editUrl: '/miniapp/addFeedback/{code}',
    insertUrl: '/miniapp/addFeedback'
  }
}