import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'
export class CreateLoginDto {
    @Length(5, 10, {
        message: "不能超过十个字符"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    age: number;
}
