import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'
export const thunk2 =createAsyncThunk('repos/api',async(m)=>{
    return await axios.get(m).then((e)=>e.data)
 })
const {pending,fulfilled,rejected} =thunk2
const slice2 =createSlice({
    name:'repos',
    initialState:{
        repoData:[],
        bol1:false,
        bol2:false,
        bol3:''
    },
    reducers:{
        bol1changeT:(state)=>{
            state.bol1 =true
        },
        bol1changeF:(state)=>{
            state.bol1 =false
        },
        bol2changeT:(state)=>{
            state.bol2 =true
        }
        ,bol2changeF:(state)=>{
            state.bol2 =false
        },
        bol3:(state,action) =>{
            console.log(action.payload)
            state.bol3 =action.payload
        }
    },
    extraReducers:{
        [pending] :(state)=>{
            state.repoData=null
        },
        [fulfilled] :(state,action)=>{
            console.log(action.payload)
            state.repoData=action.payload
        },
        [rejected]:(state)=>{
            state.repoData=null
        }
    }
    // full_name

})

export const actionsslice2 =slice2.actions

export default slice2