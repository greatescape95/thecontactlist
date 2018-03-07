import { UtilityService } from './../utility.service';
import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  private isEdit: boolean;
  private contact: Models.ContactDetail;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService
  ) {
    this.contact = {
      id: null,
      name: 'test',
      imgUrl: 'test',
      email: 'test',
      isFavorite: true,
      phones: [{ name: 'test', label: 'test' }]
    };
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.isEdit = !!params['id'];
    });


    console.log(this.contact);
  }

  onCancelClick = () => {
    this.location.back();
  }


  onSaveClick = () => {
    if (!this.isEdit) {
      const uniqueKey = this.utilityService.generateFakeClientGuid();
      this.contact.id = uniqueKey;
      this.localStorageService.saveContact(uniqueKey, this.contact);
    }

    this.router.navigateByUrl('/contacts');
  }

}
