
import { Router } from '@angular/router';
import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  private contacts: any;
  fileNameDialogRef: MatDialogRef<ConfirmDialogComponent>;
  searchText: string;
  selectedTabIndex = 0;
  tabItems: string[];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initContacts();
    this.tabItems = ["All contacts", "My favorites"];
  }

  private initContacts = () => {
    this.contacts = this.localStorageService.getContacts();
  }

  switchTabSelection = (index: number) => {
    this.selectedTabIndex = index;
  }

  changeFavoriteStatus = (contact) => {
    contact.isFavorite = !contact.isFavorite;
    this.localStorageService.addOrUpdateContact(contact);
  }

  openContactDetails = (contact: any) => {
    this.router.navigateByUrl(`/contacts/detail/${contact.id}`);
  }

  getImageSrcByKey = (key: string) => {
    return this.localStorageService.getImageByKey(key);
  }

  editContact = (contact: any) => {
    this.router.navigateByUrl(`/contacts/detail/edit/${contact.id}`);
  }

  deleteContact = (contact: any) => {
    this.fileNameDialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        hasBackdrop: false,
        width: '300px',
        height: '300px'
      });
    this.fileNameDialogRef.updatePosition({ left: 'calc(50% - 150px)' });
    this.fileNameDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.localStorageService.deleteContactByKey(contact.id);
        this.initContacts();
      }
    });
  }


}
