import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'

const TodoList = ({ todo, handleEditClick, handleDeleteClick }) => {

    return (
        <div className={`${styles.todo_item} ${styles.todo_completed ? todo.completed : ''}`}>
            <span className={styles.todo_description}>{todo.description}</span>
            <FontAwesomeIcon
                icon={faTrash}
                className={styles.remove_button}
                onClick={() => handleDeleteClick(todo)}
            />
        </div>
    )
}

export default TodoList