import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const DynamicNavbar = ({ props }) => {
  return (
    <StaticQuery
      query={graphql`
        query NavbarQuery {
          site {
            siteMetadata {
              email
              phone
            }
          }
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/innstillinger/navbar/" } }
          ) {
            edges {
              node {
                frontmatter {
                  menuLinks {
                    title
                    link
                    dropdown {
                      title
                      link
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Navbar
          phone={data.site.siteMetadata.phone}
          email={data.site.siteMetadata.email}
          menuLinks={data.allMarkdownRemark.edges[0].node.frontmatter.menuLinks}
          {...props}
        />
      )}
    />
  );
};

DynamicNavbar.propTypes = {
  props: PropTypes.object,
  intl: PropTypes.object,
};

export default DynamicNavbar;

// export { default } from './Navbar';
