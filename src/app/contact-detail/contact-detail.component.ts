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
  private editingContactId: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.editingContactId = params['id'];
      this.contact = this.localStorageService.getContactByKey(this.editingContactId);
    });
  }

  onBackClick = () => {
    this.location.back();
  }
}
