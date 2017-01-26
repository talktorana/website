import React from 'react'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData from '../src/apollo/withData'

import Loader from '../src/components/Loader'
import Frame from '../src/components/Frame'
import RawHtml from '../src/components/RawHtml'
import Message from '../src/components/Message'
import {Link, H1, H2, H3} from '../src/components/Styled'

const indexQuery = gql`
  query index($locale: Locale!) {
    articles(locale: $locale) {
      title,
      url
    }
    meta(locale: $locale) {
      blocks {
        key
        title
        content
      }
    }
  }
`

const Index = ({loading, error, articles, blocks, t, url: {query: {locale}}}) => (
  <Frame locale={locale}>
    <Loader loading={loading} error={error} render={() => (
      <div>
        <H1><Message id='index/blog/title' locale={locale} /></H1>
        {articles.map((article, i) => (
          <div key={i}>
            <H3>
              <Link
                href={`/page?path=${encodeURIComponent(article.url)}&locale=${locale}`}
                as={article.url}>
                {article.title}
              </Link>
            </H3>
          </div>
        ))}
        {
          blocks.filter(block => block.key === 'block_8')
            .map(block => (
              <div key={block.key}>
                <H2>{block.title}</H2>

                <RawHtml dangerouslySetInnerHTML={{__html: block.content}} />
              </div>
            ))
        }
      </div>
    )} />
  </Frame>
)

const IndexWithQuery = graphql(indexQuery, {
  options: ({url}) => {
    return {
      variables: {
        locale: url.query.locale
      }
    }
  },
  props: ({data, ownProps: {url}}) => {
    return {
      loading: data.loading,
      error: data.error,
      articles: data.articles,
      blocks: data.meta && data.meta.blocks
    }
  }
})(Index)

export default withData(IndexWithQuery)
