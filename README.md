Program berbasis shell script untuk mengemas proyek Node.js ke dalam sebuah berkas executable dalam satu kali perintah, yang dapat dijalankan bahkan pada perangkat yang tidak memiliki runtime Node.js terpasang.

**Dibuat untuk memenuhi tugas UTS matakuliah Kapita Selekta Informatika**
- Nama : Fanesa Hadi Pramana
- NIM : 120140189
- Dosen Pengampu: Ilham Firman Ashari, S.Kom., M.T

## Fungsionalitas 

- Mempercepat distribusi dan instalasi di sisi pengguna.
- Membuat versi komersial dari aplikasi Anda tanpa sumber kode.
- Secara instan membuat berkas eksekusi untuk platform lain (cross-compilation).
- Tidak perlu menginstal Node.js dan npm untuk menjalankan aplikasi yang dikemas.
- Tidak perlu mengunduh ratusan berkas melalui npm install untuk mendeploy aplikasi.

## Persiapan
Program shell script memerlukan dua library tambahan untuk menjalankan fungsinya:

```sh
npm install -g pkg
```
```sh
npm install -g vercel/ncc
```

## Penggunaan
Masukan file `builder.sh` ke dalam root proyek Node.js anda. Setelah itu lakukan konfigurasi sesuai dengan kebutuhan proyek. Lalu jalankan perintah di bawah ini untuk memulai proses kompilasi:

```sh
bash builder.sh
```

**Perintah tersebut hanya dapat dijalankan pada kernel linux. Jika anda menggunakan sistem operasi Windows, anda dapat menggunakan kernel linux pada `git bash` ataupun `Windwos System for Linux (WSL)`.**

## Konfigurasi

Konfigurasi aplikasi:

- **VERSION** Versi aplikasi yang akan direlease.
- **SCRIPTS** Lokasi script utama proyek yang dikembangkan. Anda dapat menambahkannya lebih dari satu.
- **ASSETS** Lokasi directory data publik.

Konfigurasi builder:

- **TARGET_NODE_RANGE** Target versi Node.js runtime yang ingin digunakan. Opsi yang dapat dipilih yaitu node8, node10, node12, node14, node16, atau [node18].
- **TARGET_PLATFORMS** Target sistem operasi. Sistem operasi yang didukung yaitu alpine, linux, linuxstatic, win, dan macos
- **TARGET_ARCH** Arsitektur prosesor. Opsi yang dapat digunakan arm64 atau [x64].
- **OUTPUT_PATH** Lokasi output dari binary file.
