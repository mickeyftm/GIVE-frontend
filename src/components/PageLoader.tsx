import React from 'react'
import styled from 'styled-components'
import { Image, Spinner } from '@pancakeswap/uikit'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return null
  // add later if we want our own customized page loader
  // <Wrapper>
  //   <Spinner/>
  // </Wrapper>
}

export default PageLoader
