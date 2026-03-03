import { IsString, MaxLength, IsNumber, IsOptional } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(255)
    content: string;

    @IsNumber()
    @IsOptional()
    category_id: number;

    @IsNumber()
    @IsOptional()
    author_id: number;
}
