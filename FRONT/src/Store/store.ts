import { configureStore } from "@reduxjs/toolkit";
import { PostSlice } from "./Post/postSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CommentaireSlice } from "./Commentaire/commentaireSlice";
import { PostLikeSlice } from "./PostLike/postLikeSlice";

export const store = configureStore({
    reducer: {
        post: PostSlice.reducer,
        commentaire: CommentaireSlice.reducer,
        postLike: PostLikeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;