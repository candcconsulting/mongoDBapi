// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { connect } from "http2";
// Global Variables
export const collections: {digitalIndex?: mongoDB.Collection,
EPDMapping?: mongoDB.Collection,
EPD?: mongoDB.Collection} = {}

// Initialise Connection

export async function connectDatabases () {
  await connectToiTwinDatabase()
  await connectToEPDDatabase()
}

export async function connectToiTwinDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const digitalIndexCollection: mongoDB.Collection = db.collection(process.env.DI_COLLECTION_NAME);
  collections.digitalIndex = digitalIndexCollection;
  console.log(`successful connection to ${db.databaseName} and collection ${digitalIndexCollection.collectionName}`);
  const EPDMappingCollection: mongoDB.Collection = db.collection(process.env.EPDMAP_COLLECTION_NAME);
  collections.EPDMapping = EPDMappingCollection;
  
}
export async function connectToEPDDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.EPD_NAME);
  const EPDCollection: mongoDB.Collection = db.collection(process.env.EPD_COLLECTION_NAME);
  collections.EPD = EPDCollection;
  console.log(`successful connection to ${db.databaseName} and collection ${EPDCollection.collectionName}`);
}

