import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SelectedList from "../../shared/SelectedList.js";
import Table from "../../shared/TableComponent.js";

import EditFormComponent from "../../shared/EditFormComponent";

const UpdateConfiguration = (props) => {
  const [componentList, setComponentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [columns, setColumns] = useState([]);
  const [childColumns, setChildColumns] = useState([]);
  const [element, setElement] = useState("Configuration");
  const [selected, setSelected] = useState([]);
  const [configuration, setConfiguration] = useState({});
  const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

  useEffect(() => {

    if (props.location.id == null) {
      window.location.replace("/AllConfigurations");
    }

    let c = [
      "Name",
      "VersionNumber"
    ];

    let cc = ["Name", "Description", "Price"];
    


    setColumns(c);
    setChildColumns(cc);



    axios
      .get(
        "https://localhost:44345/Configuration/ " + props.location.id,
        apiHeader
      )
      .then((res) => {
        console.log(res.data);
        setConfiguration(res.data.configuration);
        setSelected(res.data.items);
      });

    axios.get("https://localhost:44345/Items", apiHeader).then((res) => {
      if (res.status == "200") {
        setComponentList(res.data);
        setFilteredList(res.data);
        setLoading(false);
      }
    });
  }, []);

  console.log(selected);
  return (
    <div>
      {props.location.id == null ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Col>
            <Card className="p-5 shadow">
              <h5>Update {element}</h5>
              <hr />

              <EditFormComponent
                editObject={configuration}
                setEditObject={setConfiguration}
                columns={childColumns}
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
              ) : (
                <Table
                  loading={loading}
                  columns={childColumns}
                  list={componentList}
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
      )}
    </div>
  );
};

export default UpdateConfiguration;
