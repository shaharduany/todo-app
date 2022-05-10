import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		emailVerified: String,
	},
	{ timestamps: true }
);

export default mongoose.models?.User || mongoose.model("user", UserSchema);
