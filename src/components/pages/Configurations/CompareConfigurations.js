import {React, useEffect, useState} from 'react'
import CompareList from './CompareList'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import {Col, Row, Form, Button, Card} from 'react-bootstrap'

const CompareConfigurations = (props) => {


    const [list, setList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [query, setQuery] = useState("");
    const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

      useEffect(() => {

        axios.get("https://localhost:44345/Configuration", apiHeader).then((res) => {
          setList(res.data);
          setFilteredList(res.data);
          console.log(res.data)
        });

      }, []);


    return (
      <div>
        <Row>
          <Col sm={10} md={5} lg={5} className="m-0 m-auto">
            <div>
              <h3>Compare Configurations</h3>
              <Form.Text muted>
                Check the boxes to choose two Configurations and press the
                confirm button to compare the chosen Configurations.
              </Form.Text>
            </div>
            <hr />
            <CompareList
              element={props.element}
              filteredList={filteredList}
              setFilteredList={setFilteredList}
              list={list}
              query={query}
              setQuery={setQuery}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
        </Row>
      </div>
    );
}

export default CompareConfigurations
