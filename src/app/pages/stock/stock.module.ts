import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockComponent} from './stock.component';
import {StockRoutingModule} from './stock-routing.module';
import {ChartsModule} from 'ng2-charts';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    AngularMaterialModule,
    ChartsModule,

  ]
})
export class StockModule { }
