import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Commentaire, NewCommentaire } from "../../Types/Commentaire";

interface CommentaireState {
    commentaires: Array<Commentaire>
}

const initialState: CommentaireState = {
    commentaires: []
}

export const createCommentaire = createAsyncThunk("createCommentaire", async({ newCommentaire, token}: {newCommentaire: NewCommentaire; token: string}, thunkAPI): Promise<Commentaire> => {
    try {

    } catch (error) {
        console.log('Pb error Store createCom' + error);
        throw error;
    } 
})

export const commentaireSlice = createSlice({
    name: "commentaire",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})