import { LOCAL_STORAGE, WebStorageService, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  addOrUpdateContact = (contact: any) => {
    this.storage.set(contact.id, contact);
  }

  addImage = (imageKey: any, data: any) => {
    this.storage.set(imageKey, data);
  }

  getImageByKey = (key: any) => {
    console.log(this.storage.get(key));
    return this.storage.get(key);
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
    console.log(this.storage.get(key));
    return this.storage.get(key);
  }

  deleteContactByKey = (key) => {
    this.storage.remove(key);
  }

}
