import React, {PropTypes} from 'react'
import {css} from 'glamor'

import Header from './Header'
import Footer from './Footer'
import {BLACK, FRAME_PADDING} from '../../theme'

const centerStyle = css({
  maxWidth: 800,
  padding: FRAME_PADDING,
  margin: '0 auto'
})
export const Center = ({children, ...props}) => (
  <div {...props} {...centerStyle}>{children}</div>
)

css.global('html', {boxSizing: 'border-box'})
css.global('*, *:before, *:after', {boxSizing: 'inherit'})
css.global('body, h1, h2, h3, h4, h5, h6, input, textarea', {fontFamily: "'Roboto', sans-serif"})
css.global('body', {color: BLACK})

const containerStyle = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
})

const bodyGrowerStyle = css({
  flexGrow: 1
})

const Frame = ({url, url: {query: {locale, term}}, localizeRoute, children}) => (
  <div {...containerStyle}>
    <div {...bodyGrowerStyle}>
      <Header locale={locale} term={term} url={url} localizeRoute={localizeRoute} />
      {children}
    </div>
    <Footer locale={locale} />
  </div>
)

Frame.propTypes = {
  children: PropTypes.node,
  localizeRoute: PropTypes.func,
  url: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired
}

export default Frame
