// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import EPDMapping from "../models/EPDMapping";

// Global Config
export const mappingRouter = express.Router();

mappingRouter.use(express.json());

// GET
mappingRouter.get("/", async (_req: Request, res: Response) => {
  try {
     const index = (await collections.EPDMapping.find({}).toArray()) as unknown as EPDMapping[];

      res.status(200).send(index);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

mappingRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      
      const query = { _id: new ObjectId(id) };
      const aIndex = (await collections.EPDMapping.findOne(query)) as unknown as EPDMapping;

      if (aIndex) {
          res.status(200).send(aIndex);
      }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
mappingRouter.post("/", async (req: Request, res: Response) => {
  try {
      const newIndex = req.body as EPDMapping;
      const result = await collections.EPDMapping.insertOne(newIndex);

      result
          ? res.status(201).send(`Successfully created a new Digital Index with id ${result.insertedId}`)
          : res.status(500).send("Failed to create a new Digital Index entry.");
  } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
  }
});

// PUT

mappingRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const updatedIndex: EPDMapping = req.body as EPDMapping;
      const query = { _id: new ObjectId(id) };
    
      const result = await collections.EPDMapping.updateOne(query, { $set: updatedIndex });

      result
          ? res.status(200).send(`Successfully updated Digital Index with id ${id}`)
          : res.status(304).send(`Digital Index with id: ${id} not updated`);
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

// DELETE

mappingRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.EPDMapping.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Successfully removed Digital Index with id ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove Digital Index with id ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Digital Index with id ${id} does not exist`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});