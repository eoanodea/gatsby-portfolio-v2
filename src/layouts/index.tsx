import * as React from 'react';
import { Helmet } from 'react-helmet';

import './index.scss';
import Header from '../components/Header';
import { StaticQuery, graphql } from 'gatsby';

// interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
//   location?: {
//     pathname: string;
//   };
// }

interface IProps {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  pathname?: string | null;
  project?: boolean | null;
}

const DefaultLayout = ({ title = null, description = null, image = null, pathname = null, project = null }: IProps) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage }
      }
    }) => {
      const seo = {
        defaultTitle: defaultTitle,
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`
      };
      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta charSet="utf-8" />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.url && <meta content={seo.url} />}
            {(project ? true : null) && <meta property="og:type" content="project" />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            <meta property="og:site_name" content={seo.defaultTitle} />
            {seo.description && <meta property="og:description" content={seo.description} />}
            {seo.image && <meta property="og:image" content={seo.image} />}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && <meta name="twitter:description" content={seo.description} />}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
            <link rel="canonical" href={seo.url} />
          </Helmet>
          <Header />
        </>
      );
    }}
  />
);

export default DefaultLayout;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: logo
      }
    }
  }
`;
