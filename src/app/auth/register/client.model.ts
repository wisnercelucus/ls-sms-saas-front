export class Client{
    name: string;
    short: string;
    contact_email: string;
    contact_fisrt_name: string;
    contact_last_name: string;
    contact_phone: string;
    country: string;
    school_size:string;
    paid_until?:Date;
    on_trial?: boolean;
    created_on?: Date;
  
    constructor(fullName:string, short:string, contactEmail:string, 
                contactFirstName:string, contactLastName:string,
                contactPhone:string, country:string, schoolSize:string, 
                paidUntil?:Date, onTrial?:boolean, createdOn?:Date
                ){
      this.name = fullName;
      this.short = short;
      this.contact_email = contactEmail;
      this.contact_fisrt_name = contactFirstName;
      this.contact_last_name = contactLastName;
      this.contact_phone = contactPhone;
      this.country = country;
      this.school_size = schoolSize;
      this.paid_until = paidUntil;
      this.on_trial = onTrial;
  
    }
  }