import React, { useState } from 'react'
import { Button, Input } from '.'

export function SearchBar({value ,onSearch}) {
    const [query, setValue] = useState(value)
    const onKeyUp = (event) => {
        if(event.key === "Enter") {
            onSearch(event, query)
        }
    }
    const onChange = (event) => {
        setValue(event.target.value)
    }
    const onClick = (event) => {
        onSearch(event, query)
    }
    return (
        <div>
            <Input onChange={onChange} onKeyUp={onKeyUp} value={query} /><Button text="검색" onClick={onClick} />
        </div>
    )
}
