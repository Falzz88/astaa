let menu = [
  { nama: "Nasi Goreng", harga: 15000 },
  { nama: "Mie Ayam", harga: 12000 },
  { nama: "Bakso", harga: 13000 },
  { nama: "Es Teh", harga: 5000 },
  { nama: "Es Jeruk", harga: 7000 }
];

let qty = [0, 0, 0, 0, 0];

// 🔥 TAMPILKAN MENU
let menuContainer = document.getElementById("menu");

menu.forEach((item, i) => {
  menuContainer.innerHTML += `
    <div class="menu-item">
      <span>${item.nama} (Rp ${item.harga})</span>
      <div>
        <button onclick="kurang(${i})">-</button>
        <span id="qty-${i}">0</span>
        <button onclick="tambah(${i})">+</button>
      </div>
    </div>
  `;
});

// ➕ TAMBAH
function tambah(i) {
  qty[i]++;
  update(i);
}

// ➖ KURANG
function kurang(i) {
  if (qty[i] > 0) {
    qty[i]--;
    update(i);
  }
}

// 🔄 UPDATE
function update(i) {
  document.getElementById("qty-" + i).innerText = qty[i];
  hitung();
}

// 💰 HITUNG TOTAL
function hitung() {
  let total = 0;

  for (let i = 0; i < menu.length; i++) {
    total += menu[i].harga * qty[i];
  }

  let diskon = total >= 50000 ? total * 0.1 : 0;
  let akhir = total - diskon;

  document.getElementById("total").innerText = "Rp " + total;
  document.getElementById("diskon").innerText = "Rp " + diskon;
  document.getElementById("akhir").innerText = "Rp " + akhir;
}

// 💳 BAYAR + RIWAYAT
function bayar() {
  let uang = parseInt(document.getElementById("uang").value) || 0;

  let total = 0;
  for (let i = 0; i < menu.length; i++) {
    total += menu[i].harga * qty[i];
  }

  let diskon = total >= 50000 ? total * 0.1 : 0;
  let akhir = total - diskon;

  if (uang < akhir) {
    alert("Uang tidak cukup!");
    return;
  }

  let kembali = uang - akhir;
  document.getElementById("kembali").innerText = "Rp " + kembali;

  
  // 🔄 RESET
  qty = [0,0,0,0,0];
  document.querySelectorAll("[id^='qty-']").forEach(el => el.innerText = 0);
  document.getElementById("uang").value = "";

  hitung();
}