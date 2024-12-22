import React from 'react'

export default function Question(props){
    return (
        <div>
            <h1 className='question'>{props.value}</h1>
        </div>
    )
}