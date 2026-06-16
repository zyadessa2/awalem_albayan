import { Types } from "mongoose";

export function isValidObjectId(id: string) {
  return Types.ObjectId.isValid(id);
}

export function toObjectId(id: string) {
  return new Types.ObjectId(id);
}
