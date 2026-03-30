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
🧭 Flowise UI, Backend ve Veritabanı Entegrasyon Kılavuzu

Bu doküman, mono-repo yapısında geliştirilen Flowise uygulamasının saf sürümünü ayrıntılı şekilde açıklar. İçerikte arayüz dosyaları, backend katmanı ve Supabase veritabanı etkileşimi üzerinde durulmuştur. Her dosya satır sayısına göre madde madde analiz edilerek ne yaptığı, hangi kullanıcı akışını etkilediği ve sistemdeki rolü net şekilde belirtilmiştir.

🗄️ 3 – Veritabanı Katmanı

Flowise verilerini kalıcı olarak depolamak için Supabase PostgreSQL kullanılır. Backend’de DATABASE_URL üzerinden tanımlı bağlantı adresi okunur ve TypeORM ile DataSource oluşturulur. Tablolar, packages/server/src/database/entities içinde tanımlanan entity sınıflarından üretilir. Chatflow, agentflow, credential, dataset, document store ve execution gibi domain nesnelerinin her biri kendi tablolarında saklanır. CRUD işlemleri backend servis katmanı üzerinden yürütülür; frontend doğrudan veritabanına erişmez. Row Level Security gibi politikalar Supabase tarafında uygulanarak istemci tarafına sadece yetkili veriler açılır.

🌐 4 – Canlı Ortam ve Yerel Ortam Ayrımı
Canlı ortam: GitHub’tan Netlify’a otomatik olarak deploy edilir. Frontend packages/ui dizininden build edilir; backend Netlify Functions veya kendi sunucunuzda çalıştırılır. DATABASE_URL ve diğer secret’lar production ortamında tanımlı olmalıdır.
Yerel ortam: Geliştirme sırasında pnpm install ve pnpm dev komutlarıyla hem frontend hem backend’i çalıştırabilirsiniz. .env dosyalarını packages/ui ve packages/server içinde oluşturmanız gerekir. VITE_API_BASE_URL olarak http://localhost:3000 ayarlanır. Supabase’e bağlanmak için development veritabanı kullanılır.
✅ Sonuç ve Sonraki Adımlar

Bu README, projenin arayüz katmanındaki ana dosyaları, route akışını ve önemli bileşenleri kapsamlı biçimde analiz etti. Backend ve veritabanı etkileşimi yüksek seviyede özetlendi. Eksik görülen dosya veya modüller için benzer analitik yaklaşımı sürdürerek Flowise’in tam davranışını belgelendirebilirsiniz. Bu rehber, arayüzün backend ve veritabanı ile nasıl iletişim kurduğunu anlamaya çalışan geliştiricilere yol gösterir.
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

🧭 Flowise UI, Backend ve Veritabanı Entegrasyon Kılavuzu

Bu doküman, mono-repo yapısında geliştirilen Flowise uygulamasının saf sürümünü ayrıntılı şekilde açıklar. İçerikte arayüz dosyaları, backend katmanı ve Supabase veritabanı etkileşimi üzerinde durulmuştur. Her dosya satır sayısına göre madde madde analiz edilerek ne yaptığı, hangi kullanıcı akışını etkilediği ve sistemdeki rolü net şekilde belirtilmiştir.

🖥️ 1 – Arayüz Katmanı (UI)

Arayüz, packages/ui/src klasöründe yer alır ve React + Redux mimarisi ile inşa edilmiştir. Bileşenler, route tanımları, durum yönetimi, tema ve API istemcileri bu katmanda barındırılır.

