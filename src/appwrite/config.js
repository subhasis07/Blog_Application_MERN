import conf from "../conf/conf"
import { Client, Databases, ID , Storage, Query} from "appwrite";

// Service class for managing database and storage operations
export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

            this.databases = new Databases(this.client); // Initialize Databases service
            this.bucket = new Storage(this.client); // Initialize Storage service
    }

    // Helper function to handle errors uniformly
    handleError(error, context) {
        console.error(`Service error (${context}):`, error);
        throw new Error(`An error occurred during ${context}.`); // Customize error message
    }

    // Create a new post in the database
    async createPost({title, slug, content, featuredImage, status, userId}){
        // Validate parameters
        if (!title || !slug || !content || !userId) {
            throw new Error("Title, slug, content, and user ID are required to create a post.");
        }
        
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            this.handleError(error, "createPost");
        }
    }

    // Update an existing post in the database
    async updatePost(slug, {title, content, featuredImage, status}){
        // Validate parameters
        if (!slug) {
            throw new Error("Slug is required to update a post.");
        }

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            this.handleError(error, "updatePost");
        }
    }

    // Delete a post from the database
    async deletePost({slug}){
        // Validate parameters
        if (!slug) {
            throw new Error("Slug is required to delete a post.");
        }
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            this.handleError(error, "deletePost");
        }
    }

     // Retrieve a specific post by slug
    async getPost({slug}={}){
        // Validate parameters
        if (!slug) {
            throw new Error("Slug is required to retrieve a post.");
        }
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            this.handleError(error, "getPost"); // Handle error
            return false;
        }
    }

    // List all posts with optional queries
    async listAllPost(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            this.handleError(error, "listAllPost"); 
            return false;
        }
    }

    // Upload a file to the storage bucket
    async uploadFile(file){

        // Validate parameters
        if (!file) {
            throw new Error("File is required to upload.");
        }
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            this.handleError(error, "uploadFile");
            return false;
        }
    }

    // Download a file by file ID
    downloadFile(fileID){

        if (!fileID) {
            throw new Error("File ID is required to download a file.");
        }
        try {
            return this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            this.handleError(error, "downloadFile");
            return false;
        }
    }

    // Get a preview of a file
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    // Delete a file from the storage bucket
    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            this.handleError(error, "deleteFile"); 
            return false;
        }
    }
}

const service = new Service();

export default service;

