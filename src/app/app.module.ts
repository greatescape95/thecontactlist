

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterPipe} from './filter.pipe';


import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { StorageServiceModule} from 'angular-webstorage-service';
import { LocalStorageService } from './local-storage.service';
import { UtilityService} from './utility.service';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactAddEditComponent,
    ConfirmDialogComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    LocalStorageService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
