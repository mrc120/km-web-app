import { useEffect } from 'react';
import 'assets/css/mainpanel.css';

const Helpdesk = () => {
  useEffect(() => {
    window.location.href = 'http://111.111.111.122:8082/#/knowledge-base';
  }, []); 
  return null;
}

export default Helpdesk;
