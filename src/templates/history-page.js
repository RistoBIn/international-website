import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import HeroFaded from '../components/HeroBackgroundImageFaded';
import NonStretchedImage from '../components/NonStretchedImage';
import generateHTML from '../utils/generateHTML';

const HistorySection = styled.section`
  .timeline::after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: rgba(255, 255, 255, 0.15);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
`;

const StyledHistoryItem = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  &::after {
    content: '${props => props.content}';
    position: absolute;
    right: -10%;
    z-index: 1;
    top: 15px;
    padding: 5px 10px;
    background-color: #0e111b;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 36px;
    font-weight: bold;
    color: white;
    font-size: 14px;
  }
`;

export const HistoryPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  featuredimage,
  history,
  lastContent,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="has-dark-background">
      <HeroFaded
        className="is-large"
        image={featuredimage}
        style={{ backgroundPosition: 'center' }}
      >
        <div className="container">
          <div>
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </HeroFaded>

      {content ? (
        <section className="section has-dark-background">
          <div className="container centered">
            <PostContent content={content} className="content" />
          </div>
        </section>
      ) : (
        <></>
      )}
      <HistorySection className="section">
        <div className="container timeline">
          {history.map(historyItem => {
            const {
              content: historyContent,
              year,
              featuredimage: historyImage,
              position,
              highlighted,
              subheading,
            } = historyItem;

            return (
              <HistoryItem
                year={year}
                featuredimage={historyImage}
                className={classNames(
                  { 'is-highlighted': highlighted },
                  `is-${position}`,
                )}
                subheading={subheading}
              >
                <PostContent
                  content={generateHTML(historyContent)}
                  className="content"
                />
              </HistoryItem>
            );
          })}
        </div>
      </HistorySection>

      {lastContent ? (
        <section className="section has-dark-background">
          <div className="container centered">
            <PostContent
              content={generateHTML(lastContent)}
              className="content"
            />
          </div>
        </section>
      ) : (
        <></>
      )}
    </section>
  );
};

const HistoryItem = ({
  children,
  featuredimage,
  subheading,
  year,
  className,
}) => (
  <StyledHistoryItem content={year} className={className}>
    {featuredimage ? (
      <NonStretchedImage
        fluid={featuredimage.childImageSharp.fluid}
        objectFit="contain"
        alt=""
        className="image image-item"
      />
    ) : (
      <></>
    )}
    {subheading ? <p className="subheading">{subheading}</p> : <></>}
    {children}
  </StyledHistoryItem>
);

const HistoryPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    featuredimage,
    history,
    lastContent,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <HistoryPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
        history={history}
        lastContent={lastContent}
      />
    </Layout>
  );
};

export default HistoryPage;

export const pageQuery = graphql`
  query HistoryPagePrimaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        seoDescription
        description
        featuredimage {
          publicURL
          extension
          childImageSharp {
            fluid(maxHeight: 630, quality: 80) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
        history {
          content
          subheading
          position
          year
          highlighted
          featuredimage {
            childImageSharp {
              fluid(maxWidth: 1410, quality: 80) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        lastContent
      }
    }
  }
`;
