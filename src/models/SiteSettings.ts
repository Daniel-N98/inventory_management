import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  inviteRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: false,
  },
  editRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
  },
  createRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
  },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);