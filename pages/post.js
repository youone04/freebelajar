import { useEffect, useState } from "react";
import { ListGroup,Table } from 'react-bootstrap';


const Post = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(hasil => {
                // console.log(hasil)
                setData(hasil)
            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    return (
        <>
            <h1>page post</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>

                {

                    data.map((d, i) => {
                        return (

                            <tbody key={i}>
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{d.title}</td>
                                    <td>{d.body}</td>
                                </tr>
                             </tbody>
                    )
                })
                
                }
            </Table>

        </>
            )
}
            export default Post;