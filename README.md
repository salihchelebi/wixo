# 🌐 Canlı Ortam Esaslı Proje Mimarisi ve Çalışma Düzeni

## 🧭 Mimari Kararı Esas Al
- Bu projeyi **canlı ortamda çalışan Netlify + Netlify Functions + Supabase** mimarisi üzerinden yönet.
- Arayüz katmanını **Netlify üzerinde yayınlanan istemci uygulaması** olarak konumlandır.
- Backend katmanını **Netlify Functions tabanlı serverless servis katmanı** olarak işlet.
- Veritabanı katmanını **Supabase PostgreSQL** üzerinde tut.
- GitHub repository’sini kaynak kodun tek otoritesi olarak kullan.
- Ortam değişkenlerini katman sorumluluğuna göre ayır.
- Hassas anahtarları yalnızca sunucu tarafında tut.
- Production, branch deploy ve preview ortamlarını birbirinden açık biçimde ayır.

---

# 🖥️ Arayüz

## 1. Arayüz Katmanını Tanımla
- Arayüzün ana kullanıcı yüzünü **Netlify üzerinde yayınlanan istemci uygulaması** olarak kabul et.
- Arayüz kaynak alanını proje içinde **`packages/ui`** etrafında organize et.
- Kullanıcıya görünen tüm ekran, panel, akış ve yönetim yüzlerini bu katmanda topla.
- İstemci tarafı davranışlarını backend’den ayrıştırılmış biçimde yönet.

## 2. Arayüz Dosya Alanlarını Netleştir
- **`packages/ui/src`** dizinini temel uygulama mantığı için kullan.
- **`packages/ui/src/views`** altında ekran bazlı yapıyı yönet.
- **`packages/ui/src/routes`** altında yönlendirme ve erişim akışını yönet.
- **`packages/ui/src/layout`** altında sayfa iskeletlerini ve kabuk yapılarını tut.
- **`packages/ui/src/api`** altında backend ile konuşan istemci servislerini topla.
- **`packages/ui/src/store`** altında istemci state ve sabitleri yönet.
- **`packages/ui/src/themes`** altında tema ve görünüm sistemini düzenle.
- **`packages/ui/public`** altında statik varlıkları sakla.

## 3. Arayüz Ekran Sorumluluklarını Ayrıştır
- Chatflow, canvas, chatbot, dataset, docstore, settings, workspace ve credentials alanlarını ayrı domain ekranları olarak ele al.
- Yönetim ekranlarını, kullanıcı ekranlarından ayrı erişim politikalarıyla yönet.
- Görsel agent/flow düzenleme alanlarını uygulamanın yüksek etkileşimli bölümü olarak kurgula.
- Ayar, log, değişken ve entegrasyon ekranlarını operasyonel yönetim alanı olarak konumlandır.

