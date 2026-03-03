import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { TagService } from '../tag/tag.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly tagService: TagService,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { tag_ids, ...postData } = createPostDto;
    const post = this.postRepository.create(postData);

    if (tag_ids && tag_ids.length > 0) {
      post.tags = await this.tagService.findByIds(tag_ids);
    }

    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['category', 'author', 'tags'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['category', 'author', 'tags'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const { tag_ids, ...postData } = updatePostDto;
    const post = await this.findOne(id);

    const updatedPost = this.postRepository.merge(post, postData);

    if (tag_ids !== undefined) {
      updatedPost.tags = await this.tagService.findByIds(tag_ids);
    }

    return await this.postRepository.save(updatedPost);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
