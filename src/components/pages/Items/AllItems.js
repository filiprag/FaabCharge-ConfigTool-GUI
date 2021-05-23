import { useState, useEffect } from "react";
import axios from "axios";
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
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import Pagination from "../../shared/Pagination.js";
import AllItemsList from './AllItemsList.js'

function AllItems(props) {
  const [filteredList, setFilteredList] = useState([]);
  const [elementList, setElementList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [query, setQuery] = useState("");
  const [columns, setColumns] = useState([]);
  const [element, setElement] = useState("Item");
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [obj, setObj] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

  useEffect(() => {
    axios
      .get("https://localhost:44345/Items", apiHeader)
      .then((res) => {
        setPosts(res.data);
        setFilteredList(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    setLoadingModal(true)
    setShow(true);
    axios
      .get("https://localhost:44345/Items/" + e.target.id, apiHeader)
      .then((res) => {
        setDetails(res.data.item);
        setObj(res.data.components);
        setLoadingModal(false)
      });
  };
  const refreshpage = () => {
    axios
      .get("https://localhost:44345/Components", apiHeader)
      .then((res) => setPosts(res.data));
  };
  const deleteHandler = (e) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete("https://localhost:44345/Items/" + e.target.id, apiHeader)
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
                  placeholder="Search..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <hr />
            </Row>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                <AllItemsList
                  posts={posts}
                  query={query}
                  currentPosts={currentPosts}
                  deleteHandler={deleteHandler}
                  handleShow={handleShow}
                  setFilteredList={setFilteredList}
                />
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                />
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size="lg">
        {loadingModal ? (
          <Spinner className="m-0 m-auto" animation="border" />
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>
                <h3 className="text-center">Details</h3>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h5 className="text-center">Item</h5>

              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{details.name}</td>
                      <td>{details.description}</td>
                      <td>{details.price}</td>
                    </tr>
                  </tbody>
                </Table>
                <h5 className="text-center">Included Components</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Manufacturer</th>
                      <th>ManufacturerPartId</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj.map((i) => (
                      <tr>
                        <td>{i.component.name} </td>
                        <td>{i.component.price} </td>
                        <td>{i.component.description} </td>
                        <td>{i.component.manufacturer} </td>
                        <td>{i.component.manufacturerPartId} </td>
                        <td>{i.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AllItems;
