import React from 'react'

import TodoList from '../TodoList'
import TodoModal from '../TodoModal'

import styles from './styles.module.scss'

const Todo = () => {
    const [todos, setTodos] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')
    const [showError, setShowError] = React.useState(false)
    const [lengthText, setLengthText] = React.useState(0)

    const [todoDescription, setTodoDescription] = React.useState('')

    React.useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todos')) || [])
    }, [])

    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const onChangeInput = React.useCallback(
        (e) => {
            setLengthText(0 + e.target.value.length)
            setInputValue(e.target.value)
            setShowError(false)
        }, [setInputValue])

    const handleAddClick = React.useCallback(
        () => {
            if (inputValue.trim()) {
                if (todos.length === 0) {
                    setTodos([{
                        id: 1,
                        description: inputValue,
                    }])
                }
                else {
                    setTodos([...todos, {
                        id: todos[todos.length - 1].id + 1,
                        description: inputValue
                    }])
                }
                setInputValue('')
                setLengthText(0)
            } else if (inputValue.trim() === '') {
                setShowError(true)
            }
        }, [todos, inputValue, setTodos])

    const handleKeyPress = React.useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleAddClick()
            }
        }, [handleAddClick])

    const handleDeleteClick = React.useCallback(
        (todo) => {
            const newTodos = [...todos]
            const index = newTodos.findIndex((item) => item.id === todo.id)
            newTodos.splice(index, 1)
            setTodos(newTodos)
        }, [todos, setTodos])

    return (
        <>
            <div className={styles.todo_container}>
                <p className={styles.todo_header}>Todo</p>
                <div className={styles.todo_body}>
                    {
                        todos.length === 0 ? <p className={styles.todo_placeholder}>Nothing here yet.</p> :
                            todos.map(todo => {
                                return <TodoList
                                    key={todo.id}
                                    todo={todo}
                                    handleDeleteClick={handleDeleteClick}
                                    setTodoDescription={setTodoDescription}
                                />
                            })
                    }
                </div>
                <div className={styles.todo_footer}>
                    <div className={styles.input_field}>
                        <input
                            className={styles.todo_input}
                            type='text'
                            placeholder='Add a task'
                            value={inputValue}
                            maxLength='100'
                            onChange={e => onChangeInput(e)}
                            onKeyPress={e => handleKeyPress(e)}
                        />
                        <span className={styles.max_input_length}>{lengthText} / 100</span>
                        <span className={`${styles.error_message} ${showError ? styles.show : ''}`}>Enter task!</span>
                    </div>
                    <button className={styles.add_button} onClick={handleAddClick}>Add</button>
                </div>
            </div>
            {todoDescription && <TodoModal todoDescription={todoDescription} />}
        </>
    )
}

export default Todo