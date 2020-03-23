import React from 'react';
import PropTypes from 'prop-types';
// import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Content, { HTMLContent } from '../components/Content';

import FacebookIcon from '../img/social/ic-facebook.inline.svg';
import InstagramIcon from '../img/social/ic-instagram.inline.svg';
// import TwitterIcon from '../img/social/ic-twitter.inline.svg';
import AtIcon from '../img/social/ic-at.inline.svg';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  // tags,
  title,
  heading,
  helmet,
  featuredImage,
  date,
}) => {
  const PostContent = contentComponent || Content;
  // console.log(featuredImage);

  return (
    <>
      <SEO title={title} />
      <section className="section blog-header">
        {helmet || ''}
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Img fluid={featuredImage} />
              <h1>{heading}</h1>
              <div className="meta">
                <div className="date">
                  <p>
                    Publisert <span>{date}</span>
                  </p>
                </div>
                <div className="social">
                  <a href="https://www.facebook.com/SealabCam/">
                    <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/sealaboceangroup/">
                    <InstagramIcon />
                  </a>
                  <a href="mailto:contact@sealab.no">
                    <AtIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section blog-content">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <p>{description}</p>
              <PostContent content={content} />
              {/* {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={`${tag}tag`}>
                        <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null} */}
              <Button
                text="Kontakt oss"
                link="/kontakt"
                className="is-primary"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        featuredImage={post.frontmatter.featuredimage.childImageSharp.fluid}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | Blogg">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "D MMMM, YYYY", locale: "nb")
        title
        heading
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

// --data '{"client_id":"zGR4YhHu5o02HkcMOAHeDZIr5pZ4NGmm",
// "client_secret":"GgzLva-fEOOnt29Gr0VnvJ6wmh7YqtMMrmXutseKHywNoBVFrFjxmDMFP-ouVqfe",
// "audience":"https://bluethink-go-api-server.sealab.no","grant_type":"client_credentials"}'
