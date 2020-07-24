import React from 'react';
import Link from 'next/link'
// import { useViewerQuery, ViewerDocument } from '../lib/viewer.graphql'
import { initializeApollo } from '../lib/apollo'
import gql from 'graphql-let';

const { useViewerQuery, ViewerDocument } = gql(`
  query Viewer {
    viewer {
      id
      name
      status
    }
  }`);

const Index = () => {
  const { data } = useViewerQuery()

  if (data) {
    const { viewer } = data
    return (
        <div>
          You're signed in as {viewer.name} and you're {viewer.status} go to the{' '}
          <Link href="/about">
            <a>about</a>
          </Link>{' '}
          page.
        </div>
    )
  }

  return <div>...</div>
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
