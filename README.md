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
