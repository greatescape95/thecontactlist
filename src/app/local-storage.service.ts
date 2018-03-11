import { LOCAL_STORAGE, WebStorageService, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable()
export class LocalStorageService {

  fileNameDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private dialog: MatDialog
  ) { }

  addOrUpdateContact = (contact: any) => {
    this.storage.set(contact.id, contact);
  }

  addImage = (imageKey: any, data: any) => {
    this.storage.set(imageKey, data);
  }

  getImageByKey = (key: any) => {
    let imgSrc = this.storage.get(key);
    if (!imgSrc) {
      imgSrc = '/assets/images/profilePicture.jpg';
    }
    return imgSrc;
  }


  getContacts = () => {
    let i = 0;
    const contactsList = [];
    let sKey: string;
    for (; sKey = window.localStorage.key(i); i++) {
      if (this.storage.get(sKey) !== null && !!this.storage.get(sKey).id) {
        contactsList.push(this.storage.get(sKey));
      }
    }
    return contactsList;
  }

  getContactByKey(key): any {
    return this.storage.get(key);
  }

  private deleteContactByKey = (key) => {
    this.storage.remove(key);
  }

  deleteContact = (id: string) => {
    const deleteContactPromise = new Promise((resolve, reject) => {
      this.fileNameDialogRef = this.dialog.open(ConfirmDialogComponent, {
        hasBackdrop: true,
        backdropClass: 'confirm-dialog-custom-backdrop'
      });
      this.fileNameDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteContactByKey(id);
          resolve();
        }
      });
    });
    return deleteContactPromise;
  }

}
