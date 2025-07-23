function getToday() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat'];
  const today = new Date().getDay();
  return days[today];
}

function updateOlahraga() {
  const selected = document.getElementById("olahragaDay").value;
  localStorage.setItem("hariOlahraga", selected); // Simpan ke localStorage
  tampilkanOlahragaJikaPerlu();
}

function tampilkanOlahragaJikaPerlu() {
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const hariIni = getToday();
  const display = document.getElementById("olahragaAuto");

  if (hariIni === olahragaHari) {
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }

  // Tampilkan juga di select
  const select = document.getElementById("olahragaDay");
  if (select.value !== olahragaHari) {
    select.value = olahragaHari;
  }
}

// Setel gambar seragam hari ini
function setelSeragamHariIni() {
  const hariIni = getToday();
  document.getElementById("namaHari").innerText = "Hari: " + hariIni.charAt(0).toUpperCase() + hariIni.slice(1);
  document.getElementById("seragamHariIni").src = "images/" + hariIni + ".png";
}

setelSeragamHariIni();
tampilkanOlahragaJikaPerlu();
