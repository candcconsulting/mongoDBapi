// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import EPD from "../models/EPD";

// Global Config
export const EPDRouter = express.Router();

EPDRouter.use(express.json());

// GET
EPDRouter.get("/", async (_req: Request, res: Response) => {
  try {
     const index = (await collections.EPD.find({}).toArray()) as unknown as EPD[];

      res.status(200).send(index);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

EPDRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      
      const query = { _id: new ObjectId(id) };
      const aIndex = (await collections.EPD.findOne(query)) as unknown as EPD;

      if (aIndex) {
          res.status(200).send(aIndex);
      }
  } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
EPDRouter.post("/", async (req: Request, res: Response) => {
  try {
      const newIndex = req.body as EPD;
      const result = await collections.EPD.insertOne(newIndex);

      result
          ? res.status(201).send(`Successfully created a new Digital Index with id ${result.insertedId}`)
          : res.status(500).send("Failed to create a new Digital Index entry.");
  } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
  }
});

// PUT

EPDRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const updatedIndex: EPD = req.body as EPD;
      const query = { _id: new ObjectId(id) };
    
      const result = await collections.EPD.updateOne(query, { $set: updatedIndex });

      result
          ? res.status(200).send(`Successfully updated Digital Index with id ${id}`)
          : res.status(304).send(`Digital Index with id: ${id} not updated`);
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

// DELETE

EPDRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.EPD.deleteOne(query);

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