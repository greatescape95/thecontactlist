
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  private contacts: any;
  searchText: string;
  selectedTabIndex = 0;
  tabItems: string[];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initContacts();
    this.tabItems = ['All contacts', 'My favorites'];
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
    this.localStorageService.deleteContact(contact.id).then(() => {
      this.initContacts();
    });
  }
}
