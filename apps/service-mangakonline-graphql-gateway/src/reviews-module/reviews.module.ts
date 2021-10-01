import { Module } from '@nestjs/common';
import { ReviewsResolvers } from './reviews.resolvers';
import { ReviewsService } from './reviews.service';

@Module({
  providers: [ReviewsService, ReviewsResolvers],
})
export class ReviewsModule {}
