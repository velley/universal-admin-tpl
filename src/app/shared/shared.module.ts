import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalDataFiltersComponent } from './components/universal-data-filters/universal-data-filters.component';
import { UniversalDataFormComponent } from './components/universal-data-form/universal-data-form.component';
import { UniversalDataTableComponent } from './components/universal-data-table/universal-data-table.component';
import { UniversalValidatorTipsDirective } from './directives/universal-validator-tips.directive';

import { PagingDataModule } from 'ng-treater';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IconsProviderModule } from './icons-provider.module';
import { SelectorControlItemComponent } from './components/selector-control-item/selector-control-item.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    UniversalDataTableComponent,
    UniversalDataFiltersComponent,
    UniversalDataFormComponent,
    UniversalValidatorTipsDirective,
    SelectorControlItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    IconsProviderModule,
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzFormModule,
    NzMessageModule,
    NzModalModule,
    ReactiveFormsModule,
    NzSelectModule,
    PagingDataModule
  ],
  exports: [
    /** 导出应用内通用组件 */
    UniversalDataTableComponent,
    UniversalDataFiltersComponent,
    UniversalDataFormComponent,
    /** 导出通用模块 */
    CommonModule,
    FlexLayoutModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    PagingDataModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class SharedModule { }
