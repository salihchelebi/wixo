
# VERIFICATION-RULES.MD

## AMAÇ

Bu dosya, doğrulama kontrollerinin ne zaman yeniden çalıştırılacağını, ne zaman SKIP edileceğini ve hangi delillerin zorunlu olduğunu tanımlar.

Ana ilke:

- EĞER bir kontrol daha önce başarıyla doğrulandıysa
- VE ilgili dosya / config / env / branch / deploy hedefi değişmediyse
- VE delili hâlâ geçerliyse

THEN o kontrol tekrar çalıştırılmaz.

---

## GENEL YÜRÜTME KURALI

Her görev öncesi şu sıra zorunludur:

1. `AGENTS.md` oku
2. `ops/verification-registry.json` oku
3. Bu dosyayı oku
4. Görevin etkilediği dosyaları çıkar
5. Her kontrol için `recheckTriggers` ile etkilenme analizi yap
6. Sadece `STALE`, `FAILED`, `UNCERTAIN` veya yeni etkilenmiş kontrolleri yeniden doğrula
7. Yeni doğrulama varsa delil üret
8. Registry kaydını güncelle

---

## ORTAK DURUM KURALLARI

### BİR KONTROL `PASSED` SAYILABİLİR EĞER:

- Somut delil varsa
- Delil güncelse
- Fingerprint güncelse
- İlgili tetikleyici dosyalarda değişiklik yoksa

### BİR KONTROL `STALE` SAYILMALIDIR EĞER:

- Fingerprint değiştiyse
- Delilin bağlı olduğu commit güncel değilse
- Etkileyen dosyalardan biri değiştiyse
- Env / branch / deploy target / runtime davranışı değiştiyse

### BİR KONTROL `UNCERTAIN` SAYILMALIDIR EĞER:

- Delil eksikse
- Erişim yoksa
- Test kısmen yapılabildiyse
- Sonuç net değilse

### DELİLSİZ HİÇBİR KONTROL `PASSED` YAPILAMAZ

---

## KONTROL 1
## GITHUB ↔ DEPLOY PLATFORMU BAĞLANTISI

### AMAÇ
Deploy edilen platformun doğru GitHub repo’ya bağlı olduğunu doğrulamak.

### ETKİLEYEN DOSYALAR
- `netlify.toml`
- `.github/workflows/*`
- repo metadata kullanan scriptler
- deploy scriptleri
- site / repo eşleme configleri

### RECHECK TRIGGERS
- Repo adı değişirse
- Owner değişirse
- Default branch değişirse
- Netlify site bağlantısı değişirse
- Deploy scriptleri değişirse

### SKIP KOŞULLARI
- Önceki doğrulama `PASSED` ise
- Fingerprint aynıysa
- Repo / branch / deploy config değişmediyse

### ZORUNLU DELİL TÜRLERİ
- Repo URL
- Owner / repo bilgisi
- Deploy platform bağlantı kanıtı
- Production branch eşleşmesi

### BAŞARISIZLIK DURUMUNDA
- `FAILED` işaretle
- Hangi eşleşmenin bozuk olduğunu yaz
- Doğru repo / branch / site eşleşmesini açıkça raporla

---

## KONTROL 2
## PR PREVIEW VE PRODUCTION DEPLOY AYRIMI

### AMAÇ
PR açılınca preview, merge sonrası production deploy oluştuğunu doğrulamak.

### ETKİLEYEN DOSYALAR
- `netlify.toml`
- `.github/workflows/*`
- deploy preview ayarları
- branch deploy configleri

### RECHECK TRIGGERS
- Deploy preview ayarı değişirse
- Base branch değişirse
- PR akışını etkileyen workflow değişirse

### SKIP KOŞULLARI
- Aynı akış daha önce doğrulandıysa
- Branch ve deploy ayarları değişmediyse

### ZORUNLU DELİL TÜRLERİ
- Preview URL
- Production deploy kaydı
- Merge → deploy eşleşmesi
- Base branch bilgisi

### BAŞARISIZLIK DURUMUNDA
- Preview veya production zincirinde kopan noktayı yaz
- `FAILED` işaretle

---

## KONTROL 3
## ENV DEĞİŞKENLERİNİN PLATFORMDA TANIMLI OLMASI

### AMAÇ
Gizli anahtarların kod içinde değil platform ortamında tutulduğunu doğrulamak.

### ETKİLEYEN DOSYALAR
- `.env*`
- `.env.example`
- runtime config dosyaları
- secrets kullanan source dosyaları
- deploy env ayar referansları

### RECHECK TRIGGERS
- Env anahtarı eklendiyse / silindiyse
- Secret referansları değiştiyse
- Yeni servis entegrasyonu geldiyse

