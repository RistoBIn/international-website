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
    top: 15px;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
`;

const StyledHistoryItem = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  padding-top: 4rem;

  &::after, &.is-center::before {
    content: '${props => props.content}';
    position: absolute;
    right: -25px;
    z-index: 20;
    top: 15px;
    padding: 2px 10px;
    background-color: #0e111b;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 36px;
    font-weight: bold;
    color: white;
    font-size: 14px;
    text-transform: uppercase;
  }    
  &.is-highlighted::after, &.is-highlighted::before {
    background-color: #E32938 !important;
    border: 1px solid transparent;
  }
  &.is-left {
    .history--content {
      padding-right: 50px;
    }
    &::before {
      content: '';
      position: absolute;
      top: 30px;
      z-index: 30;
      right: 35px;
      width: 100px;
      border-top: 2px solid white;
    }
  }
  &.is-right {
    left: 50%;
    &::before {
      content: '';
      position: absolute;
      top: 30px;
      z-index: 30;
      left: 35px;
      width: 100px;
      border-top: 2px solid white;
    }
    &::after {
      left: -28px;
      right: auto;
    }
    .history--content {
      padding-left: 50px;
      .content {
        text-align: right;
      }
    }
  }
  &.is-center {
    position: relative;
    margin: 0 auto;
    text-align: center;
    .history--content {
      position: relative;
      z-index: 11;
      background-color: #0e111b;
      padding-bottom: 30px !important;
      .image-item {
        margin-top: -45px !important;
      }
      .content {
        max-width: 800px;
        margin: 0 auto;
        p, h1, h2, h3 {
          color: white;
          font-weight: bold;    
        }
      }
    }
    &::before {
      position: relative;
      width: fit-content;
      left: -2px;
      margin: 0 auto;
    }
    &::after {
      display: none;
    }


  }
  .history--content {
    padding-top: 50px;
    .image-item {
      margin-bottom: 30px !important;
    }
    .content {
      font-size: 26px;
    }
  }
  @media only screen and (min-width: 768px) {
    &.is-right, &.is-left {
      width: 50%;
      .history--content {
        margin-top: -100px;
        
      }
      .image-item {
        max-width: 600px !important;
      }
    }
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
    <div className="history--content">
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
    </div>
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
