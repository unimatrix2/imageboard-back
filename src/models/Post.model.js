import { Schema, model } from 'mongoose';

const postSchema = new Schema({
	image_file: { type: Buffer },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
	content: { type: String },
	replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
	interactions: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Post = model('Post', postSchema);
export default Post;
