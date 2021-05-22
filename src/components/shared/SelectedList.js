import { useState, useEffect } from "react";
import { Table, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import delIcon from "../../img/trash-solid.svg";
import editIcon from "../../img/edit-solid.svg";

function SelectedList(props) {
  useEffect(() => {

  }, [props.selected]);

  const RenderHeaders = () => {
    if (props.selected != null) {
      if (props.element == "Item") {
        return (
          <ListGroup.Item className="w-100">
            <Row>
              <Col sm={5} md={5} lg={5} className="font-weight-bold">
                Name
              </Col>
              <Col className="font-weight-bold">Price</Col>
              <Col className="font-weight-bold">Quantity</Col>
              <Col className="font-weight-bold"></Col>
            </Row>
          </ListGroup.Item>
        );
      } else if (props.element == "Configuration") {
        return (
          <ListGroup.Item className="w-100">
            <Row>
              <Col sm={3} md={3} lg={3} className="font-weight-bold">
                Name
              </Col>
              <Col sm={5} md={5} lg={5} className="font-weight-bold">
                Description
              </Col>
              <Col sm={2} md={2} lg={2} className="font-weight-bold">
                Price
              </Col>
              <Col className="font-weight-bold"></Col>
            </Row>
          </ListGroup.Item>
        );
      }
    }
  };

  const changeQuantity = (value, id) => {

    var temp = props.selected.map((i) => {

      if (i.component.id == id) {

        i.quantity = value;

      }

      return i;
    });

    props.setSelected(temp.map((i) => i));

  }

  //Removes object from list of selected objects
  const onRemove = (id) => {
    
    if(props.element == "Item"){

      props.setSelected(props.selected.filter((i) => i.component.id != id));
      
    } else {
      props.setSelected(props.selected.filter((i) => i.id != id));
    }
    
  }

  const TotalSum = () => {
    let sum = 0;
    if (props.element == "Item") {
      props.selected.forEach((i) => {
        if (i.quantity > 0) {
          sum += i.component.price * i.quantity;
      sum = Math.round(sum*100)/100;
        }
      });
      return (
        <ListGroup.Item className="w-100">
          <Row>
            <Col sm={5} md={5} lg={5} className="font-weight-bold">
              Total cost:
            </Col>
            <Col>{sum}</Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </ListGroup.Item>
      );
    }
    else if(props.element == "Configuration"){
     console.log(props.selected)
      props.selected.forEach((i) => {
        
          sum += i.price;
      sum = Math.round(sum*100)/100;

        
      });
      return (
        <ListGroup.Item className="w-100">
          <Row>
            <Col sm={5} md={5} lg={5} className="font-weight-bold">
              Total cost:
            </Col>
            <Col>{sum}</Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </ListGroup.Item>
      );

    }
  };

  const RenderList = () => {
    if (props.element == "Item") {
      return props.selected.map((i) => (
        <ListGroup.Item className="w-100">
          <Row>
            <Col sm={5} md={5} lg={5}>
              {i.component.name}
            </Col>
            <Col>{i.component.price}</Col>
            <Col>
              <Form.Control
                className="text-center"
                size="sm"
                onChange={(e) => changeQuantity(e.target.value, i.component.id)}
                id={i.component.id}
                type="number"
                value={i.quantity && i.quantity}
              ></Form.Control>
            </Col>
            <Col>
              <img
                style={{ width: "1rem", cursor: "pointer" }}
                id={i.id}
                onClick={(e) => onRemove(i.component.id)}
                src={delIcon}
              />
            </Col>
          </Row>
        </ListGroup.Item>
      ));
    } else if (props.element == "Configuration") {
      return props.selected.map((i) => (
        <ListGroup.Item className="w-100">
          <Row>
            <Col sm={3} md={3} lg={3}>
              {i.name}
            </Col>
            <Col sm={5} md={5} lg={5}>
              {i.description}
            </Col>
            <Col sm={2} md={2} lg={2}>
              {i.price}
            </Col>
              <Col>
              <img
                style={{ width: "1rem", cursor: "pointer" }}
                id={i.id}
                onClick={(e) => onRemove(i.id)}
                src={delIcon}
              />
            </Col>
          </Row>
        </ListGroup.Item>
      ));
    } else if(props.element == "Component"){
      return(<div></div>)
    }
  };

  return (
    <div className="w-100">
      <hr></hr>
      <h5>
        {(props.element == "Component") ? "" : "Selected Resources"}
      </h5>
      <ListGroup variant="flush">
        {RenderHeaders()}
        {RenderList()}
        {TotalSum()}
      </ListGroup>
    </div>
  );
}

export default SelectedList;
