import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  { PostLike }  from '../../Types/PostLike';
import { PostLikeController } from '../../Controllers/PostLikeController';
import { isEmpty } from '../../Tools/function';

interface PostLikeState {
    postLike: { [id_post: number]: Array<PostLike>}
}

const initialState: PostLikeState = {
    postLike: {}
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

export const getAllPostLike = createAsyncThunk("getAllPostLike", async ({ id_post, token }: {id_post: number; token: string}, thunkAPI): Promise<{ id_post: number; res: Array<PostLike>}> => {
    try {
        const res: Array<PostLike> = await PostLikeController.getAllPostLike(id_post, token);
        return {id_post, res};
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
                const id = action.payload.id_post;
                if (!state.postLike[id]) state.postLike[id] = []
                state.postLike[id].unshift (action.payload)
            })
            .addCase(getAllPostLike.fulfilled, (state, action) => {
                const { id_post, res } = action.payload;
                state.postLike[id_post] = res;
            })
            .addCase(deletePostLike.fulfilled, (state, action) => {
                const deletePostLike = action.payload;
                if (deletePostLike && deletePostLike.id_post_like) {
                    const index = state.postLike[deletePostLike.id_post].findIndex(postLike => postLike.id_post_like === deletePostLike.id_post_like);
                    if (index !== -1) {
                        state.postLike[deletePostLike.id_post].splice(index, 1)
                    }
                }
            })
    }
})