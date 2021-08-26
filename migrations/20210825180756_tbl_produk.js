
exports.up = function(knex) {
    return knex.schema.createTable('tbl_produk' , function(table){
        table.increments();
        table.string('nama_produk');
        table.integer('harga_produk');
        table.integer('jumlah_produk');
        table.text('media');
        table.timestamps(true , true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tbl_produk')
  };
  