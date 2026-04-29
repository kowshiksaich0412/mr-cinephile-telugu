import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "CinephileDB";
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  if (uri.includes("<db_password>")) {
    throw new Error("MONGO_URI still contains the <db_password> placeholder. Update server/.env with a real database password.");
  }

  await mongoose.connect(uri, { dbName });
  console.log(`MongoDB connected to ${dbName}`);
};

export default connectDB;
