import { LOCAL_STORAGE, WebStorageService, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }


  saveContact = (key, val) => {
    this.storage.set(key, val);
  }

  getContacts = () => {
    let i = 0;
    const contactsList = [];
    let sKey: string;
    for (; sKey = window.localStorage.key(i); i++) {
      contactsList.push(this.storage.get(sKey));
    }
    return contactsList;
  }

  getContactByKey(key): void {
    console.log('recieved= key:' + key);
    // this.data[key] = this.storage.get(key);
    // console.log(this.data);
  }

}
