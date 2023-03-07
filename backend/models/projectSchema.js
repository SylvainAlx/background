import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        data: {
            type: Array,
        },
        isPublic: Boolean,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Project", projectSchema);
