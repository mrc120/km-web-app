import React from "react";
import { Button } from "react-bootstrap";
// import Message from '../../../utils/Message'; delete?
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditFile from './EditFile.js'

const handleButtonClick = (nameAtt) => {
  !nameAtt ? toast("Brak dołączonego załącznika.") :
    window.location.href = apiURL + nameAtt
};

const FilterData = ({ stories = [], apiURL = "" }) => {
  return (
    <>
      <ToastContainer />
      <div className="row mb-3">
        {stories &&
          stories.map((poz) => (
            <div className="col-md-3 mb-3">
              <div className="card">
                {/* <div className="container"> */}
                  <div className="row-inside px-0">
                    <div className="col-sm-10 ">
                      <div className="h4u" key={poz.id}>{poz.title}</div>
                      <hr className="solid"></hr>
                      <div className="h5u">{poz.description}</div>
                    </div>
                    <div className="col-sm-2 flex-column px-0 btn-group">
                      <Button
                        className="d-flex align-items-center justify-content-center border-bottom  rounded-top rounded-bottom-left-1 rounded-bottom-0   px-0 nc-icon nc-cloud-download-93 size-up-down"
                        style={{ margin: '-1px -1px -1px 0' }}
                        target="_blank"
                        onChange={open}
                        href={apiURL + poz.name} >
                        <i className=" "></i>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center rounded-top-0  rounded-0 px-0 nc-icon nc-attach-87 size-up-down"
                        style={{ margin: '0 -1px 0px 0' }}
                        onClick={() => handleButtonClick(poz.id, poz.nameAtt)}
                        aria-disabled={poz.nameAtt === null}>
                      </Button>
                    </div>
                  {/* </div> */}
                </div>
                <EditFile
                  key={poz.id}
                  id={poz.id}
                  title={poz.title}
                  description={poz.description} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default FilterData