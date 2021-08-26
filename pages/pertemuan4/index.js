
// https://jsonplaceholder.typicode.com/posts

export async function getStaticProps(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await res.json()

    return {

        props: {
            data
        },
    }
}

const ExampleGetSTatic = (props) => {
    console.log(props.data)
    return(
        <>
        <h1 style={{marginLeft : 30,color: 'green',marginTop: 200}}>hallo</h1>
        </>
    )
}
export default ExampleGetSTatic;