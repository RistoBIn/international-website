import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import HeroFaded from '../components/HeroBackgroundImageFaded';
import NonStretchedImage from '../components/NonStretchedImage';
import generateHTML from '../utils/generateHTML';
import { idMaker } from '../utils/id-maker';

const gen = idMaker();

const StyledHistoryPage = styled.section`
  @media only screen and (max-width: 768px) {
    section.pre-history {
      padding-bottom: 0;
      .centered .content h2 {
        text-align: left;
        margin-left: 0;
      }
    }
  }
`;

const HistorySection = styled.section`
  .timeline::after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: 0;
    top: 60px;
    left: 15px;
  }
  @media only screen and (min-width: 768px) {
    .timeline::after {
      top: 15px;
      bottom: 0;
      left: 50%;
    }
  }
`;

const StyledHistoryItem = styled.div`
  position: relative;
  background-color: inherit;
  padding-top: 4rem;

  &:first-of-type {
    padding-top: 0;
    &::after {
      margin-top: -4rem;
    }
  }
  
  &::after, &.is-center::before {
    content: '${props => props.content}';
    position: absolute;
    right: unset;
    top: 60px;
    left: 0;
    z-index: 20;
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
  .history--content {
    padding-top: 16px;
    .image-item {
      position: relative;
      z-index: 20;
      margin-bottom: 16px !important;
    }
    .content, .subheading {
      padding-left: 30px; 
      color: #DBE0EA;
      p {
        color: inherit;
      }

    }
    .content {
      font-size: 16px;
      h1, h2, h3 {
        font-size: 18px;
        color: white;
      }
    }
  }
  .history--content, .subheading {

  }
  .subheading {
    font-weight: normal !important;
    color: #DBE0EA !important;
    line-height: 140%;
  }
  &.is-highlighted .history--content {
    .content {
      h1, h2, h3 {
        font-size: 24px;
        font-weight: normal;
      }
    }
  }
  &.has-no-image .history--content {
    padding-top: 2rem;
  }
  @media only screen and (min-width: 768px) {
    padding: 40px 40px;
    &:first-of-type {
      padding-top: 4rem;
      &::after {
        margin-top: 0;
      }
    }
    &.is-right, &.is-left {
      width: 50%;
      .history--content {
        margin-top: -100px;
        
      }
      .image-item {
        max-width: 600px !important;
      }
    }
    &::after, &.is-center::before {
      right: -25px;
      top: 15px;
      left: unset;
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
        left: 1px;
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
        background-color: #0E111B;
        z-index: 50;
        padding-left: 0;
        h1, h2, h3 {
          font-size: 26px;
          font-weight: normal;
        }
        p {
          color: white;
          line-height: 130%;
          font-size: 18px;
          font-weight: normal;
        }
      }
    }
    .subheading {
      position: relative;
      z-index: 49;
      padding-bottom: 10px;
      background-color: #0e111b;
    }
    &.is-highlighted .history--content {
      .content {
        h1, h2, h3 {
          font-size: 36px;
          font-weight: bold;
        }
      }
    }
    &.has-no-image .history--content {
      margin-bottom: 6rem;
    }
    &.has-no-image.is-right .history--content,
    &.has-no-image.is-left .history--content {
      position: relative;
      margin-top: 0;
      .content {
        text-align: left;
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
    <StyledHistoryPage className="has-dark-background">
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
        <section className="section has-dark-background pre-history">
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
            const hasImage = !!historyImage;
            return (
              <HistoryItem
                year={year}
                key={gen.next().value}
                featuredimage={historyImage}
                className={classNames(
                  { 'has-no-image': !hasImage },
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
          <StyledHistoryItem
            className="is-center is-highlighted"
            content="...."
          />
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
    </StyledHistoryPage>
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
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
                ...GatsbyImageSharpFluid_withWebp_noBase64
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