## 4. Arayüz Ortam Değişkenlerini Doğru Kullan
- **`NEXT_PUBLIC_SUPABASE_URL`** değerini istemci tarafındaki Supabase bağlantı tabanı olarak kullan.
- **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`** değerini yalnızca tarayıcı tarafındaki public erişimler için kullan.
- Tarayıcıya gömülecek değişkenleri yalnızca public kullanım kapsamıyla sınırla.
- Service role, veritabanı şifresi, AI anahtarı ve yönetimsel token’ları arayüze taşıma.
- Branch preview ve production ortamlarında public değişkenleri ayrı bağlamlarda yönet.

## 5. Arayüz – Backend İlişkisini Sınırla
- Arayüzden çıkan tüm iş kuralı çağrılarını doğrudan backend katmanına yönlendir.
- Ayrıcalıklı veri işlemlerini istemciden değil, serverless function katmanından yürüt.
- Tarayıcıdan yalnızca güvenli public veri erişimlerini ve kullanıcı etkileşimlerini gerçekleştir.
- Hassas işlem, doğrulama, token yönetimi ve servis entegrasyonlarını backend’e bırak.
- API çağrılarını ortak istemci katmanı üzerinden standardize et.

## 6. Arayüz Yayınlama Akışını Netlify Üzerinden Yönet
- **`NETLIFY_SITE_ID`** ile bağlı siteyi tanımla.
- **`NETLIFY_SITE_NAME`** ve **`NETLIFY_SITE_DOMAIN`** ile canlı alan adını doğrula.
- **`NETLIFY_SITE_URL`** ve **`NETLIFY_PRODUCTION_URL`** değerlerini kullanıcıya açık ana erişim adresleri olarak kullan.
- **`NETLIFY_BRANCH_URL`** ve **`NETLIFY_MAIN_BRANCH_URL`** değerlerini branch doğrulama ve preview akışları için kullan.
- **`NETLIFY_PROJECT_URL`** ve **`NETLIFY_ADMIN_URL`** değerlerini operasyonel yönetim noktaları olarak değerlendir.
- Arayüz yayınını GitHub branch ve production deploy akışıyla senkronize et.

## 7. Arayüz Güvenliğini Katmanlı Kur
- Yönetim erişimini yalnızca görünür ekran kısıtıyla değil, backend doğrulamasıyla koru.
- **`ADMIN_USER_NAME`** ve **`ADMIN_PASSWORD`** bilgisini istemciye açma.
- İstemci tarafında yalnızca session, kullanıcı deneyimi ve public erişim mantığını tut.
- Yönetim paneli, veri yönetimi ve kritik akışlarda rol ve yetki ayrımı uygula.
- İstemci bundle’ında gizli anahtar, connection string veya service token bırakma.

---

# ⚙️ Backend (Netlify Functions)

## 1. Backend Katmanını Netlify Functions Olarak Konumlandır
- Backend’i geleneksel sürekli çalışan sunucu değil, **Netlify Functions tabanlı serverless servis katmanı** olarak işlet.
- API, doğrulama, entegrasyon ve ayrıcalıklı veri işlemlerini bu katmanda topla.
- Her istek için function tabanlı çalışma mantığını esas al.
- Route, handler ve servis ayrımını function yaşam döngüsüne uygun biçimde kurgula.

## 2. Backend Kaynak Alanını Düzenle
- **`packages/server`** dizinini iş mantığı, servis yapısı ve veri erişim mantığının ana kaynak alanı olarak kullan.
- Route, controller, service, middleware ve database katmanlarını burada düzenle.
- Domain bazlı ayrımı `chatflows`, `documentstore`, `nodes`, `variables`, `workspace`, `apikey`, `assistants` gibi iş alanları üzerinden sürdür.
- Serverless çalışmaya taşınan mantığı burada geliştir, Netlify Functions katmanına dağıt.
- Arayüzden gelen istekleri doğrudan ham veri işlemi olarak değil, kurallı servis çağrısı olarak ele al.

## 3. Backend Ortam Değişkenlerini Sunucu Tarafında Tut
- **`OPENAI_API_KEY`** değerini yalnızca sunucu tarafında kullan.
- **`TAVILY_API_KEY`** değerini yalnızca backend araştırma ve dış arama akışlarında kullan.
- **`LANGCHAIN_TRACING_V2`** ve **`LANGSMITH_API_KEY`** değerlerini gözlemlenebilirlik katmanında işlet.
- **`GITHUB_TOKEN`** değerini GitHub erişim ve operasyonel otomasyon için yalnızca sunucu tarafında sakla.
- **`SUPABASE_SERVICE_ROLE_KEY`** değerini yalnızca ayrıcalıklı veri işlemlerinde kullan.
- **`ADMIN_USER_NAME`** ve **`ADMIN_PASSWORD`** değerlerini deploy ortamı secret yönetimi içinde koru.

## 4. Backend İşlevlerini Ayrıştır
- Kimlik doğrulama, yetkilendirme ve yönetim erişim kontrolünü backend’de yap.
- Arayüzden gelen veri taleplerini doğrulama ve iş kuralı filtresinden geçir.
- AI çağrılarını, arama entegrasyonlarını ve orchestration akışlarını backend üzerinden yürüt.
- Kullanıcıdan gelen input’u doğrudan veritabanına değil, servis katmanına indir.
- Log, tracing, hata yönetimi ve operasyonel denetimi merkezi backend mantığında topla.

## 5. Backend – Veritabanı İlişkisini Sunucu Tarafında Yönet
- **`DATABASE_URL`** değerini backend’in temel veritabanı bağlantı referansı olarak kullan.
- **`NETLIFY_DATABASE_URL`** değerini Netlify bağlamlı veri erişim akışlarında kullan.
- **`NETLIFY_DATABASE_URL_PRODUCTION`** değerini yalnızca production veri ortamında işlet.
- Veritabanı connection bilgisini istemciye aktarma.
- Public erişimle yapılmayacak tüm veri işlemlerini backend üzerinden geçir.

## 6. Backend – Dış Servis İlişkisini Merkezi Hale Getir
- OpenAI çağrılarını doğrudan tarayıcıdan değil, backend üzerinden başlat.
- Tavily veya benzeri araştırma servislerini function katmanı üzerinden çağır.
- GitHub repository, branch ve deploy ilişkili operasyonları sunucu tarafında sınırla.
- Gözlemleme ve tracing kayıtlarını kullanıcı tarafına taşımadan sunucu tarafında işle.
- Üçüncü taraf servis hatalarını istemciye ham biçimde yansıtma.

## 7. Backend Yayın ve Operasyon Düzenini Kur
- GitHub push ve branch değişikliklerini Netlify deploy akışına bağla.
- Production ve preview function davranışlarını ayrı bağlamlarda test et.
- Soğuk başlangıç, süre sınırı ve bağlantı yönetimini serverless çalışma modeline göre optimize et.
- Canlı hata kayıtlarını ve invocation loglarını düzenli denetle.
- Kritik fonksiyonlarda sessiz hata yerine izlenebilir hata modeli uygula.

---

# 🗄️ Veritabanı (Supabase)

## 1. Veritabanı Platformunu Supabase Olarak Sabitle
- Veritabanı katmanını **Supabase PostgreSQL** üzerinde kur.
- Uygulama verisini, meta veriyi ve operasyonel kayıtları bu platform üzerinde yönet.
- Supabase’i yalnızca veri saklama alanı değil, erişim politikası ve güvenlik katmanı olarak da kullan.
- Production veri omurgasını bu katmanda merkezileştir.

## 2. Veritabanı Bağlantı Katmanını Ayrıştır
- **`DATABASE_URL`** değerini ana bağlantı referansı olarak ele al.
- **`SUPABASE_CONNECT`** değerini uygulamanın Supabase entegrasyon bağlamı olarak kullan.
- **`SUPABASE_DATABASE_PASSWORD`** değerini doğrudan istemciye açmadan yalnızca güvenli sunucu süreçlerinde kullan.
- Preview, branch ve production veritabanı erişimlerini ayrı bağlamlarda yönet.
- Uygulama ortamına göre bağlantı uçlarını karıştırma.

## 3. Supabase Anahtar Rollerini Netleştir
- **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`** değerini yalnızca istemci tarafındaki sınırlı erişimler için kullan.
- **`SUPABASE_SERVICE_ROLE_KEY`** değerini yalnızca backend’in ayrıcalıklı erişimleri için kullan.
- Public ve service role anahtarlarını aynı işlem hattında karıştırma.
- Service role kullanılan işlemleri kullanıcı tarayıcısından tamamen izole tut.
- Anahtar rotasyonunu ortam bazlı yönet.

