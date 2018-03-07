
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { StorageServiceModule} from 'angular-webstorage-service';
import { LocalStorageService } from './local-storage.service';
import { UtilityService} from './utility.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    FormsModule
  ],
  providers: [
    LocalStorageService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
