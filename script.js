let angkaRahasia = Math.floor(Math.random() * 100) + 1;
let percobaan = 0;
const MAX_PERCOBAAN = 10;
let skor = 100;
let waktuSisa = 60;
let intervalId;
let permainanBerjalan = false;
let permainanDimulai = false;
console.log(angkaRahasia);

document.getElementById('tebakan').disabled = true;
document.getElementById('cekTebakan').disabled = true;
document.getElementById('mulaiUlang').disabled = true;

function mulaiPermainan() {
    if (!permainanDimulai) {
        if (!permainanBerjalan) {
            permainanBerjalan = true;
            document.getElementById('mulai').disabled = true;
            mulaiTimer();
        }
        permainanDimulai = true;
        document.getElementById('tebakan').disabled = false;
        document.getElementById('cekTebakan').disabled = false;
        document.getElementById('mulaiUlang').disabled = true;
    }
}

function mulaiTimer() {
    intervalId = setInterval(() => {
    waktuSisa--;
    document.getElementById('waktu').textContent = `Waktu tersisa: ${waktuSisa} detik`;

        if (waktuSisa === 0) {
            clearInterval(intervalId);
            document.getElementById('tebakan').disabled = true;
            document.getElementById('cekTebakan').disabled = true;
            document.getElementById('hasil').textContent = "Waktu habis!";
            permainanBerjalan = false;
        }
    }, 1000);
}

function cekTebakan() {
    if (!permainanDimulai) {
        alert("Permainan belum dimulai!");
        return;
    }

    let tebakan = document.getElementById('tebakan').value;
    percobaan++;

    if (!/^\d+$/.test(tebakan)) {
        alert("Masukkan angka saja, tanpa huruf atau karakter khusus!");
        document.getElementById('tebakan').focus();
        return;
    }

    if (tebakan < 1 || tebakan > 100) {
        alert("Masukkan angka antara 1 dan 100.");
        document.getElementById('tebakan').focus();
        return;
    }

    const petunjuk = ["Terlalu jauh", "Agak dekat", "Anda sangat dekat!", "Hampir tepat!", "Sudah sangat dekat!"];
    const batasSelisih = [25, 15, 10, 5, 1];

    let selisih = hitungSelisih(tebakan, angkaRahasia);
    console.log("Selisih angka " + selisih);

    if (waktuSisa > 0) {
        // ...
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
                clearInterval(intervalId);
                permainanBerjalan = false;
                document.getElementById('mulaiUlang').disabled = false;
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
}

document.getElementById('mulai').addEventListener('click', mulaiPermainan);

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
    if (!permainanDimulai) {
        alert("Permainan belum dimulai!");
        return;
    } 

    if (confirm("Apakah Anda yakin ingin memulai permainan baru? Skor Anda saat ini akan hilang!!!")) {
        angkaRahasia = Math.floor(Math.random() * 100) + 1;
        percobaan = 0;
        skor = 100;

        waktuSisa = 60;
        clearInterval(intervalId);
        permainanBerjalan = false;
        permainanDimulai = false;
        
        console.log("angka rahasia selanjutnya " + angkaRahasia);
    
        document.getElementById('tebakan').value = "";
        document.getElementById('mulai').disabled = false;
        document.getElementById('waktu').textContent = 'Waktu tersisa: 0 detik';
        document.getElementById('tebakan').disabled = true;
        document.getElementById('cekTebakan').disabled = true;
        document.getElementById('mulaiUlang').disabled = true;
    }

}