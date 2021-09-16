import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Button } from "../../components";
import { SearchBar } from "../../components/SearchBar";

export function MenuSearch ({option, keyList, onChangeQuery, onChangeKey, onChange}) {
    /**
     * 
     * 메뉴 리스트 필터 조건;
     * 
     * 1. 검색어
     * 2. 태그 
     * 
     */
    const searchMenu = (event, value)=>{
        onChangeQuery(value)
    }

    const filterMenu = (key) => (event) => {
        if(option.key.some((optKey) => key === optKey)) {
            onChangeKey(option.key.filter(optKey => optKey !== key))
        }else {
            onChangeKey(option.key.concat(key))
        }
    }

    const isActiveFilter = (key) => {
        return option.key.some(optKey => optKey ===  key)
    }
    return (
        <div>
            <SearchBar 
                onSearch={searchMenu}
            />
            {/* 
                1. text 입력
                2. 검색 
                3. 입력된 텍스트로 해당 내역 만 필터 되도록
            */}
            <div>
                { keyList.map((keyValue, index) =>
                    <MenuFilterButton
                        key={`MenuFilterButton__${index}`}
                        className={isActiveFilter(keyValue) ? 'ACTIVE' : ''}
                        onClick={filterMenu(keyValue)} 
                        text={keyValue} />

                )}
            </div>
            {/*  
                1. Filter 값 업데이트 
                2. 선택된 필터 값에 대하여 ON/OFF
            */}
        </div>
    )
}

MenuSearch.defaultProps = {
    option: {
        key: [""],
        query: ""
    },
    onChangeKey: (key) => { console.log(key) },
    onChangeQuery: (query) => { console.log(query) },
    keyList: []
}
const MenuFilterButton = styled(Button)`
    &.ACTIVE {
        background-color: red;
    }
`

