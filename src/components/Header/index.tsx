import React from 'react';
import { Link } from 'gatsby';

class Header extends React.PureComponent<{}> {
  public render() {
    return (
      <header className="header">
        <div>
          <Link to="/">
            <h4 style={{ marginBottom: 0 }}>Eoan O'Dea</h4>
            <span className="date">Portfolio</span>
          </Link>
        </div>
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="/categories">Projects</Link>
          <Link to="/tags">Contact</Link>
        </div>
      </header>
    );
  }
}

export default Header;
