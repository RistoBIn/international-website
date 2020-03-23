import React, { Component } from 'react';
import { navigate } from 'gatsby-link';
import styles from './ContactFormProduct.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class ContactFormProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidated: false,
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

  render() {
    const { action, formName } = this.props;
    return (
      <>
        <form
          className={styles.form}
          name={formName}
          method="post"
          action={action}
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
            <label className="label" htmlFor="navn">
              Navn
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="navn"
                onChange={this.handleChange}
                id="navn"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="firma">
              Firma
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="firma"
                onChange={this.handleChange}
                id="firma"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="lokasjon">
              Lokasjonsnavn
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="lokasjon"
                onChange={this.handleChange}
                id="lokasjon"
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
            <label className="label" htmlFor="mobil">
              Mobilnummer
            </label>
            <div className="control">
              <input
                className="input"
                type="tel"
                name="mobil"
                onChange={this.handleChange}
                id="mobil"
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
      </>
    );
  }
}
