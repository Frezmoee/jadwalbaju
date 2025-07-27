let nilaiAwalOlahraga = localStorage.getItem("hariOlahraga") || "senin";

function getToday() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return days[new Date().getDay()];
}

function getBesok() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return days[(new Date().getDay() + 1) % 7];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function enableZoom(selector) {
  const img = document.querySelector(selector);
  if (!img) return;
  img.addEventListener("click", () => {
    img.classList.toggle("zoomed");
  });
}

// Seragam
function setelSeragamHariIni() {
  const hari = getToday();
  const nama = document.getElementById("namaHari");
  const img = document.getElementById("seragamHariIni");

  if (hari === "sabtu" || hari === "minggu") {
    nama.innerText = "Hari ini libur";
    img.style.display = "none";
    document.getElementById("olahragaAuto").style.display = "none";
  } else {
    nama.innerText = "Hari: " + capitalize(hari);
    img.src = "images/" + hari + ".webp";
    img.alt = "Seragam Hari " + hari;
    img.style.display = "block";
    tampilkanOlahraga();
  }
}

function tampilkanSeragamBesok() {
  const hari = getBesok();
  const img = document.getElementById("seragamBesok");
  const teks = document.getElementById("namaBesokHari");
  const olahragaBesokSection = document.getElementById("olahraga-besok-section");
  const olahragaBesokHari = document.getElementById("olahragaBesokHari");
  const olahragaBesokImg = document.getElementById("olahragaBesokImg");
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";

  if (hari === "sabtu" || hari === "minggu") {
    teks.innerText = "Besok libur";
    img.style.display = "none";
    olahragaBesokSection.style.display = "none";
  } else {
    teks.innerText = "Hari: " + capitalize(hari);
    img.src = "images/" + hari + ".webp"; // Selalu seragam harian, tidak pernah olahraga
    img.alt = "Seragam Hari " + hari;
    img.style.display = "block";

    // Tampilkan card olahraga hanya jika besok hari olahraga
    if (hari === olahragaHari) {
      olahragaBesokSection.style.display = "block";
      olahragaBesokHari.innerText = "Hari: " + capitalize(hari);
      olahragaBesokImg.style.display = "block";
    } else {
      olahragaBesokSection.style.display = "none";
    }
  }
}

function tampilkanOlahraga() {
  const hari = getToday();
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const auto = document.getElementById("olahragaAuto");

  document.getElementById("olahragaDay").value = olahragaHari;

  if (hari === olahragaHari && hari !== "sabtu" && hari !== "minggu") {
    auto.style.display = "block";
  } else {
    auto.style.display = "none";
  }
}

function simpanOlahraga() {
  const selected = document.getElementById("olahragaDay").value;
  localStorage.setItem("hariOlahraga", selected);
  nilaiAwalOlahraga = selected;
  tampilkanOlahraga();
  tampilkanSeragamBesok();
}

function batalOlahraga() {
  localStorage.removeItem("hariOlahraga");
  nilaiAwalOlahraga = "senin";
  document.getElementById("olahragaDay").value = "senin";
  tampilkanOlahraga();
  tampilkanSeragamBesok();
}

// Jadwal Pelajaran
function tampilkanPelajaranHariIni() {
  const hari = getToday();
  const img = document.getElementById("jadwalPelajaranHariIni");
  const teks = document.getElementById("judulPelajaranHariIni");

  if (hari === "sabtu" || hari === "minggu") {
    teks.innerText = "Hari ini libur";
    img.style.display = "none";
  } else {
    teks.innerText = "Hari: " + capitalize(hari);
    img.src = "jadwalpelajaran/" + hari + ".webp";
    img.alt = "Jadwal Pelajaran " + hari;
    img.style.display = "block";
    enableZoom("#jadwalPelajaranHariIni");
  }
}

function tampilkanPelajaranBesok() {
  const hari = getBesok();
  const img = document.getElementById("jadwalPelajaranBesok");
  const teks = document.getElementById("judulPelajaranBesok");

  if (hari === "sabtu" || hari === "minggu") {
    teks.innerText = "Besok libur";
    img.style.display = "none";
  } else {
    teks.innerText = "Besok: " + capitalize(hari);
    img.src = "jadwalpelajaran/" + hari + ".webp";
    img.alt = "Jadwal Pelajaran " + hari;
    img.style.display = "block";
    enableZoom("#jadwalPelajaranBesok");
  }
}

// Panel dan Theme
function toggleMenu() {
  document.getElementById("menu-panel").classList.toggle("show");
  document.body.classList.toggle("panel-open");
}

function setTheme(mode) {
  document.body.classList.toggle("dark-mode", mode === "dark");
}

function loadTheme() {
  const mode = localStorage.getItem("themeMode") || "light";
  setTheme(mode);
  document.getElementById("toggle-theme").checked = (mode === "dark");
}

document.getElementById("toggle-theme").addEventListener("change", function () 
  {
  const mode = this.checked ? "dark" : "light";
  setTheme(mode);
  localStorage.setItem("themeMode", mode);
});

// Toggle Jadwal
document.getElementById("toggle-jadwal").addEventListener("change", function () {
  const label = document.getElementById("labelToggleJadwal");
  if (this.checked) {
    document.getElementById("halaman-seragam").style.display = "none";
    document.getElementById("halaman-jadwal").style.display = "block";
    tampilkanPelajaranHariIni();
    tampilkanPelajaranBesok();
    label.textContent = "Kembali ke Seragam";
    
  } else {
    document.getElementById("halaman-jadwal").style.display = "none";
    document.getElementById("halaman-seragam").style.display = "block";
    label.textContent = "Tampilkan Jadwal";
  }
  toggleMenu();
});


// Inisialisasi Saat Load
loadTheme();
setelSeragamHariIni();
tampilkanSeragamBesok();
tampilkanOlahraga();
