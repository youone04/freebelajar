import CardLayout from '../components/Card';
import NavbarLayout from '../components/Navbar';
import Head from 'next/head'

const About = () => {
    return(
        <>
         <Head>
        <title>Page | About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="./icon.png" />
      </Head>
        <NavbarLayout/>
        <h1 className="about-title">halaman about</h1>
        <CardLayout title={"Featured update"} list1={"Cras justo odio update"}/>
        </>
    )
}

export default About;