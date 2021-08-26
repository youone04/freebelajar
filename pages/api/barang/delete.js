import knex from "../../../config/database";

export default async function hanlder(req , res){

    if(req.method !== 'DELETE'){

        return res.json({
            status: 405,
            message: 'method not allowed'
        })
    }
   await knex('tbl_barang').where('id', req.body.id).del();
   res.json({
       status: 200,
       message: 'data success delete'
   })


}