import React from 'react'

import Todo from './components/Todo'

import './styles/App.scss'

const App = () => {
    return (
        <div className='App'>
            <div className='container'>
                <Todo />
            </div>
        </div>
    )
}

export default App