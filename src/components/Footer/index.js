import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Footer from './Footer';

const DynamicFooter = ({ props, articles }) => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              email
              phone
            }
          }
          allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/innstillinger/footer/" } }
          ) {
            edges {
              node {
                frontmatter {
                  mainNavigation {
                    title
                    path
                  }
                  hardwareNavigation {
                    title
                    path
                  }
                  softwareNavigation {
                    title
                    path
                  }
                  secondaryNavigation {
                    title
                    path
                  }
                  companyOffices {
                    title
                    addressItems
                  }
                  callToAction {
                    title
                    description
                    buttonText
                    buttonPath
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { phone, email } = data.site.siteMetadata;
        const {
          mainNavigation,
          hardwareNavigation,
          softwareNavigation,
          secondaryNavigation,
          companyOffices,
          callToAction,
        } = data.allMarkdownRemark.edges[0].node.frontmatter;
        return (
          <Footer
            phone={phone}
            email={email}
            mainNavigation={mainNavigation}
            hardwareNavigation={hardwareNavigation}
            softwareNavigation={softwareNavigation}
            secondaryNavigation={secondaryNavigation}
            articles={articles}
            companyOffices={companyOffices}
            callToAction={callToAction}
            {...props}
          />
        );
      }}
    />
  );
};

DynamicFooter.propTypes = {
  props: PropTypes.object,
  intl: PropTypes.object,
};

export default DynamicFooter;

// export { default } from './Footer';
