import knex from "../../../config/database";

export default async function handler(req, res) {

  
    if(req.method !== 'GET'){

        return res.json({
            status: 405,
            message: 'method not allowed'
        })
    }

  const data = await knex.select('*').from('tbl_produk');
  return  res.json({
        status: 200,
        data: data,
        message: 'get data success'
  });
  }