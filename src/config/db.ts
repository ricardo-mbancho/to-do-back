import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbUrl: string | undefined = process.env.MONGO_URI; 
    if (dbUrl) {
      await mongoose.connect(dbUrl);
    }
  } catch (error) {
    console.error('DB connection error:', error)
    process.exit(1)
  }
}