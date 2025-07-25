document.addEventListener("DOMContentLoaded", () => {
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
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    return days[(new Date().getDay() + 1) % 7];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
      teksHariBesok.innerText = "Hari: " + capitalize(hariBesok);
      imgBesok.src = hariBesok === olahragaHari ? "images/olahraga.webp" : `images/${hariBesok}.webp`;
      imgBesok.alt = hariBesok === olahragaHari ? "Baju Olahraga (Besok)" : `Seragam Hari ${hariBesok}`;
      imgBesok.style.display = "block";
    }
  }

  function tampilkanOlahraga() {
    const olahragaHari = localStorage.getItem("hariOlahraga") || "senin";
    const hariIni = getToday();
    const display = document.getElementById("olahragaAuto");

    document.getElementById("olahragaDay").value = olahragaHari;

    if (hariIni === "sabtu" || hariIni === "minggu") {
      display.style.display = "none";
      return;
    }

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
      namaHari.innerText = "Hari: " + capitalize(hariIni);
      seragamImg.src = `images/${hariIni}.webp`;
      seragamImg.alt = `Seragam hari ${hariIni}`;
      seragamImg.style.display = "block";
      tampilkanOlahraga();
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
      img.src = `jadwalpelajaran/${hari}.webp`;
      img.alt = `Jadwal Pelajaran ${hari}`;
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
      img.src = `jadwalpelajaran/${hari}.webp`;
      img.alt = `Jadwal Pelajaran ${hari}`;
      img.style.display = "block";
      enableZoom("#jadwalPelajaranBesok");
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
    nilaiAwalOlahraga = "senin";
    document.getElementById("olahragaDay").value = "senin";
    tampilkanOlahraga();
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

  function loadTheme() {
    const toggle = document.getElementById("toggle-theme");
    const label = document.getElementById("toggle-label");
    const mode = localStorage.getItem("themeMode") || "light";
    setTheme(mode);
    toggle.checked = mode === "dark";
    label.textContent = mode === "dark" ? "Dark Mode" : "Light Mode";
  }

  function tampilkanHalamanJadwal() {
    document.getElementById("halaman-seragam").style.display = "none";
    document.getElementById("halaman-jadwal").style.display = "block";
    tampilkanPelajaranHariIni();
    tampilkanPelajaranBesok();
  }

  function kembaliKeHalamanSeragam() {
    document.getElementById("halaman-jadwal").style.display = "none";
    document.getElementById("halaman-seragam").style.display = "block";
  }

  // Event handler toggle dark mode
  document.getElementById("toggle-theme").addEventListener("change", function () {
  const mode = this.checked ? "dark" : "light";
  setTheme(mode);
  localStorage.setItem("themeMode", mode);
  document.getElementById("toggle-label").textContent = mode === "dark" ? "Dark Mode" : "Light Mode";
});

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

  // Jalankan saat halaman dimuat
  loadTheme();
  setelSeragamHariIni();
  tampilkanSeragamBesok();
  tampilkanOlahraga();

  // Tombol simpan & batal olahraga
  window.simpanOlahraga = simpanOlahraga;
  window.batalOlahraga = batalOlahraga;
  window.toggleMenu = toggleMenu;
});
