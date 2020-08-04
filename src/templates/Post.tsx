import React from 'react';
import Helmet from 'react-helmet';
import './Post.scss';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';
import { Section } from '../components/Section';

class PostTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { pathContext } = this.props;

    const { post } = pathContext;

    return (
      <>
        <DefaultLayout />

        <Section id={'post'}>
          {post ? (
            <div className="post-content">
              <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
              <div className="post">
                <h1>{post.frontmatter.title}</h1>
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
              </div>
            </div>
          ) : null}
        </Section>
      </>
    );
  }
}

export default PostTemplate;
