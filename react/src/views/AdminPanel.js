import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import RegisterForm from '../Form/RegisterForm.js'
import EditUserForm from '../Form/EditUserForm.js'

const AdminPanel = () => (
  <div className="mainpanel">
    <div className="container flex-row px-0 w-50 mt-3 border bg-white justify-content-center">
      <Tabs defaultActiveKey="zarejestruj"
        id="uncontrolled-tab-example"
        className="mb-3 justify-content-center nav nav-tabs nav-fill nav-border nav-pills">
        <Tab eventKey="zarejestruj" title="Zarejestruj użytkownika">
          <RegisterForm />
        </Tab>
        <Tab eventKey="edytuj" title="Edytuj użytkownika">
          <EditUserForm />
        </Tab>
      </Tabs>
    </div>
  </div>
);

export default AdminPanel;