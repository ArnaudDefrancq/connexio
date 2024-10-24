import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentaireWithProfil, NewCommentaire } from "../../Types/Commentaire";
import { CommentaireController } from "../../Controllers/CommentaireController";

interface CommentaireState {
    commentaires: { [id_post: number]:Array<CommentaireWithProfil>}
}

const initialState: CommentaireState = {
    commentaires: {}
}

export const getAllCommentaire = createAsyncThunk("getAllCommentaire", async({id_post, token}: {id_post: number; token: string}, thunkAPI): Promise<{ id_post: number, res: Array<CommentaireWithProfil> }> => {
    try {       
        const response: Array<CommentaireWithProfil> = await CommentaireController.getAllCommentaireWithProfil(id_post, token);
        return {id_post , res: response};
    } catch (error) {
        console.log(error);
        throw error;
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

export const CommentaireSlice = createSlice({
    name: "commentaire",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCommentaire.fulfilled, (state, action) => {
                const { id_post, res } = action.payload;
                console.log(res);
                
                state.commentaires[id_post] = res;
            })
            .addCase(createCommentaire.fulfilled, (state, action) => {   
                const id = action.payload.id_post;             
                state.commentaires[id].unshift(action.payload);
            })
            .addCase(deleteCommentaire.fulfilled, (state, action) => {
                const deleteCom = action.payload;
                if (deleteCom && deleteCom.id_commentaire) {
                    const index = state.commentaires[deleteCom.id_post].findIndex(com => com.id_commentaire === deleteCom.id_commentaire);
                    if (index !== -1) {                        
                        state.commentaires[deleteCom.id_post].splice(index, 1)
                    }
                }
            })
    }
})