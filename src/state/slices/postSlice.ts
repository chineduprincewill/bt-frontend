import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../pages/feeds/Post";
import { PostResponseFromApi } from "../../api/postApi";

interface PostState {
    postInfo: IPost,
    show: boolean,
    posts?: PostResponseFromApi[]
}

const initialState: PostState = {
    postInfo: {} as IPost,
    show: false,
    posts: []
};

export const postSliceSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        setRepostDialog: (state, action: PayloadAction<PostState>) => {
            state.postInfo = action.payload.postInfo
            state.show = action.payload.show
        },
        setPostsData: (state, action: PayloadAction<{ posts: PostResponseFromApi[] }>) => {
            state.posts = action.payload.posts
        }
    },
});

interface ReportPostState {
    postId: string,
    show: boolean
}

export const reportPostSlice = createSlice({
    name: 'reportPost',
    initialState: {
        show: false,
        postId: ''
    },
    reducers: {
        setReportPostDialog: (state, action: PayloadAction<{ postId: string, show: boolean}>) => {
            state.show = action.payload.show
            state.postId = action.payload.postId
        }
    }
})

export const { setReportPostDialog } = reportPostSlice.actions
export const reportPostSliceReducer = reportPostSlice.reducer
export const { setRepostDialog, setPostsData, } = postSliceSlice.actions;
export type {
    PostState,
    ReportPostState
};
export default postSliceSlice.reducer;
