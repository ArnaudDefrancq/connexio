import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommentaireLike from "../../Types/CommentaireLike";
import { CommentaireLikeController } from "../../Controllers/CommentaireLikeController";
import { isEmpty } from "../../Tools/function";

interface CommentaireLikeState {
    commentaireLike: { [id_commentaire: number]: Array<CommentaireLike> }
}

const initialState: CommentaireLikeState = {
    commentaireLike: {}
}

export const createCommentaireLike = createAsyncThunk("createCommentaireLike", async ({ id_commentaire, token }: {id_commentaire: number; token: string}, thunkAPI): Promise<CommentaireLike> => {
    try {
        await CommentaireLikeController.createCommentaireLike(id_commentaire, token);

        const res: Array<CommentaireLike> = await CommentaireLikeController.getAllCommentaireLike(id_commentaire, token);

        return res[0];
    } catch (error) {
        console.log('Pb store createPostLike' + error);
        throw error;
    }
})

export const getAllCommentaireLike = createAsyncThunk("getAllCommentaireLike", async ({ id_commentaire, token }: {id_commentaire: number; token: string}, thunkAPI): Promise<{ id_commentaire: number; res: Array<CommentaireLike>}> => {
    try {
        const res: Array<CommentaireLike> = await CommentaireLikeController.getAllCommentaireLike(id_commentaire, token);
        return {id_commentaire, res};
    } catch (error) {
        console.log("Pb store getAllPostLike" + error);
        throw error;
    }
})

export const deleteCommentaireLike = createAsyncThunk("deleteCommentaireLike", async ({ id_commentaire, token }: {id_commentaire: number; token: string}, thunkAPI): Promise<CommentaireLike | undefined> => {
    try {
        const commentaireLikeDelete: CommentaireLike = await CommentaireLikeController.getOneCommentaireLike(id_commentaire, token);

        if (commentaireLikeDelete && !isEmpty(commentaireLikeDelete) && commentaireLikeDelete.id_commentaire_like) {
            await CommentaireLikeController.deleteCommentiareLike(commentaireLikeDelete.id_commentaire_like, token);
            return commentaireLikeDelete;
        }
    } catch (error) {
        console.log('Pb store delete PostLike ' + error);
        throw error;
    }
})

export const CommentaireLikeSlice = createSlice({
    name: "commentaireLike",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCommentaireLike.fulfilled, (state, action) => {
                const id = action.payload.id_commentaire;
                if (!state.commentaireLike[id]) state.commentaireLike[id] = []
                state.commentaireLike[id].unshift (action.payload)
            })
            .addCase(getAllCommentaireLike.fulfilled, (state, action) => {
                const { id_commentaire, res } = action.payload;
                state.commentaireLike[id_commentaire] = res;
            })
            .addCase(deleteCommentaireLike.fulfilled, (state, action) => {
                const deleteCommentaireLike = action.payload;
                if (deleteCommentaireLike && deleteCommentaireLike.id_commentaire_like) {
                    const index = state.commentaireLike[deleteCommentaireLike.id_commentaire_like].findIndex(commentaireLike => commentaireLike.id_commentaire_like === deleteCommentaireLike.id_commentaire_like);
                    if (index !== -1) {
                        state.commentaireLike[deleteCommentaireLike.id_commentaire_like].splice(index, 1)
                    }
                }
            })
    }
})