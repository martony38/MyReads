import React from 'react';
import PropTypes from 'prop-types';

const Notice = props => (
  <div className="notice" style={{ display: props.notice? "inline-flex" : "none" }}>
    <span className="notice-text">{props.notice}</span>
    <span className="close-notice-button" onClick={props.onCloseNotice}></span>
  </div>
);

Notice.propTypes = {
  notice: PropTypes.string,
  onCloseNotice: PropTypes.func.isRequired
};

export default Notice;