const daftarHari = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat"];
const gambarHari = {
  senin: "images/senin.png",
  selasa: "images/selasa.png",
  rabu: "images/rabu.png",
  kamis: "images/kamis.png",
  jumat: "images/jumat.png",
};

let hariOlahraga = "senin";

function kapital(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function updateOlahraga() {
  const select = document.getElementById("olahragaDay");
  hariOlahraga = select.value;
  tampilkanHariIni();
}

function tampilkanHariIni() {
  const now = new Date();
  const hariNama = daftarHari[now.getDay()];
  const namaHari = document.getElementById("namaHari");
  const gambar = document.getElementById("seragamHariIni");
  const olahraga = document.getElementById("olahragaAuto");

  if (gambarHari[hariNama]) {
    namaHari.innerText = `Hari ${kapital(hariNama)}`;
    gambar.src = gambarHari[hariNama];

    if (hariNama === hariOlahraga) {
      olahraga.style.display = "block";
    } else {
      olahraga.style.display = "none";
    }
  } else {
    namaHari.innerText = "Hari ini libur!";
    gambar.src = "";
    olahraga.style.display = "none";
  }
}

window.onload = tampilkanHariIni;
