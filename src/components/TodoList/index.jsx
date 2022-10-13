import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'

const TodoList = ({ todo, handleDeleteClick }) => {

    return (
        <div
            className={`${styles.todo_item} ${todo.description.length > 15 ? styles.hover_description : ''}`}
            data-description={todo.description}
        >
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