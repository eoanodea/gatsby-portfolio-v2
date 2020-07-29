import * as React from 'react';
import { graphql } from 'gatsby';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';

import './index.scss';

import { Card } from '../components/Card';

class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <div className="container">
        <DefaultLayout />
        <div className="card card-alt">
          <h1 className="title">Hello</h1>
          <p className="desc">Welcome to my potfolio</p>
        </div>

        {edges ? (
          <ul className="card-list">
            {edges.map(({ node }, i) => {
              const card = node.frontmatter;
              const isSelected = typeof window !== 'undefined' && card.path === window.location.pathname;
              return <Card key={i} isSelected={isSelected} {...card} />;
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            categories
            tags
            excerpt
            featureImg {
              publicURL
            }
          }
        }
      }
    }
  }
`;
