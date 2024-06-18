#!/bin/bash
e="echo -e "
# Warna Teks
	m="\033[1;31m"    # Merah (sudah diberikan)
	h="\033[1;32m"    # Hijau (sudah diberikan)
	k="\033[1;33m"    # Kuning (sudah diberikan)
	b="\033[1;34m"    # Biru (sudah diberikan)
	bl="\033[1;36m"   # Biru Muda (sudah diberikan)
	p="\033[1;37m"    # Putih (sudah diberikan)
	u="\033[1;35m"    # Ungu
	pu="\033[1;30m"   # Abu-abu
	c="\033[1;96m"    # Cyan Terang
# Warna Latar Belakang
	bg_m="\033[41m"   # Latar Belakang Merah
	bg_h="\033[42m"   # Latar Belakang Hijau
	bg_k="\033[43m"   # Latar Belakang Kuning
	bg_b="\033[44m"   # Latar Belakang Biru
	bg_bl="\033[46m"  # Latar Belakang Biru Muda
	bg_p="\033[47m"   # Latar Belakang Putih
	bg_u="\033[45m"   # Latar Belakang Ungu
	bg_pu="\033[40m"  # Latar Belakang Abu-abu

while true; do
             clear
             read -p "Anda Ingin Login Ke Nomor Baru Bot Atau Tidak ? Jawab ( ya/no ) : " gimana
             if [[ "$gimana" = "no" || "$gimana" = "n" ]]; then
             clear
             elif [[ "$gimana" = "ya" || "$gimana" = "y" ]]; then
             rm -rf /data/auth/
             rm -rf /data/store.json
             clear
             $e $h "Succes Bot Bisa Di Loginkan Ke Nomor Yang Baru !"
             sleep 5
             clear
             fi
file="node_modules"
if [ -d "$file" ]; then
while true; do
clear
play -q $HOME/TOOLSV5/sound/robot2.mp3 &>/dev/null
echo "BOT DI JALANKAN 24 JAM UNTUK BERHENTI CTRL+C "
echo "TUNGGU 10 DETIK "
sleep 10
play -q $HOME/TOOLSV5/sound/klik.mp3 &>/dev/null
npm start
done
else
clear
play -q $HOME/TOOLSV5/sound/salah.mp3 &>/dev/null
echo "Node_Modules Belum Terinstall"
sleep 5
clear
echo "Menginstall Node_Modules"
pkg update -y && pkg install -y git nodejs ffmpeg unzip
npm i
fi
done
