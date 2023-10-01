import {
  BaseArgType,
  IdFilterInterface,
  Sort,
  StringFilterInterface,
} from 'interfaces';

export interface AddressFilter {
  firstName?: StringFilterInterface;
  lastName?: StringFilterInterface;
  email?: StringFilterInterface;
  addressLine1?: StringFilterInterface;
  addressLine2?: StringFilterInterface;
  city?: StringFilterInterface;
  state?: StringFilterInterface;
  country?: StringFilterInterface;
  brandId?: IdFilterInterface;
  recycleDonate?: StringFilterInterface;
}

export interface AddressQuery extends BaseArgType {
  order?: Sort;
  search?: string;
  filter?: AddressFilter;
}
