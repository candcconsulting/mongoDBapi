import { ObjectId } from "mongodb";

export default class EPD {
  constructor(    
      public material: string,
      public description: string,
      public density: number,
      public ICEcarbonFactor: number,
      public carbonFactor: number,
      public id?: ObjectId) {    
  }
}