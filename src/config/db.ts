import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbUrl: string | undefined = process.env.MONGO_URI; 
    if (dbUrl) {
      console.log('Connecting to DB:');
      await mongoose.connect(dbUrl);
      console.log('DB connected successfully');
    }
    console.log('MongoDB connected')
  } catch (error) {
    console.error('DB connection error:', error)
    process.exit(1)
  }
}