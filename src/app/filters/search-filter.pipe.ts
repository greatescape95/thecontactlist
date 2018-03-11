import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'searchFilter'
})

export class FilterPipe implements PipeTransform {
    transform(items: Models.ContactDetail[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        const hasEnteredPartOfPhoneNumberOrLabel = (phones: Models.Phone[]) => {
            return _.some(phones, (phone: Models.Phone) => {
                return phone.number.toLowerCase().includes(searchText) ||
                    phone.label.toLowerCase().includes(searchText);
            });
        };

        return items.filter((it: Models.ContactDetail) => {
            return it.name.toLowerCase().includes(searchText)
                || it.email.toLowerCase().includes(searchText)
                || hasEnteredPartOfPhoneNumberOrLabel(it.phones);
        });
    }
}
