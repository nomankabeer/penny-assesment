import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  reset_password_code: string;

  @Prop({ required: false })
  reset_password_request_at: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