## 4. Veri Sorumluluklarını Domain Bazlı Düzenle
- Chatflow kayıtlarını, node ilişkilerini ve çalışma akışı verilerini ayrı veri sorumluluklarıyla yönet.
- Credentials, variables, workspace, settings ve benzeri yönetim verilerini kontrollü tablolar halinde düzenle.
- Dataset, docstore ve ilişkili metadata yapılarını ayrı domain alanları olarak ele al.
- Kullanıcı, rol, erişim ve operasyonel log verilerini birbirine karıştırma.
- Görsel arayüzdeki her ana domaini veritabanında kontrollü ve sürdürülebilir karşılıklarla eşleştir.

## 5. Erişim Güvenliğini Supabase Politikalarıyla Kur
- Public istemci erişimlerini sınırlı tut.
- Row Level Security ve benzeri erişim politikalarını kullanıcı bazlı veri koruması için uygula.
- Ayrıcalıklı güncelleme, silme, yönetim ve sistem işlemlerini yalnızca backend üzerinden geçir.
- Tarayıcıdan yalnızca izinli ve güvenli veri yüzeylerini aç.
- Kritik tablo ve kayıtları doğrudan istemci mutation akışına bırakma.

## 6. Veritabanı Operasyonlarını Canlı Ortama Göre Yönet
- Production verisini preview verisinden ayır.
- Yedekleme, geri yükleme ve veri bütünlüğü kontrollerini düzenli yap.
- Büyük veri veya dosya ilişkili yapıları doğrudan uygulama tablolarına gömme.
- Gözlemleme, performans izleme ve sorgu optimizasyonunu canlı trafik davranışına göre uygula.
- Veri değişikliklerini deploy akışlarından bağımsız değil, koordineli biçimde yönet.

