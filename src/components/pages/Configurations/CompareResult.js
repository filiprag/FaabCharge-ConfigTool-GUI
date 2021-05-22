import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {Table, Form} from 'react-bootstrap'

const CompareResult = (props) => {

    const [list, setList] = useState([])
    const [obj, setObj] = useState({})
    const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

    

    useEffect(() => {

        console.log(props.id)

        axios.get("https://localhost:44345/Configuration/" + props.id, apiHeader).then((res) => {
          setList(res.data.items);
          setObj(res.data.configuration);
          console.log(res.data)
        });

    }, [])
    




    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label className="font-weight-bold">Name</Form.Label>
            <Form.Control
              plaintext
              readOnly
              size="sm"
              value={obj.name}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold">Version Number</Form.Label>
            <Form.Control
              plaintext
              readOnly
              size="sm"
              value={obj.versionNumber}
              disabled
            />
          </Form.Group>
        </Form>
        <Table size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          {list.map((i) => (
            <tr>
              <td>{i.name}</td>
              <td>{i.price}</td>
              <td>{i.description}</td>
            </tr>
          ))}
        </Table>
      </div>
    );
}

export default CompareResult
