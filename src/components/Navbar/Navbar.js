import React, { useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Logo from '../../img/logo.inline.svg';
import EnvelopeIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';
import { cleanPath } from '../../utils/paths';
import { idMaker } from '../../utils/id-maker';
import styles from './Navbar.module.scss';

const gen = idMaker();

export const Navbar = ({
  className,
  menuPaths,
  phone = '+47 729 09 111',
  email = 'contact@sealab.no',
}) => {
  const [isHamburgerMenuActive, setHamburgerMenuActive] = useState(false);

  return (
    <nav
      className={classNames('navbar', className)}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={classNames('navbar-brand')}>
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
            'is-active': isHamburgerMenuActive,
          })}
          data-target="navbarMenuHeroC"
          onClick={() => setHamburgerMenuActive(!isHamburgerMenuActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div
        id="navbarMenuHeroC"
        className={classNames('navbar-menu', {
          'is-active': isHamburgerMenuActive,
        })}
      >
        <div className="navbar-end">
          <NavbarItems menuPaths={menuPaths} />

          <div id="contact" className="is-hidden-tablet">
            <div className="info">
              <EnvelopeIcon />
              <p className="subtitle">E-mail</p>
              <a href={`mailto:${email}`} className="is-bold">
                {email}
              </a>
            </div>
            <div className="info">
              <PhoneIcon />
              <p className="subtitle">Phone</p>
              <a href={`tel:${phone}`} className="is-bold">
                {phone}
              </a>
            </div>
          </div>

          <div className="navbar-item has-buttons">
            <Link className="button is-white" to="/contact/">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavbarItems = ({ menuPaths }) => {
  return (
    <>
      {menuPaths.map(menuItem => {
        if (
          menuItem.dropdown &&
          typeof menuItem.dropdown !== 'string' &&
          menuItem.dropdown.length > 0
        ) {
          return <MenuDropDown key={gen.next().value} menuItem={menuItem} />;
        }
        return (
          <Link
            key={gen.next().value}
            activeClassName="is-active"
            className={classNames('navbar-item', 'is-tab')}
            to={cleanPath(menuItem.path)}
          >
            {menuItem.title}
          </Link>
        );
      })}
    </>
  );
};

const MenuDropDown = ({ menuItem, onClick }) => {
  const [isExpandedMobile, setExpandedMobile] = useState(false);
  return (
    <div className={classNames('navbar-item', 'has-dropdown', 'is-hoverable')}>
      <div
        onKeyDown={() => onClick()}
        role="button"
        tabIndex={0}
        onClick={() => setExpandedMobile(!isExpandedMobile)}
        className={classNames('navbar-link')}
      >
        {menuItem.title}
      </div>
      <div
        className={classNames('navbar-dropdown', 'is-boxed', styles.dropdown, {
          [styles.dropdown__isActive]: isExpandedMobile,
        })}
      >
        {menuItem.dropdown.map(subitem => (
          <Link
            key={gen.next().value}
            className={classNames('navbar-item', 'is-tab')}
            activeClassName="is-active"
            to={cleanPath(subitem.path)}
            onClick={() => onClick()}
          >
            {subitem.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
