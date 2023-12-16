import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
    background-color: orange;
    padding: 1.2rem 4.8rem;
    border-bottom:1px solid var(--color-grey-100);

`

export default function Header() {
  return (
    <StyledHeader>HEADER</StyledHeader>
  )
}