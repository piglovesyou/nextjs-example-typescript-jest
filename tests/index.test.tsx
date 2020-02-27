import React from 'react';
import Index from '../pages';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import gql from 'graphql-tag';
import { promises } from 'fs';
import { join as pathJoin } from 'path';

const { readFile } = promises;
const loadGql = async (path: string) => {
  const gqlFullPath = pathJoin(__dirname, path);
  return gql(await readFile(gqlFullPath, 'utf-8'));
};
const timeout = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

describe('Index', () => {
  let mocks: any;

  beforeAll(async () => {
    mocks = [
      {
        request: {
          query: await loadGql('../lib/viewer.graphql'),
          variables: {},
        },
        result: {
          data: {
            viewer: {
              id: 'Baa',
              name: 'Baa',
              status: 'Healthy'
            }
          },
        },
      },
    ];
  });

  it('renders the html we want', async () => {
    const component = renderer
        .create(
            <MockedProvider mocks={ mocks } addTypename={ false }>
              <Index/>
            </MockedProvider>
        );
    // Wait for state change of data loading
    await renderer.act(() => timeout(0));
    expect(component.toJSON()).toMatchSnapshot();
  });
});
