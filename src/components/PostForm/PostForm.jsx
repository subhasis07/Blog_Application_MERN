import React, { useCallback ,useEffect} from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// PostForm component for creating or updating posts
export default function PostForm({post}){

     // Form setup with default values from post if available
    const{ register, handleSubmit, watch, setValue, control, getValues}= useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
 
    const navigate=useNavigate();  // Hook for navigation 
    const userData=useSelector((state)=>state.auth.userData); // Get user data from Redux

     // Form submission handler
    const submit= async(data)=>{

        // If updating an existing post
        if(post){
            const file=data.image[0]?await appwriteService.uploadFile(data.image[0]): null;

            if(file){
                appwriteService.deleteFile(post.featuredImage); // Delete old featured image if a new one is uploaded

            }

            const dbPost = {
                ...data,
                slug: post.slug, // Ensure slug remains unchanged
                featuredImage:file ? file.$id : undefined,
                userId: userData.$id, // Attach userId to the post
            }

            await appwriteService.updatePost(post.$id, dbPost); // Update the post in the database
            navigate(`/post/${dbPost.$id}`); // Navigate to that posts after submission
            
            // if(dbPost){
            //     navigate(`/post/${dbPost.$id}`)
            // }
        }else{

            // If creating a new post
            const file=await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ 
                    ...data, 
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">

                {/* Title input */}

                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                {/* Slug input */}
                
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}