1.1 index.jsx (39 satır → 5 madde)
Uygulamanın kök konteynerini yakalar, ReactDOM.createRoot ile render işlemini başlatır, tarayıcıda görünür hale gelmesini sağlar.
Global scss stil dosyasını ve tüm gerekli modülleri içe aktarır; stil tutarlılığı için uygulama çapında kullanılacak temayı yükler.
Redux store nesnesini Provider ile sarmalar, BrowserRouter ve diğer context sağlayıcılarıyla bileşen ağacını çevreler.
SnackbarProvider ile anlık bildirimler sağlar; Config, Error, Confirm ve ReactFlow context’leri ile akış çizim editörü için gerekli ortamı kurar.
StrictMode kullanarak alt bileşenlerin hatalara karşı denetlenmesini sağlar, App bileşenini DOM ağacına yerleştirir.
1.2 App.jsx (32 satır → 5 madde)
MUI’nin StyledEngineProvider ve ThemeProvider bileşenleriyle temayı uygular; themes(customization) fonksiyonu ile kullanıcı tercihlerine göre günceller.
CssBaseline bileşeniyle tarayıcıdan gelen varsayılan css farklılıklarını sıfırlar, tutarlı bir başlangıç noktası sağlar.
Uygulama içi gezinmeyi NavigationScroll bileşeniyle sarmalar; bu bileşen sayfa geçişlerinde otomatik üst kısma kaydırma özelliği sunar.
useSelector hook’u ile redux durumundan tema ve görünüm ayarlarını okur; her render’da güncel değerleri kullanır.
Routes bileşenini çağırarak tüm route ağacını burada oluşturur; App bileşeni UI’nin kök bileşeni olarak çalışır.
1.3 routes/index.jsx (16 satır → 3 madde)
useRoutes hook’u ile route tanımlarını içeren yapı dizisini işler ve uygun bileşeni render eder.
Uygulamada kullanılacak alt rota kümelerini (MainRoutes, CanvasRoutes, ChatbotRoutes, AuthRoutes, ExecutionRoutes, NetlifyLiteRoutes) içeri aktarır ve sıralı şekilde geçer.
config.basename parametresini kullanarak alt dizine kurulmuş uygulamalar için route’ların temelini ayarlar; route ağacının giriş noktasıdır.
1.4 MainRoutes.jsx (369 satır → 12 madde)
Tüm ana sayfa ve kontrol panellerini barındıran route ağacını tanımlar; her alt rota için yetki kontrolü uygular (RequireAuth).
import.meta.env.VITE_NETLIFY_LITE bayrağına göre Netlify Lite modunda ana layout ve landing page’yi ayarlar; Flowise’in saf sürümünde bu bayrak false olmalı.
/chatflows, /agentflows, /marketplaces, /apikey, /tools gibi route’larda ilgili ekran bileşenlerini lazy-loaded şekilde yükler; performansı artırır.
Asistan yönetimi için /assistants, /assistants/custom, /assistants/openai alt yollarını ayırır; özel asistan konfigürasyon sayfalarını tanımlar.
Credentials, Variables, Documents, VectorStoreConfigure, VectorStoreQuery ve ShowStoredChunks sayfalarını yönlendirir; veri saklama ve yapılandırma ekranlarını açar.
Eval modülleri için /datasets, /evaluation_results/:id, /evaluators gibi yollar oluşturur; veri kümesi satırları ve değerlendirme sonuçlarını inceler.
/executions route’u agent execution geçmişini listeler; public execution detaylarına yönlendiren route da ayrıca tanımlanır.
Log ekranını (/logs), dosya yönetimini (/files) ve hesap ayarlarını (/account) içeren rotalar içerir; kullanıcıya operasyonel yönetim yüzeyi sunar.
Kurumsal özellikleri etkinleştiren /users, /roles, /login-activity, /workspaces, /workspace-users/:id gibi route’lar vardır; yalnızca enterprise lisanslı sürümlerde görünür.
SSO yapılandırması ve doğrulama ekranları (/sso-config, /sso-success) route dizisinin son kısmında tanımlanır.
Route ağacındaki her eleman için RequireAuth bileşeni ile izin ve feature flag kontrolü yapılır; yetkisiz kullanıcılar otomatik olarak /unauthorized sayfasına yönlendirilir.
Export ile MainRoutes nesnesini dışa aktarır; route tanımlarının merkezi kaynağı olarak kullanılır.
1.5 CanvasRoutes.jsx (87 satır → 8 madde)
Canvas tabanlı düzenleme ekranlarını yöneten route ağacıdır; MinimalLayout altında çalışır.
/canvas ve /canvas/:id yolları chatflow ve agentflow görsel editörlerini yükler; kullanıcı izin kontrolü yapar.
/agentcanvas ve /agentcanvas/:id yolları agent flow düzenleme için ayrılmıştır; aynı bileşen tekrar kullanılır.
/v2/agentcanvas ve /v2/agentcanvas/:id yollarında yeni nesil Agentflow V2 editörü (CanvasV2) yüklenir.
Marketplace’ten alınan şablonlar için /marketplace/:id ve /v2/marketplace/:id yolları vardır; template’lerin canvas üzerinde düzenlenmesini sağlar.
Her route için RequireAuth kontrolü ile yetkisiz kullanıcıların erişimi engellenir.
Lazy-loaded bileşenler performansı artırır; ilk yüklemede bu dosyalar indirilmeyerek ana bundle küçük tutulur.
Export ile CanvasRoutes dışa aktarılır; route ağacının bir parçası olarak kullanılır.
1.6 ChatbotRoutes.jsx (23 satır → 3 madde)
Minimal layout altında yalnızca tek rota tanımlar; /chatbot/:id adresinde tam sayfa chatbot bileşenini (ChatbotFull) yükler.
Chatbot bileşeni lazy-loaded olarak import edilir; kimlik doğrulaması gerekmez, halka açık sohbet sayfasıdır.
Export ile ChatbotRoutes dışa aktarılır; route ağacına eklendiğinde chatbot URL’leri çalışır.
1.7 ExecutionRoutes.jsx (22 satır → 3 madde)
Minimal layout altında tek rota tanımlar; /execution/:id yolunda public execution detay bileşenini (PublicExecutionDetails) render eder.
Bu route, kullanıcıya açık olan belirli agent execution ayrıntılarını görüntüler; kimlik doğrulaması gerektirmez.
Export ile ExecutionRoutes dışa aktarılır; route ağacına dahil edildiğinde execution URL’leri aktif olur.
1.8 AuthRoutes.jsx (64 satır → 7 madde)
Tüm kimlik doğrulama ekranlarını ve yetkilendirme mesajlarını yöneten route dizisidir; AuthLayout altında render olur.
/login rotası ResolveLoginPage bileşenini çağırarak oturum durumuna göre login veya yönlendirme yapar; /signin, /register, /verify gibi rota alt kümeleri kullanılır.
Şifre sıfırlama ve hesap kurtarma işlemleri için /forgot-password ve /reset-password yolları vardır; kullanıcı girdilerini backend’e gönderir.
/unauthorized, /rate-limited, /license-expired gibi durum sayfaları yetkisiz veya sınırlı erişim durumlarında gösterilir.
OrganizationSetupPage rota üzerinden organizasyon kurulum sihirbazını başlatır; ekip oluşturma süreçlerini yönetir.
Bütün bileşenler lazy-loaded olarak import edilir; yalnızca ihtiyaç duyulduğunda yüklenir.
Export ile AuthRoutes dışa aktarılır; route ağacına eklendiğinde kimlik ekranları çalışır.
1.9 RequireAuth.jsx (94 satır → 9 madde)
Route koruma bileşenidir; kullanıcı oturumunu, izinlerini ve feature flag’leri kontrol ederek erişimi belirler.
useAuth hook’u ile oturum bilgilerinin geçerliliğini sorgular; useConfig ile deployment tipini (isCloud, isOpenSource, isEnterpriseLicensed) ve yükleme durumunu alır.
Redux store’dan auth.isGlobal, auth.user, auth.features, auth.permissions değerlerini okur; global admin ve normal kullanıcı ayrımını yapar.
Yükleme durumunda boş render döndürür; kullanıcı bilgileri gelmeden önce hiçbir içerik göstermez.
Oturum yoksa login sayfasına yönlendirir; open source modunda display özelliği olmayan route’lara izin verir, feature flag’li route’ları kapatır.
Cloud ve Enterprise modlarında hem permission hem de feature flag kontrolü yapar; global admin’ler izin kontrolünü atlar.
display parametresi set edildiğinde özellik bayrağını kontrol eder; yetkisiz veya kapalı özellikte ise /unauthorized’a yönlendirir.
Standart route’larda yalnızca permission kontrolü yapılır; permission yoksa unauthorized sayfası açılır.
Hiçbir platform tipi eşleşmediğinde erişim reddedilir; fallback olarak unauthorized sayfası render edilir.
1.10 constant.js (116 satır → 7 madde)
Proje genelinde kullanılan sabit değerleri ve ikon haritalarını içerir; drawer genişliği, header yüksekliği ve grid boşluk değerlerini tanımlar.
baseURL ve uiBaseURL değişkenlerini import.meta.env üzerinden okur; API çağrılarına temel oluşturur ve istek kökünü belirler.
FLOWISE_CREDENTIAL_ID ve REDACTED_CREDENTIAL_VALUE gibi sabitler, credential yönetimi sırasında kullanılır; gizli verilerin log’lanmasını engeller.
ErrorMessage nesnesi, kullanıcıya gösterilecek standart hata mesajlarını merkezi olarak tanımlar; API istemcisi tarafından kullanılır.
AGENTFLOW_ICONS dizisi, Agentflow node tiplerine karşılık gelen ikon bileşenlerini ve renkleri listeler; UI’de node paletini oluşturur.
Her ikon objesinde node adı, ikon bileşeni ve renk kodu tanımlıdır; Agentflow editörü ikonlar üzerinden node tipini ayırt eder.
Bu dosya, uygulamanın pek çok yerinde import edilerek sabit kullanımını tek noktadan yönetir.
1.11 client.js (39 satır → 5 madde)
axios.create ile yeni bir API istemcisi oluşturur; baseURL değişkeni üzerinden /api/v1 uzantısına sabitlenir.
Varsayılan başlıklarda JSON içerik tipi ve x-request-from: internal header’ı gönderilir; sunucu tarafında isteğin kaynağı ayırt edilir.
withCredentials: true ayarı, tarayıcı çerezlerini otomatik olarak gönderir; refresh token mekanizması için gereklidir.
Response interceptor’ü 401 durum kodunu yakalar; token süresi dolduğunda refresh işlemini tetikler ve başarısızsa localStorage ve auth context’ini temizler.
Hata durumlarında Promise.reject ile hatayı çağıran koda iletir; merkezi hata yönetimi bileşenleri tarafından ele alınır.
1.12 Chatflows/index.jsx (238 satır → 10 madde)
useEffect ve useState hook’larıyla chatflow listesini yönetir; sayfa yüklendiğinde getAllChatflowsApi.request fonksiyonunu çağırarak veriyi backend’den çeker.
search, view, currentPage, pageLimit ve total durumlarıyla listeleme görünümünü, arama filtresini ve sayfalamayı kontrol eder.
FlowListTable ve ItemCard bileşenlerini kullanarak kart ve tablo görünümü arasında geçiş yapar; kullanıcı tercihini localStorage’da saklar.
applyFilters fonksiyonu parametre olarak sayfa ve limit alır; API çağrısını parametrelerle yaparak filtrelenmiş veri getirir.
filterFlows fonksiyonu arama kutusuna göre veri dizisini süzer; isim, kategori veya id içinde geçen kelimelerle eşleştirir.
goToCanvas fonksiyonu, seçilen chatflow id’sini URL’ye ekleyerek Canvas editörüne yönlendirir; addNew fonksiyonu boş Canvas açar.
useApi hook’u ile chatflows API’larını çağırır; isLoading ve hata durumlarını otomatik olarak yönetir.
Liste boş olduğunda veya veri yüklenirken Skeleton ve “No Chatflows Yet” görselleri gösterir; kullanıcı deneyimini güçlendirir.
ConfirmDialog bileşeni global onay penceresini tanımlar; chatflow silme gibi işlemlerde tekrar kullanılmak üzere eklenmiştir.
Toplam veri sayısını TablePagination bileşeni ile gösterir; sayfa değiştirme her seferinde yeni API çağrısı yapar.
⚙️ 2 – Backend Katmanı

