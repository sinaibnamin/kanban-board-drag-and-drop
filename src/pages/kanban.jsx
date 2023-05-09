import React from 'react';
import Form from '../components/form';
import Cards from '../components/cards/cards';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { addTodo, removeTodo, addInProgress, removeInProgress, addDone, removeDone } from '../features/filter/filterSlice';


const Kanban = () => {

    const dispatch = useDispatch()

    const todo = JSON.parse(localStorage.getItem('todo'))
    const inProgress = JSON.parse(localStorage.getItem('inProgress'))
    const done = JSON.parse(localStorage.getItem('done'))





    useEffect(() => {

        if (todo) {
            todo.forEach(item => {
                dispatch(addTodo(item))
            });            
        }
        if (inProgress) {
            inProgress.forEach(item => {
                dispatch(addInProgress(item))
            });            
        }
        if (done) {
            done.forEach(item => {
                dispatch(addDone(item))
            });            
        }


    }, []);

    return (
        <div className="appWrapper">
            <Form />
            <Cards />
        </div>
    );
}

export default Kanban;
