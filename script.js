// ====== Initialization ======
let nilaiAwalOlahraga = localStorage.getItem("hariOlahraga") || "senin";

// ====== Utility Functions ======
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function enableZoom(selector) {
  const img = document.querySelector(selector);
  if (!img) return;
  img.addEventListener("click", () => img.classList.toggle("zoomed"));
}

// ====== Tanggal Hari Ini & Besok ======
function getToday() {
  return ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'][new Date().getDay()];
}

function getBesok() {
  return ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'][(new Date().getDay()+1)%7];
}

// ====== Seragam & Olahraga ======
function tampilkanSeragamBesok() { /* ...implementasi yang sudah kamu punya...*/ }
function simpanOlahraga() { /* tetap sama */ }
function batalOlahraga() { /* tetap sama */ }
function tampilkanOlahraga() { /* sesuai logika libur */ }

function setelSeragamHariIni() {
  const hariIni = getToday();
  const nama = document.getElementById("namaHari");
  const img = document.getElementById("seragamHariIni");
  const olahraga = document.getElementById("olahragaAuto");

  if (hariIni === "sabtu" || hariIni === "minggu") {
    nama.innerText = "Hari ini libur";
    img.style.display = "none";
    olahraga.style.display = "none";
  } else {
    nama.innerText = "Hari: " + capitalize(hariIni);
    img.src = "images/" + hariIni + ".webp";
    img.alt = "Seragam hari " + hariIni;
    img.style.display = "block";
    tampilkanOlahraga();
  }
}

// ====== Jadwal Pelajaran Hari Ini & Besok ======
function tampilkanPelajaranHariIni() {
  const hari = getToday();
  const img = document.getElementById("jadwalPelajaranHariIni");
  const p = document.getElementById("judulPelajaranHariIni");
  if (hari === "sabtu" || hari === "minggu") {
    p.innerText = "Hari ini libur";
    img.style.display = "none";
  } else {
    p.innerText = "Hari: " + capitalize(hari);
    img.src = "jadwalpelajaran/" + hari + ".webp";
    img.alt = "Jadwal Pelajaran " + hari;
    img.style.display = "block";
    enableZoom("#jadwalPelajaranHariIni");
  }
}

function tampilkanPelajaranBesok() {
  const besok = getBesok();
  const img = document.getElementById("jadwalPelajaranBesok");
  const p = document.getElementById("judulPelajaranBesok");
  if (besok === "sabtu" || besok === "minggu") {
    p.innerText = "Besok libur";
    img.style.display = "none";
  } else {
    p.innerText = "Besok: " + capitalize(besok);
    img.src = "jadwalpelajaran/" + besok + ".webp";
    img.alt = "Jadwal Pelajaran " + besok;
    img.style.display = "block";
    enableZoom("#jadwalPelajaranBesok");
  }
}

// ====== Navigasi Panel ======
function toggleMenu() {
  document.body.classList.toggle("panel-open");
  document.getElementById("menu-panel").classList.toggle("show");
}

function tampilkanHalamanJadwal() {
  document.getElementById("halaman-seragam").style.display = "none";
  document.getElementById("halaman-jadwal").style.display = "block";
  tampilkanPelajaranHariIni();
  tampilkanPelajaranBesok();
  toggleMenu();
}

function kembaliKeHalamanSeragam() {
  document.getElementById("halaman-jadwal").style.display = "none";
  document.getElementById("halaman-seragam").style.display = "block";
}

// ====== Toggle Theme & Toggle Jadwal ======
const toggleTheme = document.getElementById("toggle-theme");
const labelTheme = document.getElementById("toggle-label");
toggleTheme.addEventListener("change", () => {
  const mode = toggleTheme.checked ? "dark" : "light";
  setTheme(mode);
  localStorage.setItem("themeMode", mode);
  labelTheme.textContent = mode === "dark" ? "Dark Mode" : "Light Mode";
});

const toggleJadwal = document.getElementById("toggle-jadwal");
const labelJadwal = document.getElementById("labelToggleJadwal");
toggleJadwal.addEventListener("change", () => {
  if (toggleJadwal.checked) {
    tampilkanHalamanJadwal();
    labelJadwal.textContent = "Kembali ke Seragam";
  } else {
    kembaliKeHalamanSeragam();
    labelJadwal.textContent = "Jadwal Pelajaran";
  }
});

// ====== Theme Loader ======
function setTheme(mode) {
  document.body.classList.toggle("dark-mode", mode === "dark");
}

function loadTheme() {
  const mode = localStorage.getItem("themeMode") || "light";
  setTheme(mode);
  toggleTheme.checked = (mode === "dark");
  labelTheme.textContent = mode === "dark" ? "Dark Mode" : "Light Mode";
}

// ====== Inisialisasi Saat Load ======
loadTheme();
setelSeragamHariIni();
tampilkanOlahraga();
tampilkanSeragamBesok();

// Halaman jadwal hanya ditampilkan saat di-toggle
