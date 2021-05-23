import { useState, useEffect } from "react";
import {
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import editIcon from "../../../img/edit-solid.svg";
import delIcon from "../../../img/trash-solid.svg";

 const apiHeader = { headers: { Key: "tNL1Jrv6pEEO5h50RCrB" } };

const AllComponentsList = (props) => {


    useEffect(() => {

        if(props.query == ""){
            props.setFilteredList(props.posts)
        } else {

            let temp = props.posts

            props.setFilteredList(
              temp.filter(
                (i) =>
                  i.name.toLowerCase().includes(props.query.toLowerCase()) ||
                  i.description.toLowerCase().includes(props.query.toLowerCase())
              )
            )
        }

    }, [props.query])

    

    return (
      <div>
        <Table className="center m-0 m-auto">
          <thead className="table-borderless">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Manufacturer</th>
              <th>ManufacturerPartId</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {props.currentPosts.map((post) => {
            return (
              <tbody>
                <tr>
                  <td>{post.name}</td>
                  <td>{post.price}</td>
                  <td title={post.description}>
                    {post.description.slice(0, 30)}
                  </td>
                  <td>{post.manufacturer}</td>
                  <td>{post.manufacturerPartId}</td>
                  <td>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Edit Component</Tooltip>
                      }
                    >
                      <Link
                        to={{
                          pathname: "UpdateComponent",
                          id: post.id,
                        }}
                      >
                        <img
                          className="mb-2"
                          style={{ width: "1.4rem", cursor: "pointer" }}
                          id={post.id}
                          src={editIcon}
                        />
                      </Link>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          Delete Component
                        </Tooltip>
                      }
                    >
                      <Link>
                        <img
                          className="mb-2"
                          style={{ width: "1.1rem", cursor: "pointer" }}
                          id={post.id}
                          src={delIcon}
                          onClick={props.deleteHandler}
                        />
                      </Link>
                    </OverlayTrigger>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
}

export default AllComponentsList
