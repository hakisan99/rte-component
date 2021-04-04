import React from 'react'

const Test = () => {
    return (
        <div contentEditable onKeyDown={() => console.log("Parent")}>
            <div onKeyDown={() => console.log("Child")}>
                <span onKeyDown={() => console.log("Child")}>abcdef</span>
            </div>
        </div>
    )
}

export default Test