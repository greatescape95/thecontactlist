import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './/app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'angular-webstorage-service';

import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactAddEditComponent } from './components/contact-add-edit/contact-add-edit.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


import { LocalStorageService } from './services/local-storage.service';
import { UtilityService } from './services/utility.service';

import { FilterPipe } from './filters/search-filter.pipe';

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
    UtilityService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
