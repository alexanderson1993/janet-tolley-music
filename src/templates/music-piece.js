import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

export const MusicPieceTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  date,
  instrumentation,
  score_pdf
}) => {
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>
              {date} · {instrumentation}
            </p>
            <p>{description}</p>
            <p>
              <a href={score_pdf.publicURL}>
                <strong>
                  Download this Composition ({score_pdf.prettySize})
                </strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

MusicPieceTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const MusicPiece = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <MusicPieceTemplate
        helmet={
          <Helmet titleTemplate="%s | Music">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        {...post.frontmatter}
      />
    </Layout>
  );
};

MusicPiece.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default MusicPiece;

export const pageQuery = graphql`
  query MusicPieceByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        instrumentation
        score_pdf {
          publicURL
          prettySize
        }
      }
    }
  }
`;
