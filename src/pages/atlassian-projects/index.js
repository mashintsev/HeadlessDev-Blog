import React from 'react';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet';
import styled from 'styled-components';
import moment from 'moment';
import DynamicTable from '@atlaskit/dynamic-table';
import Page from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header';

import Layout from '../../components/layout'

const Wrapper = styled.div`
  width: 850px;
  min-width: 850px;
  margin: 0 auto;
  padding: 0 18px;
`;

const DescriptionCell = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default ({ data }) => (
    <Layout>
        <Page>
            <Helmet>
                <title>Atlassian Projects</title>
                <meta name="description" content="Latest updated Atlassian repositories on Bitbucket.org" />
            </Helmet>
            <Wrapper>
                <PageHeader>Latest updated Atlassian repositories on Bitbucket.org</PageHeader>
                <DynamicTable
                    // defaultSortKey='updated_on'
                    // defaultSortOrder='ASC'
                    isFixedSize
                    head={{
                        cells: [
                            { key: 'name', content: 'Name', isSortable: false, width: 35 },
                            { key: 'language', content: 'Language', isSortable: false, },
                            { key: 'updated_on', content: 'Updated', isSortable: false, width: 20, },
                            { key: 'description', content: 'Description', isSortable: false, width: 30, },
                        ]
                    }}
                    rows={[...data.allAtlasRepos.edges, ...data.allAtlasLabsRepos.edges]
                        .filter(repo => repo.node.id !== 'dummy')
                        .sort((a, b) => -(moment(a.node.updated_on).toDate() - moment(b.node.updated_on).toDate()))
                        .map((repo, index) => ({
                            key: `row-${index}-${repo.node.id}`,
                            cells: [
                                {
                                    key: 'name',
                                    content: (
                                        <a
                                            href={`https://bitbucket.org/${repo.node.full_name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {repo.node.full_name}
                                        </a>
                                    ),
                                },
                                {
                                    key: 'language',
                                    content: repo.node.language,
                                },
                                {
                                    key: 'updated_on',
                                    content: moment(repo.node.updated_on).fromNow(),
                                },
                                {
                                    key: 'description',
                                    content: <DescriptionCell>{repo.node.description}</DescriptionCell>,
                                },
                            ],
                        }))}
                />
            </Wrapper>
        </Page>
    </Layout>
);

export const query = graphql`
   query AltasReposQuery {
      allAtlasLabsRepos {
        edges {
          node {
            id
            name
            full_name
            language
            website
            description
            updated_on
          }
        }
      }
      allAtlasRepos {
        edges {
          node {
            id
            name
            full_name
            language
            website
            description
            updated_on
          }
        }
      }
    }
`;
