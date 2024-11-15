const express = require("express");
//apk menampung semua expressnya
const app = express();
//port apknya
const port = 3000;
const { logger } = require("./middleware/log.middleware");
//middleware untuk penerima json dari express
app.use(express.json());
app.use(logger);
app.listen(port, "localhost", () => {
  console.log(`server berjalan di port ${port}`);
});
app.get("/hello", (request, response) => {
  return response.send("hallo dari expressjs");
});
//representasi dari database
//dikasih let karena variabel yang bisa diubah
let biodata = [
    { id: 1, name: "Muhamad Ibnu Miftzal"},
    { id: 2, umur: "16"},
    { id: 3, alamat: "Kec. Rawalumbu, Kel. Sepanjang Jaya, Kota Bekasi"},
    { id: 4, media_sosial: "@zall.5_"},
    { id: 5, nomor_telepon: "+62 831-8878-3432"},
];
//kalau ngambil semua data
app.get("/biodata", (request, response) => {
  response.status(200).json(biodata); // 201 berarti diterima
});
// kita membuat variabel untuk menampung semua users atau cuma 1 id aja
app.get("/biodata/:id", (request, response) => {
  const identity = biodata.find(
    (data) =>
      //kalau mau ngambil data 1, itu tidak usah pakai "s"
      //.find adalah fungsi array dari java script, untuk mencari data secara spesifik.
      //Data itu fungsinya untuk memanggil si data ussernya
      //Data tersebut isinya seluruh data usser
      data.id === parseInt(request.params.id)
  );
  //"===" adalah untuk pengecekan data
  // parseInt untuk mengecek angka
  //.params untuk mengambil parameter
  //int itu huruf
  // string itu angka pakai kutip, kalau number tidak
  if (identity) {
    response.json(identity);
  } else {
    response.status(400).json({
      pesan: "data identity tidak ditemukan",
    });
  }
});
app.post("/biodata", (request, response) => {
  const newidentity = {
    //data yang akan kita push ke newidentity
    id: biodata.length + 1,
    ...request.body,
  };
  biodata.push(newidentity);
  response.status(200).json(newidentity);
});
//put= update users
//jika ada, kasih request dataya
app.put("/biodata/:id", (request, response) => {
  const identity = biodata.find(
    (data) => data.id === parseInt(request.params.id)
  );
  if (identity) {
    identity.nama = request.body.nama;
    identity.umur = request.body.umur;
    response.json(identity);
  } else {
    response.status(404).json({
      pesan: "user tidak ditemukan",
    });
  }
})