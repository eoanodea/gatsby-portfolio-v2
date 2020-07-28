import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import './index.scss';
import { SiteData } from '../models/SiteData';

class Header extends React.PureComponent<{}> {
  public render() {
    return (
      <div className="header">
        <h1>
          <Link to="/">Gatsby</Link>
        </h1>
        <Link to="/categories">Categories</Link>
        <Link to="/tags">Tags</Link>
      </div>
    );
  }
}

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location?: {
    pathname: string;
  };
}

class DefaultLayout extends React.Component<DefaultLayoutProps & SiteData> {
  public render() {
    return (
      <div>
        <Helmet
          title={`Home`}
          meta={[
            { name: 'description', content: 'Full Stack Developer, Designer, Engineer & Entrepreneur' },
            { name: 'keywords', content: 'Full Stack Developer, Designer, Engineer & Entrepreneur' }
          ]}
        />
        <Header />
      </div>
    );
  }
}

export default DefaultLayout;
