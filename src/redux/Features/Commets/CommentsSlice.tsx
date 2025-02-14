import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
/* const getTokenSession = () => {
  return localStorage.getItem("token");
}; */


import { TokenUser } from "../Citys/CitySlice"




export interface InitialStateComment {
    CommentData: {}
    copyCommentData: {}
    comment: []
}





export const fetchingComments = createAsyncThunk("getComments", async () => {

  try {
    

    const response = await axios.get("/comments", {

      headers: {
        Authorization: `Bearer ${TokenUser}`
      }
    });

    const data = await response.data;
    return data;
  } catch (error) {
    // Manejar el error según tus necesidades
    console.error('Error to get comments:', error);
    throw error;
  }
});

export const fetchinCommentId = createAsyncThunk("getComment", async (id: string) => {
  try {

    


    const response = await axios.get(`/comment?id=${id}`, {

      headers: {
        Authorization: `Bearer ${TokenUser}`
      }
    });

    const data = await response.data;
    return data;
  } catch (error) {
    // Manejar el error según tus necesidades
    console.error('Error al obtener el hotel:', error);
    throw error;
  }
});

export const fetchinCommentByHotel = createAsyncThunk("getCommentHotel", async () => {
  try {




    const response = await axios.get(`/comments?hotelId=`, {

      headers: {
        Authorization: `Bearer ${TokenUser}`
      }
    });

    const data = await response.data;
    return data;
  } catch (error) {
    // Manejar el error según tus necesidades
    console.error('Error al obtener el hotel:', error);
    throw error;
  }
});



const CommentSlice = createSlice({
  name: "Comment",
  initialState: {
    commentData: [],
    copyCommentData: [],
    comment: {}
  },
  reducers: {
    getCommentCoincidence: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingComments.fulfilled, (state, action) => {
        state.commentData = action.payload


      })
      .addCase(fetchinCommentId.fulfilled, (state, action) => {
        state.comment = action.payload;

      })
      .addCase(fetchinCommentByHotel.fulfilled, (state, action) => {
        state.comment = action.payload

      })
  }
})



export default CommentSlice;
export const selectCommentIdState = (state:any) => state.comment.id
export const selectCommentsByHotelId = (state: any, hotelId: any) =>
  state.comment.commentData.filter((comment: any) => comment.hotelId === hotelId);
export const { getCommentCoincidence } = CommentSlice.actions 