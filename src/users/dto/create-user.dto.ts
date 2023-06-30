import { IsNotEmpty, Length, IsNumber, IsString, IsPositive, Min, Max } from "class-validator"
import { Position } from "../model/position.model";
import { Role } from "../model/role.model";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(10, 50)
    fullname: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    age: number;

    @IsNotEmpty()
    @IsString()
    position: Position;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(99)
    tshirt_number: number;

    @IsNotEmpty()
    @IsString()
    team: string;

    @IsNotEmpty()
    @IsString()
    role: Role;
}
