let nilaiAwalOlahraga = localStorage.getItem("hariOlahraga") || "senin";

function getToday() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat'];
  return days[new Date().getDay()];
}

function simpanOlahraga() {
  const selected = document.getElementById("olahragaDay").value;
  localStorage.setItem("hariOlahraga", selected);
  nilaiAwalOlahraga = selected;
  tampilkanOlahraga(); // pastikan diperiksa ulang
}

function tampilkanOlahraga() {
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const hariIni = getToday();
  const display = document.getElementById("olahragaAuto");

  // Set dropdown ke nilai yang disimpan
  document.getElementById("olahragaDay").value = olahragaHari;

  // Render ulang baju olahraga jika sesuai
  display.style.display = "none"; // sembunyikan dulu
  setTimeout(() => {
    if (hariIni === olahragaHari) {
      display.style.display = "block"; // tampilkan ulang
    }
  }, 10);
}

function setelSeragamHariIni() {
  const hariIni = getToday();
  document.getElementById("namaHari").innerText = "Hari: " + hariIni.charAt(0).toUpperCase() + hariIni.slice(1);
  document.getElementById("seragamHariIni").src = "images/" + hariIni + ".png";
}

// Inisialisasi saat load
setelSeragamHariIni();
tampilkanOlahraga();
