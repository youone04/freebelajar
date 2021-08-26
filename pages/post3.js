import { useEffect, useState } from "react";
import { ListGroup,Table } from 'react-bootstrap';


const Post3 = ({data}) => {


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

Post3.getInitialProps = async (ctx)=> {

    const rest = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await rest.json();
    // console.log(data)

    return {
        
            data: data
    }
}

export default Post3;