import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GridView from './Grid';

const GridSection = props => {
  return (
    <StaticQuery
      query={graphql`
        query GridSolutionsQuery {
          solutionItems: allMarkdownRemark(
            sort: {
              fields: [frontmatter___priority, frontmatter___title]
              order: [ASC, ASC]
            }
            filter: {
              frontmatter: { templateKey: { regex: "/solution-page-/" } }
            }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  heading
                  featuredimage {
                    childImageSharp {
                      fluid(maxHeight: 404, quality: 50) {
                        ...GatsbyImageSharpFluid_noBase64
                        presentationWidth
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        if (data && data.solutionItems && data.solutionItems.edges)
          return <GridView items={data.solutionItems.edges} {...props} />;
        return <></>;
      }}
    />
  );
};

export default GridSection;
