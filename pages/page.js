import React from 'react'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData from '../src/apollo/withData'

import Loader from '../src/components/Loader'
import Frame, {Center} from '../src/components/Frame'
import RawHtml from '../src/components/RawHtml'
import {H1} from '../src/components/Styled'

const pageQuery = gql`
  query page($locale: Locale!, $path: String!) {
    page(locale: $locale, path: $path) {
      statusCode,
      title,
      content
    }
  }
`

const Page = ({loading, error, title, content, url, url: {query: {locale}}}) => (
  <Frame url={url}>
    <Loader loading={loading} error={error} render={() => (
      <Center>
        <H1>{title}</H1>
        <RawHtml dangerouslySetInnerHTML={{__html: content}} />
      </Center>
    )} />
  </Frame>
)

const PageWithQuery = graphql(pageQuery, {
  options: ({url}) => {
    return {
      variables: {
        locale: url.query.locale,
        path: url.query.path
      }
    }
  },
  props: ({data, ownProps: {url, serverContext}}) => {
    if (serverContext) {
      if (data.page && data.page.statusCode) {
        serverContext.res.statusCode = data.page.statusCode
      }
    }
    return {
      loading: data.loading,
      error: data.error,
      ...data.page
    }
  }
})(Page)

export default withData(PageWithQuery)
