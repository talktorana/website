import React from 'react'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData from '../src/apollo/withData'
import {H1} from '../src/components/Styled'
import Message from '../src/components/Message'

import Loader from '../src/components/Loader'
import Frame, {Center} from '../src/components/Frame'
import ListView from '../src/components/ListView'

const parliamentariansQuery = gql`
  query parliamentarians($locale: Locale!) {
    parliamentarians(locale: $locale) {
      __typename
      id
      name
      firstName
      lastName
      portrait
      councilTitle
      canton
      partyMembership {
        party {
          abbr
        }
      }
    }
  }
`

const Parliamentarians = ({loading, error, parliamentarians, locale}) => (
  <Loader loading={loading} error={error} render={() => (
    <Center>
      <H1><Message id='menu/parliamentarians' locale={locale} /></H1>
      <ListView locale={locale}
        items={parliamentarians}
        title={({lastName, firstName}) => `${lastName}, ${firstName}`}
        subtitle={({councilTitle, partyMembership, canton}) => [
          councilTitle,
          partyMembership && partyMembership.party.abbr,
          canton
        ].filter(Boolean).join(', ')} />
    </Center>
  )} />
)

const ParliamentariansWithQuery = graphql(parliamentariansQuery, {
  props: ({data}) => {
    return {
      loading: data.loading,
      error: data.error,
      parliamentarians: data.parliamentarians
    }
  }
})(Parliamentarians)

const Page = ({url: {query: {locale, id}}}) => (
  <Frame locale={locale}>
    <ParliamentariansWithQuery locale={locale} />
  </Frame>
)

export default withData(Page)
