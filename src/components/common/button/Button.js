import React from 'react';

import PropTypes from 'prop-types';

import './button.styles.scss';

function Button(props) {
  const {
    type,
    text,
    onClick,
    secondaryButtonClass,
    disabled,
    validButtons,
    isLoading,
    dataId,
    dataTestId,
  } = props;

  // determining button classes
  const buttonCssClasses = ['button'];
  if (isLoading) buttonCssClasses.push('buttonLoading');
  if (secondaryButtonClass) buttonCssClasses.push(`${secondaryButtonClass}`);

  // determining if button needs to be disabled
  let flag = disabled;
  if (validButtons?.includes(secondaryButtonClass)) flag = false;

  return (
    <button
      className={buttonCssClasses.join(' ')}
      type={type}
      onClick={onClick}
      disabled={flag}
      data-id={dataId}
      data-test-id={dataTestId}
    >
      <span className='button-text'>{text}</span>
    </button>
  );
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  secondaryButtonClass: PropTypes.string,
  validButtons: PropTypes.array,
};
