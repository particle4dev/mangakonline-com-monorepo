import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export default class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @MinLength(6)
    readonly password: string;
}