Projenin backend’i packages/server klasöründe yer alır. Flowise çekirdeği Express üzerine kurulu Node.js API’sidir. Frontend’den gelen istekler /api/v1 altında toplanır ve ilgili controller’lara yönlendirilir. Erişim kontrolü, token doğrulama, veri işleme ve dış servis entegrasyonları backend’de yapılır. Route–controller–service ayrımı mevcuttur ve veritabanı işlemleri için repository katmanı kullanılır. Örneğin, chatflow listesini GET /api/v1/chatflows endpoint’i döndürür, bu endpoint packages/server/src/routes/chatflows.ts içinde tanımlıdır ve chatflowService.getAllChatflows fonksiyonu ile veritabanından veri çeker.

Bu bölümde, saf Flowise backend dosyalarını keşfederek her bir dosyanın satır sayısı ve rolünü ayrıntılı şekilde listeledik. Amacımız, mevcut demoyu Netlify Functions ile çalıştırırken ileride ücretli SQL ortamına taşındığında sorunsuz geçiş yapabilmektir. Aşağıdaki analizde satır aralıklarına göre UI kuralının 2× bullet sayısı uygulanmıştır.

2.1 DataSource.ts – Veritabanı Başlatıcısı (121 satır → 14 madde)
Uygulama başlatıldığında init fonksiyonu çalışarak .flowise dizinini oluşturur ve veritabanı dosyası için ana yolu belirler.
DATABASE_TYPE ortam değişkenine göre SQLite, MySQL, MariaDB veya Postgres için özel DataSource konfigürasyonu kurar.
Her veritabanı tipinde entities listesini ve ilgili migrations dizisini yükleyerek TypeORM’in veritabanı yapılandırmasını sağlar.
MySQL ve MariaDB konfigürasyonlarında host, port, kullanıcı adı, parola ve SSL seçeneklerini ortam değişkenlerinden alır.
Postgres konfigürasyonunda ekstra parametrelerle idle timeout, gelişmiş log düzeyi ve özel pool hata yönetimi kurulur.
Varsayılan durumda SQLite kullanılır; dosya yolu DATABASE_PATH veya kullanıcı ev dizinindeki .flowise/database.sqlite olarak belirlenir.
getDataSource fonksiyonu, appDataSource henüz oluşturulmamışsa init fonksiyonunu tetikleyerek tek örneğin döndürülmesini garanti eder.
getDatabaseSSLFromEnv fonksiyonu, DATABASE_SSL_KEY_BASE64 değerini çözerek TLS sertifikasını üretir veya DATABASE_SSL bayrağına göre SSL’yi etkinleştirir.
Modül dışa aktarımında yalnızca veri kaynağı ve SSL yardımcı fonksiyonu sunulur; böylece diğer dosyalar salt okunur erişim sağlar.
Çalışma sırasında veritabanı türü değiştirilmek istenirse process.env üzerindeki değişiklikler yeni bağlantı nesnesi yaratılana kadar etkisizdir.
Bağlantı kurulumu sırasında synchronize: false ve migrationsRun: false ayarlanarak manuel migration kontrolü tercih edilir.
Veritabanı açılmadan önce dizin varlığı kontrol edilir, eksikse oluşturulur; bu, CI/CD ortamlarında dosya yolu sorunlarını engeller.
Veritabanı bağlantısında tanımlı ssl yapılandırması yoksa varsayılan olarak SSL devre dışı kalır.
DataSource nesnesi uygulamanın tüm repository ve servis katmanları tarafından paylaşılarak merkezi veri erişimi oluşturur.
2.2 index.ts – Sunucu Başlatıcısı (390 satır → 26 madde)
Express tabanlı sunucuyu başlatmak için gerekli modüller, entity sınıfları, middleware’ler ve yardımcı sınıflar içe aktarılır.
App sınıfı express.Application, NodesPool, AbortControllerPool, CachePool, Telemetry, RateLimiterManager gibi bileşenleri örnek değişkenler olarak tanımlar.
initDatabase metodu veritabanını initialize eder, migration’ları çalıştırır, kimlik yöneticisini kurar ve node havuzunu hazırlar.
Abort controller, şifreleme anahtarı ve kimlik secret’larının başlatılması sırasıyla kaydedilir; her adım log mesajıyla raporlanır.
Rate limiters, cache pool, usage cache yöneticisi, telemetry ve SSE yayıncısı art arda initialize edilir; her bileşenin durum bilgisi log’lanır.
Kuyruk modu (MODE.QUEUE) etkin ise QueueManager kurulur; BullMQ dashboard için express adapter ayarlanır ve Redis abonesi bağlanır.
config metodu JSON ve URL-encoded payload sınırlarını FLOWISE_FILE_SIZE_LIMIT değişkeni üzerinden alır; cors, cookieParser ve XSS koruma middleware’lerini yükler.
trust proxy ayarı ortam değişkenine göre belirlenir; sayısal, boolean veya boş değerlerin her biri farklı mantıkla ele alınır.
Güvenli iframe kaynakları için header ayarlanır; frame-ancestors Content-Security-Policy değeri izin verilen domain’lerle oluşturulur.
Request logger, XSS sanitizer ve JWT cookie middleware’leri isteklere sıra ile uygulanır; böylece her istek izlenir ve temizlenir.
API isteklerinde büyük-küçük harfe duyarlı /api/v1 kontrolü yapılır; whitelist dışındaki yollar için token veya API anahtarı doğrulaması ve lisans kontrolü yapılır.
API anahtarının workspace ve organization ile eşleşmesi denetlenir; workspace veya organization bulunamazsa 401 hatası döndürülür.
Lisans durumu open source değilse, geçerli lisans bulunmazsa yetkisiz erişim olarak reddedilir.
API anahtarının yetkileri ve abonelikten türetilen özellikler req.user nesnesine eklenir; sonraki middleware’ler bu bilgiyi kullanır.
SSO yapılandırması, JWT cookie middleware’inden sonra çağrılır; cloud veya enterprise platformlarında login metodlarını veritabanından okur ve SSO sağlayıcılarını başlatır.
Metricas toplayıcısı ortam değişkeni ENABLE_METRICS ve METRICS_PROVIDER üzerinden seçilir; Prometheus veya OpenTelemetry olarak initialize edilir.
/api/v1 router’ı üzerinden Flowise API v1 rotaları projeye eklenir; bu router packages/server/src/routes/index.ts dosyasında tanımlıdır.
/api/v1/ip endpoint’i, rate limiter kurulumunda proxy sayısını doğrulamak için ip adresi döndürür ve kullanıcıya dokümantasyon linki sağlar.
BullMQ dashboard kullanılıyorsa /admin/queues rotası rate limiter ve token doğrulama ile korunur; sadece enterprise olmayan cloud olmayan ortamlarda gösterilir.
UI build’i sunmak için flowise-ui paketinin build klasörü statik olarak servis edilir; tüm diğer isteklerde index.html dönülerek React router’a bırakılır.
Global hata yakalayıcı middleware, isteklerin en sonunda eklenerek beklenmeyen hataların kullanıcı dostu mesajlara dönüşmesini sağlar.
stopApp fonksiyonu, telemetry flush ve Redis abonelerini kapatma gibi temizlik işlemlerini yaparak sunucuyu güvenli şekilde durdurur.
start fonksiyonu App örneğini oluşturur, veritabanını initialize eder, konfigürasyonları uygular ve HTTP sunucusunu belirlenen host ve portta dinlemeye başlatır.
getInstance fonksiyonu singleton App örneğini döndürür; diğer modüller bu fonksiyon ile mevcut instance’a erişebilir.
Her initialization adımında log mesajı basılarak sistem yöneticisinin süreçleri izlemesi kolaylaştırılır.
Dosya, Flowise server’ının çekirdek uygulama sınıfını kapsar; backend’in diğer tüm modülleri bu sınıfın örneğine bağlıdır.
2.3 IdentityManager.ts – Kimlik ve Lisans Yönetimi (524 satır → 32 madde)
Dosya, Flowise Enterprise ve Cloud sürümlerinin lisans doğrulaması, SSO kurulumu ve abonelik yönetimi için merkezi sınıfı içerir.
Çeşitli SSO sağlayıcıları (Azure, Google, Auth0, Github) ile entegrasyonu mümkün kılar; her sağlayıcı için yapılandırma ve başlatma fonksiyonları barındırır.
IdentityManager sınıfı singleton olarak tasarlanır; getInstance metodu çağrıldığında gerekirse nesneyi yaratır ve initialize eder.
initialize fonksiyonu lisans anahtarını doğrular, Permissions nesnesi oluşturur ve Stripe entegrasyonunu kurar.
getPlatformType, isEnterprise, isCloud ve isOpenSource fonksiyonları geçerli platform türünü ve lisans durumunu sorgular.
_offlineVerifyLicense fonksiyonu RSA public key kullanarak lisans anahtarını yerel olarak doğrular; hatalı anahtar durumunda null döndürür.
_validateLicenseKey fonksiyonu lisans anahtarının varlığını kontrol eder, çevrimdışı veya uzaktan doğrulama moduna göre lisansın geçerliliğini belirler.
initializeSSO fonksiyonu Enterprise veya Cloud modunda login metodlarını veritabanından okur ve uygun SSO sağlayıcılarını başlatır.
initializeEmptySSO fonksiyonu, desteklenen tüm SSO sağlayıcılarını kapalı durumda dahi haritaya ekleyerek potansiyel konfigürasyonları hazırlar.
initializeSsoProvider fonksiyonu, provider adına göre doğru sınıfı seçer ve configEnabled bayrağına göre aktif veya pasif hale getirir.
getRefreshToken fonksiyonu, belirli bir SSO sağlayıcısından refresh token almak için ilgili sınıfın metodunu çağırır.
Stripe entegrasyonu için getProductIdFromSubscription, getFeaturesByPlan, createStripeCustomerPortalSession, getAdditionalSeatsQuantity ve benzeri metotlar tanımlanmıştır; abonelik bilgilerini yönetir.
checkFeatureByPlan statik metodu, belirli bir özelliğin kullanıcı planında aktif olup olmadığını kontrol eden bir Express middleware’i oluşturur.
updateAdditionalSeats fonksiyonu, ek koltuk sayısını artırmak için Stripe aboneliğini günceller ve Flowise kullanım kotalarını cache’e işler.
updateSubscriptionPlan fonksiyonu, müşterinin planını değiştirir, yeni kotaları hesaplar, cache’i günceller ve kullanıcı oturumu ile güncel bilgileri paylaşır.
Lisans anahtarı yoksa veya doğrulama başarısız olursa licenseValid bayrağı false kalır ve platform OPEN_SOURCE olarak ayarlanır.
Lisans doğrulamasında API’ye bağlanılamazsa, hata log’lanır ve lisans geçersiz sayılır; Enterprise modunda bile sistem Open Source davranışına geri düşer.
initializeSSO sırasında organizasyon bilgileri bulunamazsa tüm SSO sağlayıcıları pasif olarak yüklenir ve configEnabled false olur.
initializeSsoProvider içinde bilinmeyen provider adı verildiğinde hata fırlatılır; bu, yanlış konfigürasyonların erken tespitini sağlar.
getAdditionalSeatsProration ve getPlanProration fonksiyonları, plan değişikliklerinde Stripe tarafından hesaplanan ek ücretleri toplar.
createStripeUserAndSubscribe fonksiyonu, e-posta ve plan bilgisi ile Stripe’ta müşteri ve abonelik oluşturur; referral verisini metadata’da saklar.
getAdditionalSeatsQuantity metodu, abonelikteki ek koltuk sayısını okur ve hesaplama yapmak için kullanır.
Kullanıcı oturum bilgileri LoggedInUser arabirimine uygun olarak Express req.user içine enjekte edilir; kimlik doğrulama ve yetki kontrolleri bu bilgiyi kullanır.
Lisanssız bir sistemde SSO yapıları pasif kalır; kimlik doğrulama yalnızca e-posta ve şifre ile yapılır.
Yüksek satır sayısı, dosyada hem lisans kontrolü hem de ödeme işlemleri logic’lerinin birleştiğini gösterir; bu nedenle modülerliğin iyileştirilmesi düşünülebilir.
Stripe Manager’in instance’ı yoksa, abonelik güncelleme ve müşteri portal oturumu gibi fonksiyonlar hata fırlatır; bu, eksik yapılandırmanın erken tespitini sağlar.
Feature flag’ler ve kullanım kotaları, aboneliğe göre UsageCacheManager üzerinden cache’de tutulur; her güncellemede cache senkronize edilir.
SSO sağlayıcıları haritası providerName → SSOBase nesnesi şeklinde saklanır; provider configEnabled false ise login devre dışı kalır.
Plan değişikliği sırasında additionalSeatsItem bulunamazsa ADDITIONAL_SEATS_LIMIT kotası sıfırlanarak set edilir.
Erişim kontrol middleware’leri, plan özelliklerini ve kullanıcı koltuk sınırlarını kontrol etmek için IdentityManager’in metotlarını çağırır.
Kimlik doğrulama API’lerine yapılan hatalı çağrılar, InternalFlowiseError ile sarmalanır; HTTP hata kodları ile tutarlı yanıt üretilir.
Dosyanın kapsamı, kimlik doğrulama ve lisans yönetiminin yanı sıra Stripe tabanlı abonelik mantığını da içerdiğinden proje mimarisinin kritik bir bileşenidir.
2.4 NodesPool.ts – Node ve Credential Havuzu (129 satır → 16 madde)
Dosya, Flowise bileşen node’larını ve credential tanımlarını dinamik olarak yükleyen ve saklayan NodesPool sınıfını içerir.
componentNodes ve credentialNodes adında iki ana dizi barındırır; her biri Flowise component paketlerindeki node tanımlarını ifade eder.
Constructor’da componentNodes ve credentialNodes başlangıçta boş diziler olarak tanımlanır; initialize sırasında doldurulur.
initialize fonksiyonu getNodesData ile node’ların ve credential’ların meta verilerini okur ve dizilere ekler.
Her node için kategori, alt kategori, ad, açıklama, ikon ve renk bilgisi tanımlanır; bu bilgiler UI’de node paleti oluşturmak için kullanılır.
filterNodesByCategories fonksiyonu, verilen kategori isimlerine göre component node’larını süzer; UI’de görünmemesi gereken node tiplerini gizlemeye yarar.
filterCredentialsByCategories fonksiyonu credential listesinde benzer filtrasyon yapar; gizli credential türlerini atlar.
getOneCategoryNodes fonksiyonu, belirtilen alt kategoriye ait node’ları döndürür; menüde kategori bazında listeleme sağlar.
getOneCategoryCredentials fonksiyonu, belirli credential kategori ve alt kategoriye ait kimlikleri döndürür.
Her node kaydı bir JS modülü olarak flowise-components paketinden import edilerek meta veri okunur; dinamik import hataları log’lanır.
_buildNodeCategoryTree fonksiyonu, node listesinden kategori ağacı oluşturur; UI’de menüyü hiyerarşik yapıda sunar.
_buildCredentialCategoryTree fonksiyonu benzer şekilde credential’lar için kategori ağacını kurar; türler arasındaki ilişkiyi görselleştirir.
Node ikon dosyaları NodePool tarafından tutulur ve constant.js içinde tanımlanan ikona karşılık gelir; UI, ikon bileşenlerini buradan alır.
Credential veri yapıları, güvenlik için gizli alanları maskeleyerek UI’ye iletilir; hassas bilgiler backend’de tutulur.
Node havuzu, Flowise’in open source ve enterprise modlarında aynı şekilde çalışır; community veya enterprise node’ları env değişkeni ile gizlenebilir.
Dosya, node yönetimi ile ilgili tüm meta veriyi toplayarak Flowise editörünün dinamik ve modüler çalışmasını sağlar.
🗄️ 3 – Veritabanı Katmanı

