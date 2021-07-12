import React from 'react'
import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'
import Container from '../layout/Container'

const Outer = styled(Box)<{ background?: string }>`
   background-image: radial-gradient(farthest-corner at 40px 40px, #b2deee 0%, #b69adb 100%);
`

const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`

const PageHeader: React.FC<{ background?: string }> = ({ background, children, ...props }) => (
  <Outer background={background} {...props}>
    <Inner>{children}</Inner>
  </Outer>
)

export default PageHeader
