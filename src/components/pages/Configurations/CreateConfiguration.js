import { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Row, Card, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from '../../shared/TableComponent.js'
import FormComponent from '../../shared/FormComponent'
import Pagination from "../../shared/Pagination";

function CreateConfiguration(props) {

  const [itemList, setItemList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [columns, setColumns] = useState([])
  const [childColumns, setChildColumns] = useState([]);
  const [element, setElement] = useState('Configuration')
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(2)


  useEffect(() => {

    setElement(props.element)

    let c = ["Name", "Version"]
    setColumns(c)

    let cc = ["Name", "Description", "Price"]
    setChildColumns(cc)


    axios.get("https://localhost:44345/Items")
      .then(res => {

        if (res.status == "200") {

          console.log(res.data)
          setItemList(res.data)
          setFilteredList(res.data)
          setLoading(false)
        }
      })





  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = itemList.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div>
      <Row>
        <Col>
          <Card className='p-5'>
            <h5>Create {element}</h5>
            <hr />

            <FormComponent
              list={filteredList}
              columns={columns}
              selected={selected}
              setSelected={setSelected}
              element={element}>



            </FormComponent>

          </Card >
        </Col>

        <Col>
          <Card className='p-5'>
            <h5>Resources</h5>
            <hr />

            {loading ? //Renders spinner while fetching from API
              <div className="p-5"><Spinner animation="border" /></div>
              :
              <Table
                columns={childColumns}
                loading={loading}
                list={currentPosts}
                setFilteredList={setFilteredList}
                filteredList={filteredList}
                query={query}
                setQuery={setQuery}
                element={element}
                selected={selected}
                setSelected={setSelected}
                currentPage={currentPage}  />
            }
             <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={itemList.length} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateConfiguration;
