// MENGAMBIL ELEMEN HTML
const form = document.getElementById("csnameform");

const inputNama = document.getElementById("nama");

const menuSelect = document.getElementById("menuSelect");

const addMenuBtn = document.getElementById("addMenuBtn");

const selectedMenuList = document.getElementById("selectedMenuList");

const selectedTotal = document.getElementById("selectedTotal");

const clearMenuBtn = document.getElementById("clearMenuBtn");

const orderList = document.getElementById("orderList");

const totalOrder = document.getElementById("totalOrder");


    //2. DATA ARRAY OF OBJECT
    const daftarMenu = [
    { id:1, nama:"Caffe Late", harga:25000 },
    { id:2, nama:"Cappucino", harga:28000 },
    { id:3, nama:"Americano", harga:20000 },
    { id:4, nama:"Matcha Latte", harga: 30000}
    ];

    let pesananSementara = [];
    let daftarOrder = [];

    // 3. FUNCTION FORMAT RUPIAH
    function formatRupiah(angka) {
        return "Rp" + angka.toLocaleString("id-ID");
    }

    function cariMenu(id){
        return daftarMenu.find(function(m){ 
            return m.id == id;
        });
    }

    // 4. FUNCTION PENYIMAPANAN DATA(LOCAL STORAGE)
    function simpanData(){
        try {
            localStorage.setItem("pesananSementara", JSON.stringify(pesananSementara));
            localStorage.setItem("daftarOrder", JSON.stringify(daftarOrder));
            } catch (e) {
            console.error("Gagal Menyimpan data:", e);
                        }
            }

    function muatData() {
        try {
            pesananSementara = JSON.parse(localStorage.getItem("pesananSementara")) || [];
            daftarOrder = JSON.parse(localStorage.getItem("daftarOrder")) || [];
            } catch (e) {
            pesananSementara = [];
            daftarOrder = [];

            console.eror("Gagal memuat data:", e);
            }
            }

    // 5. MENAMPILKAN PILIHAN MENU
    function tampilkanMenu() {
        daftarMenu.forEach(function (menu) {
            const option = document.createElement("option");
            option.value = menu.id;
            option.textContent = menu.nama + " - " + formatRupiah(menu.harga);
            menuSelect.appendChild(option);
        });
    }

    // 6. MENAMPILKAN DAFTAR PESANAN SEMENTARA
    function tampilkanPesananSementara() {
        selectedMenuList.innerHTML = "";
        let total = 0;

        if (pesananSementara.length === 0) {
            const kosong = document.createElement("li");
            kosong.textContent = "Belum ada menu yang dipilih.";
            selectedMenuList.appendChild(kosong);
        }

        pesananSementara.forEach(function (item) {
            const menu = cariMenu(item.id);
            const subtotal = menu.harga * item.jumlah;
            total += subtotal;

            const li = document.createElement("li");
            li.className = "selected-item";

            const teks = document.createElement("span");
            teks.textContent = menu.nama + " x" + item.jumlah + " - " + formatRupiah(subtotal);

            const tombolHapus = document.createElement("button");
            tombolHapus.type = "button";
            tombolHapus.className = "btn btn-sm btn-danger btn-delete";
            tombolHapus.textContent = "Delete";
            tombolHapus.dataset.id = item.id;

            li.appendChild(teks);
            li.appendChild(tombolHapus);
            selectedMenuList.appendChild(li);
        });

        selectedTotal.textContent = formatRupiah(total);
    }

    // 7. MENAMPILKAN SEMUA PESANAN DI ORDER LIST
    function tampilkanOrder() {
        orderList.innerHTML = "";

        daftarOrder.forEach(function (order, index) {
            const listItem = document.createElement("li");
            listItem.className = "col-md-6";

            const card = document.createElement("div");
            card.className = "order-card";

            // Header: icon + nama + nomor antrian
            const header = document.createElement("div");
            header.className = "order-header";

            const icon = document.createElement("i");
            icon.className = "bi bi-person-circle";

            const nameElement = document.createElement("span");
            nameElement.textContent = order.nama;

            const queueBadge = document.createElement("span");
            queueBadge.className = "queue-number";
            queueBadge.textContent = String(index + 1).padStart(3, "0");

        
            header.appendChild(icon);
            header.appendChild(nameElement);
            header.appendChild(queueBadge);

            // Daftar menu yang dipesan
            const itemList = document.createElement("ul");
            itemList.className = "order-items";
            order.items.forEach(function (item) {
                const li = document.createElement("li");
                li.textContent = item.nama + " x" + item.jumlah + " - " + formatRupiah(item.harga * item.jumlah);
                itemList.appendChild(li);
            });

            // Total harga
            const totalElement = document.createElement("p");
            totalElement.className = "order-total";
            totalElement.textContent = "Total: " + formatRupiah(order.total);

            // Tomnbol Hapus Order
            const tombolHapusOrder = document.createElement("button");
            tombolHapusOrder.type = "button";
            tombolHapusOrder.className = "btn btn-sm btn-outline-danger mt-3 btn-delete-order";
            tombolHapusOrder.textContent = "Hapus Order";
            tombolHapusOrder.dataset.index = index;

            card.appendChild(header);
            card.appendChild(itemList);
            card.appendChild(totalElement);
            card.appendChild(tombolHapusOrder);
            listItem.appendChild(card);
            orderList.appendChild(listItem);
        });

        totalOrder.textContent = daftarOrder.length;
    }

    // 8. TOMBOL TAMBAH
    addMenuBtn.addEventListener("click", function () {
        const menuId = Number(menuSelect.value);

        if (!menuId) {
            alert("Silakan pilih menu dulu!");
            return;
        }

        // Kalau menu sudah ada, tambah jumlahnya
        const sudahAda = pesananSementara.find(function (item) {
            return item.id === menuId;
        });

        if (sudahAda) {
            sudahAda.jumlah++;
        } else {
            pesananSementara.push({ id: menuId, jumlah: 1 });
        }

        menuSelect.value = "";
        tampilkanPesananSementara();
        simpanData();
    });

    // 9. TOMBOL DELETE 
    selectedMenuList.addEventListener("click", function (event) {
        const tombol = event.target.closest(".btn-delete");
        if (!tombol) return;

        const id = Number(tombol.dataset.id);
        pesananSementara = pesananSementara.filter(function (item) {
            return item.id !== id;
        });

        tampilkanPesananSementara();
        simpanData();
    });

    // 10. TOMBOL CLEAR ALL
    clearMenuBtn.addEventListener("click", function () {
        pesananSementara = [];
        tampilkanPesananSementara();
        simpanData();
    });

    // 10b. TOMBOL HAPUS PESANAN DI ORDER LIST
    orderList.addEventListener("click", function (event) {
        const tombol = event.target.closest(".btn-delete-order");
        if (!tombol) return;

        if (!confirm("Yakin ingin menghapus order ini?")) return;

        const index = Number(tombol.dataset.index);
        daftarOrder.splice(index, 1);
        
        tampilkanOrder();
        simpanData();
    });

    // 11. SUBMIT ORDER
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = inputNama.value.trim();

        if (nama === "") {
            alert("Nama harus diisi!");
            return;
        }

        if (pesananSementara.length === 0) {
            alert("Pilih minimal satu menu!");
            return;
        }

        // Susun data order
        let total = 0;
        const items = pesananSementara.map(function (item) {
            const menu = cariMenu(item.id);
            total += menu.harga * item.jumlah;
            return { nama: menu.nama, harga: menu.harga, jumlah: item.jumlah };
        });

        daftarOrder.push({
            nama: nama,
            items: items,
            total: total
        });

        pesananSementara = [];

        form.reset();
        tampilkanPesananSementara();
        tampilkanOrder();
        simpanData();
    });

// 12. JALANKAN SAAT HALAMAN DIBUKA
muatData();
tampilkanMenu();
tampilkanPesananSementara();
tampilkanOrder();
