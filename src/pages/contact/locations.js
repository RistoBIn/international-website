import React from 'react';
import { navigate } from 'gatsby-link';
import classNames from 'classnames';
import GoogleMap from '../../components/GoogleMap';
import Layout from '../../components/Layout';

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    const trondheimCoordinates = {
      lat: 63.440503,
      lng: 10.414961,
    };
    const osloCoordinates = {
      lat: 59.942468,
      lng: 10.716228,
    };
    const serbiaCoordinates = {
      lat: 43.31554,
      lng: 21.930348,
    };
    const berlinCoordinates = {
      lat: 52.481538,
      lng: 13.356678,
    };
    this.state = {
      activeMap: trondheimCoordinates,
      osloCoordinates,
      trondheimCoordinates,
      serbiaCoordinates,
      berlinCoordinates,
    };
  }

  changeMap = location => {
    this.setState({ activeMap: location });
  };

  render() {
    const {
      trondheimCoordinates,
      osloCoordinates,
      berlinCoordinates,
      serbiaCoordinates,
      activeMap,
    } = this.state;

    return (
      <Layout
        seoTitle="Contact us"
        seoDescription="Reach out us. We're looking forward to it"
      >
        <section className="map">
          <div id="google-maps">
            <GoogleMap
              isMarkerShown
              mapCoordinates={activeMap}
              markers={[
                trondheimCoordinates,
                osloCoordinates,
                serbiaCoordinates,
                berlinCoordinates,
              ]}
            />
          </div>
        </section>
        <div className="is-hidden-tablet">
          <div className="button-wrapper">
            <button
              type="button"
              className={classNames({
                'is-active': activeMap === trondheimCoordinates,
              })}
              onClick={() => this.changeMap(trondheimCoordinates)}
            >
              Trondheim
            </button>
            <button
              type="button"
              className={classNames({
                'is-active': activeMap === osloCoordinates,
              })}
              onClick={() => this.changeMap(osloCoordinates)}
            >
              Oslo
            </button>
            <button
              type="button"
              className={classNames({
                'is-active': activeMap === berlinCoordinates,
              })}
              onClick={() => this.changeMap(berlinCoordinates)}
            >
              Berlin
            </button>
            <button
              type="button"
              className={classNames({
                'is-active': activeMap === serbiaCoordinates,
              })}
              onClick={() => this.changeMap(serbiaCoordinates)}
            >
              Niš
            </button>
          </div>
        </div>
        <section id="offices" className="section">
          <div className="container">
            <div className="wrapper">
              <div
                role="button"
                tabIndex={0}
                className={classNames('office', {
                  'is-active': activeMap === trondheimCoordinates,
                })}
                onClick={() => this.changeMap(trondheimCoordinates)}
                onKeyPress={() => this.changeMap(trondheimCoordinates)}
              >
                <h3>Main office in Norway</h3>
                <p>
                  SEALAB OCEAN GROUP <br />
                  Transittgata 14, Entrance A<br />
                  7042 Trondheim, Norway
                </p>
              </div>
              <div
                role="button"
                tabIndex={0}
                className={classNames('office', {
                  'is-active': activeMap === osloCoordinates,
                })}
                onClick={() => this.changeMap(osloCoordinates)}
                onKeyPress={() => this.changeMap(osloCoordinates)}
              >
                <h3>Norway</h3>
                <p>
                  Oslo Science Park
                  <br />
                  Gaustadalléen 21
                  <br />
                  0349 Oslo, Norway
                </p>
              </div>
              <div
                role="button"
                tabIndex={0}
                className={classNames('office', {
                  'is-active': activeMap === berlinCoordinates,
                })}
                onClick={() => this.changeMap(berlinCoordinates)}
                onKeyPress={() => this.changeMap(berlinCoordinates)}
              >
                <h3>Germany</h3>
                <p>
                  Berlin
                  <br />
                  EUREF-Campus 1-25
                  <br />
                  10829 Berlin, Germany
                </p>
              </div>
              <div
                role="button"
                tabIndex={0}
                className={classNames('office', {
                  'is-active': activeMap === serbiaCoordinates,
                })}
                onClick={() => this.changeMap(serbiaCoordinates)}
                onKeyPress={() => this.changeMap(serbiaCoordinates)}
              >
                <h3>Serbia</h3>
                <p>
                  In Niš
                  <br />
                  Bore Vukmirovića 9
                  <br />
                  18000 Niš, Serbia
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
