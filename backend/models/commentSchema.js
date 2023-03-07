import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        message: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        userName: String,
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = mongoose.model("Comment", commentSchema);
