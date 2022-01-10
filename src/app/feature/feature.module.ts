import { NgModule } from '@angular/core';
import { ListComponent } from './pages/list/list.component';
import { SharedModule } from '../shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { ListFiltersComponent } from './components/list-filters/list-filters.component';
import { CustomeCellRenderComponent } from './components/custome-cell-render/custome-cell-render.component';
import { ListFormComponent } from './components/list-form/list-form.component';


@NgModule({
  declarations: [
    ListComponent,
    ListFiltersComponent,
    CustomeCellRenderComponent,
    ListFormComponent
  ],
  imports: [
    SharedModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