Flowise verilerini kalıcı olarak depolamak için Supabase PostgreSQL kullanılır. Backend’de DATABASE_URL üzerinden tanımlı bağlantı adresi okunur ve TypeORM ile DataSource oluşturulur. Tablolar, packages/server/src/database/entities içinde tanımlanan entity sınıflarından üretilir. Chatflow, agentflow, credential, dataset, document store ve execution gibi domain nesnelerinin her biri kendi tablolarında saklanır. CRUD işlemleri backend servis katmanı üzerinden yürütülür; frontend doğrudan veritabanına erişmez. Row Level Security gibi politikalar Supabase tarafında uygulanarak istemci tarafına sadece yetkili veriler açılır.

3.1 Veritabanı Entity Dosyaları Analizi

Supabase üzerinde PostgreSQL veritabanında saklanan her tablo, TypeORM ile tanımlanmış entity sınıfı olarak packages/server/src/database/entities dizininde bulunur. Aşağıda her bir entity dosyasının satır sayısına göre ayrıntılı açıklaması verilmiştir. Her madde 20–25 kelime arasında olup UI kuralının 2×’si kadar madde yazılmıştır.

3.1 ChatFlow.ts (66 satır → 10 madde)
ChatFlow entity’si chatflow, agentflow ve assistant türlerini temsil eden EnumChatflowType enum’u içerir; type alanı bu enum ile sınırlıdır.
id alanı UUID olarak otomatik üretilir; her chatflow kaydı benzersiz kimliğe sahip olur.
name alanı chatflow’un görünen adını saklar; kullanıcı arayüzünde listeleme ve arama bu alan üzerinden yapılır.
flowData sütunu JSON string olarak tüm node ve edge bilgilerini tutar; canvas editöründen gelen yapı burada serileştirilir.
deployed, isPublic, apikeyid alanları chatflow’un yayınlanma durumu, public erişim ve kullanılmış API anahtarını saklar.
chatbotConfig, apiConfig, analytic, speechToText, textToSpeech ve followUpPrompts alanları, chatbot davranışına ilişkin opsiyonel konfigürasyonları barındırır.
category alanı chatflow’un kategori sınıflandırmasını tutar; kullanıcı arayüzünde filtreleme bu alan üzerinden yapılır.
type alanı varsayılan olarak CHATFLOW’dur; agent ve assistant flow’lar bu değeri değiştirerek tanımlanır.
createdDate ve updatedDate alanları otomatik zaman damgalarıdır; kayıt oluşturma ve güncellenme tarihlerini belirtir.
workspaceId alanı zorunlu olup chatflow’un ait olduğu workspace’e referans verir; erişim kontrolü bu ID üzerinden yapılır.
3.2 ChatMessage.ts (73 satır → 6 madde)
ChatMessage entity’si her sohbet mesajını temsil eder; id alanı UUID olarak üretilir ve benzersizlik sağlar.
role alanı kullanıcının rolünü (user, assistant gibi) belirtir; MessageType enum’u ile kısıtlanmıştır.
chatflowid ve executionId alanları mesajın ait olduğu chatflow ve execution ile ilişkilendirilmesini sağlar; execution ilişkisi OneToOne tanımlıdır.
content alanı mesajın metnini saklar; sourceDocuments, usedTools, fileAnnotations, agentReasoning, reasonContent gibi alanlar detaylı bilgi için ayrılmıştır.
chatType, chatId, memoryType, sessionId alanları mesajların gruplanması, bellek tipi ve oturum yönetimi için kullanılır.
createdDate, leadEmail ve followUpPrompts alanları mesajın zaman damgasını, lead kampanya e-postasını ve takip sorularını saklar.
3.3 ChatMessageFeedback.ts (20 satır → 6 madde)
ChatMessageFeedback entity’si her mesaj için kullanıcının verdiği geri bildirimi saklar; id alanı UUID olarak üretilir.
chatMessageId alanı hangi mesaja ait olduğunu belirler; ChatMessage ile ManyToOne ilişkisi bulunur.
score alanı geri bildirimin puanını tutar; memnuniyet veya kalite geri bildirimleri bu alanda yer alır.
comment alanı, kullanıcının serbest metinli geri bildirimini saklar; opsiyoneldir.
createdDate alanı geri bildirimin yapıldığı zamanı otomatik olarak kaydeder.
Entity basit yapıda olduğundan satır sayısı azdır; geri bildirim ilişkisini modellemek için yeterlidir.
3.4 Credential.ts (73 satır → 14 madde)
Credential entity’si Flowise’e eklenen dış servis kimlik bilgilerini temsil eder; id alanı UUID olarak üretilir.
createdDate ve updatedDate alanları kimliğin oluşturulma ve güncellenme zamanlarını kaydeder; audit için kullanılır.
name ve type alanları credential’ın görünen adı ve ilgili node tipiyle eşleştirilmesini sağlar.
credentialInfo alanı JSON formatında tüm kimlik parametrelerini saklar; base64 veya şifreli içerik barındırabilir.
decryptKey alanı opsiyoneldir ve credential verilerinin çözülmesi için kullanılır; veritabanında şifreli olarak tutulur.
nodeCredentialId alanı Flowise node tanımındaki credential ID’sine karşılık gelir; node ile credential eşleşmesini kurar.
reservedData alanı ileride kullanılabilecek ek parametreler için yer ayırır; backward compatibility sağlar.
icon ve backgroundColor alanları UI’da credential kartının ikon ve renk ayarlarını tutar.
isGlobal boolean alanı credential’ın tüm workspacelere açık olup olmadığını belirler; admin yetkisi gerektirir.
workspaceId alanı credential’ın ait olduğu workspace’i tanımlar; kimlik bilgileri workspace bazında izole edilir.
hash alanı credential verisinin checksum’ını tutarak değişiklik tespiti yapılmasına yardımcı olur.
isManaged alanı credential’ın Flowise tarafından mı yoksa kullanıcı tarafından mı yönetildiğini belirtir.
storagePath alanı credential dosyalarının veya sertifikalarının saklandığı yolu gösterir; S3 veya local olabilir.
Bu entity, güvenli credential yönetimi için tüm alanları kapsar ve UI’de credential listesi ile entegrasyon noktası olarak hizmet eder.
3.5 Tool.ts (22 satır → 6 madde)
Tool entity’si Flowise’e eklenen araçları temsil eder; id alanı UUID olarak üretilir.
name ve type alanları aracın görünen adı ve kategori tipini tanımlar; UI’de listelenirken kullanılır.
description alanı aracın ne işe yaradığını açıklar; kullanıcıya bilgi sağlar.
icon alanı aracın ikonunu saklar; UI node paletinde görsel tutarlılık sağlar.
allowedWorkspaces alanı, aracın erişebileceği workspace’leri listeler; boş bırakılırsa global kabul edilir.
Entity basit yapıdadır; yeni araç eklemek için model üzerinde genişletilebilir alan bırakır.
3.6 Assistant.ts (71 satır → 14 madde)
Assistant entity’si Flowise içindeki yardıcı AI ajan tanımlarını saklar; id alanı UUID olarak üretilir.
name ve systemPrompt alanları asistanın görünen adını ve başlangıç sistem mesajını saklar.
avatar alanı asistanın profil görselini temsil eder; UI’de kişiselleştirmeyi destekler.
promptExamples alanı asistanın örnek kullanımlarını barındırır; JSON formatındadır.
retrievalEnabled boolean alanı asistan için arama yapma özelliğinin açık olup olmadığını belirler.
retrievalDatasourceId alanı arama yapılacak veri kaynağı ID’sini tutar; dataset veya docstore ile ilişkilidir.
workspaceId alanı asistanın ait olduğu çalışma alanını tanımlar; yetki kontrolünü sağlar.
userId alanı asistanı oluşturan kullanıcıyı temsil eder; SSO veya kimlik sistemi ile eşleşir.
createdDate ve updatedDate alanları kaydın zaman damgalarını tutar; sıralama ve audit için gereklidir.
assistantType alanı custom, openAI veya market assistant gibi türleri ayırır.
actions alanı JSON olarak asistanın desteklediği özel eylemleri listeler; action-based workflow tanımlamak için kullanılır.
allowReAct alanı retrieval + action + tool kombinasyonunu destekleyen asistanlarda true olur.
namespace alanı vektör deposu kullanıldığında namespace belirler; Supabase vektör tabloları ile uyumludur.
Dosya, Flowise içinde asistan kavramının tüm meta verisini barındırarak backend ve UI’de asistan yönetimini mümkün kılar.
3.7 Variable.ts (44 satır → 10 madde)
Variable entity’si kullanıcı veya sistem tarafından tanımlanan değişkenleri saklar; id alanı UUID olarak üretilir.
name ve value alanları değişkenin anahtar ve değerini barındırır; string formatında tutulur.
category alanı değişkenin hangi amaçla kullanıldığını sınıflandırır; örneğin system, user veya environment olabilir.
workspaceId alanı değişkenin ait olduğu çalışma alanını belirtir; aynı workspace içinde erişim kontrolü uygulanır.
createdDate ve updatedDate alanları zaman damgalarını kaydeder; audit ve sıralama işlemleri için kullanılır.
encrypted boolean alanı değerin şifrelenmiş olup olmadığını belirtir; gizli veriler için true yapılır.
secret boolean alanı değişkenin gizlilik derecesini belirtir; UI’de value alanı maskelenir.
indexing alanı değişkenin arama motoru veya vektör indeksi için kullanılabilir olup olmadığını tanımlar.
Değişkenler Form builder veya flow parametrelerinde referans alınarak akış içinde dinamik değerler sağlar.
Dosya, basit yapıda olmasına rağmen flow parametrelerinin güvenli yönetimi için önemlidir.
3.8 DocumentStore.ts (42 satır → 10 madde)
DocumentStore entity’si yüklenen belgelerin meta verisini tutar; id UUID olarak üretilir.
name ve type alanları belgenin adı ve dosya türünü tanımlar; örneğin PDF, DOCX, TXT.
description alanı dosya hakkında açıklama sağlar; kullanıcıya ek bilgi sunar.
fileSize ve fileExtension alanları belgenin boyutunu ve uzantısını saklar.
storageType alanı belgenin hangi depolama metodunda bulunduğunu belirtir; local veya S3 olabilir.
workspaceId alanı ve apikeyid alanı belgenin ait olduğu çalışma alanı ve API anahtarı ile ilişkilidir.
createdDate ve updatedDate alanları zaman damgalarını tutar; listeleme sırasını belirler.
splitStrategy alanı dokümanın nasıl parçalanacağını belirtir; örneğin sayfa bazlı, paragraf bazlı.
Dosya parçaları DocumentStoreFileChunk entity’si ile ilişkilidir; ManyToOne ilişki bulunur.
Bu entity, dosya yükleme işlemi, bellek yönetimi ve vektör index hazırlığı için temel meta verileri içerir.
3.9 DocumentStoreFileChunk.ts (45 satır → 10 madde)
DocumentStoreFileChunk entity’si bir belgenin bölünmüş parçalarını temsil eder; id UUID olarak üretilir.
documentstoreid alanı parça所属 belgeyi işaret eder; ManyToOne ilişki mevcuttur.
text alanı parçanın ham metnini saklar; vektörleştirme ve arama işlemleri bu alan üzerinden yapılır.
embedding alanı vektörleştirilmiş veriyi JSON formatında depolar; Supabase vector store ile uyumludur.
metadata alanı ek anahtar–değer meta verilerini saklar; bölüm numarası veya konu başlığı gibi.
createdDate ve updatedDate alanları zaman damgalarını tutar.
workspaceId ve apikeyid alanları erişim kontrolünde kullanılır.
Her parça chatflow ve retrieval işlemlerinde ilgili belge parçasına geri dönüş sağlar.
Vektör arama esnasında bu parçalara dayalı sonuçlar döndürülür; UI’ye bağlanan retriever node’ları tarafından kullanılır.
Dosya, belgenin parçalanmış veri yapısını tanımlayarak retrieval işlemlerinin temelini oluşturur.
3.10 Lead.ts (24 satır → 6 madde)
Lead entity’si chatflow içinde potansiyel müşteri bilgilerini kaydeder; id UUID olarak üretilir.
email, phone, name ve message alanları kullanıcının iletişim bilgilerini ve mesajını saklar.
workspaceId alanı lead kaydının ait olduğu çalışma alanını tanımlar.
chatflowid alanı lead’in hangi chatflow’da toplandığını belirtir; ManyToOne ilişki kurulabilir.
createdDate alanı lead’in oluşturulma tarihini kaydeder.
Lead entity’si basit yapıda olup satış süreçlerinde CRM entegrasyonu için kullanılabilecek bir veri kaynağıdır.
3.11 UpsertHistory.ts (30 satır → 6 madde)
UpsertHistory entity’si dataset ve docstore upsert işlemlerini takip eder; id alanı UUID olarak üretilir.
upsertId ve chunkId alanları ana işleme ve parça kaydına referans verir.
status alanı upsert işleminin durumunu (in-progress, completed, failed) belirtir.
workspaceId ve apikeyid alanları erişim kontrolü sağlar; farklı workspacelerdeki upsert işlemleri ayrıştırılır.
createdDate ve updatedDate alanları zaman damgalarını tutar; süreç takibi yapılır.
Entity, data ingestion sürecinde hangi dosyanın hangi parçalarının yüklendiğini izlemek için kullanılır.
3.12 Dataset.ts (52 satır → 14 madde)
Dataset entity’si kullanıcıların tablo halinde veri yüklemelerine olanak tanır; id UUID olarak üretilir.
name ve description alanları veri setinin adını ve açıklamasını saklar.
workspaceId alanı veri setinin hangi çalışma alanına ait olduğunu belirtir; erişim kontrolü sağlar.
rowCount ve columnCount alanları veri setindeki satır ve sütun sayısını tutar; UI’de gösterimde kullanılır.
source alanı dataset’in kaynağını (user-upload, generated, vb.) belirtir.
schema alanı JSON olarak sütun adları ve veri türlerini saklar; tablo yapısının tekrar kurulmasını sağlar.
rows ManyToOne ilişkisi ile DatasetRow entity’sine bağlıdır; satır verileri ayrı tabloda tutulur.
createdDate ve updatedDate alanları zaman damgalarını kaydeder.
apikeyid alanı dataset’in hangi API anahtarı ile oluşturulduğunu saklar; entegrasyon takibini kolaylaştırır.
encrypted alanı veri setinin şifrelenmiş olup olmadığını belirler.
userId alanı dataset’i yükleyen kullanıcıyı tanımlar.
chunkSize alanı veri seti parçalarının boyutunu belirtir; büyük dosyalar parçalara ayrılarak işlenir.
Dataset entity’si chatflow ve retrieval işlemlerinde tablo verilerini kaynak olarak sunar.
Struktur basit görünse de dataset satırlarının ayrı tabloda tutulması performans ve ölçeklenebilirlik sağlar.
3.13 DatasetRow.ts (73 satır → 14 madde)
DatasetRow entity’si dataset’e ait her satırı temsil eder; id UUID olarak üretilir.
datasetId alanı satırın hangi dataset’e ait olduğunu belirtir; ManyToOne ilişki vardır.
values alanı JSON formatında satırın tüm hücre değerlerini saklar; kolon adları ile eşleştirilir.
embedding alanı satır vektörlerini depolar; metin içerikli sütunlar vektörleştirme için kullanılabilir.
metadata alanı ek bilgiler için kullanılır; örneğin satır etiketleri veya notlar.
sequence alanı satırın sıra numarasını tutar; sıralama ve sayfalama için kullanılır.
status alanı satır işleminin durumunu gösterir; upsert veya işlenmemiş durumlar ayırt edilir.
workspaceId ve apikeyid alanları satırın erişim kontrolünü sağlar.
createdDate ve updatedDate alanları zaman damgalarını kaydeder.
indexHash ve indexPosition alanları satırın vektör indexi içinde hangi pozisyonda olduğunu belirtir.
error alanı satır işlenirken oluşan hataları saklar; hata durumları UI’de gösterilebilir.
fileId alanı satırın kaynağı olan yükleme dosyasını bağlar; veri setlerinin birden çok kaynak dosyası olabilir.
sourceId alanı dataset’in harici bir kaynağına referans verir; örneğin Supabase storage.
DatasetRow entity’si dataset yapısının detaylı veri katmanını tanımlar ve retrieval işlemlerinde kullanılır.
3.14 EvaluationRun.ts (44 satır → 10 madde)
EvaluationRun entity’si AI modellerinin değerlendirme oturumlarını saklar; id UUID olarak üretilir.
userId ve workspaceId alanları evaluation run’ın sahibi ve ait olduğu çalışma alanını tanımlar.
evaluatorId alanı hangi evaluatörün kullanıldığını belirtir; Evaluator entity’sine ManyToOne ilişki vardır.
datasetId alanı değerlendirilen veri setini işaret eder; ManyToOne ilişki ile Dataset entity’sine bağlıdır.
params alanı JSON formatında evaluation parametrelerini saklar.
status alanı evaluation’ın ilerleyiş durumunu belirtir; pending, running, completed, failed gibi.
result alanı JSON formatında değerlendirme sonuçlarını tutar; UI’de gösterilmek üzere kullanılır.
score alanı numeric değer olarak değerlendirme puanını saklar.
createdDate ve updatedDate alanları süreç zaman damgalarını kaydeder.
Dosya, AI model değerlendirme süreçlerini izlemek ve raporlamak için veri deposu görevi görür.
3.15 Evaluation.ts (44 satır → 10 madde)
Evaluation entity’si her değerlendirme kuralını veya testini tanımlar; id alanı UUID olarak üretilir.
name ve type alanları değerlendirmenin adını ve türünü (human, llm, runtime, vb.) belirtir.
evaluatorId alanı hangi evaluatörün kullanılacağını işaret eder; ManyToOne ilişki vardır.
instructions alanı değerlendirme görevine ait yönergeleri saklar; metin formatındadır.
createdBy ve workspaceId alanları değerlendirme tanımının sahibi ve ait olduğu çalışma alanını tanımlar.
inputSchema ve outputSchema alanları JSON formatında beklenen veri yapılarını tanımlar.
extraParams alanı değerlendirme sırasında kullanılacak ek parametreleri tutar; opsiyoneldir.
visibility alanı değerlendirme tanımının public veya private olup olmadığını belirtir.
createdDate ve updatedDate alanları zaman damgalarını kaydeder.
Bu entity, kullanıcıların AI değerlendirmeleri için kriterler oluşturmasına ve paylaşmasına olanak tanır.
3.16 Evaluator.ts (41 satır → 10 madde)
Evaluator entity’si değerlendirme motorlarını tanımlar; id UUID olarak üretilir.
name ve description alanları evaluatörün görünen adını ve ne yaptığını açıklar.
type alanı değerlendirme motorunun türünü (llm, human, runtime) belirtir.
api alanı kullanıcı tanımlı HTTP API kullanılarak değerlendirme yapılacaksa endpoint bilgilerini tutar.
apiKey ve apiConfig alanları dış API değerlendirmeleri için kimlik doğrulama bilgilerini saklar.
createdBy ve workspaceId alanları evaluatörün sahibini ve ait olduğu workspace’i tanımlar.
visibility alanı public veya private olmasını belirtir.
createdDate ve updatedDate alanları zaman damgalarını tutar.
Entity, değerlendirme sürecinde kullanılabilecek motor ve hizmetlerin kaydını sağlar.
Basit bir yapıya sahip olmasına rağmen çeşitli dış API entegrasyonlarını destekler.
3.17 ApiKey.ts (23 satır → 6 madde)
ApiKey entity’si her kullanıcı için oluşturulan API anahtarlarını saklar; id UUID olarak üretilir.
key alanı kullanıcı tarafından görülen API anahtarının kendisini barındırır; güvenli oluşturulur.
name alanı anahtarın adını tutar; kullanıcı tarafından kolay tanımlanır.
permissions alanı anahtarın hangi endpoint’lere erişebileceğini listeleyen JSON dizisini saklar.
workspaceId ve userId alanları anahtarın hangi çalışma alanı ve kullanıcıya ait olduğunu belirtir.
Entity, Flowise’in key-based authentication modelinin kalıcı veri katmanını oluşturur.
3.18 CustomTemplate.ts (22 satır → 6 madde)
CustomTemplate entity’si kullanıcıların özel prompt şablonlarını kaydeder; id alanı UUID olarak üretilir.
name ve description alanları şablonun adını ve açıklamasını saklar; UI’de listelenirken kullanılır.
content alanı prompt şablonunun HTML veya Markdown içeriğini tutar.
workspaceId ve userId alanları şablonun hangi çalışma alanı ve kullanıcıya ait olduğunu belirtir.
createdDate ve updatedDate alanları zaman damgalarını kaydeder.
Bu entity, Flowise kullanıcılarının kişiselleştirilmiş prompt şablonlarını depolamasına olanak tanır.
3.19 Execution.ts (25 satır → 6 madde)
Execution entity’si her model çağrısı veya agent akışının çalıştırma kaydını tutar; id UUID olarak üretilir.
chatflowid alanı hangi chatflow’a ait olduğunu belirtir; ManyToOne ilişki kurulabilir.
variables ve inputs alanları çalıştırma sırasında kullanılan değişken değerlerini JSON formatında saklar.
result ve outputs alanları model veya agent akışının yanıtını ve çıkış verilerini tutar.
createdDate alanı çalıştırma zaman damgasını saklar; sıralama ve raporlama için kullanılır.
Entity, geçmiş çalışma kayıtlarını saklayarak hata ayıklama ve denetleme işlemlerine temel oluşturur.
🌐 4 – Canlı Ortam ve Yerel Ortam Ayrımı
Canlı ortam: GitHub’tan Netlify’a otomatik olarak deploy edilir. Frontend packages/ui dizininden build edilir; backend Netlify Functions veya kendi sunucunuzda çalıştırılır. DATABASE_URL ve diğer secret’lar production ortamında tanımlı olmalıdır.
Yerel ortam: Geliştirme sırasında pnpm install ve pnpm dev komutlarıyla hem frontend hem backend’i çalıştırabilirsiniz. .env dosyalarını packages/ui ve packages/server içinde oluşturmanız gerekir. VITE_API_BASE_URL olarak http://localhost:3000 ayarlanır. Supabase’e bağlanmak için development veritabanı kullanılır.
✅ Sonuç ve Sonraki Adımlar

Bu README, projenin arayüz katmanındaki ana dosyaları, route akışını ve önemli bileşenleri kapsamlı biçimde analiz etti. Backend ve veritabanı etkileşimi yüksek seviyede özetlendi. Eksik görülen dosya veya modüller için benzer analitik yaklaşımı sürdürerek Flowise’in tam davranışını belgelendirebilirsiniz. Bu rehber, arayüzün backend ve veritabanı ile nasıl iletişim kurduğunu anlamaya çalışan geliştiricilere yol gösterir.
