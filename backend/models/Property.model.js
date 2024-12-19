const propertySchema = new mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      address: String,
      city: String,
      country: String,
    },
    price: { type: Number, required: true },
    images: [String],
    amenities: [String],
    maxGuests: { type: Number, required: true },
    availableDates: [{
      startDate: Date,
      endDate: Date
    }]
  });