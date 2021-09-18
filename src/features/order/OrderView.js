import styled from "@emotion/styled"

export function OrderView ({children}) {
    return (
        <Wrapper>
            <Wrapper>
                품목 수량 금액
            </Wrapper>
            <Wrapper>
                <ul>
                    {children}
                </ul>
            </Wrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div``