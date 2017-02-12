const fetch = require('./fetch')
const qs = require('querystring')
const {DRUPAL_BASE_URL} = require('../constants')

const options = {
  headers: {
    Accept: 'application/json',
    Authorization: `Basic ${(new Buffer('lobbywatch:#IchBinKeineTentakelPuppe')).toString('base64')}`
  }
}

const drupal = (locale, path, query) => {
  const queryString = query ? '?' + qs.encode(query) : ''
  return fetch([
    DRUPAL_BASE_URL,
    '/',
    encodeURIComponent(locale),
    path ? `/${path}` : '',
    queryString
  ].join(''), options)
}
const data = (locale, path, query) => {
  const fullQuery = Object.assign({
    q: [encodeURIComponent(locale), path].join('/'),
    limit: 'none'
  }, query)
  return fetch(`${DRUPAL_BASE_URL}/data.php?${qs.encode(fullQuery)}`, options)
}

module.exports = {
  drupal: drupal,
  data: data
}
