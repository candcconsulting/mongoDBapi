
import { ObjectId } from "mongodb";

export default class EPDMapping {
  constructor(
    public iModelId: string,
    public mappingName: string,
    public groups: [{
      material: string, 
      group : [string],}], 
    public id?: ObjectId) {    
  }
}
