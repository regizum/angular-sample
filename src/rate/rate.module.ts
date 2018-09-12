import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { I18nModule } from '../../i18n';

import {
  RateChooseComponent,
  RateComponent,
  RateLoadingComponent,
  RateSimpleComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,

    I18nModule.forChild()
  ],
  declarations: [
    RateChooseComponent,
    RateComponent,
    RateLoadingComponent,
    RateSimpleComponent
  ],
  exports: [
    RateChooseComponent,
    RateComponent,
    RateLoadingComponent,
    RateSimpleComponent
  ]
})
export class RateModule {}
