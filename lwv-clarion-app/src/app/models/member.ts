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
        MembershipType?: string,
        Status?: string,
        Email?: string,
        PreferredPhone?: string,
        SecondaryPhone?: string,
        StreetAddress?: string,
        City?: string,
        State?: string,
        ZipCode?: string
    ) {}
  }
  