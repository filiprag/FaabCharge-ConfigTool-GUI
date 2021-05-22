import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedList from "../../shared/SelectedList.js";
import Table from "../../shared/TableComponent.js";

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
  const [item, setItem] = useState({});

  useEffect(() => {
    


    if (props.location.id == null) {
      
      window.location.replace("/AllItems");
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
    axios.get("https://localhost:44345/Items/" + props.location.id)
      .then((res) => {
          setItem(res.data.item)
          setSelected(res.data.components)
      })
    
    axios.get("https://localhost:44345/Components").then((res) => {
      if (res.status == "200") {
        console.log(res.data);
        setComponentList(res.data);
        setFilteredList(res.data);
        setLoading(false);
      }})




      
  }, []);

  console.log(selected)
  return (
    <div>
      <Row>
        <Col>
          <Card className="p-5 ">
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
          <Card className="p-5">
            <h5>Resources</h5>
            <hr />

            {loading ? ( //Renders spinner while fetching from API
              <div className="p-5">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table
                loading={loading}
                list={componentList}
                columns={childColumns}
                setFilteredList={setFilteredList}
                filteredList={filteredList}
                query={query}
                setQuery={setQuery}
                element={element}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateItem;
