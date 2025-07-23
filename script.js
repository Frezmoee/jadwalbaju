function updateOlahraga() {
  const select = document.getElementById("olahragaDay");
  const selectedDay = select.value;
  const text = document.getElementById("olahragaText");
  text.innerText = `Dipakai pada: ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}`;
}
