import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  // InternalServerErrorException,
  // UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
// import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('users')
@ApiTags('users')
// @UseFilters(PrismaClientExceptionFilter) // all requests of this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  // @UseFilters(PrismaClientExceptionFilter)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
    // try {
    //   return await this.usersService.create(createUserDto);
    // } catch (e) {
    //   throw new InternalServerErrorException(
    //     `User ${createUserDto?.email} already exist!`,
    //   );
    // }
  }

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  // whatever inside this @Get('falsified') meanse /users/falsified
  @Get('falsified')
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findAllFalse() {
    return this.usersService.findAllFalse();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    // if you want to use number instead of string
    // @Param('id', ParseIntPipe) id: number
    // Then use id instead of +id
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException(`user not found at ${id}`);
    else return user;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
