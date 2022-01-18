import { NgModule } from '@angular/core';
import { LayoutComponent } from './pages/layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { IconsProviderModule } from '../shared/icons-provider.module';
import { NG_TREATER_SETTINGS, NgTreaterSetting } from 'ng-treater';
import { PreDefinedFormItem } from '../shared/service/pre-defined-form-field.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemHeroService } from '../../mock/data-mock.service'

import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CoreRoutingModule,
    IconsProviderModule,
    SharedModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,    
  ],
  providers: [
    {provide: NG_TREATER_SETTINGS, useValue: <NgTreaterSetting>{
      method: 'get',
      paging: {
        indexKey: 'current',
        sizeKey: 'size',
        size: 10,
        start: 1,
        dataPlucker: ['data'],
        totalPlucker: ['total'],
      }
    }}
  ]
})
export class CoreModule {
  constructor() {
    PreDefinedFormItem.add('orgFormItem', {
      type: 'select',
      label: '选择机构',
      key: 'org',
      serverGetter: {
        url: '/miniapp/queryOrganization',
        searchKey: 'name',
        isPaging: true
      },
      allowSearch: true,
      optionLabel: 'name',
      optionValue: 'code'
    })
  }
}