import styled from "@emotion/styled"
import { useRecoilState, useRecoilValue } from "recoil"
import { getOrderSumPrice, orderState } from "../store"

export function OrderBoard () {
    // order State 값들만 뿌려 준다
    const [{currentOrderId, selectedMenuList}] = useRecoilState(orderState)
    const orderSumPrice = useRecoilValue(getOrderSumPrice)
    return (
        <Wrapper>
            주문 번호 : {currentOrderId} 수량: {selectedMenuList.length} 금액 : {orderSumPrice} 원
        </Wrapper>
    )
}

const Wrapper = styled.div``