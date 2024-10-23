import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentaireWithProfil, NewCommentaire } from "../../Types/Commentaire";
import { CommentaireController } from "../../Controllers/CommentaireController";
import { isEmpty } from "../../Tools/function";

interface CommentaireState {
    commentaires: Array<CommentaireWithProfil>
}

const initialState: CommentaireState = {
    commentaires: []
}

export const getAllCommentaire = createAsyncThunk("getAllCommentaire", async({idPost, token}: {idPost: number; token: string}, thunkAPI): Promise<Array<CommentaireWithProfil>> => {
    try {       
        if (token && !isEmpty(token)) {
            const response: Array<CommentaireWithProfil> = await CommentaireController.getAllCommentaireWithProfil(idPost, token);
            return response;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
})

export const createCommentaire = createAsyncThunk("createCommentaire", async({ newCommentaire, token}: {newCommentaire: NewCommentaire; token: string}, thunkAPI): Promise<CommentaireWithProfil> => {
    try {
        await CommentaireController.createCommentaire(newCommentaire, token);

        const allCom: Array<CommentaireWithProfil> = await CommentaireController.getAllCommentaireWithProfil(newCommentaire.id_post, token);

        return allCom[0];
    } catch (error) {
        console.log('Pb error Store createCom' + error);
        throw error;
    } 
})

export const deleteCommentaire = createAsyncThunk("deleteCommentaire", async({ idCommentaire, token }: { idCommentaire: number; token: string }, thunkAPI): Promise<CommentaireWithProfil> => {
    try {
        const comDelete: CommentaireWithProfil = await CommentaireController.getOneCommentaireWithProfil(idCommentaire, token); 
        await CommentaireController.deleteCommentaire(idCommentaire, token);
        
        return comDelete;

    } catch (error) {
        console.log(error);
        throw error;
    }
})

export const commentaireSlice = createSlice({
    name: "commentaire",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCommentaire.fulfilled, (state, action) => {
                state.commentaires = action.payload
            })
            .addCase(createCommentaire.fulfilled, (state, action) => {                
                state.commentaires.unshift(action.payload);
            })
            .addCase(deleteCommentaire.fulfilled, (state, action) => {
                const deleteCom = action.payload;
                if (deleteCom && deleteCom.id_commentaire) {
                    const index = state.commentaires.findIndex(com => com.id_commentaire === deleteCom.id_commentaire);
                    if (index !== -1) {                        
                        state.commentaires.splice(index, 1)
                    }
                }
            })
    }
})