import { Address } from "interfaces";
const dayjs = require("dayjs");

export const changeAddressFieldsName = (data: Address) => {
  return {
    "Created Date": dayjs(data.createdAt).format("MMM DD, YYYY"),
    "First Name": data.firstName,
    "Last Name": data.lastName,
    Email: data.email,
    "Address Line 1": data.addressLine1,
    "Address Line": data.addressLine2,
    City: data.city,
    State: data.state,
    ZIP: data.zipcode,
    "Tracking Number": data.trackingNumber,
  };
};
