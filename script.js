let nilaiAwalOlahraga = localStorage.getItem("hariOlahraga") || "senin";

function getToday() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return days[new Date().getDay()];
}

function getBesok() {
  const days = ['minggu', "senin", "selasa", "rabu", "kamis", "jum'at", "sabtu"];
  const besokIndex = (new Date().getDay() + 1) % 7;
  return days[besokIndex];
}

function tampilkanSeragamBesok() {
  const hariBesok = getBesok();
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const imgBesok = document.getElementById("seragamBesok");
  const teksHariBesok = document.getElementById("namaHariBesok");

  teksHariBesok.innerText = "Hari: " + hariBesok.charAt(0).toUpperCase() + hariBesok.slice(1);

  if (hariBesok === olahragaHari) {
    imgBesok.src = "images/olahraga.webp";
    imgBesok.alt = "Baju Olahraga (Besok)";
  } else {
    imgBesok.src = "images/" + hariBesok + ".webp";
    imgBesok.alt = "Seragam Hari " + hariBesok;
  }
}

function simpanOlahraga() {
  const selected = document.getElementById("olahragaDay").value;
  localStorage.setItem("hariOlahraga", selected);
  nilaiAwalOlahraga = selected;
  tampilkanOlahraga();
}

function batalOlahraga() {
  localStorage.removeItem("hariOlahraga");
  nilaiAwalOlahraga = "senin"; // atau kosongkan jika ingin tidak tampil sama sekali
  document.getElementById("olahragaDay").value = "senin";
  tampilkanOlahraga();
}

function tampilkanOlahraga() {
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const hariIni = getToday();
  const display = document.getElementById("olahragaAuto");

  // Set dropdown ke nilai yang disimpan
  document.getElementById("olahragaDay").value = olahragaHari;

  // Render ulang baju olahraga jika sesuai
  display.style.display = "none";
  setTimeout(() => {
    if (hariIni === olahragaHari) {
      display.style.display = "block";
    }
  }, 10);
}

function setelSeragamHariIni() {
  const hariIni = getToday();
  document.getElementById("namaHari").innerText = "Hari: " + hariIni.charAt(0).toUpperCase() + hariIni.slice(1);
  document.getElementById("seragamHariIni").src = "images/" + hariIni + ".webp";
  document.getElementById("seragamHariIni").alt = "Seragam hari " + hariIni;
}

// Inisialisasi saat halaman dimuat
setelSeragamHariIni();
tampilkanOlahraga();
tampilkanSeragamBesok();
