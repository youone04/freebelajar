import { Table, Container, Button, Modal, Form, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Image from 'next/image';


const Barang = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);



    const [namaProduk, setNamaProduk] = useState('');
    const [hargaProduk, setHargaProduk] = useState('');
    const [jumlahProduk, setJumlahProduk] = useState('');
    const [dataKirim, setDataKirim] = useState('');
    const [dataBarang, setDataProduk] = useState([]);

    const [dataUpdateNama, setDataUpdateNama] = useState('')
    const [dataUpdateHarga, setDataUpdateHarga] = useState('')
    const [dataUpdateJumlah, setDataUpdateJUmlah] = useState('')
    const [gambarUpdate, setGambarUpdate] = useState('');
    const [getFileGambar, setGetFileGambar] = useState('')

    const [dataIdUpdate, setDataIdUpdate] = useState('')

    const hanlderSubmit = async () => {

        // console.log(dataKirim)

        if (dataKirim === '') {
            alert('data tidak boleh kosong');
            return;
        }

        const config = {
            method: 'POST',
            headers: { "Content-Type": 'multipart/form-data' },
            onUploadProgress: (event) => {

                console.log(event)
            },
        }

        const response = await axios.post(`/api/produk/create`, dataKirim, config);
        setDataKirim('')
        console.log(response)
    }

    useEffect(() => {

        getData();

    }, []);

    const getData = () => {
        fetch(`/api/produk/read`)
            .then(hasil => hasil.json())
            .then(res => {
                setDataProduk(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handlerDelete = (id) => {

        swal({
            title: "Yakin data akan dihapus?",
            text: "Data akan di hapus permanent",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch('/api/barang/delete', {
                        method: 'DELETE',
                        body: JSON.stringify({ id }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(res => res.json())
                        .then(hasil => {
                            if (hasil.status === 200) {
                                getData();
                            }
                        })
                }
            });



    }

    const handlerUpdate = (data) => {
        // console.log(data)
        setDataUpdateNama(data.nama_produk)
        setDataUpdateHarga(data.harga_produk)
        setDataUpdateJUmlah(data.jumlah_produk)
        setDataIdUpdate(data.id)
        setGambarUpdate(data.media)
        handleShowUpdate();
    }

    const hanlderSubmitUpdate = async () => {
        const formData = new FormData();
        if (getFileGambar !== '') {

            Array.from(getFileGambar.target.files).forEach((file) => {
                formData.append(getFileGambar.target.name, file);
                formData.set('namaProduk', dataUpdateNama);
                formData.set('hargaProduk', dataUpdateHarga);
                formData.set('dataIdUpdate', dataIdUpdate);
                formData.set('jumlahProduk', dataUpdateJumlah);
            })

            const config = {
                method: 'post',
                headers: { "Content-Type": 'multipart/form-data' },
                onUploadProgress: (event) => {

                    console.log(event)
                },
            }

            const response = await axios.post(`/api/produk/update`, formData, config);
            console.log(response)
        } else {
            const formData = new FormData();
            formData.set('namaProduk', dataUpdateNama);
            formData.set('hargaProduk', dataUpdateHarga);
            formData.set('dataIdUpdate', dataIdUpdate);
            formData.set('jumlahProduk', dataUpdateJumlah);
            const config = {
                method: 'post',
                headers: { "Content-Type": 'application/json' },
            }

            const response = await axios.post(`/api/produk/update`, formData, config);
            console.log(response)

        }




    }

    const handleSearch = (v) => {
        const search = v.target.value;
        fetch(`/api/barang/search`, {
            method: 'POST',
            body: JSON.stringify({ search }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(hasil => {
                setDataBarang(hasil.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const hanldeUpload = (img) => {

        const formData = new FormData();
        Array.from(img.target.files).forEach((file) => {

            formData.append(img.target.name, file);
            formData.set('namaProduk', namaProduk);
            formData.set('hargaProduk', hargaProduk);
            formData.set('jumlahProduk', jumlahProduk);
        })

        setDataKirim(formData)

    }


    return (
        <>

            {/* create */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form.Control onChange={(e) => setNamaProduk(e.target.value)} size="lg" type="text" placeholder="nama barang" />
                        <br />
                        <Form.Control onChange={(e) => setHargaProduk(e.target.value)} size="lg" type="text" type="lg" placeholder="harga barang" />
                        <br />
                        <Form.Control onChange={(e) => setJumlahProduk(e.target.value)} size="lg" type="text" placeholder="jumlah barang" />
                        <br />
                        <Form.Control name="gambar" onChange={hanldeUpload.bind(this)} size="lg" type="file" placeholder="jumlah barang" />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanlderSubmit}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* update */}

            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form.Control value={dataUpdateNama} onChange={(e) => setDataUpdateNama(e.target.value)} size="lg" type="text" placeholder="nama barang" />
                        <br />
                        <Form.Control value={dataUpdateHarga} onChange={(e) => setDataUpdateHarga(e.target.value)} size="lg" type="text" type="lg" placeholder="harga barang" />
                        <br />
                        <Form.Control value={dataUpdateJumlah} onChange={(e) => setDataUpdateJUmlah(e.target.value)} size="lg" type="text" placeholder="jumlah barang" />
                        <br />
                        <Image quality={10} width={50} height={50} src={`/media/${gambarUpdate}`} alt="gambar" />
                        <Form.Control name="gambar" onChange={(e) => setGetFileGambar(e)} size="lg" type="file" placeholder="jumlah barang" />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanlderSubmitUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>



            <h1 className="text-center">Barang</h1>
            <Container className='mt-5'>
                <div className="d-flex justify-content-between">
                    <Button onClick={handleShow} className="m-3" variant="primary" size="lg" active>
                        + Tambah Data
                    </Button>
                    <Col sm="2" className="m-3">
                        <Form.Control type="text" placeholder="Cari data .." onChange={(v) => handleSearch(v)} />
                    </Col>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Harga Barang</th>
                            <th>Jumla Barang</th>
                            <th>gambar</th>
                            <th>Action</th>
                        </tr>
                    </thead>


                    {

                        dataBarang.map((d, i) => {
                            return (

                                <tbody key={i}>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{d.nama_produk}</td>
                                        <td>{d.harga_produk}</td>
                                        <td>{d.jumlah_produk}</td>
                                        <td>
                                            <Image quality={10} width={50} height={50} src={`/media/${d.media}`} alt="gambar" />
                                        </td>
                                        <td>
                                            <button onClick={() => handlerDelete(d.id)} className="btn-danger">delete</button>
                                            <button onClick={() => handlerUpdate(d)} className="btn-success">update</button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })

                    }
                </Table>
                <Form.Select aria-label="Default select example">
                    <option>Pilih nama barang</option>
                    {dataBarang.map((data, index) => {
                        return (
                            <option key={index} value={data.nama_barang}>{data.nama_barang}</option>
                        )
                    })}
                </Form.Select>
            </Container>
        </>
    )
}
export default Barang;