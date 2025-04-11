const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
    unique: true
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0'],
    set: val => Math.round(val * 100) / 100 // Round to 2 decimal places
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: [
        'Electronics',
        'Clothing',
        'Home',
        'Books',
        'Beauty',
        'Sports',
        'Toys'
      ],
      message: 'Invalid product category'
    }
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  image: {
    type: String,
    default: 'default-product.jpg'
  },
  images: [String],
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from name before saving
ProductSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Virtual populate reviews (if you have a Review model)
ProductSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

// Indexes for better performance
ProductSchema.index({ price: 1, ratingsAverage: -1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

// Query middleware to populate reviews
ProductSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'reviews',
    select: 'review rating user createdAt'
  });
  next();
});

// Static method to get product stats
ProductSchema.statics.getProductStats = async function() {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        numProducts: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        avgRating: { $avg: '$ratingsAverage' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);
};

module.exports = mongoose.model('Product', ProductSchema);