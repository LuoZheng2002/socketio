import { Schema } from "mongoose";
import { AccountInterface } from "./interface";
export const AccountSchema = new Schema<AccountInterface>({
    username: {
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    nickname: {
        type: "String",
        required: true,
    },
    titleinfo: {
        titlename:{
            type: "String",
            required: true
        },
        currentxp: {
            type: "Number",
            required: true
        }
    },
});