import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navigation.styles.scss';
import NavTab from './NavTab';

// supports only one on hover modal

// use case: setting some styles for navigation bar explicitly
const navigationStyles = (...args) => {
  const [backgroundColor, flexPosition, textColor, marginTop] = args;
  return {
    background: backgroundColor,
    justifyContent: flexPosition,
    color: textColor,
    marginTop: marginTop,
  };
};

function NavigationBar({
  Logo,
  links,
  children,
  title,
  background,
  flexPosition,
  textColor,
  marginTop,
}) {
  const navigationContainerCssClasses = ['navigation'];
  flexPosition && navigationContainerCssClasses.push(`flex-${flexPosition}`);

  return (
    <div
      className={navigationContainerCssClasses.join(' ')}
      style={navigationStyles(background, flexPosition, textColor, marginTop)}
    >
      {Logo && (
        <Link className='logo-container' to='/'>
          <Logo />
        </Link>
      )}

      {title && <div className='title'>{title}</div>}

      {links && (
        <div className='nav-links-container'>
          {links.length !== 0 &&
            links.map((link) => {
              if (link.show) {
                return (
                  <Fragment key={link.id}>
                    <NavTab navTab={link}>{children}</NavTab>
                  </Fragment>
                );
              } else return null;
            })}
        </div>
      )}

      {/* Meant to be a conditional modal. Only one supported */}
      {children && children.length !== 0 && children[children.length - 1]}
    </div>
  );
}

NavigationBar.propTypes = {
  Logo: PropTypes.any,
  links: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.array,
  title: PropTypes.string,
  background: PropTypes.string,
  flexPosition: PropTypes.string,
  textColor: PropTypes.string,
  marginTop: PropTypes.string,
};

export default NavigationBar;
