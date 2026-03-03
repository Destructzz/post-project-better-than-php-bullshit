import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { AuthorModule } from '../author/author.module';
import { CategoryModule } from '../category/category.module';
import { PostModule } from '../post/post.module';
import { TagModule } from '../tag/tag.module';

@Module({
    imports: [AuthorModule, CategoryModule, PostModule, TagModule],
    controllers: [DashboardController],
})
export class DashboardModule { }
