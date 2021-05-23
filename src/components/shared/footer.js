import React from 'react';
import './footer.css';
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import UploadIcon from "../../img/file-upload-solid.svg";

function Footer() {
    return (
      <div className="footer">
        <Col xs={6} md={8} lg={10} ClassName="ml-5">
          <div class="text-center ml-5">
            <a class=" mb-0 py-2 ml-5">©2021 Faabcharge All rights reserved.</a>
          </div>
        </Col>
        <Col xs={1} md={1} lg={1} ClassName="m-0 m-auto">
          <div className="footer-Icon">
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">Import a new CVS-file</Tooltip>
              }
            >
              <a href="https://localhost:44345/Home">
                <img
                  class="mb-2"
                  src={UploadIcon}
                  style={{ width: "1.4rem", cursor: "pointer" }}
                />
              </a>
            </OverlayTrigger>
          </div>
        </Col>
      </div>
    );
}

export default Footer;