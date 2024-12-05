import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewPost, PostWithProfil } from "../../Types/Post";
import { PostController } from "../../Controllers/PostController";
import { isEmpty } from "../../Tools/function";

interface PostState {
    posts: Array<PostWithProfil>
}

const initialState: PostState = {
    posts: [],
}

export const getAllPost = createAsyncThunk("getAllPost", async(token: string, thunkAPI): Promise<Array<PostWithProfil>> => {
    try {       
        if (token && !isEmpty(token)) {
            const response: Array<PostWithProfil> = await PostController.getAllPost(token);
            return response;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
});

export const createPost = createAsyncThunk("createPost",   async ({ newPost, id_user, token }: { newPost: NewPost; id_user: number; token: string }, thunkAPI): Promise<PostWithProfil> => {
    try {
        await PostController.createPost(newPost, id_user, token);

        const res = await PostController.getAllPost(token);        

        return res[0];

    } catch (error) {
        console.log('Pg store createPost' + error);
        throw error;
    }
})

export const updatePost = createAsyncThunk("updatePost", async({newPost, id_user, id_post, token}: { newPost: NewPost; id_user: number; id_post: number; token: string}, thunkAPI): Promise<PostWithProfil> => {
    try {
        await PostController.updatePost(newPost, id_user, id_post, token);
        const updatePost = await PostController.getOnePost(id_post, token);
        return updatePost;
    } catch (error) {
        console.log('Pb store update post' + error);
        throw error;
    }
});

export const deletePost = createAsyncThunk("deletePost", async({id_post, token}: {id_post: number; token: string}, thunkAPI): Promise<PostWithProfil> => {
    try {
        const postDelete: PostWithProfil = await PostController.getOnePost(id_post, token); 
        await PostController.deletePost(id_post, token);
        
        return postDelete;

    } catch (error) {
        console.log(error);
        throw error;
    }
})

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers : {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.posts= action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {                
                state.posts.unshift(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updatedPost = action.payload; 
                if (updatedPost && updatedPost.id_post) {
                    const index = state.posts.findIndex(post => post.id_post === updatedPost.id_post);
                    if (index !== -1) {
                        // state.posts[index] = updatedPost;
                        state.posts = [
                            ...state.posts.slice(0, index),
                            updatedPost,
                            ...state.posts.slice(index + 1)
                        ];
                    }
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const deletePost = action.payload;
                if (deletePost && deletePost.id_post) {
                    const index = state.posts.findIndex(post => post.id_post === deletePost.id_post);
                    if (index !== -1) {                        
                        state.posts.splice(index, 1)
                    }
                }
            })
    }
})

export default PostSlice.reducer;