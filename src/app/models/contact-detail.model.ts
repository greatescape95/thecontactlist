namespace Models {
    export class ContactDetail {
        id: string;
        name: string;
        imgUrl: string;
        email: string;
        isFavorite: boolean;
        phones: Models.Phone[];
    }
}

