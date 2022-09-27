import React, { useEffect } from 'react';
import 'assets/css/mainpanel.css';

function Helpdesk() {
  useEffect(() => {
    window.location.href = 'http://111.111.111.144:8081/#/knowledge-base';
  }, []);

  return (
    <>
    </>
  );
}

export default Helpdesk;