### SKIP KOŞULLARI
- Env taraması daha önce yapılmışsa
- Etkilenen dosyalar değişmemişse

### ZORUNLU DELİL TÜRLERİ
- Repo tarama sonucu
- Platform env kanıtı
- Secret / public ayrımı

### BAŞARISIZLIK DURUMUNDA
- Repo içinde bulunan secret’ları açıkça işaretle
- `FAILED` yaz

---

## KONTROL 4
## CONTEXT BAZLI ENV HARİTASI

### AMAÇ
Production ve preview ortamlarının ayrıldığını doğrulamak.

### ETKİLEYEN DOSYALAR
- env mapping dosyaları
- runtime config
- callback URL configleri
- base URL configleri
- deploy context ayarları

### RECHECK TRIGGERS
- Context değişirse
- Production / preview env farklılıkları değişirse
- URL / database / service key eşleşmeleri değişirse

### SKIP KOŞULLARI
- Env mapping daha önce doğrulandıysa
- İlgili configler değişmediyse

### ZORUNLU DELİL TÜRLERİ
- Production env haritası
- Preview env haritası
- Ayrım kanıtı
- Endpoint / DB ayrımı

### BAŞARISIZLIK DURUMUNDA
- Karışan env veya servisleri raporla
- `FAILED` yaz

---

## KONTROL 5
## DEPLOY HEDEFİ TEK KAYNAKTAN DOĞRULANMALI

### AMAÇ
Yanlış siteye deploy riskini önlemek.

### ETKİLEYEN DOSYALAR
- `netlify.toml`
- deploy scriptleri
- CLI config
- site ID kullanan configler

### RECHECK TRIGGERS
- `NETLIFY_SITE_ID` değişirse
- Domain değişirse
- Site adı değişirse
- CLI deploy komutları değişirse

### SKIP KOŞULLARI
- Site ID ve domain eşleşmesi daha önce doğrulandıysa
- İlgili config aynıysa

### ZORUNLU DELİL TÜRLERİ
- Site ID
- Domain
- Proje URL
- CLI / deploy hedef kanıtı

### BAŞARISIZLIK DURUMUNDA
- Yanlış hedef riskini açıkça yaz
- `FAILED` işaretle

---

## KONTROL 6
## PR → PREVIEW AKIŞI

### AMAÇ
PR açıldığında preview deploy’un otomatik oluştuğunu doğrulamak.

### ETKİLEYEN DOSYALAR
- deploy preview ayarları
- PR workflow’ları
- yönlendirme ve giriş noktası dosyaları

### RECHECK TRIGGERS
- Preview feature kapandıysa
- Landing route değiştiyse
- PR deploy akışı değiştiyse

### SKIP KOŞULLARI
- Aynı route ve aynı preview akışı yakın zamanda doğrulandıysa
- Etkilenen dosyalar değişmediyse

### ZORUNLU DELİL TÜRLERİ
- Preview link
- Route kontrolü
- Preview davranışı

### BAŞARISIZLIK DURUMUNDA
- Yanlış giriş noktası veya preview eksikliğini raporla
- `FAILED` yaz

---

## KONTROL 7
## MERGE → PRODUCTION AKIŞI

### AMAÇ
Merge sonrası production deploy’un otomatik tetiklendiğini doğrulamak.

### ETKİLEYEN DOSYALAR
- production branch ayarları
- deploy workflow’ları
- production site configleri

### RECHECK TRIGGERS
- Default branch değişirse
- Merge stratejisi değişirse
- Production deploy config değişirse

### SKIP KOŞULLARI
- Aynı chain daha önce doğrulandıysa
- Branch / deploy ayarı değişmediyse

### ZORUNLU DELİL TÜRLERİ
- Merge kaydı
- Deploy log’u
- Production URL
- Commit → deploy eşleşmesi

### BAŞARISIZLIK DURUMUNDA
- Otomatik tetikleme kopukluğunu yaz
- `FAILED` işaretle

---

## KONTROL 8
## FALLBACK DEPLOY MEKANİZMASI

### AMAÇ
Ana akış bozulursa manuel deploy yapılabildiğini doğrulamak.

### ETKİLEYEN DOSYALAR
- deploy scriptleri
- CLI config
- build hook referansları

### RECHECK TRIGGERS
- Token değişirse
- Site ID değişirse
- Manuel deploy komutu değişirse

### SKIP KOŞULLARI
- Fallback mekanizması daha önce doğrulandıysa
- Manuel deploy yolları değişmediyse

### ZORUNLU DELİL TÜRLERİ
- CLI komutu
- Hook bilgisi
- Yetki doğrulaması

### BAŞARISIZLIK DURUMUNDA
- Eksik fallback yolunu yaz
- `FAILED` işaretle

---

## KONTROL 9
## UYGULAMA İÇİ URL VE ORTAM DAVRANIŞI

