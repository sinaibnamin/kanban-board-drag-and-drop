import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, addInProgress, removeInProgress, addDone, removeDone } from '../../features/filter/filterSlice';
const Cards = () => {

    const dispatch = useDispatch()

    const todoState = useSelector(state => state.filter.todo)
    const inProgressState = useSelector(state => state.filter.inProgress)
    const doneState = useSelector(state => state.filter.done)

    const handleDragOver = e => {
        e.preventDefault();
        e.currentTarget.classList.add("dragover-bg-red")
    };
   
    const handleDragLeave = e => {
        e.preventDefault();
        if(e.target.classList.contains('taskitem')){
            return
        }
        e.currentTarget.classList.remove("dragover-bg-red")
    };

    const dragStart = e => {
        const target = e.target
        e.dataTransfer.setData('task_id', target.id);
        e.dataTransfer.setData('task_name', target.innerText);
        e.dataTransfer.setData('task_from', target.dataset.from);
    }
   
    const drop = e => {
        e.preventDefault();

              document.querySelectorAll('.tasksWrapper').forEach( item => item.classList.remove("dragover-bg-red"))
             
        const task_id = e.dataTransfer.getData('task_id');
        const task_name = e.dataTransfer.getData('task_name');
        const data_from = e.dataTransfer.getData('task_from');    
        const drop_on = e.target.closest('.tasksWrapper').dataset.box;
        
        if(drop_on === data_from){
            return
        }
       
        const data = {
            id: Number(task_id),
            taskName: task_name,
        }
        if(data_from === 'todo'){            
            dispatch(removeTodo(data))
        }
        if(data_from === 'inProgress'){            
            dispatch(removeInProgress(data))
        }
        if(data_from === 'done'){            
            dispatch(removeDone(data))
        }

        if(drop_on === 'todo'){            
            dispatch(addTodo(data))
        }
        if(drop_on === 'inProgress'){            
            dispatch(addInProgress(data))
        }
        if(drop_on === 'done'){            
            dispatch(addDone(data))
        }


    }

  


    return (
        <div className="outputWrapper">

            <div className="card"  >
                <div className="header">
                    To Do
                </div>
                <div className="tasksWrapper" data-box="todo" onDrop={drop} onDragOver={handleDragOver}  onDragLeave={handleDragLeave} >
                    {todoState.map(item => (
                        <div key={item.id} id={item.id} className="taskitem" data-from="todo" draggable="true" onDragStart={dragStart}>
                            {item.taskName}
                        </div>
                    ))}

                </div>
            </div>
            <div className="card">
                <div className="header">
                    In Progress
                </div>
                <div className="tasksWrapper" data-box="inProgress"  onDrop={drop} onDragOver={handleDragOver}  onDragLeave={handleDragLeave} >

                    {inProgressState.map(item => (
                        <div key={item.id} id={item.id} className="taskitem" data-from="inProgress" draggable="true" onDragStart={dragStart}>
                            {item.taskName}
                        </div>
                    ))}

                </div>
            </div>
            <div className="card" >
                <div className="header">
                    Done
                </div>
                <div className="tasksWrapper" data-box="done" onDrop={drop} onDragOver={handleDragOver}  onDragLeave={handleDragLeave}  >
                    {doneState.map(item => (
                        <div key={item.id} id={item.id} className="taskitem" data-from="done" draggable="true" onDragStart={dragStart}>
                            {item.taskName}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Cards;
