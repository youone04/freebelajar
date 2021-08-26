import knex from "../../../config/database";

export default async function handler(req, res) {
    if(req.method !== 'POST'){
        return  res.json({
            status: 405,
            message: 'method not allowed'
        });
    }
    const result = await knex('tbl_barang').insert({

        nama_barang : req.body.namaBarang,
        harga_barang : req.body.hargaBarang,
        jumlah_barang : req.body.jumlahBarang
    });

    res.status(200);
    res.json({
        status: 200,
        message: 'data success',
        data: result
    })




}