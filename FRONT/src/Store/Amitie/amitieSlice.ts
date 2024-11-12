import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Amitie, AmitieWithProfil, NewAmitie } from "../../Types/Amitie";
import { AmitieController } from "../../Controllers/AmitieController";
import { AmitieStatus } from "../../Types/StatusEnum";

interface AmitieState {
    accepted: { [id_profil: number]: Array<AmitieWithProfil> };
    pending: { [id_profil: number]: Array<AmitieWithProfil> };
    rejected: { [id_profil: number]: Array<Amitie> };
}

const initialState: AmitieState = {
    accepted: {},
    pending: {},
    rejected: {}
}

export const getRelation = createAsyncThunk('getRelation', async({id_profil, slug, token}: {id_profil: number; slug: string; token: string}, thunkAPI): Promise<{ id_profil: number, res: Array<AmitieWithProfil> }> => {
    try {
        const res: Array<AmitieWithProfil> = await AmitieController.getRelation(id_profil, slug, token);
        return {id_profil, res}
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const createRelation = createAsyncThunk('createRelation', async({ newRelation, token}: {newRelation: NewAmitie; token: string}, thunkAPI): Promise<AmitieWithProfil> => {
    try {
        await AmitieController.createRelation(newRelation, token);
        
        const allRelation: Array<AmitieWithProfil> = await AmitieController.getRelation(Number(newRelation.id_profil), newRelation.status, token);

        return allRelation[0];
    } catch (error) {
        console.log('Pb store create relation'+ error);
        throw error;
    }
})

export const updateRelation = createAsyncThunk('updateRelation', async({ idRelation, slug, token}: {idRelation: number; slug: string, token: string}, thunkAPI): Promise<Amitie> => {
    try {
        await AmitieController.updateRelation(idRelation, slug, token);
        const relation: Amitie = await AmitieController.getOneRelation(idRelation, token);
        return relation;
    } catch (error) {
        console.log('Pb state update ' + error);
        throw error;
    }
})

export const deleteRelation = createAsyncThunk('deleteRelation', async({ idRelation, token}: {idRelation: number, token: string}, thunkAPI): Promise<Amitie> => {
    try {
        const relation: Amitie = await AmitieController.getOneRelation(idRelation, token);
        await AmitieController.deleteRelation(idRelation, token);
        return relation;
    } catch (error) {
        console.log('Pb store deleteRelation' + error);
        throw error;
    }
})

export const AmitieSlice = createSlice({
    name: "amitie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRelation.fulfilled, (state, action) => {
                const id = action.payload.id_profil;
                const idFriend = action.payload.id_profil_1;
                if (!state.pending[id]) state.pending[id] = []
                if (!state.pending[idFriend]) state.pending[idFriend] = []
                state.pending[id].unshift(action.payload);
                state.pending[idFriend].unshift(action.payload);
            })
            .addCase(getRelation.fulfilled, (state, action) => {
                const slug = action.meta.arg.slug;
                const { id_profil, res } = action.payload;
                switch (slug) {
                    case AmitieStatus.Accepted:
                        state.accepted[id_profil] = res;
                        break;
                    case AmitieStatus.Pending:
                        state.pending[id_profil] = res;
                        break;
                }
            })
            .addCase(deleteRelation.fulfilled, (state, action) => {
                const deleteRelation = action.payload;
                if (deleteRelation && deleteRelation.id_amitie) {
                    const index = state.accepted[deleteRelation.id_profil].findIndex(relation => relation.id_amitie === deleteRelation.id_amitie);
                    if (index !== -1) {
                        state.accepted[deleteRelation.id_profil].splice(index, 1)
                    }
                }
            })
    }
})