import { useState, useEffect } from "react";
import axios from "axios";
import SelectedList from "./SelectedList";
import { Row, Form, Card, Button } from "react-bootstrap";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";

function EditFormComponent(props) {
const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

  useEffect(() => {

      console.log(Object.entries(props.editObject));
  }, [props.editObject]);

  const Save = () => {


    if (props.element == "Item") {

      let ok = true;

      if (document.getElementById("name").value == "") {
        document.getElementById("name").classList.remove("is-valid");
        document.getElementById("name").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("name").classList.add("is-valid");
      }

      if (document.getElementById("price").value == "") {
        document.getElementById("price").classList.remove("is-valid");
        document.getElementById("price").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("price").classList.remove("is-invalid");
        document.getElementById("price").classList.add("is-valid");
      }

      if (document.getElementById("description").value == "") {
        document.getElementById("description").classList.remove("is-valid");
        document.getElementById("description").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("description").classList.remove("is-invalid");
        document.getElementById("description").classList.add("is-valid");
      }

      let name = document.getElementById("name").value;
      let price = document.getElementById("price").value;
      let description = document.getElementById("description").value;

      let componentList = props.selected.map((i) => {
        return {
          id: i.component.id,
          price: i.component.price,
          quantity: i.quantity,
        };
      });



      let postObj = {
        item: {
          name: name,
          price: price,
          description: description
        },
        components: componentList,
      };

      if(ok){
        axios
          .put(
            "https://localhost:44345/Items/" + props.editObject.id,
            postObj,
            apiHeader
          )
          .then((res) => {
            console.log(res);
            if (res.status == "200") {
              swal("Item Updated!", "Item Successfully Updated!", "success").then(v => {window.location.replace("/AllItems")});
            } else {
              swal("Error!", "Something Went Wrong!", "error");
            }
          });
      }
      
    } else if (props.element == "Component") {

      let ok = true;

      if (document.getElementById("name").value == ""){
        document.getElementById("name").classList.remove("is-valid");
        document.getElementById("name").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("name").classList.add("is-valid");
        
      }

      if (document.getElementById("price").value == "") {
        document.getElementById("price").classList.remove("is-valid");
        document.getElementById("price").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("price").classList.remove("is-invalid");
        document.getElementById("price").classList.add("is-valid");
        
      }

      if (document.getElementById("description").value == "") {
        document.getElementById("description").classList.remove("is-valid");
        document.getElementById("description").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("description").classList.remove("is-invalid");
        document.getElementById("description").classList.add("is-valid");
      }

      if (document.getElementById("manufacturer").value == "") {
        document.getElementById("manufacturer").classList.remove("is-valid");
        document.getElementById("manufacturer").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("manufacturer").classList.remove("is-invalid");
        document.getElementById("manufacturer").classList.add("is-valid");
      }

      if (document.getElementById("manufacturerPartId").value == null) {
        document
          .getElementById("manufacturerPartId")
          .classList.remove("is-valid");
        document
          .getElementById("manufacturerPartId")
          .classList.add("is-invalid");
          ok = false;
      } else {
        document
          .getElementById("manufacturerPartId")
          .classList.remove("is-invalid");
        document.getElementById("manufacturerPartId").classList.add("is-valid");
      }

      if(ok){
        axios
          .put(
            "https://localhost:44345/Components/" + props.editObject.id,
            {
              name: document.getElementById("name").value,
              price: document.getElementById("price").value,
              description: document.getElementById("description").value,
              manufacturer: document.getElementById("manufacturer").value,
              manufacturerPartId:
                document.getElementById("manufacturerPartId").value,
            },
            apiHeader
          )
          .then((res) => {
            console.log(res);
            if (res.status == "200") {
              swal(
                "Component Updated!",
                "Component Successfully Updated!",
                "success"
              ).then((value) => {
                window.location.replace("/AllComponents");
              });
            } else {
              swal("Error!", "Something Went Wrong!", "error");
            }
          });
      }
        
    } else if (props.element == "Configuration") {

      let ok = true;

      if (document.getElementById("name").value == "") {
        document.getElementById("name").classList.remove("is-valid");
        document.getElementById("name").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("name").classList.add("is-valid");
      }

      if (document.getElementById("versionNumber").value == "") {
        document.getElementById("versionNumber").classList.remove("is-valid");
        document.getElementById("versionNumber").classList.add("is-invalid");
        ok = false;
      } else {
        document.getElementById("versionNumber").classList.remove("is-invalid");
        document.getElementById("versionNumber").classList.add("is-valid");
      }

      let name = document.getElementById("name").value;
      let version = document.getElementById("versionNumber").value;
      let itemList = [];
      itemList = props.selected.map((i) => {
        return {
          id: i.id,
          name: i.name
        };
      });

      let postObj = {
        configuration: {
          name: name,
          versionNumber: version,
        },
        items: itemList,
      };

      if(ok){
        axios
          .put(
            "https://localhost:44345/Configuration/" + props.editObject.id,
            postObj,
            apiHeader
          )
          .then((res) => {
            if (res.status == "200") {
              swal(
                "Configuration Updated!",
                "Configuration Successfully Updated!",
                "success"
              );
            } else {
              swal("Error!", "Something Went Wrong!", "error");
            }
          });
      }
      
    }
  };

    
    
    const onChangeHandler = (e) => {
      
        console.log(e.target.id)
        console.log(e.target.value)
        let tempList = Object.entries(props.editObject).map(i => {
            
            if (i[0] == e.target.id) {
                
                i[1] = e.target.value;
            }

            return i
        });

        props.setEditObject(Object.fromEntries(tempList))
        
  }
    
  const RenderForm = () => {
    return (
      <Card.Body className="w-100" style={{ margin: "0 auto" }}>
        <Row>
          <Form className="w-100">
            {Object.entries(props.editObject).map(c => {
              if (c[0] != "id") {
                return (
                  <Form.Group>
                    <Form.Label className="text-capitalize"> {c[0]}</Form.Label>
                    <Form.Control
                      required
                      id={c[0]}
                      type={c[0] == "price" ? "number" : console.log("text")}
                      
                      placeholder={c[0]}
                      value={c[1]}
                      onChange={onChangeHandler}
                    ></Form.Control>
                  </Form.Group>
                );
              }
            })}
          </Form>
          <Form className="w-100"></Form>
        </Row>
        <SelectedList setSelected={props.setSelected} selected={props.selected} element={props.element} />
        <hr />

        <Row>
          <Button className="w-100" variant="dark" onClick={Save}>
            Save Changes
          </Button>
        </Row>
      </Card.Body>
    );
  };

  return <div>{RenderForm()}</div>;
}

export default EditFormComponent;
