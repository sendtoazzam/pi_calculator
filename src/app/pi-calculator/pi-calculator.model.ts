import { AuthUser } from './../../common/type/auth-user.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsObject } from 'class-validator';
import { BaseMongooseDocument } from 'src/common/model/base-mongoose-document.model';

@Schema({
  timestamps: true,
})
export class PiCalculator extends BaseMongooseDocument {
  @Prop()
  piValue: string;

  @Prop({
    type: IsObject,
  })
  createdBy: AuthUser;
}

export const PiCalculatorSchema = SchemaFactory.createForClass(PiCalculator);
