import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() {

  }

  generateFakeClientGuid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  generateFakeImageGuid = () => {
    return 'IMG' + this.generateFakeClientGuid();
  }

  isNullOrEmptyString = (s: string) => {
    return !s || s.length === 0;
  }
}
