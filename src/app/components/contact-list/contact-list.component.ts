import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  private contacts: Models.ContactDetail[];
  private searchText: string;
  private selectedTabIndex = 0;
  private tabItems: string[];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initContacts();
    this.tabItems = ['All contacts', 'My favorites'];
  }

  openContactDetails = (contact: Models.ContactDetail) => {
    this.router.navigateByUrl(`/contacts/detail/${contact.id}`);
  }

  getImageSrcByKey = (key: string) => {
    return this.localStorageService.getImageByKey(key);
  }

  editContact = (contact: Models.ContactDetail) => {
    this.router.navigateByUrl(`/contacts/detail/edit/${contact.id}`);
  }

  deleteContact = (contact: Models.ContactDetail) => {
    this.localStorageService.deleteContact(contact.id).then(() => {
      this.initContacts();
    });
  }

  changeFavoriteStatus = (contact: Models.ContactDetail) => {
    contact.isFavorite = !contact.isFavorite;
    this.localStorageService.addOrUpdateContact(contact);
  }

  switchTabSelection = (index: number) => {
    this.selectedTabIndex = index;
  }

  private initContacts = () => {
    this.contacts = this.localStorageService.getContacts();
  }
}
