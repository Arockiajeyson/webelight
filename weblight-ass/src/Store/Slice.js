import {createSlice,configureStore,combineReducers,createAsyncThunk} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import axios from 'axios'
const configu={
    key:'myredux',
    storage
}
export const thunk =createAsyncThunk('users/actionApi',async(m)=>{
   return await axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${m}`).then((e)=>e.data)
})
const {pending,fulfilled,rejected} =thunk
const slice =createSlice({
    name:'users',
    initialState:{
        value:[],
        count:1
    },
    reducers:{
        add:(state) =>{
            state.count++
        },
        resetState:(state) =>{
            state.count=1
        }
    },
    
    extraReducers:{
        [pending] :(state)=>{
            state.value=null
        },
        [fulfilled] :(state,action)=>{
            // console.log(action)
            state.value=action.payload.items
        },
        [rejected]:(state)=>{
            state.value=null
        }
    }
})

const combine =combineReducers({
    counter:slice.reducer
})

const pReducer =persistReducer(configu,combine)

export const actionss =slice.actions

export const store =configureStore({
    reducer:pReducer
})