import React from 'react';
import { navigate } from 'gatsby-link';
import classNames from 'classnames';
import Footer from '../../components/Footer';
import GoogleMap from '../../components/GoogleMap';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import ArrowRight from '../../img/Arrow.inline.svg';
import EmailIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';

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
    this.state = {
      isValidated: false,
      activeMap: trondheimCoordinates,
      osloCoordinates,
      trondheimCoordinates,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error));
  };

  changeMap = location => {
    this.setState({ activeMap: location });
  };

  render() {
    const { trondheimCoordinates, osloCoordinates, activeMap } = this.state;

    return (
      <>
        <SEO title="Kontakt oss" />
        <section className="map">
          <Navbar />
          <div id="google-maps">
            <GoogleMap
              isMarkerShown
              mapCoordinates={activeMap}
              markers={[trondheimCoordinates, osloCoordinates]}
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
          </div>
        </div>
        <section id="offices" className="section">
          <div className="container">
            <div className="wrapper">
              <h1>Kontakt</h1>
              <div
                role="button"
                tabIndex={0}
                className={classNames('office', {
                  'is-active': activeMap === trondheimCoordinates,
                })}
                onClick={() => this.changeMap(trondheimCoordinates)}
                onKeyPress={() => this.changeMap(trondheimCoordinates)}
              >
                <h3>Hovedkontor</h3>
                <p>
                  SEALAB OCEAN GROUP <br />
                  Transittgata 14, inngang A<br />
                  7042 Trondheim
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
                <h3>Oslo</h3>
                <p>
                  Forskningsparken
                  <br />
                  Gaustadalléen 21
                  <br />
                  0349 Oslo, Norway
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact-form" className="section is-medium">
          <div className="container">
            <div className="content">
              <div className="columns">
                <div className="column is-4">
                  <h3>
                    Vennligst fyll ut kontaktskjemaet, så svarer vi deg så fort
                    vi kan.
                  </h3>
                  <div className="contact-information wrapper">
                    <ContactInformation title="E-post" Icon={EmailIcon}>
                      <a href="mailto:contact@sealab.no">contact@sealab.no</a>
                    </ContactInformation>
                    <ContactInformation title="Telefon" Icon={PhoneIcon}>
                      <a href="tel:+4772909111">+47 729 09 111</a>
                    </ContactInformation>
                  </div>
                </div>
                <div id="form" className="column is-6 is-offset-1">
                  <form
                    name="contact"
                    method="post"
                    action="/kontakt/takk"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label htmlFor="bot-field">
                        Don’t fill this out:{' '}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="name">
                        Navn
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          onChange={this.handleChange}
                          id="name"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="email">
                        E-post
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          name="email"
                          onChange={this.handleChange}
                          id="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="message">
                        Melding
                      </label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          name="message"
                          onChange={this.handleChange}
                          id="message"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-primary" type="submit">
                        <span>Send</span>
                        <span className="icon is-small">
                          <ArrowRight />
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

const ContactInformation = ({ title, Icon, children }) => (
  <div className="contact-information-item">
    <h4 className="subtitle">{title}</h4>
    <Icon />
    <div className="contact-information-item-content">{children}</div>
  </div>
);
