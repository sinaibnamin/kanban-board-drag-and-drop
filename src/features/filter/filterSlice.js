import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
        todo: [
           
        ],
        inProgress: [
          
        ],
        done: [
            
        ],        
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {       
        addTodo: (state, action) => {
            state.todo.push(action.payload)    
            localStorage.setItem("todo", JSON.stringify(state.todo));
        },
        removeTodo: (state, action) => {
            state.todo = state.todo.filter( item => item.id !== action.payload.id )   
            localStorage.setItem("todo", JSON.stringify(state.todo)); 
        },
        addInProgress: (state, action) => {
            state.inProgress.push(action.payload)   
            localStorage.setItem("inProgress", JSON.stringify(state.inProgress));  
        },
        removeInProgress: (state, action) => {            
            state.inProgress = state.inProgress.filter( item => item.id !== action.payload.id )  
            localStorage.setItem("inProgress", JSON.stringify(state.inProgress));    
        },
        addDone: (state, action) => {
            state.done.push(action.payload)    
            localStorage.setItem("done", JSON.stringify(state.done));   
        },
        removeDone: (state, action) => {
            state.done = state.done.filter( item => item.id !== action.payload.id )    
            localStorage.setItem("done", JSON.stringify(state.done));   
        },
    }
})

export default filterSlice.reducer
export const { addTodo, removeTodo, addInProgress, removeInProgress, addDone, removeDone } = filterSlice.actions