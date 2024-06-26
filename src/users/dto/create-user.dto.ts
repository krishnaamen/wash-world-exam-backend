import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  birthDate: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
