import React from "react";

import Layout from "../../components/Layout";
import MusicRoll from "../../components/MusicRoll";

export default class MusicIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/music-index.jpg')`,
            backgroundPosition: `center left`,
            backgroundAttachment: `fixed`
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              textShadow:
                "rgba(0,0,0,0.2) 0.2rem 0.2rem 2px, rgba(0,0,0,0.2) 0.1em 0.1rem 2px, rgba(0,0,0,0.2) 0.15em 0.1rem 2px",
              color: "white",
              padding: "1rem"
            }}
          >
            Compositions and Arrangements
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <MusicRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
