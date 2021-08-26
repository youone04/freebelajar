import knex from "../../../config/database";

export default async function hanlder(req , res){

    if(req.method !== 'PUT'){

        return res.json({
            status: 405,
            message: 'method not allowed'
        })
    }

   
   await  knex('tbl_barang').where('id', '=', req.body.dataIdUpdate).update({ nama_barang: req.body.dataUpdateNama ,harga_barang :req.body.dataUpdateHarga, jumlah_barang: req.body.dataUpdateJumlah, })
   res.json({
       status: 200,
       message: 'data success update'
   })


}