### AMAÇ
Production ve preview URL / callback / endpoint davranışlarının doğru ayrıldığını doğrulamak.

### ETKİLEYEN DOSYALAR
- route configleri
- callback configleri
- API endpoint configleri
- webhook configleri
- base URL tanımları

### RECHECK TRIGGERS
- Route değişirse
- Callback / endpoint değişirse
- Runtime environment mapping değişirse

### SKIP KOŞULLARI
- Aynı URL davranışı daha önce doğrulandıysa
- Etkilenen dosyalar değişmediyse

### ZORUNLU DELİL TÜRLERİ
- Route testi
- Endpoint hedefleri
- Runtime config karşılaştırması

### BAŞARISIZLIK DURUMUNDA
- Yanlış yönlendirme veya yanlış ortam kullanımını raporla
- `FAILED` yaz

---

## KONTROL 10
## GLOBAL CHECKLIST UYGULAMASI

### AMAÇ
Tüm zorunlu deploy / env / preview / production checklist maddelerini takip etmek.

### ETKİLEYEN DOSYALAR
- registry
- rules
- deploy config
- env config
- route config

### RECHECK TRIGGERS
- Zorunlu checklist maddelerinden biri etkilenirse
- İlgili teknik alan değişirse

### SKIP KOŞULLARI
- İlgili maddeler ayrı ayrı geçerliyse
- Yeni değişiklik checklist kapsamını etkilemiyorsa

### ZORUNLU DELİL TÜRLERİ
- Alt maddelere ait tüm delillerin bağlantısı

### BAŞARISIZLIK DURUMUNDA
- Eksik checklist maddelerini açıkça yaz
- `FAILED` veya `UNCERTAIN` kullan

---

## KONTROL 11
## CODEX İÇİN RAPORLAMA KURALI

### AMAÇ
Her iddianın test ve delille raporlanmasını zorunlu kılmak.

### ETKİLEYEN DOSYALAR
- raporlama şablonları
- evidence klasörü
- registry kayıtları

### RECHECK TRIGGERS
- Rapor formatı değişirse
- Evidence formatı değişirse

### SKIP KOŞULLARI
- Raporlama mantığı aynıysa
- Yeni rapor gerekmiyorsa

### ZORUNLU DELİL TÜRLERİ
- Test sonucu
- Kanıt yolu
- Belirsizlik işaretleri

### BAŞARISIZLIK DURUMUNDA
- Delilsiz tamamlandı denmişse bunu hata say
- `FAILED` işaretle

---

## KONTROL 12
## GÖREV ETKİ ANALİZİ VE SKIP KARARI

### AMAÇ
Her görevde her şeyi baştan çalıştırmayı önlemek.

### ETKİLEYEN DOSYALAR
- görev kapsamı
- değişen dosya listesi
- registry / rules

### RECHECK TRIGGERS
- Görev yeni teknik alan etkiliyorsa
- Daha önce ilgisiz sayılan alan artık etkileniyorsa

### SKIP KOŞULLARI
- Görev yalnızca UI metni / içerik değiştiriyorsa
- Deploy / env / route / build zincirini etkilemiyorsa

### ZORUNLU DELİL TÜRLERİ
- Değişen dosya listesi
- Etki analizi notu
- Skip gerekçesi

### BAŞARISIZLIK DURUMUNDA
- Gereksiz tekrar yapıldıysa not düş
- Skip edilmesi gereken ama çalıştırılan maddeleri işaretle

---

## KONTROL 13
## REGISTRY / EVIDENCE GÜNCELLEME ZORUNLULUĞU

### AMAÇ
Yeni doğrulama varsa kalıcı kayıt oluşturmak.

### ETKİLEYEN DOSYALAR
- `ops/verification-registry.json`
- `ops/evidence/*`

### RECHECK TRIGGERS
- Yeni kontrol yapıldıysa
- Yeni delil üretildiyse
- Eski delil geçersizleştiyse

### SKIP KOŞULLARI
- Hiç yeni doğrulama yapılmadıysa
- Tüm sonuçlar önceki kayıtla birebir aynı ve geçerliyse

### ZORUNLU DELİL TÜRLERİ
- Güncellenmiş registry
- Yeni evidence yolu
- Doğrulama özeti

### BAŞARISIZLIK DURUMUNDA
- Doğrulama yapılıp kayıt güncellenmediyse hata say
- `FAILED` veya `UNCERTAIN` kullan

---

## SON KURAL

EĞER KAYIT VAR + DELİL VAR + FINGERPRINT AYNI ise THEN TEKRAR YAPMA.

EĞER DELİL YOK veya FINGERPRINT DEĞİŞTİ ise THEN SADECE ETKİLENEN KONTROLÜ yeniden çalıştır.
