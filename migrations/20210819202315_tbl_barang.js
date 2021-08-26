
exports.up = function(knex) {
  return knex.schema.createTable('tbl_barang' , function(table){
      table.increments();
      table.string('nama_barang');
      table.integer('harga_barang');
      table.integer('jumlah_barang');
      table.timestamps(true , true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tbl_barang')
};
