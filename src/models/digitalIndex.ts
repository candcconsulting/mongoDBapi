import { ObjectId } from "mongodb";

export default class DigitalIndex {
  constructor(
    public iModelId: string,
    public digitalIndex: number,
    public classes: [{
      className: string, 
      index : number,}], 
    public storeDate : Date,
    public id?: ObjectId) {    
  }
}