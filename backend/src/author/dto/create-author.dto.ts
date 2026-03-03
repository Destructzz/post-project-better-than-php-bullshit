import { IsString, MaxLength, IsEmail } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @MaxLength(255)
    email: string;
}
