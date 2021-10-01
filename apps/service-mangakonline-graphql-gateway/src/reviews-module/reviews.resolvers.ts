import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Review } from '../graphql.schema';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

const pubSub = new PubSub();

@Resolver('Review')
export class ReviewsResolvers {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query()
  async getReviews() {
    return this.reviewsService.findAll();
  }

  @Query('review')
  async findOneById(
    @Args('id', ParseIntPipe)
      id: number,
  ): Promise<Review> {
    return this.reviewsService.findOneById(id);
  }

  @Mutation('createReview')
  async create(@Args('createCatInput') args: CreateReviewDto): Promise<Review> {
    const createdReview = await this.reviewsService.create(args);
    pubSub.publish('reviewCreated', { reviewCreated: createdReview });
    return createdReview;
  }

  @Subscription('reviewCreated')
  reviewCreated() {
    return pubSub.asyncIterator('reviewCreated');
  }
}
