import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  badge: { type: String, default: '' },
  sizes: [{ type: String }],
  image: { type: String, required: true },
  gallery: [{ type: String }],
  description: { type: String, required: true },
  benefits: [{ type: String }],
  ingredients: { type: String, default: '' },
  howToUse: { type: String, default: '' }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
