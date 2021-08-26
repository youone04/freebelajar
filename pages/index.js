import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import NavbarLayout from '../components/Navbar';
import CardLayout from '../components/Card';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Page | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="./icon.png" />
      </Head>
      <NavbarLayout/>
      <Login/>
      <CardLayout title={"judul"} list1={"list 1"}/>
    </div>
  )
}
