import * as React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';
import { motion } from 'framer-motion';

import './index.scss';

class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <>
        <DefaultLayout />
        <div className="card card-alt">
          <h1 className="title">Hello</h1>
          <p className="desc">Welcome to my potfolio</p>
        </div>
        {edges ? (
          <div className="list">
            <div className="scroll">
              <div className="scroll-content">
                {edges.map(({ node }, i) => {
                  const post = node;
                  return (
                    <Link to={post.frontmatter.path}>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        // onTap={{
                        //   type: 'spring',
                        //   delay: 0,
                        //   stiffness: 500,
                        //   damping: 60,
                        //   mass: 1
                        // }}
                        // whileTap={{
                        //     type: 'spring',
                        //     delay: 0,
                        //     stiffness: 500,
                        //     damping: 60,
                        //     mass: 1
                        //   }}
                        className={`card card-${i + 1}`}
                        key={post.id}
                      >
                        {/* <div className="post"> */}
                        <h2 className="title">{post.frontmatter.title}.</h2>
                        <p className="desc">{post.frontmatter.excerpt}.</p>
                        {/* <p>{post.frontmatter.date}</p> */}
                        {/* </div> */}
                        {/* <ul key={post.id}>
                      {post.frontmatter.tags.map((tag, index) => (
                        <li key={index}>
                          <Link to={`/tags/${tag}`}>{tag}</Link>
                        </li>
                      ))}
                    </ul> */}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </>
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
          }
        }
      }
    }
  }
`;
