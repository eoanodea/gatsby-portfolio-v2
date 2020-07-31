import * as React from 'react';
import { graphql } from 'gatsby';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';

import './index.scss';
import { CardList } from '../components/CardList';

class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <div className="container">
        <DefaultLayout />
        <div className="card card-alt">
          <h1 className="title">Hello</h1>
          <h4 className="desc">Welcome to my potfolio</h4>
        </div>

        {edges ? <CardList edges={edges} /> : null}
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
