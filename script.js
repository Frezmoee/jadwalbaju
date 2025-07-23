let nilaiAwalOlahraga = localStorage.getItem("hariOlahraga") || "senin";

function getToday() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat'];
  return days[new Date().getDay()];
}

function simpanOlahraga() {
  const selected = document.getElementById("olahragaDay").value;
  localStorage.setItem("hariOlahraga", selected);
  nilaiAwalOlahraga = selected; // update nilai awal ke yang baru disimpan
  tampilkanOlahraga();
}

function batalOlahraga() {
  document.getElementById("olahragaDay").value = nilaiAwalOlahraga;
}

function tampilkanOlahraga() {
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const hariIni = getToday();
  const display = document.getElementById("olahragaAuto");

  if (hariIni === olahragaHari) {
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }

  // set dropdown ke nilai yang disimpan
  document.getElementById("olahragaDay").value = olahragaHari;
}

function setelSeragamHariIni() {
  const hariIni = getToday();
  document.getElementById("namaHari").innerText = "Hari: " + hariIni.charAt(0).toUpperCase() + hariIni.slice(1);
  document.getElementById("seragamHariIni").src = "images/" + hariIni + ".png";
}

// Inisialisasi saat load
setelSeragamHariIni();
tampilkanOlahraga();
