import { Injectable } from '@nestjs/common';
import { Review } from '../graphql.schema';
import data from './data.json';

@Injectable()
export class ReviewsService {
  private readonly reviews: Review[] = data;

  create(review: Review): Review {
    review.id = this.reviews.length + 1;
    this.reviews.push(review);
    return review;
  }

  findAll(): Review[] {
    return this.reviews;
  }

  findOneById(id: number): Review {
    return this.reviews.find((review: Review) => review.id === id);
  }
}
