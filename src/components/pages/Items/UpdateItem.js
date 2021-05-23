import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedList from "../../shared/SelectedList.js";
import Table from "../../shared/TableComponent.js";
import Pagination from "../../shared/Pagination";

import EditFormComponent from "../../shared/EditFormComponent";

const UpdateItem = (props) => {
  const [componentList, setComponentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [columns, setColumns] = useState([]);
  const [childColumns, setChildColumns] = useState([]);
  const [element, setElement] = useState("Item");
  const [selected, setSelected] = useState([]);
  const [id, setId] = useState(0)
  const [item, setItem] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
  const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

  useEffect(() => {
    

    

    if (props.location.id == null) {
      
      window.location.replace("/AllItems");
    } else {

      setId(props.location.id);

      console.log("re-render " + id)
      
      
    }

    let c = ["Name", "Description"]
    
    let cc = [
      "Name",
      "Price",
      "Description",
      "Manufacturer",
      "ManufacturerPartId",
    ];

    setColumns(c)
    setChildColumns(c);
    axios.get("https://localhost:44345/Items/" + props.location.id, apiHeader)
      .then((res) => {
          setItem(res.data.item)
          setSelected(res.data.components)
      })
    
    axios.get("https://localhost:44345/Components", apiHeader).then((res) => {
      if (res.status == "200") {
        setComponentList(res.data);
        setFilteredList(res.data);
        setLoading(false);
      }})




      
  }, []);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = componentList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      {id == null ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Col>
            <Card className="p-5 shadow mb-5">
              <h5>Update {element}</h5>
              <hr />

              <EditFormComponent
                editObject={item}
                setEditObject={setItem}
                columns={columns}
                selected={selected}
                setSelected={setSelected}
                element={element}
              ></EditFormComponent>
            </Card>
          </Col>

          <Col>
            <Card className="p-5 shadow">
              <h5>Resources</h5>
              <hr />

              {loading ? ( //Renders spinner while fetching from API
                <div className="p-5">
                  <Spinner animation="border" />
                </div>
              ) : 

                  <Table
                    loading={loading}
                    list={currentPosts}
                    columns={childColumns}
                    setFilteredList={setFilteredList}
                    filteredList={filteredList}
                    query={query}
                    setQuery={setQuery}
                    element={element}
                    selected={selected}
                    setSelected={setSelected}
                    currentPage={currentPage}
                  />
              }
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
                totalPosts={componentList.length}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UpdateItem;
