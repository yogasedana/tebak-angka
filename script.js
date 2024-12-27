let angkaRahasia = Math.floor(Math.random() * 100) + 1;
let percobaan = 0;
const MAX_PERCOBAAN = 10;
let skor = 100;
console.log(angkaRahasia);

function cekTebakan() {
    let tebakan = document.getElementById('tebakan').value;
    percobaan++;

    const petunjuk = ["Terlalu jauh", "Agak dekat", "Anda sangat dekat!", "Hampir tepat!", "Sudah sangat dekat!"];

    let selisih = hitungSelisih(tebakan, angkaRahasia);
    console.log("Selisih angka " + selisih);

    if (percobaan > MAX_PERCOBAAN) {
        document.getElementById('hasil').textContent = "Anda kehabisan percobaan! Angka rahasianya adalah: " + angkaRahasia;
        document.getElementById('tebakan').disabled = true;
        document.getElementById('cekTebakan').disabled = true;
    } else {
        if (tebakan == angkaRahasia) {
            document.getElementById('hasil').textContent = "Selamat! Anda benar dalam " + percobaan + " kali percobaan.";
            document.getElementById('tebakan').disabled = true;
            document.getElementById('cekTebakan').disabled = true;
            simpanSkor(skor);
            document.getElementById('skor').textContent = skor;
        } else {
            skor -= 10; // Kurangi skor jika salah
            skor = Math.max(skor, 0); // Pastikan skor tidak negatif
            if (selisih > 25) {
                document.getElementById('hasil').textContent = petunjuk[0];
            } else if (selisih <= 25 && selisih > 15) {
                document.getElementById('hasil').textContent = petunjuk[1];
            } else if (selisih <= 15 && selisih > 10) {
                document.getElementById('hasil').textContent = petunjuk[2];
            } else if (selisih <= 10 && selisih > 5) {
                document.getElementById('hasil').textContent = petunjuk[3];
            } else {
                document.getElementById('hasil').textContent = petunjuk[4];
            }
        }
    }
}

function hitungSelisih(tebakan, angkaRahasia) {
    return Math.abs(tebakan - angkaRahasia);
}

function simpanSkor(skor) {
    console.log(skor);
    localStorage.setItem('skorTerakhir', skor);
}

function tampilkanSkor() {
    const skorTerakhir = localStorage.getItem('skorTerakhir');
    const elemenSkor = document.getElementById('skor');

    if (skorTerakhir) {
        elemenSkor.textContent = skorTerakhir;
    } else {
        elemenSkor.textContent = "Anda belum pernah bermain.";
    }
}

function mulaiUlang() {
    angkaRahasia = Math.floor(Math.random() * 100) + 1;
    percobaan = 0;
    skor = 100;
    console.log("angka rahasia selanjutnya " + angkaRahasia);

    document.getElementById('tebakan').value = ""; // Kosongkan input tebakan
    document.getElementById('tebakan').disabled = false;
    document.getElementById('cekTebakan').disabled = false;

    if (confirm("Jika Anda Memulai Permainan Baru Maka Skor Akan DI Ulang")) {
    }
}