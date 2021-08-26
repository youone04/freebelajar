import knex from '../../../config/database';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';

const upload = multer({

    storage: multer.diskStorage({

        destination:'./public/media',
        filename: (req ,file ,cb) => cb(null,Date.now()+"-produk-"+
        file.originalname)

    }),
    fileFilter: (req, file , cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
     }

     cb(null , true)

    },
  
})

const handler = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
      },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
      },
})//end handler

handler.use(upload.array('gambar'));


handler.post(async(req , res) => {
    // console.log(req.files[0].filename)
   await knex('tbl_produk').insert({nama_produk	: req.body.namaProduk , harga_produk: req.body.hargaProduk,jumlah_produk:req.body.jumlahProduk,media: req.files[0].filename })

     res.json({
         status: 200,
         message: 'success'
     });


})

export default handler;
export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };
