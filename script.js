//1. MENGAMBIL ELEMEN HTML

const form = document.getElementById("csnameform");

const inputNama = document.getElementById("nama");

const inputPesan = document.getElementById("pesan");

const messageList = document.getElementById("orderList");

//2. NOMOR ANTRIAN PERTAMA
let nomorAntrian = 1;

//3. MENANGKAP EVENT SUBMIT
form.addEventListener("submit", function(event) {

    // Mencegah halaman refresh
    event.preventDefault();


    //4. MENGAMBIL VALUE INPUT

    const nama = inputNama.value.trim();

    const pesan = inputPesan.value.trim();

     // MENGAMBIL ELEMEN TOTAL ORDER
    const totalOrder = document.getElementById("totalOrder");

    // MENGAMBIL AREA LIST ORDER
    const orderList = document.getElementById("orderList");

    //5. VALIDASI INPUT

    if (nama === "" || pesan === "") {
        alert("Nama dan pesan harus diisi!");
        return;
    }


    // 6. MEMBUAT ELEMEN HTML BARU
    const listItem = document.createElement("li");

    listItem.className = "col-md-6";


    // 7. MEMBUAT KARTU ORDER

    const card = document.createElement("div");

    card.className = "order-card";


    //8. MEMBUAT HEADER NAMA
    const header = document.createElement("div");

    header.className = "order-header";


    // MEMBUAT ICON
    const icon = document.createElement("i");

    icon.className = "bi bi-person-circle";


    // MEMBUAT NAMA
    const nameElement = document.createElement("span");

    nameElement.textContent = nama;

    // MEMASUKKAN ICON DAN NAMA
    header.appendChild(icon);

    header.appendChild(nameElement);


    // 8. MEMBUAT ISI PESAN
    const orderElement = document.createElement("p");

    orderElement.className = "order-text";

    orderElement.textContent = pesan;

   
    //9. MEMBUAT NOMOR ANTRIAN
    const nomor = String(nomorAntrian).padStart(3, "0");

    // MEMBUAT BADGE NOMOR ANTRIAN
    const queueBadge = document.createElement("span");

    queueBadge.className = "queue-number";

    queueBadge.textContent = nomor;

    // MEMASUKAN NOMOR ANTRIAN KE HEADER KARTU
    header.appendChild(queueBadge);

    //10. MENYUSUN KARTU ORDER
    card.appendChild(header);

    card.appendChild(orderElement);

    listItem.appendChild(card);

    //11. MENAMPILKAN PESAN KE HALAMAN
    messageList.appendChild(listItem);

    //12.UPDATE TOTAL PESANAN
    totalOrder.textContent = orderList.children.length;

    //13. MENAMBAH NOMOR ANTRIAN
    nomorAntrian++;

    //14. MENGOSONGKAN FORM

    form.reset();

});
