
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/add', component: ContactAddEditComponent },
  { path: 'contacts/detail/:id', component: ContactDetailComponent },
  { path: 'contacts/detail/edit/:id', component: ContactAddEditComponent },
  { path: '**', redirectTo: '/contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
