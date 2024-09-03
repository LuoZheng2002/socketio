import mongoose, { model } from "mongoose";
import { AccountInterface } from "./interface";
import { AccountSchema } from "./schema";
export default mongoose.models.Account ||
model<AccountInterface>("Account", AccountSchema);
