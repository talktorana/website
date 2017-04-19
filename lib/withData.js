import React from 'react'
import {ApolloProvider, getDataFromTree} from 'react-apollo'
import 'isomorphic-fetch'
import {initClient} from './initClient'
import {initStore} from './initStore'

export default (Component) => (
  class extends React.Component {
    static async getInitialProps (ctx) {
      const client = initClient()
      const store = initStore(client, client.initialState)

      if (!process.browser) {
        const app = (
          <ApolloProvider client={client} store={store}>
            <Component url={{ query: ctx.query, pathname: ctx.pathname }} serverContext={ctx} />
          </ApolloProvider>
        )
        await getDataFromTree(app)
      }

      const state = store.getState()
      return {
        initialState: {
          ...state,
          apollo: {
            data: state.apollo.data
          }
        }
      }
    }

    constructor (props) {
      super(props)
      this.client = initClient()
      this.store = initStore(this.client, this.props.initialState)
    }

    render () {
      return (
        <ApolloProvider client={this.client} store={this.store}>
          <Component url={this.props.url} />
        </ApolloProvider>
      )
    }
  }
)