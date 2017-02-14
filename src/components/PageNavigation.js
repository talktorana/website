import React from 'react'
import {css} from 'glamor'

import Message from './Message'
import RawLink from 'next/link'
import {GREY_LIGHT, GREY_DARK, mediaM} from '../theme'
import Arrow from '../assets/Arrow'

const containerStyle = css({
  borderTop: `1px solid ${GREY_LIGHT}`,
  marginTop: 30,
  ':after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
})
const aStyle = css({
  display: 'block',
  paddingTop: 25,
  paddingBottom: 5,
  color: GREY_DARK,
  textDecoration: 'none'
})
const leftStyle = css({
  float: 'left',
  width: '40%'
})
const leftTextStyle = css({
  display: 'none',
  [mediaM]: {
    display: 'inline'
  }
})
const rightStyle = css({
  float: 'right',
  width: '60%',
  textAlign: 'right'
})
const iconStyle = css({
  verticalAlign: '-2px'
})

const Nav = ({locale, prev, next}) => (
  <div {...containerStyle}>
    {!!prev && <RawLink {...prev}>
      <a {...leftStyle} {...aStyle}>
        <Arrow className={iconStyle} color={GREY_DARK} direction='left' />
        <span {...leftTextStyle}>
          {' '}
          <Message locale={locale} id='page/prev' />
        </span>
      </a>
    </RawLink>}
    {!!next && <RawLink {...next}>
      <a {...rightStyle} {...aStyle}>
        <Message locale={locale} id='page/next' />
        {' '}
        <Arrow className={iconStyle} color={GREY_DARK} />
      </a>
    </RawLink>}
  </div>
)

export default Nav
