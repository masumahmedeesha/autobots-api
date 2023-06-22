import { ApiProperty } from '@nestjs/swagger';
import {
  // Prisma,
  User,
} from '@prisma/client';
// import { Transform } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, nullable: true })
  profileImage: string | null;
  @ApiProperty({ required: false })
  paymentClear: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  // if any attribute is decimal.

  // @Transform(({ value }) => value.toNumber())
  // @ApiProperty({ type: Number })
  // price: Prisma.Decimal;

  // constructor(partial: Partial<ProductEntity>) {
  //   Object.assign(this, partial);
  //   // short for 👇
  //   // this.id = partial.id;
  //   // this.createdAt = partial.createdAt;
  //   // this.updatedAt = partial.updatedAt;
  //   // this.name = partial.name;
  //   // this.description = partial.description;
  //   // this.price = partial.price;
  //   // this.sku = partial.sku;
  //   // this.published = partial.published;
  // }
}
