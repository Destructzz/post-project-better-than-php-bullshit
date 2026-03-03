import { IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(255)
    content: string;
}
