import knex from "../../../config/database";

export default async function handler(req, res) {

  
    if(req.method !== 'POST'){

        return res.json({
            status: 405,
            message: 'method not allowed'
        })
    }
    // console.log(req.body.search)
  const data = await knex('tbl_barang').where('nama_barang', 'like', `%${req.body.search}%`).orWhere('harga_barang', 'like', `%${req.body.search}%`).orWhere('jumlah_barang', 'like', `%${req.body.search}%`)
  return  res.json({
        status: 200,
        data: data,
        message: 'get data success'
  });
  }