import mongoose, { Schema, Document } from "mongoose";
export interface Note extends Document {
    content: string,
    uid: string,
    createdAt: Date
}

const noteSchema = new Schema<Note>(
    {
        content:{type: String, required: true},
        uid:{type: String, required: true},
        
    },
    {
        timestamps:true
    }
)

export default mongoose.model<Note>("note",noteSchema)