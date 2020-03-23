import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import YouTube from 'react-youtube';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Content, { HTMLContent } from '../components/Content';
import Carousel from '../components/Carousel';
import Title from '../components/Title';
import SEO from '../components/SEO';
import RecentArticles from '../components/RecentArticles';
import controlroomImage from '../img/sealab-controller-livestream.png';
import SectionWith3Col from '../components/SectionWith3Col';

export const LivestreamPageTemplate = ({
  title,
  content,
  contentComponent,
  heading,
  subheading,
  featuredData,
  videoDescription,
  features,
  lightbox,
}) => {
  const PageContent = contentComponent || Content;
  const videoOptions = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      enablejsapi: 1,
      loop: 1,
    },
  };
  return (
    <>
      <SEO title={title} />
      <section
        id="livestream-hero"
        className="section is-medium has-dark-background"
      >
        <div className="container">
          <div className="columns  reverse-row-order">
            <div className="column children-padding">
              <h1>{heading}</h1>
              <p>{subheading}</p>
              <Button
                text="Kontakt oss"
                link="/kontakt"
                className="is-primary"
              />
            </div>
            <div className="column ">
              <figure className="image">
                <img src={controlroomImage} alt="Kontrollrom" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <SectionWith3Col
        className="has-dark-background"
        heading={featuredData.heading}
        columns={featuredData.featuredDataBoxes}
      />
      <section
        id="btgo-page-content"
        className="section has-dark-background free-text-centered"
      >
        <div className="container">
          <PageContent content={content} />
        </div>
      </section>
      <section className="video section has-dark-background">
        <div className="container">
          <div className="video-background">
            <YouTube
              videoId="psagF7LbQ5s"
              opts={videoOptions}
              className="video-iframe"
            />
          </div>
          <div className="content has-white-background">
            <p>{videoDescription}</p>
          </div>
        </div>
      </section>
      <section id="features" className="section has-dark-background">
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <Title
                title={features.heading}
                subtitle={features.subheading}
                description={features.description}
                position="left"
              />
            </div>
          </div>
          <div id="features-icons" className="columns">
            {features.featureItems.map(featuredElement => (
              <div className="features-icons-item column is-3">
                <figure className="image">
                  <img src={featuredElement.icon.publicURL} alt="Icon" />
                </figure>
                <h4>{featuredElement.heading}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="solution-carousel" className="section has-dark-background">
        <div className="container">
          <Title
            title={lightbox.heading}
            description={lightbox.description}
            position="center"
          />
          <Carousel items={lightbox.carouselItems} />
        </div>
      </section>
      <RecentArticles />
    </>
  );
};

LivestreamPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  featuredData: PropTypes.object,
};

const LivestreamPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <LivestreamPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        subheading={post.frontmatter.subheading}
        content={post.html}
        featuredData={post.frontmatter.featuredData}
        videoDescription={post.frontmatter.videoDescription}
        features={post.frontmatter.features}
        lightbox={post.frontmatter.lightbox}
      />
    </Layout>
  );
};

LivestreamPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LivestreamPage;

export const LivestreamPageQuery = graphql`
  query LivestreamPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        subheading
        featuredData {
          heading
          featuredDataBoxes {
            icon {
              extension
              publicURL
            }
            heading
            description
            cta
          }
        }
        videoDescription
        features {
          heading
          subheading
          description
          featureItems {
            heading
            icon {
              extension
              publicURL
            }
          }
        }
        lightbox {
          heading
          description
          carouselItems {
            heading
            description
            img {
              childImageSharp {
                fluid(maxHeight: 1180) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;
