
# AGENTS.md

## Amaç

Bu repository üzerinde çalışan tüm agent'lar, mevcut proje yapısını bozmeden, minimum riskli değişiklik yaparak, test/delil/checklist odaklı şekilde ilerlemek zorundadır. Bu dosya bağlayıcı çalışma talimatıdır.

---

## 1) Proje Bağlamını Doğru Kabul Et

- Bu repo PNPM tabanlı bir monorepo’dur.
- Mevcut yapı korunacaktır.
- Repo içinde en az şu modüller vardır:
  - `server`: Node backend
  - `ui`: React frontend
  - `components`: üçüncü taraf node entegrasyonları
  - `api-documentation`: Express tabanlı API dokümantasyonu
- Node.js sürüm gereksinimini en az `18.15.0` olarak kabul et.
- Mevcut geliştirme ve doğrulama akışını esas al:
  - `pnpm install`
  - `pnpm build`
  - `pnpm start`
  - `pnpm dev`
- Geniş refactor yapma.
- Klasörleri sebepsiz taşıma.
- Çalışan bölümleri kıracak mimari müdahale yapma.
- README’de tanımlı davranışı temel referans kabul et.

---

## 2) Çalışma Prensibi

- Önce repo yapısını ve mevcut akışı anla.
- Sonra değişiklik kapsamını daralt.
- Yalnızca gereken dosyalara dokun.
- Her değişikliği mevcut mimariyle uyumlu yap.
- Yeni kod eklerken mevcut adlandırma ve klasör düzenine uy.
- Gerekmedikçe yeni abstraction katmanı açma.
- Gerekmedikçe paket, framework veya tool değiştirme.
- Belirsiz varsayım yapma; karar aldıysan açıkça belirt.
- Kodun sadece yazılmış olmasını yeterli sayma; çalıştığını doğrula.

---

## 3) Netlify + Supabase Uyum Kuralı

Bu repo Netlify frontend + Netlify Functions backend + Supabase veritabanı modeline uyarlanacaksa aşağıdaki kurallara uy:

- Frontend yayın katmanını Netlify uyumlu kur.
- Backend davranışını Netlify Functions üzerinden çalışacak şekilde düzenle.
- Functions dosyalarını `netlify/functions` altında tut.
- Function içinde environment variable erişiminde `Netlify.env.*` kullan.
- Secret değerleri source code içine yazma.
- `.netlify` klasörünü kullanıcı kodu için kullanma.
- `.netlify` klasörünü `.gitignore` içine ekle.
- `netlify.toml` dosyasını oluştur veya düzelt.
- `server` klasörünü sebepsiz silme; taşınabilir mantığı mümkünse koru.
- `ui` katmanını mevcut yapıya sadık şekilde Netlify frontend akışına bağla.
- Frontend ile backend arasında çalışan en az bir gerçek akış bırak.
- Backend üzerinden Supabase’e güvenli veri erişimi kur.
- Public ve secret env ayrımını bozma.

---

## 4) Env Kullanım Kuralı

- Yalnızca gerçekten ihtiyaç duyulan env değişkenlerini kullan.
- Dışarıdan yeni env adı uydurma.
- Gerekmeyen env’i sisteme dahil etme.
- Secret değerleri asla açık yazma.
- Secret’ları loglama.
- Secret’ları frontend bundle içine sızdırma.
- Public env ile server-only env ayrımını net koru.
- `.env.example` dosyasına yalnızca gerçekten gerekli alanları ekle.
- Gerçek secret değerlerini hiçbir dosyaya yazma.

### Öncelikli Env Kullanım Mantığı

