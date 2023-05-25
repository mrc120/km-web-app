import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { defaults } from "browserslist";
import Message from '../../../utils/Message';
const baseURL = "http://localhost:8080/api/files_podst/"



const FilterData = ({ stories = [] }) => {
  const [message, setMessage] = useState("")
  const handleButtonClick = () => {
    console.log(stories.nameAtt)

    if (stories.nameAtt === null) {
      console.log(stories.nameAtt)

      setMessage("Gówno");
      open();
    }
    console.log(stories.nameAtt)
    console.log(handleButtonClick)
    open();

  };
  return (
    <div className="row">
      <div md="1" className="Row-fix ">
        {message ? <Message className="w-100" msg={message} /> : null}
      </div>
      {stories &&
        stories.map((poz) =>
        (
          <div className="col-md-3">
            <div className="card ">
              <div className="container">
                <div className="row px-0">
                  <div className="col-sm-10 ">
                    <div className="h4u" data-id={poz.id}>{poz.title}</div>
                    <hr className="solid"></hr>
                    <div className="h5u">{poz.description}</div>
                  </div>
                  <div className="col-sm-2 flex-column px-0 btn-group">
                    <Button style={{ margin: '-1px -1px -1px 0' }}
                      className="d-flex align-items-center justify-content-center border-bottom  rounded-top rounded-bottom-left-1 rounded-bottom-0   px-0 nc-icon nc-cloud-download-93 size-up-down"
                      target="_blank" onChange={open}
                      href={baseURL + poz.name} >
                      <i className=" "></i>
                    </Button>
                    <Button style={{ margin: '0 -1px 0px 0' }} className="d-flex align-items-center justify-content-center rounded-top-0  rounded-0 px-0 nc-icon nc-attach-87 size-up-down" disabled={poz.nameAtt === null }
                      target="_blank" onChange={() => handleButtonClick()}
                      href={baseURL + poz.nameAtt}>
                    
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  );
}

export default FilterData