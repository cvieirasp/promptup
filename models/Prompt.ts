import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt é requerido.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag é requerida.'],
  },
}, { 
    timestamps: true 
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
