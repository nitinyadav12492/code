import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    if (!URI) {
      throw new Error(
        'MONGODB_URI is not set. Create a .env file in the `server` folder with `MONGODB_URI="your_connection_string"`'
      );
    }

    await mongoose.connect(URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
};

export default connectDb;
