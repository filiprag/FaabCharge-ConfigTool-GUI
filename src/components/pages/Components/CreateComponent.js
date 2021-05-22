import { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Card, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import FormComponent from '../../shared/FormComponent'

function CreateComponent(props) {

  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [columns, setColumns] = useState([])
  const [element, setElement] = useState('Component')
  const [selected, setSelected] = useState([]);
  


  useEffect(() => {

    let c = ["Name", "Price", "Description", "Manufacturer", "ManufacturerPartId"]
    setColumns(c)


  }, [])

  
  return (
    <div>
      <Row>
        <Col sm={10} md={8} lg={6} className="m-0 m-auto">
          <Card className="p-5 ">
            <h5>Create {element}</h5>
            <hr />

            <FormComponent
              columns={columns}
              selected={selected}
              setSelected={setSelected}
              element={element}
            ></FormComponent>
           
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreateComponent;
