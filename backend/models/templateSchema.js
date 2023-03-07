import mongoose from "mongoose";

const templateSchema = mongoose.Schema({
    theme: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
    },
});

export default mongoose.model("Template", templateSchema);
