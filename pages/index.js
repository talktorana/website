import React from 'react'

import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import {withRouter} from 'next/router'

import Loader from '../src/components/Loader'
import Frame, {Center} from '../src/components/Frame'
import MetaTags from '../src/components/MetaTags'
import Message from '../src/components/Message'
import BlockRegion from '../src/components/BlockRegion'
import Card from '../src/components/Card'
import Grid, {GridItem} from '../src/components/Grid'
import {H1, Link} from '../src/components/Styled'
import {GREY_SOFT} from '../src/theme'

const indexQuery = gql`
  query index($locale: Locale!) {
    articles(locale: $locale, limit: 2) {
      list {
        created
        image
        lead
        title
        author
        path
      }
    }
  }
`

const Index = ({loading, error, articles, router: {query: {locale}}}) => (
  <Frame>
    <Loader loading={loading} error={error} render={() => (
      <div>
        <MetaTags locale={locale} fromT={t => ({
          title: '',
          description: t('index/meta/description')
        })} />
        <Center>
          <H1 style={{textAlign: 'center'}}>
            <Message id='index/blog/title' locale={locale} />
          </H1>
          <Grid>
            {articles.map((article, i) => (
              <GridItem key={i}><Card locale={locale} {...article} /></GridItem>
            ))}
          </Grid>
          <div style={{textAlign: 'center', margin: '10px 0 20px'}}>
            <Link {...{
              href: `/blog?locale=${locale}`,
              as: `/${locale}/artikel/archiv`
            }}>
              <Message locale={locale} id='index/blog/link' />
            </Link>
          </div>
        </Center>
        <div style={{backgroundColor: GREY_SOFT}}>
          <Center>
            <BlockRegion locale={locale} region='rooster_home' style={{textAlign: 'center'}} />
          </Center>
        </div>
      </div>
    )} />
  </Frame>
)

const IndexWithQuery = compose(
  withRouter,
  graphql(indexQuery, {
    options: ({router}) => {
      return {
        variables: {
          locale: router.query.locale
        }
      }
    },
    props: ({data}) => {
      return {
        loading: data.loading,
        error: data.error,
        articles: data.articles && data.articles.list
      }
    }
  })
)(Index)

export default IndexWithQuery
