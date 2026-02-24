import mongoose from "mongoose";

const InvitationSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
  invitationToken: {
    type: String,
    required: false,
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

export default mongoose.models.Invitations || mongoose.model("Invitations", InvitationSchema);