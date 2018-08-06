import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DynamicTable from '@atlaskit/dynamic-table';
import Page from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header';

const Wrapper = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const TimeCell = styled.div`
  width: 160px;
`;

const DescriptionCell = styled.div`
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default ({ data }) => (
    <Page>
        <Wrapper>
            <PageHeader>Latest updated Atlassian repositories on Bitbucket.org</PageHeader>
            <DynamicTable
                defaultSortKey={'updated_on'}
                rows={data.allAtlasRepos.edges.filter(repo => repo.node.id !== 'dummy').map((repo, index) => ({
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
                                    {repo.node.name}
                                </a>
                            ),
                        },
                        {
                            key: 'language',
                            content: repo.node.language,
                        },
                        {
                            key: 'updated_on',
                            content: <TimeCell>{moment(repo.node.updated_on).fromNow()}</TimeCell>,
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
);

export const query = graphql`
   query AltasReposQuery{
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