## 7. Veritabanı – Backend – Arayüz Sınırlarını Koru
- Arayüzün doğrudan tüm veri yüzeyine erişmesine izin verme.
- Backend’i iş kuralı ve ayrıcalıklı erişim kapısı olarak kullan.
- Veritabanını uygulama içi tüm kalıcı verinin tek kaynağı olarak koru.
- Tarayıcıya yalnızca gerekli public okuma ve güvenli kullanıcı etkileşimi düzeyinde erişim aç.
- Kritik veri kararlarını istemci katmanına bırakma.

---

# 🔐 Ortam Değişkenleri ve Katman Sorumluluğu

## 1. Public Değişkenleri Yalnızca İstemci İçin Kullan
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Bu değişkenleri yalnızca tarayıcıda görünmesi sakıncalı olmayan yapılandırmalar için kullan.
- Public değişkenleri secret, admin veya connection string taşıyan alanlarla karıştırma.
- Deploy öncesi istemciye gömülen değişkenleri gözden geçir.

## 2. Sunucu Gizli Değişkenlerini Ayrı Güvenlik Sınıfında Tut
- `OPENAI_API_KEY`
- `TAVILY_API_KEY`
- `LANGSMITH_API_KEY`
- `LANGCHAIN_TRACING_V2`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DATABASE_PASSWORD`
- `DATABASE_URL`
- `NETLIFY_DATABASE_URL`
- `NETLIFY_DATABASE_URL_PRODUCTION`
- Bu değişkenleri yalnızca backend veya deploy ortamında kullan.

## 3. Yönetim ve Operasyon Değişkenlerini Ayrı Yönet
- `ADMIN_USER_NAME`
- `ADMIN_PASSWORD`
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`
- `NETLIFY_PROJECT_URL`
- `NETLIFY_ADMIN_URL`
- `GITHUB_TOKEN`
- Bu değerleri uygulama kodundan değil, platform ve CI/CD katmanından yönet.

## 4. Repository ve Yayın Kimliğini Netleştir
- `GITHUB_OWNER`
- `GITHUB_REPO_NAME`
- `GITHUB_REPO_FULL`
- `GITHUB_REPO_URL`
- `GITHUB_DEFAULT_BRANCH`
- `NETLIFY_SITE_NAME`
- `NETLIFY_SITE_DOMAIN`
- `NETLIFY_SITE_URL`
- `NETLIFY_PRODUCTION_URL`
- Bu değerleri deploy doğrulama, branch yönetimi ve operasyon görünürlüğü için kullan.

---

# 🚀 Canlı Ortam Çalışma Senaryosu

