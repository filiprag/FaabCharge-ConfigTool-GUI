import {React, useEffect, useState} from 'react'
import axios from 'axios'
import {Table, Form} from 'react-bootstrap'

const CompareResult = (props) => {

    const [list, setList] = useState([])
    const [obj, setObj] = useState({})
    

    useEffect(() => {

        console.log(props.id)

        axios.get("https://localhost:44345/Items/" + props.id).then((res) => {
          setList(res.data.components);
          setObj(res.data.item);
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
            <Form.Label className="font-weight-bold">Description</Form.Label>
            <Form.Control
              plaintext
              readOnly
              as="textarea"
              size="sm"
              value={obj.description}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold">Price</Form.Label>
            <Form.Control
              plaintext
              readOnly
              size="sm"
              value={obj.price}
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
              <th>Manufacturer</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {list.map((i) => (
            <tr>
              <td>{i.component.name}</td>
              <td>{i.component.price}</td>
              <td>{i.component.description}</td>
              <td>{i.component.manufacturer}</td>
              <td>{i.quantity}</td>
            </tr>
          ))}
        </Table>
      </div>
    );
}

export default CompareResult
