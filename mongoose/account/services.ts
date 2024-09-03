import AccountModel from "./model";
import { AccountInterface } from "./interface";


export async function createAccount(doc: AccountInterface) {
    try {
        await AccountModel.create(doc);
    } catch (error) {
        console.log(error);
        throw "failed to create account in mongodb";
    }
}

export async function findByUsername(
    username: string
): Promise<Array<AccountInterface> | null> {
    try {
        return await AccountModel.findOne({ username: username });
    } catch (err) {
        console.log(err);
        throw "error in finding by username";
    }
}

export async function findByEmail(email:string): Promise<Array<AccountInterface> | null> {
    try {
        return await AccountModel.findOne({ email: email });
    } catch (err) {
        console.log(err);
        throw "error in finding by email";
    }
}

export async function updateNickname(
    username: string,
    nickname: string
){
    try {
        await AccountModel.updateOne({ username: username }, { $set: { nickname: nickname } });
    } catch (err) {
        console.log(err);
        throw "error updating nickname";
    }
}
export async function deleteAccount(username: string) {
    try {
        await AccountModel.deleteOne({ username: username });
    } catch (err) {
        console.log(err);
        throw "error deleting an account";
    }
}