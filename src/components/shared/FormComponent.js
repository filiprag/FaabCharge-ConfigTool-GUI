
import { useState, useEffect } from 'react'
import axios from 'axios'
import SelectedList from './SelectedList'
import { Row, Form, Card, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import 'bootstrap/dist/css/bootstrap.min.css'

function FormComponent(props) {
const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

  useEffect(() => {

    console.log(props.element)

  }, [props.element])

  const Create = () => {


    //Sends post request to API, for creating an item
    if (props.element == "Item") {


      let name = document.getElementById("Name").value
     
      let description = document.getElementById("Description").value;
      console.log(props.selected)
      let componentList = props.selected.map(i => {

        return {
          'id': i.component.id,
          'price':i.component.price,
          'quantity': i.quantity
        }
      })
      
      let postObj = {
        "item": {
          "name": name,
          "description": description
        },
        "components": componentList

      }

      axios.post("https://localhost:44345/Items", postObj, apiHeader)
        .then(res => {

          console.log(res)
          if (res.status == "200") {
            swal("Item Created!", "Item Successfully Created!", "success")
            .then(() => window.location.replace("/AllItems"))
          
            
          } else {
            swal("Error!", "Something Went Wrong!", "error")
          }
        })

    } else if (props.element == "Component") {

      console.log(document.getElementById("Name").value);


      axios.post('https://localhost:44345/Components', {
        name: document.getElementById('Name').value,
        price: document.getElementById('Price').value,
        description: document.getElementById('Description').value,
        manufacturer: document.getElementById('Manufacturer').value,
        manufacturerPartId: document.getElementById('ManufacturerPartId').value,
      }, apiHeader)
        .then(res => {

          console.log(res)
          if (res.status == "200") {
            swal(
              "Component Created!",
              "Component Successfully Created!",
              "success"
            ).then(() =>  window.location.replace("/AllComponents"))
          } else {
            swal("Error!", "Something Went Wrong!", "error")
          }
        })

    } else if (props.element == "Configuration") {

      let name = document.getElementById("Name").value
      let version = document.getElementById("Version").value;
      let itemList = []
      itemList = props.selected.map(i => {

        return {
          'id': i.id,
          'name': i.name
        }
      })

      let postObj = {
        "configuration": {
          "name": name,
          "versionNumber": version
        },
        "items": itemList
      }

      axios
        .post("https://localhost:44345/Configuration/", postObj, apiHeader)
        .then((res) => {
          console.log(res);
          if (res.status == "200") {
            swal(
              "Configuration Created!",
              "Configuration Successfully Created!",
              "success"
            ).then(() =>  window.location.replace("/AllConfigurations"))
          } else {
            swal("Error!", "Something Went Wrong!", "error");
          }
        });

    }
  }

  const RenderForm = () => {

    return (
      <Card.Body className="w-100" style={{ margin: "0 auto" }}>
        <Row>
          <Form className="w-100">
            {props.columns.map((c) => (
              <Form.Group>
                <Form.Label className="text-capitalize"> {c}</Form.Label>
                <Form.Control
                  required
                  id={c}
                  type={c == "description" ? "text-area" : "text"}
                  placeholder={c}
                ></Form.Control>
              </Form.Group>
            ))}
          </Form>
        </Row>
        <Row>
          <SelectedList
            element={props.element}
            selected={props.selected}
            setSelected={props.setSelected}
            element={props.element}
          />
        </Row>
        <Row>
          {}
          <Button className="w-100" variant="dark" onClick={Create}>
            Create
          </Button>
        </Row>
      </Card.Body>
    );
  }


  return (
    <div>
      {RenderForm()}
    </div>
  )
}

export default FormComponent;
