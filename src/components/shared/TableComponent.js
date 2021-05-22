import { useState, useEffect } from "react";
import { Spinner, Table, Row, Col, Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import addIcon from '../../img/plus-solid.svg'


function TableComponent(props) {
  var columns = [];


  useEffect(() => {

   
    //Skriver ut hela listan om den är tom, annars filtreras listan från söksträngen
    if (props.query == "") {
      props.setFilteredList(props.list);
    } else {
      let temp = props.list;
      props.setFilteredList(
        temp.filter(
          (i) =>
            i.name.toLowerCase().includes(props.query.toLowerCase()) ||
            i.description.toLowerCase().includes(props.query.toLowerCase())
        )
      )
    }
  }, [props.query, props.currentPage]);

  //Add function, adds objects from table to selected list
  const onAdd = (id) => {
    if (props.element == "Item") {

      let exists = false;
      
      props.selected.forEach((i) => {

        if (i.component.id == id) {
            
          exists = true;
        }        
        
      });

      if(exists == false){

        var temp = props.list.filter((c) => c.id == id);
        props.selected.push({
          component: temp[0],
          quantity: 1,
        });
        props.setSelected(props.selected.map((i) => i));

      } else {

         swal(
            "Error",
            "Component is already added, try changing the quantity instead",
            "error"
          )
      }


    } else {
       let exists = false;

       props.selected.forEach((i) => {
         if (i.id == id) {
           exists = true;
         }
       });

       if (exists == false) {
         var temp = props.list.filter((c) => c.id == id);
         props.selected.push(temp[0]);
         props.setSelected(props.selected.map((i) => i));
       } else {
         swal(
           "Error",
           "Component is already added, try changing the quantity instead",
           "error"
         );
       }
    }
  };




  //Metoden som skriver ut tabellen, och logiken som undviker null exception
  const RenderRows = () => {


    //Avoiding null exception
    if (props.filteredList != null) {
      if (props.filteredList[0] != null) {
        columns = Object.keys(props.list[0]).map((i) => i);
        columns = columns.filter((i) => i != "id");


        //If Item is the relevant object
        if (props.element === "Item") {
          return (
            <div>
              <Table size="sm" className="" responsive="sm">
                <thead className="table-borderless">
                  <tr>
                    {columns.map((c) => (
                      <td className="text-capitalize font-weight-bold">{c}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.filteredList.map((i) => (
                    <tr>
                      <td>{i.name}</td>
                      <td>{i.price}</td>
                      <td>{i.description}</td>
                      <td>{i.manufacturer}</td>
                      <td>{i.manufacturerPartId}</td>
                      <td>
                        

                          <img style={{width: '1rem', cursor: 'pointer'}} id={i.id} onClick={e => onAdd(e.target.id)} src={addIcon} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          );
        } else if (props.element === "Configuration") {
          return (
            <div>
              <Table size="sm" className="" responsive="sm">
                <thead className="table-borderless">
                  <tr>
                    {props.columns.map((c) => (
                      <td className="text-capitalize font-weight-bold">{c}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.filteredList.map((i) => (
                    <tr>
                      <td>{i.name}</td>
                      <td>{i.description}</td>
                      <td>{i.price}</td>
                      <td>
                        <img
                          style={{ width: "1rem", cursor: "pointer" }}
                          id={i.id}
                          onClick={(e) => onAdd(e.target.id)}
                          src={addIcon}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          );
        }
      }
    } else {
      return (
        <div className="p-5">
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <div>
        <Table striped size="sm" className="">
          <tr>
            <td>No results found</td>
          </tr>
        </Table>
      </div>
    );
  };

  //Render för hela komponenten
  return (
    <div>
      <Row>
        <Col>
          <Form.Control
            onChange={(e) => props.setQuery(e.target.value)}
            type="text"
            placeholder="search"
          />
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <hr></hr>
      {RenderRows()}
    </div>
  );
}

export default TableComponent;
