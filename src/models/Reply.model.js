import { Schema, model } from 'mongoose';

const replySchema = new Schema({
    image_file: { type: Buffer },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    content: { type: String },
    replying_to: { type: Schema.Types.ObjectId, required: true, refPath: 'on' },
    on: { type: String, required: true, enum: ['Post', 'Reply'] }
}, { timestamps: true });

export const Reply = model('Reply', replySchema); 