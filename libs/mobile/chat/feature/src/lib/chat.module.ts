import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { chatPageComponent } from './chat.page';
import { chatPageComponentRoutingModule } from './chat-routing.module';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, chatPageComponentRoutingModule, AutosizeModule],
  declarations: [chatPageComponent],
})
export class chatPageComponentModule {
  // public orgName = chatPageComponent.orgName;
  // public static adopterEmail = chatPageComponent.adopterEmail;
}
