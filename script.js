// Fungsi untuk kapital huruf pertama
function kapital(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Hari dan gambar seragam
const daftarHari = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
const gambarHari = {
  senin: "images/senin.png",
  selasa: "images/selasa.png",
  rabu: "images/rabu.png",
  kamis: "images/kamis.png",
  jumat: "images/jumat.png",
};

let hariOlahraga = "senin"; // default awal

// Fungsi menampilkan seragam hari ini
function tampilkanSeragamHariIni() {
  const now = new Date();
  const hari = now.getDay();
  const hariNama = daftarHari[hari];
  const gambar = document.getElementById("seragamHariIni");
  const teks = document.getElementById("namaHari");
  const olahraga = document.getElementById("olahragaAuto");

  if (gambarHari[hariNama]) {
    gambar.src = gambarHari[hariNama];
    teks.innerText = `Hari ini: ${kapital(hariNama)}`;

    if (hariNama === hariOlahraga) {
      olahraga.style.display = "block";
    } else {
      olahraga.style.display = "none";
    }
  } else {
    gambar.alt = "Hari libur";
    teks.innerText = "Hari ini libur (tidak ada seragam)";
    olahraga.style.display = "none";
  }
}

// Fungsi saat user memilih hari olahraga
function updateOlahraga() {
  const select = document.getElementById("olahragaDay");
  hariOlahraga = select.value;
  const text = document.getElementById("olahragaText");
  text.innerText = `Dipakai pada: ${kapital(hariOlahraga)}`;
  tampilkanSeragamHariIni(); // periksa ulang apakah hari ini adalah hari olahraga
}

// Saat halaman selesai dimuat
window.onload = function () {
  tampilkanSeragamHariIni();
};
