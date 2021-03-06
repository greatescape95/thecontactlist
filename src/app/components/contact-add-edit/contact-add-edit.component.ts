import * as _ from 'underscore';

import { UtilityService } from './../../services/utility.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})

export class ContactAddEditComponent implements OnInit {

  contact: Models.ContactDetail;
  private editingContactId: string;
  private uploaderElement: HTMLElement;
  isEdit: boolean;
  isImageUploaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.editingContactId = params['id'];
      this.isEdit = !!this.editingContactId;

      if (this.isEdit) {
        this.contact = this.localStorageService.getContactByKey(this.editingContactId);
      } else {
        this.initContact();
      }
    });

    this.initFileUploaderLogic();
  }

  deleteContact = () => {
    this.localStorageService.deleteContact(this.contact.id).then(() => {
      this.router.navigateByUrl('/contacts');
    });
  }

  addNewPhoneInput = () => {
    this.contact.phones.push({ number: '', label: '' });
  }

  removePhone = (index: number) => {
    this.contact.phones.splice(index, 1);
  }

  getImageSrc = () => {
    return this.localStorageService.getImageByKey(this.contact.imgUrl);
  }

  changeImage = () => {
    this.uploaderElement.click();
  }

  onCancelClick = () => {
    this.location.back();
  }

  onSaveClick = () => {
    if (!this.isEdit) {
      const uniqueContactKey = this.utilityService.generateFakeClientGuid();
      this.contact.id = uniqueContactKey;
    }
    this.removeEmptyPhonesIfAny();
    this.localStorageService.addOrUpdateContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }

  trackByIndex(index: number, value: number) {
    return index;
  }

  private initContact = () => {
    this.contact = {
      id: null,
      name: null,
      imgUrl: null,
      email: null,
      isFavorite: false,
      phones: [{ number: '', label: '' }]
    };
  }

  private initFileUploaderLogic = () => {
    this.uploaderElement = document.getElementById('uploadImage');
    this.uploaderElement.onchange = (evt: any) => {
      const tgt = evt.target || window.event.srcElement;
      const files = tgt.files;

      if (FileReader && files && files.length) {
        const fr = new FileReader();
        fr.onload = () => {
          const uniqueImageKey = this.utilityService.generateFakeImageGuid();
          this.contact.imgUrl = uniqueImageKey;
          this.localStorageService.addImage(uniqueImageKey, fr.result);
        };
        fr.readAsDataURL(files[0]);
        this.isImageUploaded = true;
      }
    };
    this.uploaderElement.style.display = 'none';
  }

  private removeEmptyPhonesIfAny = () => {
    this.contact.phones = _.filter(this.contact.phones, (phone: Models.Phone) => {
      return !this.utilityService.isNullOrEmptyString(phone.number);
    });
  }
}
