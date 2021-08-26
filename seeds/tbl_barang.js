
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tbl_barang').del()
    .then(function () {
      // Inserts seed entries
      return knex('tbl_barang').insert([
        {id: null, nama_barang: 'shampo',harga_barang: 5000,jumlah_barang: 12},
        {id: null, nama_barang: 'sabun',harga_barang:10000,jumlah_barang: 10},
        {id: null, nama_barang: 'kecap',harga_barang:8000,jumlah_barang: 15}
      ]);
    });
};
