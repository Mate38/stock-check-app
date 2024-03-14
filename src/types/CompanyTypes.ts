export interface ICompany {
    uuid: string;
    identification: string;
    name: string;
    businessName: string;
    email: string;
    phoneCollection: IPhone[];
    addressCollection: IAddress[];
}

export interface IPhone {
    areaCode: number;
    number: string;
    type: number;
}

export interface IAddress {
    street: string;
    number: string;
    complement: string;
    neighbourhood: string;
    zipCode: IZipCode;
}

export interface IZipCode {
    zipCode: string;
    city: ICity;
}

export interface ICity {
    name: string;
    state: IState;
}

export interface IState {
    name: string;
    acronym: string;
}
