export class Member {
    constructor(
        //required attributes of Member
        FirstName: string,
        LastName: string,
        MemberID?:   number,
        //not required, can be null when using CRUD operations on it
        SecondaryHouseholdMemberName?: string,
        LastPaidDate?: string,
        DateJoined?: string,
        MembershipType?: number,
        Active?: boolean, //might not be a boolean.. that database has it a tinyInt (0 or 1)
        Email?: string,
        PreferredPhone?: string,
        SecondaryPhone?: string,
        StreetAddress?: string,
        City?: string,
        State?: string,
        ZipCode?: number,
        MemberUser?: string,
        MemberPassword?: string,
    ) {}
  }
  