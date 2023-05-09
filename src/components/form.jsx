import React from 'react';
import { addTodo } from '../features/filter/filterSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
const Form = () => {

    const dispatch = useDispatch()

    const todoState = useSelector(state => state.filter.todo)
    const inProgressState = useSelector(state => state.filter.inProgress)
    const doneState = useSelector(state => state.filter.done)

    const alldata = todoState.concat(inProgressState, doneState);
    

    function useGetHighestId(allData) {

        const totaldata = allData.length
    
        let maxId = 0;
    
        if (totaldata === 0) {
            return maxId + 1
        }
    
        allData.forEach(elements => {
            if (elements.id > maxId) {
                maxId = elements.id;
            }
        });
        return maxId + 1;
    }


    const [taskName, setTaskName] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault();

        const highId = useGetHighestId(alldata)

        const data = {
            id: Number(highId),
            taskName: taskName,
        }

        dispatch(addTodo(data))
        setTaskName('')
    }

    return (
        <>
        <h1>React Drag and Drop ToDo App</h1>
                <form onSubmit={handlesubmit}>
            <div className="inputWrapper">
                <input value={taskName} onChange={(e) => setTaskName(e.target.value)} required type="text" placeholder="Write task name.." />
                <button type="submit">Add</button>
            </div>
        </form>
        </>

    );
}

export default Form;
