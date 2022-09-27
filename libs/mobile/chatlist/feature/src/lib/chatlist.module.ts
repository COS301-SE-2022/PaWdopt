import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { chatlistPageComponent } from './chatlist.page';
import { chatlistPageComponentRoutingModule } from './chatlist-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, chatlistPageComponentRoutingModule],
  declarations: [chatlistPageComponent],
})
export class chatlistPageComponentModule {
  // public orgName = chatlistPageComponent.orgName;
  // public static adopterEmail = chatlistPageComponent.adopterEmail;
  //Unsure if this is the best way to do this
}
