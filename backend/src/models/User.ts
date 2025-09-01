import mongoose, { Schema, Document } from "mongoose";
export interface Note extends Document {
    name:string,
    email: string,
    uid: string,
    dob:Date,
    provider: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<Note>(
    {
        uid: { type: String, required: true, unique: true },
        name:{ type: String, required: true, unique: true },
        email: { type: String, required: true },
        provider: { type: String, required: true },
        dob:{type:Date,required:true}
    },
    {
        timestamps: true
    }
)

export default mongoose.model<Note>("user", userSchema)