- `NEXT_PUBLIC_SUPABASE_URL`  
  Frontend tarafında Supabase URL gerekiyorsa kullan.

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`  
  Frontend/public kullanım için gerekiyorsa kullan.

- `SUPABASE_SERVICE_ROLE_KEY`  
  Yalnızca server/function tarafında kullan.

- `DATABASE_URL`  
  Yalnızca gerçekten migration, server-side DB erişimi veya build-time veritabanı ihtiyacı varsa kullan.

- `NETLIFY_AUTH_TOKEN`  
  Netlify deploy veya Netlify API işlemleri için kullan.

- `NETLIFY_SITE_ID`  
  Doğru siteye deploy göndermek için kullan.

- `NETLIFY_SITE_URL`, `NETLIFY_PRODUCTION_URL`, `NETLIFY_MAIN_BRANCH_URL`  
  Deploy sonrası canlı doğrulama için kullan.

- `GITHUB_DEFAULT_BRANCH`  
  PR hedefi ve merge hedefi için kullan.

- `GITHUB_OWNER`, `GITHUB_REPO_NAME`, `GITHUB_REPO_FULL`, `GITHUB_REPO_URL`  
  Repo, PR ve teslim akışında gerçekten gerekiyorsa kullan.

- `OPENAI_API_KEY`, `TAVILY_API_KEY`, `LANGCHAIN_TRACING_V2`, `LANGSMITH_API_KEY`  
  Ancak uygulama gerçekten bu servisleri kullanıyorsa dahil et.

- `ADMIN_USER_NAME`, `ADMIN_PASSWORD`  
  Ancak uygulamada gerçek bir admin auth akışı kuruluyorsa kullan.

---

## 5) Kod Yazma Kuralları

- Kodları mevcut stack ile uyumlu yaz.
- Var olan stil ve dosya yapısını bozma.
- Mevcut isimlendirme düzenine uy.
- Kısa vadeli iş için gereksiz karmaşa üretme.
- Geçici hack yazacaksan açıkça işaretle.
- Sessizce kırıcı değişiklik yapma.
- API, config, build ve runtime etkilerini ayırarak düşün.
- Yeni dosya ekliyorsan neden gerekli olduğunu belirt.
- Eski çalışan alanları bozmadan ilerle.
- Minimum riskli çözümü tercih et.

---

## 6) Test Zorunluluğu

Hiçbir işi testsiz tamamlanmış sayma.

- Her değişiklik için uygun doğrulama yap.
- En az şu seviyeleri düşün:
  - lint veya type kontrolü
  - ilgili paket testi
  - build doğrulaması
  - local çalışma doğrulaması
  - gerekiyorsa e2e veya endpoint doğrulaması
- Mümkünse mevcut test yapısına uygun test ekle.
- Yeni functionality ekliyorsan test dosyasını kaynak dosyanın yanına koy.
- Repo uygunsa paket bazlı test çalıştır:
  - `pnpm test`
  - veya ilgili paket için filter/test komutu
- Build almadan işi bitmiş sayma.
- Production benzeri doğrulama yapmadan işi tamamlanmış kabul etme.

---

## 7) Delil Zorunluluğu

Hiçbir maddeyi delilsiz tamamlanmış sayma.

Kabul edilen delil örnekleri:
- terminal çıktısı
- test çıktısı
- build çıktısı
- çalışan endpoint response’u
- ekran sonucu
- log
- dosya diff özeti
- canlı URL doğrulaması
- PR çıktısı
- deploy çıktısı

Kabul edilmeyen delil:
- sadece “yapıldı”
- sadece “tamam”
- sadece “çalışıyor olmalı”
- sadece tahmin

---

## 8) Checklist Zorunluluğu

Her görev sonunda checklist ver.

Örnek format:

- [ ] İlgili dosyalar güncellendi
- [ ] Env ayrımı korundu
- [ ] Testler çalıştırıldı
- [ ] Build doğrulandı
- [ ] Local çalışma kontrol edildi
- [ ] Gerekirse deploy doğrulandı
- [ ] Riskler not edildi

Checklist maddeleri gerçekten doğrulanmadan işaretlenmemelidir.

---

## 9) Doğrulama Notu Zorunluluğu

Her ana talimatın sonunda kısa bir doğrulama notu ver.

Kullanılacak standart metin:

> Bu talimat test edildi. Talimat, hem uygulama sırasında hem de uygulama sonrasında kontrol edildi. İlgili adımlar checklist üzerinden tek tek doğrulandı ve somut delillerle desteklenerek yerine getirildiği kanıtlandı.

Bu not yalnızca gerçekten doğrulama yapıldıysa kullanılmalıdır.

---

## 10) Teslim Zorunluluğu

Kodlama tamamlandıktan sonra işi yalnızca yerelde bırakma.

- Commit oluştur.
- Branch’i remote’a gönder.
- PR oluştur.
- PR başlığını açık yaz.
- PR açıklamasında şunları belirt:
  - yapılan değişiklikler
  - etki alanı
  - test durumu
  - risk notu
- Hedef branch’i `GITHUB_DEFAULT_BRANCH` ile belirle.
- Merge akışını teslimin parçası say.
- Merge tamamlanmadan işi tamamen bitmiş sayma.
- Merge sonrası gerekli doğrulamayı ayrıca yap.

Not:
“force” ifadesi kullanıcı talimatında teslim zorunluluğu anlamında kullanılabilir; ancak git geçmişini bozacak gerçek `git push --force` gibi işlemler, yalnızca açıkça gerekliyse ve güvenliyse uygulanmalıdır.

---

## 11) Netlify Deploy Zorunluluğu

Netlify hedefli işlerde deploy sürecini isteğe bağlı bırakma.

- Build al.
- Deploy tetikle.
- Gerekliyse branch’i remote’a gönder.
- Gerekliyse PR/merge akışını tamamla.
- Merge sonrası güncel hedef branch üzerinden production deploy doğrula.
- Netlify build loglarını kontrol et.
- Canlı URL’nin açıldığını doğrula.
- Function endpoint’lerinin canlıda çalıştığını doğrula.
- Frontend ile backend akışının canlı ortamda gerçekten konuştuğunu doğrula.
- Build başarısızsa işi tamamlanmış sayma.
- Deploy tamamlanmadıysa işi tamamlanmış sayma.
- Canlı kontrol yapılmadıysa işi tamamlanmış sayma.

---

## 12) Komut Verme Standardı

Kullanıcıya komut yazarken bunları ayrı başlıklarla ver:

- Kurulum komutları
- Geliştirme komutları
- Test komutları
- Build komutları
- Commit komutları
- PR komutları
- Merge komutları
- Netlify deploy komutları

Her komutun yanına kısa amaç notu ekle.

---

## 13) Raporlama Standardı

Her teslim sonunda şu başlıkları ver:

1. Değiştirilen ve eklenen dosyalar
2. Her dosyanın ne işe yaradığı
3. Kullanılan env’ler ve neden kullanıldığı
4. Çalıştırılan testler
5. Build sonucu
6. PR durumu
7. Merge durumu
8. Netlify deploy sonucu
9. Canlı doğrulama sonucu
10. Riskler, varsayımlar ve açık kalan noktalar

---

## 14) Yasaklar

- Secret’ı koda yazma
- Secret’ı örnek dosyada gerçek değerle paylaşma
- README ve mevcut mimariyi okumadan büyük değişiklik yapma
- Testsiz “tamamlandı” deme
- Delilsiz “çalışıyor” deme
- Gereksiz refactor yapma
- Çalışan modülleri sebepsiz taşıma
- Public ve secret env ayrımını bozma
- PR, build veya deploy adımını sessizce atlama
- Varsayımları gerçekmiş gibi sunma

---

## 15) Öncelik Sırası

Karar verirken şu sırayı izle:

1. Mevcut repo yapısını koru
2. Minimum riskli çalışan çözümü seç
3. Secret güvenliğini koru
4. Test ve build doğrulamasını yap
5. PR ve deploy akışını tamamla
6. Delil ve checklist ile teslim et

---

## 16) Agent Çıktı Formatı

Görev yaparken ve teslim verirken mümkünse şu sırayı izle:

1. Kapsam
2. Yapılacak değişiklikler
3. Uygulama
4. Test
5. Delil
6. Checklist
7. Teslim özeti

---

## 17) Son Kural

Kodun yazılmış olması işin bittiği anlamına gelmez.  
İş ancak aşağıdakiler tamamlandıysa bitmiş sayılır:

- gerekli dosyalar güncellendi
- env ayrımı doğru kuruldu
- testler çalıştı
- build geçti
- local doğrulama yapıldı
- gerekiyorsa PR açıldı
- gerekiyorsa merge akışı tamamlandı
- gerekiyorsa Netlify deploy yapıldı
- canlı doğrulama yapıldı
- delil ve checklist ile raporlandı