## 1. GitHub Kaynağını Ana Dağıtım Girişi Olarak Kullan
- Tüm kod değişikliklerini GitHub repository üzerinden yönet.
- Ana branch’i production yayın kaynağı olarak belirle.
- Feature branch ve preview akışlarını ayrı doğrulama katmanları olarak işlet.
- Repository ile Netlify projesi arasındaki ilişkiyi sabit tut.

## 2. Netlify Üzerinden Arayüzü Yayınla
- Frontend build sürecini Netlify deploy hattına bağla.
- Branch deploy, deploy preview ve production deploy ayrımını koru.
- Canlı alan adını ve branch URL’lerini düzenli doğrula.
- Kullanıcıya açık arayüz davranışını production ortamında esas al.

## 3. Netlify Functions Üzerinden Backend’i Çalıştır
- API, doğrulama ve servis çağrılarını function katmanında işlet.
- Hassas veri işlemlerini bu katmandan geçir.
- AI ve dış servis çağrılarını function seviyesinde başlat.
- Log ve hata takibini canlı invocation davranışıyla birlikte izle.

## 4. Supabase Üzerinden Kalıcı Veriyi Yönet
- Kullanıcı verisi, uygulama verisi ve operasyonel veriyi Supabase üzerinde tut.
- Erişim politikalarını public ve privileged katmanlar olarak ayır.
- Service role kullanan işlemleri yalnızca backend’e sınırla.
- Production verisini preview verisinden izole tut.

## 5. Yayın Sonrası Doğrulama Disiplini Uygula
- Canlı URL’yi doğrula.
- Yönetim girişini doğrula.
- Supabase bağlantısını doğrula.
- Backend function çağrılarını doğrula.
- AI servis erişimini doğrula.
- Hata loglarını ve tracing kayıtlarını kontrol et.
- Branch preview ile production davranışını karşılaştır.

---

# 💻 Lokal Çalışma Senaryosu

## 1. Repository’yi Yerel Ortama Hazırla
- Repository’yi klonla.
- Gerekli Node ve paket yöneticisi sürümünü kur.
- Monorepo bağımlılıklarını kökten yükle.
- Yerel çalışma öncesi temel build doğrulamasını yap.
- Frontend ve backend için ayrı `.env` dosyaları hazırla.

## 2. Arayüzü Yerelde İzole Çalıştır
- `packages/ui` altında yerel istemci yapılandırmasını hazırla.
- Public Supabase değişkenlerini yerel bağlama göre düzenle.
- Geliştirme sunucusunu ayrı portta çalıştır.
- Ekran, route ve kullanıcı akışlarını tarayıcıda doğrula.
- Production public key ve URL’lerini yanlışlıkla yerelde kullanma.

## 3. Backend’i Yerelde Ayrı Doğrula
- `packages/server` altında sunucu yapılandırmasını hazırla.
- AI, GitHub ve Supabase secret’larını yalnızca yerel sunucu sürecinde yükle.
- API mantığını geliştirme modunda çalıştır.
- İstek–cevap, doğrulama ve yetki akışlarını test et.
- Service role anahtarını istemciye sızdırmadığını doğrula.

## 4. Veritabanını Yerelde Güvenli Kapsamda Kullan
- Yerel geliştirmede production veri tabanına doğrudan bağlanma.
- İzole test veya preview verisini kullan.
- Public ve privileged erişim senaryolarını ayrı ayrı test et.
- Migration ve veri değişikliklerini kontrollü uygula.
- Yerel veri akışını production veriyle karıştırma.

## 5. Yayına Geçmeden Önce Uçtan Uca Kontrol Et
- Frontend build’ini doğrula.
- Backend işlevlerini doğrula.
- Supabase erişimini doğrula.
- Yönetim girişini doğrula.
- AI servis entegrasyonlarını doğrula.
- Branch preview davranışını doğrula.
- Hata ve tracing kayıtlarını incele.
- Ortam değişkeni eksikliği kalmadığını teyit et.
