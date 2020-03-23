import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Logo from '../../img/logo.inline.svg';
import EnvelopeIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';
import { cleanPath } from '../../utils/paths';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  toggleHamburger = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  render() {
    const { active } = this.state;
    const {
      className,
      menuLinks = [],
      phone = '+47 729 09 111',
      email = 'contact@sealab.no',
    } = this.props;

    return (
      <nav
        className={classNames('navbar', className)}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={classNames('navbar-brand', { 'is-active': active })}>
          <Link to="/" className="navbar-item">
            <figure className="image">
              <Logo />
            </figure>
          </Link>
          <button
            type="button"
            tabIndex={0}
            aria-label="menu"
            aria-expanded="false"
            className={classNames('navbar-burger', 'burger', 'nav-toggle', {
              'is-active': active,
            })}
            data-target="navbarMenuHeroC"
            onClick={this.toggleHamburger}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div
          id="navbarMenuHeroC"
          className={classNames('navbar-menu', { 'is-active': active })}
        >
          <div className="navbar-end">
            <NavbarItems
              menuLinks={menuLinks}
              setActive={this.toggleActiveMenuItem}
              onClick={this.toggleHamburger}
            />

            <div id="contact" className="is-hidden-tablet">
              <div className="info">
                <EnvelopeIcon />
                <p className="subtitle">E-post</p>
                <a href={`mailto:${email}`} className="is-bold">
                  {email}
                </a>
              </div>
              <div className="info">
                <PhoneIcon />
                <p className="subtitle">Telefon</p>
                <a href={`tel:${phone}`} className="is-bold">
                  {phone}
                </a>
              </div>
            </div>

            <div className="navbar-item has-buttons">
              <Link className="button is-white" to="/kontakt">
                Kontakt oss
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

const NavbarItems = ({ menuLinks, activeMenuItem, onClick }) => {
  return (
    <>
      {menuLinks.map(menuItem => {
        if (menuItem.dropdown) {
          return (
            <MenuDropDown
              key={menuItem.title}
              menuItem={menuItem}
              activeMenuItem={activeMenuItem}
              onClick={onClick}
            />
          );
        }
        return (
          <Link
            key={menuItem.title}
            activeClassName="is-active"
            className={classNames('navbar-item', 'is-tab')}
            to={cleanPath(menuItem.link)}
            onClick={onClick}
          >
            {menuItem.title}
          </Link>
        );
      })}
    </>
  );
};

const MenuDropDown = ({ menuItem, onClick }) => (
  <div className={classNames('navbar-item', 'has-dropdown', 'is-hoverable')}>
    <a href="#dropdown" className="navbar-link">
      {menuItem.title}
    </a>
    <div className="navbar-dropdown is-boxed">
      {menuItem.dropdown.map(subitem => (
        <Link
          key={subitem.link}
          className={classNames('navbar-item', 'is-tab')}
          activeClassName="is-active"
          to={cleanPath(subitem.link)}
          onClick={onClick}
        >
          {subitem.title}
        </Link>
      ))}
    </div>
  </div>
);

export default Navbar;
