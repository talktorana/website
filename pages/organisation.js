import React from 'react'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData from '../src/apollo/withData'

import Loader from '../src/components/Loader'
import Frame, {Center} from '../src/components/Frame'
import Connections from '../src/components/Connections'
import DetailHead from '../src/components/DetailHead'
import {A} from '../src/components/Styled'
import {withT} from '../src/utils/translate'
import {GREY_LIGHT} from '../src/theme'

const orgQuery = gql`
  query getOrganisation($locale: Locale!, $id: ID!) {
    getOrganisation(locale: $locale, id: $id) {
      name,
      legalForm,
      location,
      description,
      group,
      uid,
      website
      connections {
        group
        potency
        function
        compensation {
          money
          description
        }
        to {
          ... on Parliamentarian {
            id
            name
          }
        }
        via {
          ... on Guest {
            id
            name
          }
        }
      }
    }
  }
`

const Org = ({loading, error, t, organisation, locale, id}) => (
  <Loader loading={loading} error={error} render={() => {
    const {name, group, legalForm, location} = organisation
    const rawId = id.replace('Parliamentarian-', '')
    const path = `/${locale}/daten/organisation/${rawId}/${name}`
    return (
      <div>
        <Center>
          <DetailHead
            title={name}
            subtitle={[
              group,
              legalForm,
              location
            ].filter(Boolean).join(', ')} />
        </Center>
        <div style={{backgroundColor: GREY_LIGHT}}>
          <Center style={{paddingTop: 0, paddingBottom: 0}}>
            <Connections locale={locale} data={organisation.connections} />
          </Center>
        </div>
        <Center>
          <p>
            Original Profil:
            {' '}<A target='_blank' href={`https://lobbywatch-cms.interactivethings.io${path}`}>Staging</A>
            {', '}<A target='_blank' href={`https://lobbywatch.ch${path}`}>Live</A>
          </p>
        </Center>
      </div>
    )
  }} />
)

const OrgWithQuery = withT(graphql(orgQuery, {
  props: ({data, ownProps: {serverContext, t}}) => {
    const notFound = !data.loading && !data.getOrganisation
    if (serverContext) {
      if (notFound) {
        serverContext.res.statusCode = 404
      }
    }
    return {
      loading: data.loading,
      error: data.error || (notFound && t('organisation/error/404')),
      organisation: data.getOrganisation
    }
  }
})(Org))

const Page = ({url: {query: {locale, id}}}) => (
  <Frame locale={locale}>
    <OrgWithQuery locale={locale} id={id} />
  </Frame>
)

export default withData(Page)