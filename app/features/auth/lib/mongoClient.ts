import { MongoClient } from 'mongodb';

const url = process.env.NEXT_PUBLIC_MONGODB_URL as string;

export const mongoClient = new MongoClient(url);
