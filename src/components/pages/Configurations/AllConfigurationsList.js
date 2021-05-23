import { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Card,
  Spinner,
  Table,
  Modal,
  Button,
  Form,
  Overlay,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";
import { render } from "@testing-library/react";

import editIcon from "../../../img/edit-solid.svg";
import delIcon from "../../../img/trash-solid.svg";
import infoIcon from "../../../img/info-circle-solid.svg";
import exportIcon from "../../../img/file-download-solid.svg";
import { data } from "jquery";
import swal from "sweetalert";
import Pagination from "../../shared/Pagination.js";
import { CSVLink, CSVDownload } from "react-csv";
const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

const AllConfigurationsList = (props) => {
  useEffect(() => {
    if (props.query == "") {
      props.setFilteredList(props.posts);
    } else {
      let temp = props.posts;

      props.setFilteredList(
        temp.filter(
          (i) =>
            i.name.toLowerCase().includes(props.query.toLowerCase())
        )
      );
    }
  }, [props.query, props.filteredList]);

  return (
    <div>
      <Table className="center">
        <thead className="table-borderless">
          <tr>
            <th>Name</th>
            <th>Versionnumber</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {props.currentPosts.map((post) => {
          return (
            <tbody>
              <tr>
                <td>{post.name}</td>
                <td>{post.versionNumber}</td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Infomation about this Configuration
                      </Tooltip>
                    }
                  >
                    <img
                      className="mb-2"
                      style={{ width: "1.4rem", cursor: "pointer" }}
                      id={post.id}
                      src={infoIcon}
                      onClick={props.handleShow}
                    />
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Edit Configuration
                      </Tooltip>
                    }
                  >
                    <Link
                      to={{
                        pathname: "UpdateConfiguration",
                        id: post.id,
                      }}
                    >
                      <img
                        className="mb-2"
                        style={{ width: "1.4rem", cursor: "pointer" }}
                        id={post.id}
                        src={editIcon}
                      />
                    </Link>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Delete Configuration
                      </Tooltip>
                    }
                  >
                    <Link>
                      <img
                        className="mb-2"
                        style={{ width: "1.1rem", cursor: "pointer" }}
                        id={post.id}
                        src={delIcon}
                        onClick={props.deleteHandler}
                      />
                    </Link>
                  </OverlayTrigger>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default AllConfigurationsList;
