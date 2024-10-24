import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  { PostLike }  from '../../Types/PostLike';
import { PostLikeController } from '../../Controllers/PostLikeController';
import { isEmpty } from '../../Tools/function';

interface PostLikeState {
    postLike: Array<PostLike>
}

const initialState: PostLikeState = {
    postLike: []
}

export const createPostLike = createAsyncThunk("createPostLike", async ({ id_post, token }: {id_post: number; token: string}, thunkAPI): Promise<PostLike> => {
    try {
        await PostLikeController.createPostLike(id_post, token);

        const res: Array<PostLike> = await PostLikeController.getAllPostLike(id_post, token);

        return res[0];
    } catch (error) {
        console.log('Pb store createPostLike' + error);
        throw error;
    }
})

export const getAllPostLike = createAsyncThunk("getAllPostLike", async ({ id_post, token }: {id_post: number; token: string}, thunkAPI): Promise<Array<PostLike>> => {
    try {
        const res: Array<PostLike> = await PostLikeController.getAllPostLike(id_post, token);
        return res;
    } catch (error) {
        console.log("Pb store getAllPostLike" + error);
        throw error;
    }
})

export const deletePostLike = createAsyncThunk("deletePostLike", async ({ id_post, token }: {id_post: number; token: string}, thunkAPI): Promise<PostLike | undefined> => {
    try {
        const postLikeDelete: PostLike = await PostLikeController.getOnePostLike(id_post, token);

        if (postLikeDelete && !isEmpty(postLikeDelete) && postLikeDelete.id_post_like) {
            await PostLikeController.deletePostLike(postLikeDelete.id_post_like, token);
            return postLikeDelete;
        }
    } catch (error) {
        console.log('Pb store delete PostLike ' + error);
        throw error;
    }
})

export const PostLikeSlice = createSlice({
    name: "postLike",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPostLike.fulfilled, (state, action) => {
                state.postLike.unshift (action.payload)
            })
            .addCase(getAllPostLike.fulfilled, (state, action) => {
                state.postLike = action.payload
            })
            .addCase(deletePostLike.fulfilled, (state, action) => {
                const deletePostLike = action.payload;
                if (deletePostLike && deletePostLike.id_post_like) {
                    const index = state.postLike.findIndex(postLike => postLike.id_post_like === deletePostLike.id_post_like);
                    if (index !== -1) {
                        state.postLike.splice(index, 1)
                    }
                }
            })
    }
})