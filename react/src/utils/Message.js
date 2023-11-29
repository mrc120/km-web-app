import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div className='d-flex justify-content-center mt-4 w-100 h5 px-3 alert alert-info fade show' role='alert'>
      {msg}
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
