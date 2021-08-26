import { Table, Container, Button, Modal, Form, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';


const Barang2 = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);



    const [namaBarang, setNamaBarang] = useState('');
    const [hargaBarang, setHargaBarang] = useState('');
    const [jumlahBarang, setJumlahBarang] = useState('');
    const [dataBarang, setDataBarang] = useState([]);

    const [dataUpdateNama, setDataUpdateNama] = useState('')
    const [dataUpdateHarga, setDataUpdateHarga] = useState('')
    const [dataUpdateJumlah, setDataUpdateJUmlah] = useState('')

    const [dataIdUpdate, setDataIdUpdate] = useState('');
    const [dataSearch , setDataSearch] = useState('')

    const hanlderSubmit = async () => {
        const dataSend = {
            namaBarang,
            hargaBarang,
            jumlahBarang
        }

        if (namaBarang === '' || hargaBarang === '' || jumlahBarang === '') {
            alert('data tidak boleh kosong');
            return
        }
        const data = await fetch(`/api/barang/tambah`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const hasil = await data.json();
        // console.log(hasil)
        if (hasil.status === 200) {
            getData();
            handleClose()
        }

    }

    useEffect(() => {

        getData();

    }, []);

    const getData = () => {
        fetch(`/api/barang`)
            .then(hasil => hasil.json())
            .then(res => {
                setDataBarang(res.data)
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
        setDataUpdateNama(data.nama_barang)
        setDataUpdateHarga(data.harga_barang)
        setDataUpdateJUmlah(data.jumlah_barang)
        setDataIdUpdate(data.id)
        handleShowUpdate();
    }

    const hanlderSubmitUpdate = () => {

        const dataSend = {
            dataUpdateNama,
            dataUpdateHarga,
            dataUpdateJumlah,
            dataIdUpdate
        }

        fetch(`/api/barang/update`, {
            method: 'PUT',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(hasil => {
                if (hasil.status === 200) {
                    getData();
                    handleCloseUpdate();
                }
            })

    }

    const handleSearch = (v) => {
        const search = v.target.value;
        setDataSearch(search)

    }


    return (
        <>

            {/* create */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form.Control onChange={(e) => setNamaBarang(e.target.value)} size="lg" type="text" placeholder="nama barang" />
                        <br />
                        <Form.Control onChange={(e) => setHargaBarang(e.target.value)} size="lg" type="text" type="lg" placeholder="harga barang" />
                        <br />
                        <Form.Control onChange={(e) => setJumlahBarang(e.target.value)} size="lg" type="text" placeholder="jumlah barang" />
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
                            <th>Action</th>
                        </tr>
                    </thead>


                    {
                        dataBarang.filter((data) => {

                           return ( 
                           data.nama_barang.toLowerCase().includes(dataSearch.toLocaleLowerCase()) ||  
                           data.harga_barang.toString().toLowerCase().includes(dataSearch.toLocaleLowerCase()) ||  
                           data.jumlah_barang.toString().toLowerCase().includes(dataSearch.toLocaleLowerCase())
                           )

                        }).map((d, i) => {
                            return (

                                <tbody key={i}>
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{d.nama_barang}</td>
                                        <td>{d.harga_barang}</td>
                                        <td>{d.jumlah_barang}</td>
                                        <td>
                                            <button onClick={() => handlerDelete(d.id)} className="btn-danger">delete</button>
                                            <button onClick={() => handlerUpdate(d)} className="btn-success">update</button>
                                            <input type="file" />
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
export default Barang2;
// https://github.com/youone04/ffui/blob/bc435a724639874da634812550d8c1a09c6aaf7d/pages/api/pembayaran/index.js
//https://github.com/youone04/ffui-test/blob/main/pages/api/participants/deletePembayaran.js