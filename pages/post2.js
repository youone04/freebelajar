import { useEffect, useState } from "react";
import { ListGroup,Table } from 'react-bootstrap';


export async function getServerSideProps(){

    const rest = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await rest.json();
    // console.log(data)

    return {
        props : {

            data: data
        }
    }
}


const Post2 = ({data}) => {


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
export default Post2;