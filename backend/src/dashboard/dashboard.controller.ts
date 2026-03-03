import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { PostService } from '../post/post.service';
import { TagService } from '../tag/tag.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
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
