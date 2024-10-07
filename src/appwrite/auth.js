import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";

// AuthService class for managing user authentication
export class AuthService{
    client = new Client(); // Instantiate a new Client
    account; // Placeholder for the Account service

    // Helper function to handle errors uniformly
    handleError(error) {
        console.error("AuthService error:", error);
        throw new Error("An error occurred during the authentication process."); // Customize error message
    }

    constructor(){
        // Setting Appwrite endpoint and project ID
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client); // Initialize Account service
    }

    // Create a new user account
    async createAccount({name,email,password}){
        
        // Validate parameters
        if (!name || !email || !password) {
            throw new Error("All fields are required to create an account.");
        }
        
        try {
            const userAcc= await this.account.create(ID.unique() ,name,email,password);

            // Automatically log in the user after account creation
            if(userAcc){
                return this.login({email,password})
            }else{
                return userAcc;
            }
        } catch (error) {
            this.handleError(error); 
        }
    }

    // Log in user with email and password
    async login({email,password}){
        // Validate parameters
        if (!email || !password) {
            throw new Error("Email and password are required for login.");
        }

        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            this.handleError(error);;
        }
    }

    // Get current user session
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            this.handleError(error);
        }

        return null;
    }

    // Log out the current user
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            this.handleError(error);
        }
    }
}

const authService = new AuthService();

export default authService;