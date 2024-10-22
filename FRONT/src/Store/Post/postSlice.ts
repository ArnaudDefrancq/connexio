import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newPost, PostWithProfil } from "../../Types/Post";
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

export const createPost = createAsyncThunk("createPost",   async ({ newPost, id_user, token }: { newPost: newPost; id_user: number; token: string }, thunkAPI): Promise<PostWithProfil> => {
    try {
        await PostController.createPost(newPost, id_user, token);

        const res = await PostController.getAllPost(token);        

        return res[0];

    } catch (error) {
        console.log('Pg store createPost' + error);
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
    }
})

export default PostSlice.reducer;