import { Controller, Get } from '@nestjs/common';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { PostService } from '../post/post.service';
import { TagService } from '../tag/tag.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly authorService: AuthorService,
        private readonly categoryService: CategoryService,
        private readonly postService: PostService,
        private readonly tagService: TagService,
    ) { }

    @Get('stats')
    async getStats() {
        const authorsCount = (await this.authorService.findAll()).length;
        const categoriesCount = (await this.categoryService.findAll()).length;
        const postsCount = (await this.postService.findAll()).length;
        const tagsCount = (await this.tagService.findAll()).length;

        return {
            authorsCount,
            categoriesCount,
            postsCount,
            tagsCount,
        };
    }
}
