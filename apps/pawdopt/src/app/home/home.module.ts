import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SwipeCardLibModule } from 'ng-swipe-card';



@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SwipeCardLibModule],
  declarations: [HomePage],
})
export class HomePageModule {}
