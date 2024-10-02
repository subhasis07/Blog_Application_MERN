import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client);
    }

    async createAccount({name,email,password}){
        try {
            const userAcc= await this.account.create(ID.unique() ,name,email,password);

            if(userAcc){
                //call login MEthod
                return this.login({email,password})
            }else{
                return userAcc;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            throw err;
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (err) {
            throw err;
        }
    }
}

const authService = new AuthService();

export default authService;