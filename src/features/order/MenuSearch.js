import styled from "@emotion/styled";
import { useState } from "react";
import { Button } from "../../components";
import { SearchBar } from "../../components/SearchBar";

export function MenuSearch () {
    const KEY_LIST = [
        "TAL",
        "GRD",
        "VNT",
        "ICE",
        "HOT",
        "MILK",
    ]
    const [filterKey, setFilterKey] = useState("")
    /**
     * 
     * 메뉴 리스트 필터 조건;
     * 
     * 1. 검색어
     * 2. 태그 
     * 
     */

    const searchMenu = (value)=>{
        // 검색어 변경
        console.log(value)
         
    }

    const filterMenu = (key) => () => {
        // 태그 필터 Key 선택 
        console.log(key)
        if(filterKey !== key) {
            setFilterKey(key)
        }else {
            // 중복 클릭시 off 및 필터 key 해제
            setFilterKey("")
        }
       
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
                { KEY_LIST.map((keyValue, index) =>
                    <MenuFilterButton
                        key={`MenuFilterButton__${index}`}
                        className={filterKey === keyValue ? 'ACTIVE' : ''}
                        onClick={filterMenu(keyValue)} 
                        text={keyValue} />

                )}
{/*                 
                <MenuFilterButton 
                        className=""
                        onClick={filterMenu("GRD")} 
                        text="GRD" />
                <MenuFilterButton 
                        onClick={filterMenu("VNT")} 
                        text="VNT" />
                <MenuFilterButton 
                        onClick={filterMenu("ICE")} 
                        text="ICE" />
                <MenuFilterButton 
                        onClick={filterMenu("HOT")} 
                        text="HOT" />
                <MenuFilterButton 
                        onClick={filterMenu("MILK")} 
                        text="MILK" /> */}
            </div>
            {/*  
                1. Filter 값 업데이트 
                2. 선택된 필터 값에 대하여 ON/OFF
            */}
        </div>
    )
}

const MenuFilterButton = styled(Button)`
    &.ACTIVE {
        background-color: red;
    }
`

