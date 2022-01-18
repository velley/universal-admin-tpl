import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './core/pages/layout/layout.component';
import { mock, setup } from 'mockjs';

registerLocaleData(zh);

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,    
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  constructor() {
    // setup({})
    // mock('/api/heroes', {
    //   'data|10': [
    //     {'name': '@cname', 'id|+1': 1}
    //   ]
    // })
  }
}
