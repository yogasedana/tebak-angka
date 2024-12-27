let angkaRahasia = Math.floor(Math.random() * 100) + 1;
let percobaan = 0;
const MAX_PERCOBAAN = 10;
let skor = 100;
console.log(angkaRahasia);

function cekTebakan() {
    let tebakan = document.getElementById('tebakan').value;
    percobaan++;

    const petunjuk = ["Terlalu jauh", "Agak dekat", "Anda sangat dekat!", "Hampir tepat!", "Sudah sangat dekat!"];
    const batasSelisih = [25, 15, 10, 5, 1];

    let selisih = hitungSelisih(tebakan, angkaRahasia);
    console.log("Selisih angka " + selisih);

    if (percobaan > MAX_PERCOBAAN) {
        document.getElementById('hasil').textContent = `Anda kehabisan percobaan! Angka rahasianya adalah: ${angkaRahasia}`;
        document.getElementById('tebakan').disabled = true;
        document.getElementById('cekTebakan').disabled = true;
    } else {
        if (tebakan == angkaRahasia) {
            document.getElementById('hasil').textContent = `Selamat! Anda benar dalam ${percobaan} kali percobaan.`;
            document.getElementById('tebakan').disabled = true;
            document.getElementById('cekTebakan').disabled = true;
            simpanSkor(skor);
            document.getElementById('skor').textContent = skor;
        } else {
            skor -= 10; 
            skor = Math.max(skor, 0); 

            let indeksPetunjuk = batasSelisih.findIndex(batas => selisih > batas);

            if (indeksPetunjuk === -1) {
                indeksPetunjuk = petunjuk.length - 1; 
            }

            document.getElementById('hasil').textContent = petunjuk[indeksPetunjuk];
        }
    }
}

function hitungSelisih(tebakan, angkaRahasia) {
    return Math.abs(tebakan - angkaRahasia);
}

function simpanSkor(skor) {
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
    if (confirm("Apakah Anda yakin ingin memulai permainan baru? Skor Anda saat ini akan hilang!!!")) {
        angkaRahasia = Math.floor(Math.random() * 100) + 1;
        percobaan = 0;
        skor = 100;
        console.log("angka rahasia selanjutnya " + angkaRahasia);
    
        document.getElementById('tebakan').value = "";
        document.getElementById('tebakan').disabled = false;
        document.getElementById('cekTebakan').disabled = false;
    }
}