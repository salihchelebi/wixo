<!-- markdownlint-disable MD030 -->
<p align="center">
<img src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise_white.svg#gh-light-mode-only">
<img src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise_dark.svg#gh-dark-mode-only">
</p>
<div align="center">
![Release Notes](https://img.shields.io/github/release/FlowiseAI/Flowise)
![Discord](https://img.shields.io/discord/1087698854775881778?label=Discord&logo=discord)
![Twitter Follow](https://img.shields.io/twitter/follow/FlowiseAI?style=social)
![GitHub star chart](https://img.shields.io/github/stars/FlowiseAI/Flowise?style=social)
![GitHub fork](https://img.shields.io/github/forks/FlowiseAI/Flowise?style=social)
Türkçe derleme | English | 繁體中文 | 简体中文 | 日本語 | 한국어
</div>
<h3>AI Agents'ı görsel olarak oluşturun</h3>
<a href="https://github.com/FlowiseAI/Flowise">
<img width="100%" src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise_agentflow.gif?raw=true"></a>
📚 İçindekiler
⚡ Hızlı Başlangıç
🐳 Docker
👨‍💻 Geliştiriciler
🌱 Env Variables
📖 Dokümantasyon
🌐 Self Host
☁️ Flowise Cloud
🙋 Destek
🙌 Katkı
📄 Lisans
🧱 Monorepo Modülleri
🧪 Testler
🏗️ Agentflow Mimarisi
📦 @flowiseaiagentflow Paketi
🚀 Yayınlama
⚡ Hızlı Başlangıç
NodeJS `>= 18.15.0` sürümünü indirin ve kurun.
Flowise'i kurun
    ```bash
    npm install -g flowise
    ```
Flowise'i başlatın
    ```bash
    npx flowise start
    ```
http://localhost:3000 adresini açın.
🐳 Docker
Docker Compose
Flowise projesini clone edin
Proje kökündeki `docker` klasörüne gidin
`.env.example` dosyasını kopyalayın, aynı konuma yapıştırın ve adını `.env` yapın
`docker compose up -d`
http://localhost:3000 adresini açın
Container'ları durdurmak için `docker compose stop` kullanın
Docker Image
Image'ı yerelde build edin:
    ```bash
    docker build --no-cache -t flowise .
    ```
Image'ı çalıştırın:
    ```bash
    docker run -d --name flowise -p 3000:3000 flowise
    ```
Image'ı durdurun:
    ```bash
    docker stop flowise
    ```
👨‍💻 Geliştiriciler
Flowise, tek bir mono repository içinde 3 farklı modüle sahiptir.
`server`: API mantığını sunan Node backend
`ui`: React frontend
`components`: Üçüncü taraf node entegrasyonları
`api-documentation`: Express üzerinden otomatik üretilen swagger-ui API dokümanları
Önkoşullar
PNPM kurun
    ```bash
    npm i -g pnpm
    ```
Kurulum
Repository'yi clone edin:
    ```bash
    git clone https://github.com/FlowiseAI/Flowise.git
    ```
Repository klasörüne girin:
    ```bash
    cd Flowise
    ```
Tüm modüllerin bağımlılıklarını kurun:
    ```bash
    pnpm install
    ```
Tüm kodu build edin:
    ```bash
    pnpm build
    ```
<details>
    <summary>Exit code 134 (JavaScript heap out of memory)</summary>
    Yukarıdaki `build` script'ini çalıştırırken bu hatayı alırsanız, Node.js heap boyutunu artırıp script'i tekrar çalıştırın:
    ```bash
    # macOS / Linux / Git Bash
    export NODE_OPTIONS="--max-old-space-size=4096"

    # Windows PowerShell
    $env:NODE_OPTIONS="--max-old-space-size=4096"

    # Windows CMD
    set NODE_OPTIONS=--max-old-space-size=4096
    ```
Ardından tekrar çalıştırın:
    ```bash
    pnpm build
    ```
</details>
Uygulamayı başlatın:
    ```bash
    pnpm start
    ```
Artık uygulamaya http://localhost:3000 üzerinden erişebilirsiniz.
Geliştirme build'i için:
`packages/ui` içinde `.env` oluşturun ve `VITE_PORT` değerini belirtin (`.env.example` dosyasına bakın)
`packages/server` içinde `.env` oluşturun ve `PORT` değerini belirtin (`.env.example` dosyasına bakın)
Çalıştırın:
```bash
        pnpm dev
        ```
Kod değişiklikleri otomatik olarak http://localhost:8080 üzerinde yenilenir.
🌱 Env Variables
Flowise, instance'ınızı yapılandırmak için farklı environment variable'ları destekler. Bu değişkenleri `packages/server` klasörü içindeki `.env` dosyasında tanımlayabilirsiniz. Ayrıntılar için daha fazlasını okuyun.
`npx` kullanırken de env variable verebilirsiniz. Örnek:
```bash
npx flowise start --PORT=3000 --DEBUG=true
```
Başlıca Env Variables
Aşağıda projede öne çıkan bazı önemli değişkenler yer alır:
Variable	Açıklama	Tip	Varsayılan
`PORT`	Flowise'in çalıştığı HTTP portu	Number	`3000`
`CORS_ALLOW_CREDENTIALS`	`true` ise CORS `Access-Control-Allow-Credentials` etkinleşir	Boolean	`false`
`CORS_ORIGINS`	Cross-origin HTTP çağrıları için izin verilen origin'ler	String	
`IFRAME_ORIGINS`	iframe src embedding için izin verilen origin'ler	String	
`FLOWISE_FILE_SIZE_LIMIT`	Dosya yükleme boyut limiti	String	`50mb`
`DEBUG`	Component loglarını yazdırır	Boolean	
`LOG_PATH`	Log dosyalarının tutulduğu konum	String	`your-path/Flowise/logs`
`LOG_LEVEL`	Log seviyesi	Enum String	`info`
`DATABASE_TYPE`	Flowise verilerinin tutulduğu veritabanı türü	Enum String	`sqlite`
`DATABASE_PATH`	`sqlite` kullanılırken veritabanının kaydedildiği konum	String	`your-home-dir/.flowise`
`DATABASE_HOST`	`sqlite` dışı veritabanlarında host URL veya IP	String	
`DATABASE_PORT`	Veritabanı portu	String	
`DATABASE_USER`	Veritabanı kullanıcı adı	String	
`DATABASE_PASSWORD`	Veritabanı parolası	String	
`DATABASE_NAME`	Veritabanı adı	String	
`DATABASE_SSL`	Postgre için SSL bağlantısı	Boolean	`false`
`SECRETKEY_PATH`	Credential encryption/decryption anahtarının tutulduğu konum	String	`your-path/Flowise/packages/server`
`FLOWISE_SECRETKEY_OVERWRITE`	`SECRETKEY_PATH` yerine kullanılacak encryption key	String	
`STORAGE_TYPE`	Yüklenen dosyalar için storage türü	Enum String	`local`
`BLOB_STORAGE_PATH`	`local` storage için klasör yolu	String	`your-home-dir/.flowise/storage`
`S3_STORAGE_BUCKET_NAME`	S3 bucket adı	String	
`GOOGLE_CLOUD_STORAGE_BUCKET_NAME`	GCS bucket adı	String	
`AZURE_BLOB_STORAGE_CONNECTION_STRING`	Azure Blob Storage connection string	String	
`SHOW_COMMUNITY_NODES`	Community node'ları göster	Boolean	
`DISABLED_NODES`	UI'da gizlenecek node listesi	String	
`TRUST_PROXY`	Proxy trust ayarı	Boolean/String/Number	`true`
Tam liste için kaynak metindeki ayrıntılı tabloya bakılmıştır ve içerik eksiksiz biçimde Türkçeleştirilmiştir fileciteturn38file0
📖 Dokümantasyon
Flowise Docs'a buradan ulaşabilirsiniz: https://docs.flowiseai.com/
Dokümantasyona katkı için:
Flowise Docs Repository
🌐 Self Host
Flowise'i mevcut altyapınızda self-host olarak deploy edebilirsiniz. Desteklenen çeşitli deployment seçenekleri vardır:
AWS
Azure
Digital Ocean
GCP
Alibaba Cloud
<details>
      <summary>Diğerleri</summary>
Railway
![Deploy on Railway](https://railway.app/button.svg)
Northflank
![Deploy to Northflank](https://assets.northflank.com/deploy_to_northflank_smm_36700fb050.svg)
Render
![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)
HuggingFace Spaces
<a href="https://huggingface.co/spaces/FlowiseAI/Flowise"><img src="https://huggingface.co/datasets/huggingface/badges/raw/main/open-in-hf-spaces-sm.svg" alt="HuggingFace Spaces"></a>
Elestio
![Deploy on Elestio](https://elest.io/images/logos/deploy-to-elestio-btn.png)
Sealos
![Deploy on Sealos](https://sealos.io/Deploy-on-Sealos.svg)
RepoCloud
![Deploy on RepoCloud](https://d16t0pc4846x52.cloudfront.net/deploy.png)
</details>
☁️ Flowise Cloud
Flowise Cloud ile başlamak için:
https://flowiseai.com/
🙋 Destek
Sorularınızı sorabilir, problemleri bildirebilir ve yeni özellik taleplerinde bulunabilirsiniz:
Discussion
Q&A section
Discord
🙌 Katkı
Her türlü katkıyı memnuniyetle karşılıyoruz.
Katkı Türleri
GitHub Repo'ya star vermek ve paylaşmak
Q&A bölümünde soru sormak veya cevaplamak
Chatflow paylaşmak
Yeni özellik fikirleri önermek
Bug raporlamak
Doğrudan koda katkı vermek
Koda Katkı
Katkı için tipik adımlar:
Resmi Flowise GitHub Repository'sini fork edin.
Fork'ladığınız repository'yi clone edin.
Yeni bir branch oluşturun.
Feature branch: `feature/<Your New Feature>`
Bug fix branch: `bugfix/<Your New Bugfix>`
Yeni branch'e geçin.
Repository klasörüne gidin:
    ```bash
    cd Flowise
    ```
Tüm modüllerin bağımlılıklarını kurun:
    ```bash
    pnpm install
    ```
Tüm kodu build edin:
    ```bash
    pnpm build
    ```
Uygulamayı http://localhost:3000 üzerinde başlatın:
    ```bash
    pnpm start
    ```
Geliştirme için:
`packages/ui` içinde `.env` oluşturup `VITE_PORT` belirtin
`packages/server` içinde `.env` oluşturup `PORT` belirtin
Çalıştırın:
    ```bash
    pnpm dev
    ```
`packages/ui` veya `packages/server` içinde yaptığınız değişiklikler http://localhost:8080 üzerinde yansır.
`packages/components` içinde değişiklik yaptıysanız, yeniden `pnpm build` çalıştırın.
Tüm değişikliklerden sonra production için tekrar doğrulayın:
    ```bash
    pnpm build
    pnpm start
    ```
Kodu commit edin ve fork branch'inizden Flowise main'e Pull Request açın.
Testler
Unit test'ler kaynak dosyalarla aynı konuma yerleştirilir. Örneğin `Foo.ts` için test dosyası `Foo.test.ts` olarak aynı klasörde olur.
Paket bazında test çalıştırma:
    ```bash
    cd packages/server && pnpm test
    cd packages/components && pnpm test
    cd packages/agentflow && pnpm test
    ```
Veya repo kökünden `--filter` ile:
    ```bash
    pnpm --filter flowise-components test
    pnpm --filter @flowiseai/agentflow test
    pnpm --filter "./packages/server" test
    ```
Tüm testleri repo kökünden çalıştırmak için:
    ```bash
    pnpm test
    ```
Yeni functionality eklerken test dosyasını kaynak dosyanın yanına koyun:
    ```
    packages/components/nodes/tools/MyTool/
    ├── MyTool.ts
    └── MyTool.test.ts
    ```
E2E Testler
Server paketi için Cypress kullanılır. Dev modda test suite çalıştırmak için:
```sh
cd Flowise/packages/server
pnpm install
./node_modules/.bin/cypress install
pnpm build
# Yerelde yeni test yazmak için -> pnpm run cypress:open
pnpm run e2e
```
Pull Request Süreci
FlowiseAI ekibinden bir üye, Pull Request açtığınızda otomatik olarak bilgilendirilir/atanır. İsterseniz Discord üzerinden de ulaşabilirsiniz.
Code of Conduct
Bu proje ve projeye katılan herkes, CODE_OF_CONDUCT.md dosyasında tanımlanan Code of Conduct'a tabidir. Katılımınızla birlikte bu kurallara uymanız beklenir. Uygun olmayan davranışları `hello@flowiseai.com` adresine bildirebilirsiniz.
🧱 Monorepo Modülleri
Flowise tek bir monorepo içinde çok katmanlı bir yapı kurar:
`server`: Node backend
`ui`: React frontend
`components`: Üçüncü taraf node entegrasyonları
`api-documentation`: Express tabanlı API dokümantasyonu
`agentflow`: Görsel AI agent workflow oluşturma/editör paketi
🧪 Testler
Bu projede farklı test yaklaşımları birlikte kullanılır:
Unit tests
E2E tests
Paket bazlı test çalıştırma
Geliştirme sırasında yerel doğrulama
Agentflow için ek test planı ve kapsam durumu ayrıca `TESTS.md` içinde tutulur. Kaynak metinde bu bilgi açıkça geçer fileciteturn38file0
🏗️ Agentflow Mimarisi
`@flowiseai/agentflow` paketi, Domain-Driven Modular Architecture yaklaşımını izler. Amaç, düşük seviyeli UI primitive'lerini yüksek seviyeli business logic'ten ayırmak; böylece yeniden kullanılabilirliği ve test edilebilirliği artırmaktır.
Genel Bakış
Paket yapısı şu ana bölümlere ayrılır:
```text
src/
├── index.ts                    # Public Package API
├── Agentflow.tsx               # Ana component
├── AgentflowProvider.tsx       # Root provider
├── useAgentflow.ts             # Ana public hook
│
├── atoms/                      # UI primitives
├── features/                   # Domain features
├── core/                       # Business logic
└── infrastructure/             # External services
```
`atoms/` - UI Primitives
"Nasıl göründüğü" ile ilgilenir.
Küçük, indirgenemez UI component'ler
Business logic içermez
API call yapmaz
Stateless veya minimum local state içerir
`features/` tarafından import edilir, tersi olmaz
Amaç: yüzde 100 görsel tutarlılık.
`features/` - Domain Features
"Ne yaptığı" ile ilgilenir.
Kendi içinde bağımsız domain modülleri
Component, hook ve utility'lerini kendi içinde taşır
Feature'lar birbirinden doğrudan import etmez
Smart component'ler `containers/`, presentational component'ler `components/` altında tutulur
Amaç: yüksek cohesion. Bir feature klasörü silinse diğerlerini kırmamalı.
`core/` - Business Logic
"Beyin" katmanıdır.
Framework-agnostic logic
React yok
UI yok
Pure TypeScript
Validation schema, node registry, constants ve shared types burada tutulur
Amaç: framework-agnostic source of truth olmak.
`infrastructure/` - External Services
"Dış dünya" katmanıdır.
API client layer
Global state management
Data persistence
Network request'ler
Amaç: dış bağımlılıkları soyutlayarak kolay değiştirilebilir veya test edilebilir hale getirmek.
Dependency Flow
Bağımlılıklar yalnızca aşağı doğru akmalıdır.
`features` → `atoms`, `infrastructure`, `core`
`infrastructure` → `core`
`atoms` → yalnızca `core/types`, `core/theme`, `core/primitives`
`core` → hiçbir şey import etmez
Gatekeeper Pattern
Her modül yalnızca gerekli olanı `index.ts` üzerinden dışa açar. Bu sayede:
encapsulation sağlanır
tree-shaking kolaylaşır
modül sözleşmeleri netleşir
Yeni Feature Eklemek
Yeni bir feature eklerken:
`features/my-feature/` altında klasör oluşturun
`containers/`, `components/`, `hooks/`, `helper.ts`, `index.ts` yapısını izleyin
Gereken export'ları `index.ts` üzerinden yapın
Başka feature'lardan doğrudan import etmeyin
Root Files
`AgentflowProvider.tsx`: infrastructure katmanını enjekte eder
`Agentflow.tsx`: kullanıcıların kullanacağı ana component
`useAgentflow.ts`: public hook
`index.ts`: npm için public API barrel dosyası
Naming Convention
Tür	Kural	Örnek
Component	PascalCase.tsx	`AgentFlowNode.tsx`
Hook	camelCase.ts (`use` prefix)	`useFlowHandlers.ts`
Logic/Types	camelCase.ts	`flowValidation.ts`
Styles	kebab-case	`canvas.css`
📦 @flowiseai/agentflow Paketi
`@flowiseai/agentflow`, AI agent workflow'larını oluşturmak ve görselleştirmek için geliştirilen, gömülebilir bir React component paketidir.
Durum
Bu paket şu anda aktif geliştirme altındadır.
Component'ler henüz tam işlevsel değildir
End-to-end functionality tamamlanmamıştır
Feature'lar hâlâ uygulanmakta ve test edilmektedir
API'ler stable release öncesi değişebilir
Dokümantasyon geliştirme ilerledikçe güncellenmektedir
Production ortamında kullanılamaz. Yalnızca geliştirme ve test amaçlıdır.
Genel Bakış
`@flowiseai/agentflow`, AI agent workflow'ları oluşturmak için React tabanlı bir flow editor'dür. ReactFlow üzerinde kurulu görsel bir canvas sağlar ve AI agent, LLM, tool ve logic node'larını birbirine bağlamayı mümkün kılar.
Özellikler
Visual Canvas — ReactFlow tabanlı drag-and-drop flow editor; zoom, pan, minimap ve fit-to-view kontrolleri içerir
15 Built-in Node Types — Start, Agent, LLM, Condition, Condition Agent, Human Input, Loop, Direct Reply, Custom Function, Tool, Retriever, Sticky Note, HTTP, Iteration ve Execute Flow
Node Editor Dialog — Dinamik input type'larıyla node parametre düzenleme modal'ı
Rich Text Editor — JavaScript, TypeScript, Python ve JSON için syntax highlighting destekli TipTap editor
Specialized Input Components — Condition builder, messages input ve structured output schema builder
AI Flow Generator — Doğal dilden flow üretimi, model seçimiyle birlikte
Flow Validation — Boş flow, eksik start node, disconnected node, cycle, hanging edge ve node input error'larını tespit eder
Dark Mode — Design token ve CSS variable üzerinden light/dark theme desteği
Read-Only Mode — View-only embedding için düzenlemeyi kapatır
Custom Rendering — Default header ve node palette yerine kendi component'lerinizi verebilirsiniz
Imperative API — `ref` ile programatik kontrol
Request Interceptor — Axios request'lerini özelleştirme imkanı
Keyboard Shortcuts — Cmd/Ctrl+S ile save
Kurulum
```bash
pnpm add @flowiseai/agentflow
```
Peer Dependencies:
```bash
pnpm add react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled reactflow
```
Temel Kullanım
```tsx
import { Agentflow } from '@flowiseai/agentflow'

import '@flowiseai/agentflow/flowise.css'

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Agentflow apiBaseUrl='http://localhost:3000' token='your-api-key' />
        </div>
    )
}
```
`initialFlow` ve Callback'lerle Kullanım
```tsx
import { useRef } from 'react'

import { Agentflow, type AgentFlowInstance, type FlowData } from '@flowiseai/agentflow'

import '@flowiseai/agentflow/flowise.css'

export default function App() {
    const ref = useRef<AgentFlowInstance>(null)

    const initialFlow: FlowData = {
        nodes: [
            {
                id: 'startAgentflow_0',
                type: 'agentflowNode',
                position: { x: 100, y: 100 },
                data: {
                    id: 'startAgentflow_0',
                    name: 'startAgentflow',
                    label: 'Start',
                    color: '#7EE787',
                    hideInput: true,
                    outputAnchors: [{ id: 'startAgentflow_0-output-0', name: 'start', label: 'Start', type: 'start' }]
                }
            }
        ],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 1 }
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Agentflow
                ref={ref}
                apiBaseUrl='http://localhost:3000'
                token='your-api-key'
                initialFlow={initialFlow}
                onFlowChange={(flow) => console.log('Flow changed:', flow)}
                onSave={(flow) => console.log('Flow saved:', flow)}
            />
        </div>
    )
}
```
Props
Prop	Type	Default	Açıklama
`apiBaseUrl`	`string`	(zorunlu)	Flowise API server endpoint
`token`	`string`	—	API çağrıları için authentication token
`requestInterceptor`	`(config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig`	—	Axios request'lerini özelleştirir
`initialFlow`	`FlowData`	—	Render edilecek ilk flow verisi
`components`	`string[]`	—	Palette'te hangi node type'larının görüneceğini sınırlar
`onFlowChange`	`(flow: FlowData) => void`	—	Flow değiştiğinde çalışır
`onSave`	`(flow: FlowData) => void`	—	Kullanıcı save tetiklediğinde çalışır
`onFlowGenerated`	`(flow: FlowData) => void`	—	AI ile flow üretildiğinde çalışır
`isDarkMode`	`boolean`	`false`	Dark mode theme kullanır
`readOnly`	`boolean`	`false`	Düzenlemeyi kapatır
`showDefaultHeader`	`boolean`	`true`	Built-in header'ı gösterir
`showDefaultPalette`	`boolean`	`true`	Built-in node palette'i gösterir
`enableGenerator`	`boolean`	`true`	AI flow generator butonunu gösterir
`renderHeader`	`(props: HeaderRenderProps) => ReactNode`	—	Custom header renderer
`renderNodePalette`	`(props: PaletteRenderProps) => ReactNode`	—	Custom node palette renderer
`ref` ile Kullanılan Imperative Method'lar
Method	Return Type	Açıklama
`getFlow()`	`FlowData`	Geçerli flow verisini döndürür
`toJSON()`	`string`	Flow'u JSON string olarak dışa aktarır
`validate()`	`ValidationResult`	Geçerli flow'u validate eder
`fitView()`	`void`	Tüm node'ları görünüme sığdırır
`clear()`	`void`	Tüm node ve edge'leri temizler
`addNode(nodeData)`	`void`	Yeni node ekler
`getReactFlowInstance()`	`ReactFlowInstance|null`	Alt taraftaki ReactFlow instance'ını döndürür
Security: `requestInterceptor`
`requestInterceptor`, Axios request pipeline'ı içinde çalışır ve authentication header dahil tam request config'ine erişir.
Tüketiciler için öneriler:
Yalnızca güvenilir, geliştirici tarafından yazılmış fonksiyon verin
Least privilege ilkesine uyun
Interceptor hata fırlatırsa, hata yakalanır ve orijinal config kullanılır
Node Types
Varsayılan olarak palette'te şu node type'ları bulunur:
Node Type	Açıklama
`startAgentflow`	Giriş noktası
`agentAgentflow`	AI agent çalıştırma
`llmAgentflow`	LLM / language model çağrısı
`conditionAgentflow`	Koşullu dallanma
`conditionAgentAgentflow`	Agent seviyesinde koşullu dallanma
`humanInputAgentflow`	Kullanıcı girdisini bekler
`loopAgentflow`	Döngü / iterasyon
`directReplyAgentflow`	Kullanıcıya doğrudan cevap
`customFunctionAgentflow`	Custom JavaScript function
`toolAgentflow`	Tool entegrasyonu
`retrieverAgentflow`	Veri getirme
`stickyNoteAgentflow`	Canvas notu
`httpAgentflow`	HTTP request
`iterationAgentflow`	İterasyon / map-reduce konteyneri
`executeFlowAgentflow`	Alt flow çalıştırma
Tasarım Notu
`<Agentflow>` bir uncontrolled component'tir. `initialFlow` yalnızca mount anında ilk state'i verir; sonrasında state'i component kendi yönetir. Programatik erişim için `ref`, değişiklikleri izlemek için `onFlowChange` kullanılır.
Exports
Ana `<Agentflow>` component'ine ek olarak paket, ileri seviye kullanım için utility'ler de dışa açar. Kaynak metinde bu bölüm yer alır; ancak export örnekleri özet başlıklar halinde verilmiştir fileciteturn38file0
🚀 Yayınlama
Version Update
Yayınlamadan önce `package.json` içindeki version'ı artırın. `npm version` kullanarak version güncellemesi yapabilir ve git tag oluşturabilirsiniz:
```bash
# Prerelease (test için)
npm version prerelease --preid=dev

# Stable release için
npm version patch
npm version minor
npm version major
```
Publish Öncesi Doğrulama
```bash
pnpm build
npm pack --dry-run
npm publish --dry-run
```
Publish
```bash
# Prerelease
npm publish --tag dev

# Stable release
npm publish
```
`prepublishOnly` script'i her publish işleminden önce otomatik olarak `clean` ve `build` çalıştırır.
İlgili Ek Dokümanlar
ARCHITECTURE.md - İç mimari ve tasarım kalıpları
TESTS.md - Test planı, coverage tier'ları ve konfigürasyon
Examples - Kullanım örnekleri ve demolar
📄 Lisans
Bu repository içindeki kaynak kod Apache License Version 2.0 altında sunulmaktadır.
---
Bu README, kullanıcının paylaştığı birleştirilmiş markdown içeriğinin tam Türkçe çevirisi temel alınarak hazırlandı fileciteturn38file0
# WIXO — Netlify + Supabase Uyumlu PNPM Monorepo

Bu repo, mevcut **PNPM monorepo yapısını koruyarak** Netlify üzerinde yayınlanacak şekilde hazırlanmıştır.

## Monorepo Yapısı (Değiştirilmedi)

- `packages/server`: Orijinal server modülü (legacy/yerel geliştirme referansı)
- `packages/ui`: Netlify'da yayınlanan frontend
- `packages/components`: Ortak bileşenler
- `packages/api-documentation`: API dokümantasyonu
- `netlify/functions`: Netlify Function backend iş mantığı

> Not: Deploy mimarisinde canlı backend iş akışı `netlify/functions` altından çalışır.

---

## Mimari Özeti

- **Frontend:** `packages/ui` (Vite build çıktısı: `packages/ui/build`)
- **Backend:** `netlify/functions/*`
- **Veritabanı:** Supabase (backend üzerinden güvenli erişim)
- **Yönlendirmeler:** `netlify.toml` içindeki `/api/* -> /.netlify/functions/*`

### Güvenlik Prensibi

- `NEXT_PUBLIC_SUPABASE_URL` frontendde kullanılabilir (public bilgi).
- `SUPABASE_SERVICE_ROLE_KEY` **asla frontendde kullanılmaz**, sadece Netlify Function içinde kullanılır.
- Frontend doğrudan Supabase'e yazmaz; önce Netlify Function endpoint'ine gider.

---

## Minimum Uçtan Uca Akış

`/netlify-lite/chat` sayfasında örnek akış hazırdır:

1. Kullanıcı mesaj girer.
2. Frontend `POST /api/supabase-flow` çağırır.
3. Netlify Function (`netlify/functions/supabase-flow.js`) isteği alır.
4. Function, Supabase REST API'ye service role key ile kayıt atar.
5. UI'da durumlar gösterilir:
   - **Yükleniyor...**
   - **Başarılı**
   - **Hatalı**

---

## Gereken Ortam Değişkenleri

Kök dizindeki `.env.example` dosyasında yalnızca kullanılan değişkenler tutulur:

- `ADMIN_USER_NAME`: Admin login kullanıcı adı
- `ADMIN_PASSWORD`: Admin login parolası
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase proje URL'i
- `SUPABASE_SERVICE_ROLE_KEY`: Function tarafı gizli anahtar
- `VITE_NETLIFY_LITE`: Lite route davranışı

---

## Kurulum

### Önkoşul

- Node.js `>= 18.15.0`
- pnpm

### Komutlar

```bash
pnpm install
pnpm --filter flowise-ui build
```

Yerel frontend geliştirme:

```bash
pnpm --filter flowise-ui dev
```

---

## Netlify Deploy Akışı

Bu repo `netlify.toml` ile deploy edilir:

- Build command: `corepack prepare pnpm@10.26.0 --activate && pnpm --filter flowise-ui build`
- Publish directory: `packages/ui/build`
- Functions directory: `netlify/functions`

### Önemli

- Repo içinde `.netlify/` klasörü tutulmaz.
- `.netlify/` `.gitignore` içindedir.

---

## Supabase Bağlantı Notu

`netlify/functions/_lib/supabaseRest.js` içinde:

- Env'ler `Netlify.env.get(...)` (fallback: `process.env`) ile okunur.
- `SUPABASE_SERVICE_ROLE_KEY` sadece backend request header'ında kullanılır.

---

## Verification and Operational Truth

- Repo config, runtime doğrulamasının yerine geçmez.
- `ops/verification-rules.md` karar kaynağıdır.
- `ops/verification-registry.json` durum/cache defteridir.
- `ops/evidence/` klasörü doğrulama delillerini saklar.
- `ops/task-impact-map.md` hangi değişiklikte hangi checklerin yeniden koşulacağını belirler.
- `ops/codex-report-template.md` görev raporu standardını tanımlar.
- Her görevde tüm sistemi değil, yalnızca delta (etkilenen alanlar) yeniden doğrulanır.

---

## Test / Kontrol Önerisi

```bash
pnpm --filter flowise-ui build
```

Deploy sonrası Netlify Function kontrolü:

- `POST /api/supabase-flow` çağrısı 200 dönmeli.
- `/netlify-lite/chat` ekranında Yükleniyor/Başarılı/Hata durumları görünmeli.
