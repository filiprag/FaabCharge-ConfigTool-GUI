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
import exportIcon from "../../../img/file-download-solid.svg";
import { data } from "jquery";
import swal from "sweetalert";
import Pagination from "../../shared/Pagination.js";
import { CSVLink, CSVDownload } from "react-csv";

function AllComponent(props) {
  const [element, setElement] = useState("Component");
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const { details, setDetails } = useState([]);
  const { loading, setLoading } = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

  useEffect(() => {
    axios
      .get("https://localhost:44345/Components", apiHeader)
      .then((res) => {
        setPosts(res.data);
        setFilteredList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const refreshpage = () => {
    axios
      .get("https://localhost:44345/Components", apiHeader)
      .then((res) => setPosts(res.data));
  };

  const deleteHandler = (e) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44345/Components/" + e.target.id, apiHeader)
        .then((res) => {
          refreshpage();
          if (res.status == "200")
            swal(
              "Component Deleted",
              "Component was succesfully deleted",
              "success"
            );
          else {
            swal("Something Went Wrong Try Again..", "", "warning");
          }
        })
        .catch((err) =>
          swal("Something Went Wrong Try Again..", "", "warning")
        );
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (query == "") {
      console.log("triggad");
      setFilteredList(posts);
    } else {
      setFilteredList(
        filteredList.filter(
          (i) =>
            i.name.toLowerCase().includes(query.toLowerCase()) ||
            i.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);
  const headers = [
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Description", key: "description" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "ManufacturerPartId", key: "manufacturerpartid" },
  ];

  return (
    <div>
      <Row>
        <Col className="m-0 m-auto">
          <Col sm={10} md={8} lg={6} className="m-0 m-auto">
            <h5 className="mb-5">{element} List</h5>
            <div>
              <Row className="w-100">
                <Col>
                  <Form.Control
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                </Col>
                <Col></Col>
                <Col>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        Export to CVS-file
                      </Tooltip>
                    }
                  >
                    <CSVLink data={posts} headers={headers} separator={";"}>
                      <img
                        src={exportIcon}
                        style={{ width: "1.4rem", cursor: "pointer" }}
                      ></img>
                    </CSVLink>
                  </OverlayTrigger>
                </Col>
              </Row>
            </div>
          </Col>
          <Row>
            <hr />
          </Row>
          <Row>
            <Col sm={10} md={8} lg={6} className="m-0 m-auto">
              <Table className="center m-0 m-auto border">
                <thead className="table-borderless">
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Manufacturer</th>
                    <th>ManufacturerPartId</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                {currentPosts.map((post) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{post.name}</td>
                        <td>{post.price}</td>
                        <td title={post.description}>
                          {post.description.slice(0, 30)}
                        </td>
                        <td>{post.manufacturer}</td>
                        <td>{post.manufacturerPartId}</td>
                        <td>
                          <Link
                            to={{
                              pathname: "UpdateComponent",
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
                        </td>
                        <td>
                          <Link>
                            <img
                              className="mb-2"
                              style={{ width: "1.1rem", cursor: "pointer" }}
                              id={post.id}
                              src={delIcon}
                              onClick={deleteHandler}
                            />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AllComponent;
