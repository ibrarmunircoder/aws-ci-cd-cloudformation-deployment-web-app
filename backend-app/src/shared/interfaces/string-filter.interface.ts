import {
  EqualToFilterInterface,
  ILikeFilterInterface,
  LikeFilterInterface,
  NotEqualToFilterInterface,
  ValueInFilterInterface,
  ValueNotInFilterInterface,
} from 'src/shared/interfaces';

export interface StringFilterInterface
  extends EqualToFilterInterface<string>,
    NotEqualToFilterInterface<string>,
    ValueInFilterInterface<string>,
    ValueNotInFilterInterface<string>,
    LikeFilterInterface<string>,
    ILikeFilterInterface<string> {}
