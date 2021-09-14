import React, { useState } from 'react'
import { Button, Input } from '.'

export function SearchBar({onSearch}) {
    const [value, setValue] = useState("")
    const onKeyUp = (e) => {
        if(e.key === "Enter") {
            onSearch(value)
        }
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onClick = () => {
        onSearch(value)
    }
    return (
        <div>
            <Input onChange={onChange} onKeyUp={onKeyUp} value={value} /><Button text="검색" onClick={onClick} />
        </div>
    )
}
