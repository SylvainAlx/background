import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        theme: {
            type: String,
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        data: {
            type: Array,
        },
        isPublic: {
            type: Boolean,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Project", projectSchema);
