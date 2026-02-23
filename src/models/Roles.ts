import mongoose from 'mongoose';

const RolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

export default mongoose.models.Roles || mongoose.model('Roles', RolesSchema);