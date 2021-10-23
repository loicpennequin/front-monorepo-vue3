import { BaseModel } from './Base.model';
import { Category } from './Category.model';
import { Color } from './Color.model';
import { User } from './User.model';
import { Media } from './Media.model';
import { formatPrice } from '@dsp/core';

export class Item extends BaseModel {
  static get relations() {
    return [
      { name: 'category', getUri: entity => entity._category, model: Category },
      { name: 'colors', getUri: entity => entity._colors, model: Color },
      { name: 'user', getUri: entity => entity._user, model: User },
      { name: 'mainMedia', getUri: entity => entity._mainMedia, model: Media }
    ];
  }

  get formatedPrice() {
    return formatPrice(this.price);
  }

  get isPublished() {
    return this.publicationState === Item.publicationStates.PUBLISHED;
  }

  get isUnpublished() {
    return this.publicationState === Item.publicationStates.UNPUBLISHED;
  }

  get isVacancy() {
    return this.publicationState === Item.publicationStates.VACANCY;
  }

  get isOrdered() {
    return this.publicationState === Item.publicationStates.ORDERED;
  }

  get isPurchased() {
    return this.publicationState === Item.publicationStates.PURCHASED;
  }

  get isDeleted() {
    return this.publicationState === Item.publicationStates.DELETED;
  }
}
