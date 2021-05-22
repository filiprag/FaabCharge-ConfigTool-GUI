import { React, useEffect } from "react";
import { Pagination as Pag } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = (props) => {
  useEffect(() => {}, [props.totalPosts]);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const lastPage = pageNumbers.length;

  const paginate = (e) => {
    props.setCurrentPage(e.target.id);
  };
  const handleFirst = () => {
    props.setCurrentPage(1);
  };
  const handleLast = () => {
    props.setCurrentPage(lastPage);
  };

  const handleNext = () => {
    if (props.currentPage < lastPage) {
      props.setCurrentPage(props.currentPage + 1);
    }
  };
  const handlePrev = () => {
    console.log("PrevClick!");
    console.log("newPage: " + props.currentPage);
    if (props.currentPage > 1) {
      props.setCurrentPage(props.currentPage - 1);
    }
  };

  return (
    <Pag size="sm" className="pagination" variant="dark">
      <li className="page-item">
        <a
          onClick={handleFirst}
          style={{ color: "#343a40" }}
          className="page-link"
          href="#first"
        >
          &#x276E;&#x276E;
        </a>
      </li>
      <li variant="dark" className="page-item">
        <a
          onClick={handlePrev}
          style={{ color: "#343a40" }}
          className="page-link"
          href="#prev"
        >
          &#x276E;
        </a>
      </li>

      {pageNumbers.map((i) => {
        if (i == props.currentPage) {
          return (
            <li key={i} className="page-item  border shadow">
              <a
                id={i}
                style={{ color: "#343a40" }}
                onClick={paginate}
                className="page-link"
                href="#paginate"
              >
                {i}
              </a>
            </li>
          );
        } else {
          return (
            <li key={i} className="page-item">
              <a
                id={i}
                style={{ color: "#343a40" }}
                onClick={paginate}
                className="page-link"
                href="#paginate"
              >
                {i}
              </a>
            </li>
          );
        }
      })}
      <li className="page-item">
        <a
          onClick={handleNext}
          style={{ color: "#343a40" }}
          className="page-link"
          href="#next"
        >
          &#10095;
        </a>
      </li>
      <li className="page-item">
        <a
          onClick={handleLast}
          style={{ color: "#343a40" }}
          className="page-link"
          href="#last"
        >
          &#10095;&#10095;
        </a>
      </li>
    </Pag>
  );
};

export default Pagination;
