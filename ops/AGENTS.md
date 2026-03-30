# AGENTS.md

## OPS ANA ILKE
Bu klasordeki raporlar ve kanit dosyalari sus olsun diye degil, dogrulama icin vardir.
Kanit olmayan iddia gecerli kabul edilmez.
Codex bu repo disindaki sohbetleri bilmez; bu yuzden her rapor kendi basina anlasilir olmalidir.

## PR INCELEME KURALI
Bir PR degerlendiriliyorsa su dort alan eksiksiz incelenir:
- Conversation
- Commits
- Checks
- Files changed

## 20 MADDELIK DEGERLENDIRME STANDARDI
Her PR icin su 20 madde puanlanir:
1. amac net mi
2. kapsam acik mi
3. kapsam disi yazilmis mi
4. girdi ve cikti tanimli mi
5. beklenen davranis olculebilir mi
6. hata ve fallback tanimli mi
7. ortam ve bagimliliklar yazilmis mi
8. veri kaynagi net mi
9. dosya yollari acik mi
10. patch yaklasimi net mi
11. is sirasi net mi
12. kabul kriteri ve test acik mi
13. log ve debug beklentisi var mi
14. varsayim azaltildi mi
15. belirsiz dil kullanilmamis mi
16. karar serbestisi sinirlanmis mi
17. cikti formati tanimli mi
18. dogrulama ve kanit istenmis mi
19. guvenlik ve gizlilik dusunulmus mu
20. dokumantasyon ve surdurulebilirlik korunmus mu

Her madde icin su uc siniftan biri secilir:
- Yapilmis
- Kismen yapilmis
- Hic yapilmamis

## ZORUNLU CIKTI BASLIKLARI
PR raporu su basliklarla doner:
A) Toplam puan
B) 20 maddelik tek tek uyum tablosu
C) Eksik yapilanlar
D) Hic yapilmamis olanlar
E) Dosya / satir / fonksiyon bazli sorun haritasi
F) Checks analizi
G) Conversation-commit uyumsuzluklari
H) Guclu taraflar
I) Codex'e verilecek nihai talimat

## PLATFORM-SIDE DOGRULAMA
Preview duzeldi demeden once Netlify bot yorumundan sunlar kontrol edilir:
- Latest deploy log
- Deploy Preview
- Latest commit

### Deploy log icin zorunlu basliklar
- build error
- warning
- missing env
- redirect problemi
- function routing problemi
- dependency/install problemi
- publish path problemi

### Deploy Preview icin zorunlu kontroller
- root sonucu
- /chatflows sonucu
- console
- network
- DOM #root
- HTML/bootstrap/script
- /api/v1/settings
- lite/demo/admin sapmasi var mi
- sadece header mi gorunuyor

### Latest commit icin zorunlu kontroller
- preview'i ureten commit bu mu
- commit diff ile Files changed uyumlu mu
- kritik dosyalar beklenen halde mi
- commit mesaji ile gercek diff uyumlu mu
Uyumsuzluk varsa acikca "commit-message / diff mismatch" yaz.

## KANIT KURALI
Kabul edilen kanitlar:
- deploy log
- preview bulgulari
- commit diff
- checks ciktilari
- console/network ciktisi
- ekran goruntusu veya ekran kaydi
Kanit yoksa acikca "kanit yok" yaz.

## DIL KURALI
- Tahmin yurutme.
- Muhtemelen, olabilir, gibi gorunuyor yazma.
- Kanit yoksa kanit yok de.
- Dogrulanmadiysa dogrulanmadi de.

## NIHAYI TALIMAT KURALI
Raporun sonunda yazilan Codex talimati:
- kendi basina anlasilir olmali
- onceki insan sohbetlerini biliyormus gibi yazilmamali
- minimum riskli duzeltme istemeli
- refactor istememeli
- dosya adlariyla konusmali
- test ve dogrulama adimini zorunlu tutmali
