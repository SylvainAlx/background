import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
