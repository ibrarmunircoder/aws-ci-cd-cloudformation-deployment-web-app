import {
  EqualToFilterInterface,
  ILikeFilterInterface,
  IsNullFilterInterface,
  LikeFilterInterface,
  NotEqualToFilterInterface,
  ValueInFilterInterface,
  ValueNotInFilterInterface,
} from "interfaces";

export interface StringFilterInterface
  extends EqualToFilterInterface<string>,
    NotEqualToFilterInterface<string>,
    ValueInFilterInterface<string>,
    ValueNotInFilterInterface<string>,
    LikeFilterInterface<string>,
    ILikeFilterInterface<string>,
    IsNullFilterInterface<string> {}
