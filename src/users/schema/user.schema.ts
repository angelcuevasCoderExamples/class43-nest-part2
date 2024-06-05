import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document } from "mongoose";

export type UserDocument = HydratedDocument<User>; //Document

@Schema()
export class User {
    @Prop()
    first_name: string;
    @Prop()
    last_name: string; 
    @Prop({required:true})
    email: string;
    @Prop()
    password: string;
    @Prop()
    avatar: string; 
}

export const UserSchema = SchemaFactory.createForClass(User);