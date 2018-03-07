import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  private contacts: any;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.contacts = this.localStorageService.getContacts();
    console.log('contacts', this.contacts);
  }
}
