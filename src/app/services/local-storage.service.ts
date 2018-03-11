import { LOCAL_STORAGE, WebStorageService, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from './../components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class LocalStorageService {

  private fileNameDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private dialog: MatDialog
  ) { }

  getContacts = () => {
    let i = 0;
    const contactsList: Models.ContactDetail[] = [];
    let sKey: string;
    for (; sKey = window.localStorage.key(i); i++) {
      if (this.storage.get(sKey) !== null && !!this.storage.get(sKey).id) {
        contactsList.push(this.storage.get(sKey));
      }
    }
    return contactsList;
  }

  getContactByKey = (key: string) => {
    return this.storage.get(key);
  }

  addOrUpdateContact = (contact: Models.ContactDetail) => {
    this.storage.set(contact.id, contact);
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

  addImage = (imageKey: string, data: any) => {
    this.storage.set(imageKey, data);
  }

  getImageByKey = (key: string) => {
    let imgSrc = this.storage.get(key);
    if (!imgSrc) {
      imgSrc = '/assets/images/profilePicture.jpg';
    }
    return imgSrc;
  }

  private deleteContactByKey = (key: string) => {
    this.storage.remove(key);
  }
}
