import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Col,
  Row,
  Form,
  Spinner,
  Table,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import editIcon from "../../../img/edit-solid.svg";
import delIcon from "../../../img/trash-solid.svg";
import infoIcon from "../../../img/info-circle-solid.svg";
import swal from "sweetalert";
import Pagination from "../../shared/Pagination.js";

function AllConfigurations(props) {

  const [filteredList, setFilteredList] = useState([])
  const [elementList, setElementList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [columns, setColumns] = useState([])
  const [element, setElement] = useState('Configuration')
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([])
  const [list, setList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" }};

  useEffect(() => {
    axios.get('https://localhost:44345/Configuration', apiHeader)
      .then((res) => {
        setPosts(res.data)
        setFilteredList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    axios.get("https://localhost:44345/Configuration/" + e.target.id, apiHeader).then((res) => {
      setDetails(res.data.configuration);
      setList(res.data.items)
    });
  };
const refreshpage = () => {

  axios.get("https://localhost:44345/Configuration", apiHeader).then((res => setPosts(res.data)))


}
const deleteHandler = (e) => {
  if (window.confirm("Are you sure?")) {
    axios
      .delete("https://localhost:44345/Configuration/" + e.target.id, apiHeader)
      .then((res) => {
        refreshpage()
      if(res.status=="200")
      swal("Component Deleted","Component was succesfully deleted", "success")
      else {
        swal("Something Went Wrong Try Again..", "", "warning")
      }

      }).catch(err=>swal("Something Went Wrong Try Again..", "", "warning"))
        
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

  return (
    <div>
      <Row>
        <Col sm={10} md={8} lg={6} className="m-0 m-auto">
          <h5 className="mb-5">{element} List</h5>
          <div>
            <Row>
              <Col>
                <Form.Control
                  sm={10}
                  md={10}
                  lg={4}
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              </Col>
              <Col sm={0} md={0} lg={4}></Col>
              <Col sm={0} md={0} lg={4}></Col>
            </Row>
            <Row>
              <hr />
            </Row>
          
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
              {currentPosts.map((post) => {
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
                            onClick={handleShow}
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
                              onClick={deleteHandler}
                            />
                          </Link>
                        </OverlayTrigger>
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
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            <h3>Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center">Configuration</h5>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.name}</td>
                <td>{details.versionNumber}</td>
              </tr>
            </tbody>
          </Table>
          <h5 className="text-center">Included Items</h5>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Desription</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr>
                  <td>{i.name}</td>
                  <td>{i.description}</td>
                  <td>{i.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AllConfigurations;
