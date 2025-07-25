let nilaiAwalOlahraga = localStorage.getItem("hariOlahraga") || "senin";

function enableZoom(selector) {
  const img = document.querySelector(selector);
  if (!img) return;

  img.addEventListener("click", () => {
    img.classList.toggle("zoomed");
  });
}

function getToday() {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return days[new Date().getDay()];
}

function getBesok() {
  const days = ['minggu', "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  const besokIndex = (new Date().getDay() + 1) % 7;
  return days[besokIndex];
}

function tampilkanSeragamBesok() {
  const hariBesok = getBesok();
  const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
  const imgBesok = document.getElementById("seragamBesok");
  const teksHariBesok = document.getElementById("namaBesokHari");

  if (hariBesok === "sabtu" || hariBesok === "minggu") {
    teksHariBesok.innerText = "Besok libur";
    imgBesok.style.display = "none";
  } else {
    teksHariBesok.innerText = "Hari: " + hariBesok.charAt(0).toUpperCase() + hariBesok.slice(1);

    if (hariBesok === olahragaHari) {
      imgBesok.src = "images/olahraga.webp";
      imgBesok.alt = "Baju Olahraga (Besok)";
    } else {
      imgBesok.src = "images/" + hariBesok + ".webp";
      imgBesok.alt = "Seragam Hari " + hariBesok;
    }

    imgBesok.style.display = "block";
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

  // Hari libur? Jangan tampilkan
  if (hariIni === "sabtu" || hariIni === "minggu") {
    display.style.display = "none";
    return;
  }

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
  const namaHari = document.getElementById("namaHari");
  const seragamImg = document.getElementById("seragamHariIni");
  const displayOlahraga = document.getElementById("olahragaAuto");

  if (hariIni === "sabtu" || hariIni === "minggu") {
    namaHari.innerText = "Hari ini libur";
    seragamImg.style.display = "none";
    displayOlahraga.style.display = "none";
  } else {
    namaHari.innerText = "Hari: " + hariIni.charAt(0).toUpperCase() + hariIni.slice(1);
    seragamImg.src = "images/" + hariIni + ".webp";
    seragamImg.alt = "Seragam hari " + hariIni;
    seragamImg.style.display = "block";
    tampilkanOlahraga(); // jalankan ulang pemeriksaan baju olahraga
  }
}

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
  const hari = getBesok();
  const img = document.getElementById("jadwalPelajaranBesok");
  const p = document.getElementById("judulPelajaranBesok");
  
  if (hari === "sabtu" || hari === "minggu") {
    p.innerText = "Besok libur";
    img.style.display = "none";
  } else {
    p.innerText = "Besok: " + capitalize(hari);
    img.src = "jadwalpelajaran/" + hari + ".webp";
    img.alt = "Jadwal Pelajaran " + hari;
    img.style.display = "block";
    enableZoom("#jadwalPelajaranBesok");
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setTheme(mode) {
  document.body.classList.toggle("dark-mode", mode === "dark");
}

function toggleMenu() {
  const panel = document.getElementById("menu-panel");
  const body = document.body;
  panel.classList.toggle("show");
  body.classList.toggle("panel-open");
}

const toggle = document.getElementById("toggle-theme");
const label = document.getElementById("toggle-label");

toggle.addEventListener("change", () => {
  const mode = toggle.checked ? "dark" : "light";
  setTheme(mode);
  localStorage.setItem("themeMode", mode);
  label.textContent = mode === "dark" ? "Dark Mode" : "Light Mode";


// Fungsi toggle halaman berdasarkan switch
document.getElementById("toggle-jadwal").addEventListener("change", function () {
  const checked = this.checked;
  if (checked) {
    tampilkanHalamanJadwal();
    document.getElementById("labelToggleJadwal").innerText = "Kembali ke Seragam";
  } else {
    kembaliKeHalamanSeragam();
    document.getElementById("labelToggleJadwal").innerText = "Jadwal Pelajaran";
  }
});

function loadTheme() {
  const mode = localStorage.getItem("themeMode") || "light";
  setTheme(mode);
  if (mode === "dark") {
    toggle.checked = true;
    label.textContent = "Dark Mode";
  } else {
    toggle.checked = false;
    label.textContent = "Light Mode";
  }
}

function tampilkanHalamanJadwal() {
  document.getElementById("halaman-seragam").style.display = "none";
  document.getElementById("halaman-jadwal").style.display = "block";
  tampilkanPelajaranHariIni();
  tampilkanPelajaranBesok();
  toggleMenu(); // tutup panel
}

function kembaliKeHalamanSeragam() {
  document.getElementById("halaman-jadwal").style.display = "none";
  document.getElementById("halaman-seragam").style.display = "block";
}

// Pastikan dipanggil saat load
loadTheme();
setelSeragamHariIni();
tampilkanOlahraga();
tampilkanSeragamBesok();
