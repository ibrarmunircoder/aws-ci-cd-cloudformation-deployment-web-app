export interface Address {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  trackingNumber: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  state: string;
  zipcode: number;
  base64PDF: string;
  createdAt: Date;
  updatedAt: Date;
}
