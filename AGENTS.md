# AGENTS.md

## ANA VE DEGISMEZ ILKE
Netlify preview'da acilan yuzey, Flowise uygulamasinin saf surumundeki arayuzle birebir ayni olmalidir.
Lite, demo, admin, prototype, custom landing ve benzeri ozel yuzeyler ana urun kabul edilmez.
Saf Flowise davranisindan her sapma hata kabul edilir.

## CALISMA BICIMI
- Varsayim yapma; dosyadan, logdan, diff'ten ve deploy ciktisindan cikar.
- Once teshis et, sonra minimum riskli duzeltme oner.
- Refactor yapma.
- Cozuldu deme; test ve dogrulama olmadan hicbir isi tamamlandi sayma.
- Once root UI, sonra /chatflows, sonra config/data fetch zinciri.
- Preview hatti ile full-build hattini karistirma.
- Build gecti diye runtime calisiyor sanma.
- Config var diye UI dogru render oluyor sanma.

## ZORUNLU DOSYA KONTROLU
Her gorevden once en az su dosyalari kontrol et:
- .env.example
- packages/ui/.env.example
- netlify.toml
- ops/evidence/env-checks/root-config-fetch-chain-2026-03-30.md
- ops/evidence/reporting/ui-preview-recovery-report-2026-03-30.md
- packages/ui/src/store/context/ConfigContext.jsx
- wixoo/functions/flowise-api-proxy.js

## SON PR INCELEME KURALI
Kullanici bir PR URL'si verdiyse, talimat yazmadan once sunlari eksiksiz incele:
- Conversation
- Commits
- Checks
- Files changed

## PR DEGERLENDIRME STANDARDI
Her PR asagidaki 20 kritere gore puanlanir:
1. Amac
2. Kapsam
3. Kapsam disi
4. Girdi/cikti tanimi
5. Olculebilir davranis
6. Hata ve fallback
7. Ortam ve bagimliliklar
8. Veri kaynaklari
9. Dosya yollari
10. Kod/patch stili
11. Is sirasi/oncelik
12. Kabul kriteri ve test
13. Loglama ve debug
14. Varsayim azaltma
15. Belirsizlikten kacinma
16. Karar serbestisi siniri
17. Cikti formati
18. Dogrulama ve kanit
19. Guvenlik ve gizlilik
20. Surdurulebilirlik ve dokumantasyon

## PLATFORM-SIDE ZORUNLU DOGRULAMA
Netlify bot yorumundaki baglantilar kanit kaynagidir.
Bunlar yapilmadan preview duzeldi denmez.

### 1) LATEST DEPLOY LOG
Erisim:
- PR > Conversation
- Netlify bot yorumu
- Latest deploy log

Zorunlu kontrol:
- build error
- warning
- missing env
- redirect problemi
- function routing problemi
- dependency/install problemi
- preview publish path problemi

Kural:
- Her bulguyu dosya, config ve pipeline adimi ile iliskilendir.
- Build gecti demek yetmez.
- Kanit yoksa acikca kanit yok yaz.

### 2) DEPLOY PREVIEW
Erisim:
- PR > Conversation
- Netlify bot yorumu
- Deploy Preview

Zorunlu kontrol:
- root sayfa
- /chatflows
- gerekli ana alt rotalar
- console
- network
- DOM / #root
- HTML bootstrap / script yuklenmesi
- /api/v1/settings ve ilgili API cagirilari

Kural:
- Her tiklama icin ayri ekran kaydi veya ekran goruntusu al.
- Sadece header varsa bunu acikca yaz.
- 4xx veya 5xx varsa acikca yaz.
- Lite, demo veya admin yuzeyi gorunuyorsa dogrudan basarisizlik yaz.
- Kanit yoksa kanit yok yaz.

### 3) LATEST COMMIT
Erisim:
- PR > Conversation
- Netlify bot yorumu
- Latest commit

Zorunlu kontrol:
- Son commit gercekten preview'i ureten son commit mi
- Commit diff ile Files changed uyumlu mu
- Kritik dosyalar beklenen halde mi:
  - netlify.toml
  - packages/ui/src/store/context/ConfigContext.jsx
  - wixoo/functions/flowise-api-proxy.js
  - .env.example
- Commit message ile gercek diff uyumlu mu
- demo, lite veya admin sapmasi suruyor mu

Kural:
- Uyumsuzluk varsa acikca commit-message / diff mismatch yaz.
- Kanit yoksa kanit yok yaz.

## PLAYWRIGHT / BROWSER DOGRULAMA KURALI
- Browser binary inmedi diye dogrulama birakilmaz.
- Once sistem chromium yolu denenir.
- Sonra mevcut browser binary yolu denenir.
- Sonra alternatif launch yolu denenir.
- Bunlar olmazsa manuel preview dogrulamasi ve artifact toplanir.
- Altyapi hazir ama calismadi cevabi kabul edilmez.

## RAPORLAMA CIKTI FORMATI
Sonuclar su basliklarla doner:
A) Toplam puan
B) 20 maddelik tek tek uyum tablosu
C) Eksik yapilanlar
D) Hic yapilmamis olanlar
E) Dosya / satir / fonksiyon bazli sorun haritasi
F) Checks analizi
G) Conversation-commit uyumsuzluklari
H) Guclu taraflar
I) Codex'e verilecek nihai talimat

## DIL VE KANIT KURALI
- Tahmin yurutme.
- Muhtemelen, olabilir, gibi gorunuyor yazma.
- Kanit yoksa acikca kanit yok yaz.
- Ekran goruntusu, ekran kaydi veya log kaniti yoksa dogrulandi deme.
- Sonuclari kisa, teknik ve dosya adi vererek yaz.
