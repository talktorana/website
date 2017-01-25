import React from 'react'
import {css} from 'glamor'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import {Center} from './Frame'
import {Link, Hr, metaStyle} from './Styled'
import {GREY_SOFT, GREY_DARK, GREY_MID, mediaM} from '../theme'
import CreativeCommons from '../assets/CreativeCommons'

const metaQuery = gql`
  query meta($locale: Locale!) {
    meta(locale: $locale) {
      links {
        title,
        href
      }
    }
  }
`

const footerStyle = css({
  backgroundColor: GREY_SOFT
})

const footerColumnStyle = css({
  lineHeight: '24px',
  fontSize: 14,
  color: GREY_DARK,
  '& a, & a:visited': {
    color: GREY_DARK
  },
  '& a:hover': {
    color: GREY_MID
  }
})

const footerListStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const ccContainerStyle = css({
  [mediaM]: {
    display: 'flex',
    alignItems: 'center'
  }
})
const ccLogoStyle = css({
  display: 'block',
  margin: '0 auto',
  [mediaM]: {
    marginLeft: 0,
    marginRight: 0,
    minWidth: 88
  }
})
const ccTextStyle = css({
  ...metaStyle,
  textAlign: 'center',
  [mediaM]: {
    ...metaStyle[mediaM],
    margin: 0,
    textAlign: 'left',
    paddingLeft: 30
  }
})

const Footer = ({links, blocks, locale}) => (
  <div {...footerStyle}>
    <Center>
      <div {...footerColumnStyle}>
        <strong>Inhalt</strong>
        <ul {...footerListStyle}>
          {
          (links || []).map((link, i) => (
            <li key={i}>
              <Link
                href={`/page?path=${encodeURIComponent(link.href)}&locale=${locale}`}
                as={link.href}>
                {link.title}
              </Link>
            </li>
          ))
        }
        </ul>
      </div>
      <Hr />
      <div {...ccContainerStyle}>
        <CreativeCommons className={ccLogoStyle} />
        <p {...ccTextStyle}>
          Inhalte von Lobbywatch.ch sind lizenziert unter einer Creative Commons Namensnennung - Weitergabe unter gleichen Bedingungen 4.0 International Lizenz.
        </p>
      </div>
    </Center>
  </div>
)

const FooterWithQuery = graphql(metaQuery, {
  options: ({locale}) => {
    return {
      variables: {
        locale
      }
    }
  },
  props: ({data}) => {
    return data.meta
  }
})(Footer)

export default FooterWithQuery
