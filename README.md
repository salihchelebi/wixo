<!-- markdownlint-disable MD030 -->
aşağıdaki dosyayı sadece 
1- netlify frontend ve backend olacak şekilde 
2- supabase veritabanı olacak şekilde 
kodla 

bu envlerden ihtiyacın olanları kullan
ADMIN_PASSWORD
>>>>>>

ADMIN_USER_NAME
>>>>>>

DATABASE_URL
>>>>>>

GITHUB_DEFAULT_BRANCH
>>>>>>

GITHUB_OWNER
>>>>>>

GITHUB_REPO_FULL
>>>>>>

GITHUB_REPO_NAME
>>>>>>

GITHUB_REPO_URL
>>>>>>

LANGCHAIN_TRACING_V2
>>>>>>

LANGSMITH_API_KEY
>>>>>>

NETLIFY_ADMIN_URL
>>>>>>

NETLIFY_AUTH_TOKEN
>>>>>>

NETLIFY_BRANCH_URL
>>>>>>

NETLIFY_DATABASE_URL
>>>>>>

NETLIFY_DATABASE_URL_PRODUCTION
>>>>>>

NETLIFY_MAIN_BRANCH_URL
>>>>>>

NETLIFY_PRODUCTION_URL
>>>>>>

NETLIFY_PROJECT_URL
>>>>>>

NETLIFY_SITE_DOMAIN
>>>>>>

NETLIFY_SITE_ID
>>>>>>

NETLIFY_SITE_NAME
>>>>>>

NETLIFY_SITE_URL
>>>>>>

NETLIFY_TEAM_SLUG
>>>>>>

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
>>>>>>

NEXT_PUBLIC_SUPABASE_URL
>>>>>>

OPENAI_API_KEY
>>>>>>

GITHUB_TOKEN >>>>>>

SUPABASE_CONNECT
>>>>>>

SUPABASE_DATABASE_PASSWORD
>>>>>>

SUPABASE_SERVICE_ROLE_KEY
>>>>>>

TAVILY_API_KEY
>>>>>>

<p align="center">
<img src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise\_white.svg#gh-light-mode-only">
<img src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise\_dark.svg#gh-dark-mode-only">
</p>
<div align="center">
![Release Notes](https://github.com/FlowiseAI/Flowise/releases)
![Discord](https://discord.gg/jbaHfsRVBW)
![Twitter Follow](https://twitter.com/FlowiseAI)
![GitHub star chart](https://star-history.com/#FlowiseAI/Flowise)
![GitHub fork](https://github.com/FlowiseAI/Flowise/fork)
Türkçe derleme | English | 繁體中文 | 简体中文 | 日本語 | 한국어
</div>
<h3>AI Agents'ı görsel olarak oluşturun</h3>
<a href="https://github.com/FlowiseAI/Flowise">
<img width="100%" src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise\_agentflow.gif?raw=true"></a>
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
    `bash npm install -g flowise `
Flowise'i başlatın
    `bash npx flowise start `
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
    `bash docker build --no-cache -t flowise . `
Image'ı çalıştırın:
    `bash docker run -d --name flowise -p 3000:3000 flowise `
Image'ı durdurun:
    `bash docker stop flowise `
👨‍💻 Geliştiriciler
Flowise, tek bir mono repository içinde 3 farklı modüle sahiptir.
`server`: API mantığını sunan Node backend
`ui`: React frontend
`components`: Üçüncü taraf node entegrasyonları
`api-documentation`: Express üzerinden otomatik üretilen swagger-ui API dokümanları
Önkoşullar
PNPM kurun
    `bash npm i -g pnpm `
Kurulum
Repository'yi clone edin:
    `bash git clone https://github.com/FlowiseAI/Flowise.git `
Repository klasörüne girin:
    `bash cd Flowise `
Tüm modüllerin bağımlılıklarını kurun:
    `bash pnpm install `
Tüm kodu build edin:
    `bash pnpm build `
<details>
    <summary>Exit code 134 (JavaScript heap out of memory)</summary>
    Yukarıdaki `build` script'ini çalıştırırken bu hatayı alırsanız, Node.js heap boyutunu artırıp script'i tekrar çalıştırın:
    ```bash
# macOS / Linux / Git Bash
export NODE_OPTIONS="--max-old-space-size=4096"
    # Windows PowerShell
    $env:NODE\_OPTIONS="--max-old-space-size=4096"

    # Windows CMD
    set NODE\_OPTIONS=--max-old-space-size=4096
    ```

Ardından tekrar çalıştırın:
    `bash pnpm build `
</details>
Uygulamayı başlatın:
    ```bash
pnpm start
    ```

   Artık uygulamaya [http://localhost:3000](http://localhost:3000) üzerinden erişebilirsiniz.

6. Geliştirme build'i için:
Geliştirme build'i için:
`packages/ui` içinde `.env` oluşturun ve `VITE\_PORT` değerini belirtin (`.env.example` dosyasına bakın)
`packages/server` içinde `.env` oluşturun ve `PORT` değerini belirtin (`.env.example` dosyasına bakın)
Çalıştırın:
```bash
        pnpm dev
        ```

   Kod değişiklikleri otomatik olarak [http://localhost:8080](http://localhost:8080) üzerinde yenilenir.

   ## 🌱 Env Variables

   Flowise, instance'ınızı yapılandırmak için farklı environment variable'ları destekler. Bu değişkenleri `packages/server` klasörü içindeki `.env` dosyasında tanımlayabilirsiniz. Ayrıntılar için [daha fazlasını okuyun](https://github.com/FlowiseAI/Flowise/blob/main/CONTRIBUTING.md#-env-variables).

   `npx` kullanırken de env variable verebilirsiniz. Örnek:

   ```bash
npx flowise start --PORT=3000 --DEBUG=true
npx flowise start --PORT=3000 --DEBUG=true
```

   ### Başlıca Env Variables

   Aşağıda projede öne çıkan bazı önemli değişkenler yer alır:

|Variable|Açıklama|Tip|Varsayılan|
|-|-|-|-|
|`PORT`|Flowise'in çalıştığı HTTP portu|Number|`3000`|
|`CORS\_ALLOW\_CREDENTIALS`|`true` ise CORS `Access-Control-Allow-Credentials` etkinleşir|Boolean|`false`|
|`CORS\_ORIGINS`|Cross-origin HTTP çağrıları için izin verilen origin'ler|String||
|`IFRAME\_ORIGINS`|iframe src embedding için izin verilen origin'ler|String||
|`FLOWISE\_FILE\_SIZE\_LIMIT`|Dosya yükleme boyut limiti|String|`50mb`|
|`DEBUG`|Component loglarını yazdırır|Boolean||
|`LOG\_PATH`|Log dosyalarının tutulduğu konum|String|`your-path/Flowise/logs`|
|`LOG\_LEVEL`|Log seviyesi|Enum String|`info`|
|`DATABASE\_TYPE`|Flowise verilerinin tutulduğu veritabanı türü|Enum String|`sqlite`|
|`DATABASE\_PATH`|`sqlite` kullanılırken veritabanının kaydedildiği konum|String|`your-home-dir/.flowise`|
|`DATABASE\_HOST`|`sqlite` dışı veritabanlarında host URL veya IP|String||
|`DATABASE\_PORT`|Veritabanı portu|String||
|`DATABASE\_USER`|Veritabanı kullanıcı adı|String||
|`DATABASE\_PASSWORD`|Veritabanı parolası|String||
|`DATABASE\_NAME`|Veritabanı adı|String||
|`DATABASE\_SSL`|Postgre için SSL bağlantısı|Boolean|`false`|
|`SECRETKEY\_PATH`|Credential encryption/decryption anahtarının tutulduğu konum|String|`your-path/Flowise/packages/server`|
|`FLOWISE\_SECRETKEY\_OVERWRITE`|`SECRETKEY\_PATH` yerine kullanılacak encryption key|String||
|`STORAGE\_TYPE`|Yüklenen dosyalar için storage türü|Enum String|`local`|
|`BLOB\_STORAGE\_PATH`|`local` storage için klasör yolu|String|`your-home-dir/.flowise/storage`|
|`S3\_STORAGE\_BUCKET\_NAME`|S3 bucket adı|String||
|`GOOGLE\_CLOUD\_STORAGE\_BUCKET\_NAME`|GCS bucket adı|String||
|`AZURE\_BLOB\_STORAGE\_CONNECTION\_STRING`|Azure Blob Storage connection string|String||
|`SHOW\_COMMUNITY\_NODES`|Community node'ları göster|Boolean||
|`DISABLED\_NODES`|UI'da gizlenecek node listesi|String||
|`TRUST\_PROXY`|Proxy trust ayarı|Boolean/String/Number|`true`|

Tam liste için kaynak metindeki ayrıntılı tabloya bakılmıştır ve içerik eksiksiz biçimde Türkçeleştirilmiştir fileciteturn38file0

## 📖 Dokümantasyon

Flowise Docs'a buradan ulaşabilirsiniz: [https://docs.flowiseai.com/](https://docs.flowiseai.com/)

Dokümantasyona katkı için:

* [Flowise Docs Repository](https://github.com/FlowiseAI/FlowiseDocs)

## 🌐 Self Host

Flowise'i mevcut altyapınızda self-host olarak deploy edebilirsiniz. Desteklenen çeşitli deployment seçenekleri vardır:

* [AWS](https://docs.flowiseai.com/configuration/deployment/aws)
* [Azure](https://docs.flowiseai.com/configuration/deployment/azure)
* [Digital Ocean](https://docs.flowiseai.com/configuration/deployment/digital-ocean)
* [GCP](https://docs.flowiseai.com/configuration/deployment/gcp)
* [Alibaba Cloud](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Flowise社区版)
* <details>
      <summary>Diğerleri</summary>

  * [Railway](https://docs.flowiseai.com/configuration/deployment/railway)

    [!\[Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/pn4G8S?referralCode=WVNPD9)

  * [Northflank](https://northflank.com/stacks/deploy-flowiseai)

    [!\[Deploy to Northflank](https://assets.northflank.com/deploy\_to\_northflank\_smm\_36700fb050.svg)](https://northflank.com/stacks/deploy-flowiseai)

  * [Render](https://docs.flowiseai.com/configuration/deployment/render)

    [!\[Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://docs.flowiseai.com/configuration/deployment/render)

  * [HuggingFace Spaces](https://docs.flowiseai.com/deployment/hugging-face)

    <a href="https://huggingface.co/spaces/FlowiseAI/Flowise"><img src="https://huggingface.co/datasets/huggingface/badges/raw/main/open-in-hf-spaces-sm.svg" alt="HuggingFace Spaces"></a>

  * [Elestio](https://elest.io/open-source/flowiseai)

    [!\[Deploy on Elestio](https://elest.io/images/logos/deploy-to-elestio-btn.png)](https://elest.io/open-source/flowiseai)

  * [Sealos](https://template.sealos.io/deploy?templateName=flowise)

    [!\[Deploy on Sealos](https://sealos.io/Deploy-on-Sealos.svg)](https://template.sealos.io/deploy?templateName=flowise)

  * [RepoCloud](https://repocloud.io/details/?app_id=29)

    [!\[Deploy on RepoCloud](https://d16t0pc4846x52.cloudfront.net/deploy.png)](https://repocloud.io/details/?app_id=29)

    </details>

    ## ☁️ Flowise Cloud

    Flowise Cloud ile başlamak için:
[https://flowiseai.com/](https://flowiseai.com/)

    ## 🙋 Destek

    Sorularınızı sorabilir, problemleri bildirebilir ve yeni özellik taleplerinde bulunabilirsiniz:

* [Discussion](https://github.com/FlowiseAI/Flowise/discussions)
* [Q\&A section](https://github.com/FlowiseAI/Flowise/discussions/categories/q-a)
* [Discord](https://discord.gg/jbaHfsRVBW)

  ## 🙌 Katkı

  Her türlü katkıyı memnuniyetle karşılıyoruz.

  ### Katkı Türleri

* GitHub Repo'ya star vermek ve paylaşmak
* Q\&A bölümünde soru sormak veya cevaplamak
* Chatflow paylaşmak
* Yeni özellik fikirleri önermek
* Bug raporlamak
* Doğrudan koda katkı vermek

  ### Koda Katkı

  Katkı için tipik adımlar:

1. Resmi [Flowise GitHub Repository](https://github.com/FlowiseAI/Flowise)'sini fork edin.
2. Fork'ladığınız repository'yi clone edin.
3. Yeni bir branch oluşturun.

   * Feature branch: `feature/<Your New Feature>`
   * Bug fix branch: `bugfix/<Your New Bugfix>`
4. Yeni branch'e geçin.
5. Repository klasörüne gidin:

   &#x20;   ```bash
    cd Flowise
    ```

6. Tüm modüllerin bağımlılıklarını kurun:

   &#x20;   ```bash
    pnpm install
    ```

7. Tüm kodu build edin:

   &#x20;   ```bash
    pnpm build
    ```

8. Uygulamayı [http://localhost:3000](http://localhost:3000) üzerinde başlatın:

   &#x20;   ```bash
    pnpm start
    ```

9. Geliştirme için:

   * `packages/ui` içinde `.env` oluşturup `VITE\_PORT` belirtin
   * `packages/server` içinde `.env` oluşturup `PORT` belirtin
   * Çalıştırın:

     &#x20;   ```bash
    pnpm dev
    ```

   `packages/ui` veya `packages/server` içinde yaptığınız değişiklikler [http://localhost:8080](http://localhost:8080) üzerinde yansır.

   `packages/components` içinde değişiklik yaptıysanız, yeniden `pnpm build` çalıştırın.

10. Tüm değişikliklerden sonra production için tekrar doğrulayın:

    &#x20;   ```bash
    pnpm build
    pnpm start
    ```

11. Kodu commit edin ve fork branch'inizden [Flowise main](https://github.com/FlowiseAI/Flowise/tree/main)'e Pull Request açın.

    ### Testler

* Unit test'ler kaynak dosyalarla aynı konuma yerleştirilir. Örneğin `Foo.ts` için test dosyası `Foo.test.ts` olarak aynı klasörde olur.
* Paket bazında test çalıştırma:

  &#x20;   ```bash
    cd packages/server \&\& pnpm test
    cd packages/components \&\& pnpm test
    cd packages/agentflow \&\& pnpm test
    ```

  Veya repo kökünden `--filter` ile:

  &#x20;   ```bash
    pnpm --filter flowise-components test
    pnpm --filter @flowiseai/agentflow test
    pnpm --filter "./packages/server" test
    ```

* Tüm testleri repo kökünden çalıştırmak için:

  &#x20;   ```bash
    pnpm test
    ```

* Yeni functionality eklerken test dosyasını kaynak dosyanın yanına koyun:

  &#x20;   ```
    packages/components/nodes/tools/MyTool/
    ├── MyTool.ts
    └── MyTool.test.ts
    ```

  ### E2E Testler

  Server paketi için [Cypress](https://github.com/cypress-io) kullanılır. Dev modda test suite çalıştırmak için:

  ```sh
cd Flowise/packages/server
pnpm install
./node\_modules/.bin/cypress install
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

  ### `atoms/` - UI Primitives

  "Nasıl göründüğü" ile ilgilenir.

* Küçük, indirgenemez UI component'ler
* Business logic içermez
* API call yapmaz
* Stateless veya minimum local state içerir
* `features/` tarafından import edilir, tersi olmaz

  Amaç: yüzde 100 görsel tutarlılık.

  ### `features/` - Domain Features

  "Ne yaptığı" ile ilgilenir.

* Kendi içinde bağımsız domain modülleri
* Component, hook ve utility'lerini kendi içinde taşır
* Feature'lar birbirinden doğrudan import etmez
* Smart component'ler `containers/`, presentational component'ler `components/` altında tutulur

  Amaç: yüksek cohesion. Bir feature klasörü silinse diğerlerini kırmamalı.

  ### `core/` - Business Logic

  "Beyin" katmanıdır.

* Framework-agnostic logic
* React yok
* UI yok
* Pure TypeScript
* Validation schema, node registry, constants ve shared types burada tutulur

  Amaç: framework-agnostic source of truth olmak.

  ### `infrastructure/` - External Services

  "Dış dünya" katmanıdır.

* API client layer
* Global state management
* Data persistence
* Network request'ler

  Amaç: dış bağımlılıkları soyutlayarak kolay değiştirilebilir veya test edilebilir hale getirmek.

  ### Dependency Flow

  Bağımlılıklar yalnızca aşağı doğru akmalıdır.

* `features` → `atoms`, `infrastructure`, `core`
* `infrastructure` → `core`
* `atoms` → yalnızca `core/types`, `core/theme`, `core/primitives`
* `core` → hiçbir şey import etmez

  ### Gatekeeper Pattern

  Her modül yalnızca gerekli olanı `index.ts` üzerinden dışa açar. Bu sayede:

* encapsulation sağlanır
* tree-shaking kolaylaşır
* modül sözleşmeleri netleşir

  ### Yeni Feature Eklemek

  Yeni bir feature eklerken:

* `features/my-feature/` altında klasör oluşturun
* `containers/`, `components/`, `hooks/`, `helper.ts`, `index.ts` yapısını izleyin
* Gereken export'ları `index.ts` üzerinden yapın
* Başka feature'lardan doğrudan import etmeyin

  ### Root Files

* `AgentflowProvider.tsx`: infrastructure katmanını enjekte eder
* `Agentflow.tsx`: kullanıcıların kullanacağı ana component
* `useAgentflow.ts`: public hook
* `index.ts`: npm için public API barrel dosyası

  ### Naming Convention

|Tür|Kural|Örnek|
|-|-|-|
|Component|PascalCase.tsx|`AgentFlowNode.tsx`|
|Hook|camelCase.ts (`use` prefix)|`useFlowHandlers.ts`|
|Logic/Types|camelCase.ts|`flowValidation.ts`|
|Styles|kebab-case|`canvas.css`|

## 📦 @flowiseai/agentflow Paketi

`@flowiseai/agentflow`, AI agent workflow'larını oluşturmak ve görselleştirmek için geliştirilen, gömülebilir bir React component paketidir.

### Durum

Bu paket şu anda aktif geliştirme altındadır.

* Component'ler henüz tam işlevsel değildir
* End-to-end functionality tamamlanmamıştır
* Feature'lar hâlâ uygulanmakta ve test edilmektedir
* API'ler stable release öncesi değişebilir
* Dokümantasyon geliştirme ilerledikçe güncellenmektedir

Production ortamında kullanılamaz. Yalnızca geliştirme ve test amaçlıdır.

### Genel Bakış

`@flowiseai/agentflow`, AI agent workflow'ları oluşturmak için React tabanlı bir flow editor'dür. ReactFlow üzerinde kurulu görsel bir canvas sağlar ve AI agent, LLM, tool ve logic node'larını birbirine bağlamayı mümkün kılar.

### Özellikler

* **Visual Canvas** — ReactFlow tabanlı drag-and-drop flow editor; zoom, pan, minimap ve fit-to-view kontrolleri içerir
* **15 Built-in Node Types** — Start, Agent, LLM, Condition, Condition Agent, Human Input, Loop, Direct Reply, Custom Function, Tool, Retriever, Sticky Note, HTTP, Iteration ve Execute Flow
* **Node Editor Dialog** — Dinamik input type'larıyla node parametre düzenleme modal'ı
* **Rich Text Editor** — JavaScript, TypeScript, Python ve JSON için syntax highlighting destekli TipTap editor
* **Specialized Input Components** — Condition builder, messages input ve structured output schema builder
* **AI Flow Generator** — Doğal dilden flow üretimi, model seçimiyle birlikte
* **Flow Validation** — Boş flow, eksik start node, disconnected node, cycle, hanging edge ve node input error'larını tespit eder
* **Dark Mode** — Design token ve CSS variable üzerinden light/dark theme desteği
* **Read-Only Mode** — View-only embedding için düzenlemeyi kapatır
* **Custom Rendering** — Default header ve node palette yerine kendi component'lerinizi verebilirsiniz
* **Imperative API** — `ref` ile programatik kontrol
* **Request Interceptor** — Axios request'lerini özelleştirme imkanı
* **Keyboard Shortcuts** — Cmd/Ctrl+S ile save

### Kurulum

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
        nodes: \[
            {
                id: 'startAgentflow\_0',
                type: 'agentflowNode',
                position: { x: 100, y: 100 },
                data: {
                    id: 'startAgentflow\_0',
                    name: 'startAgentflow',
                    label: 'Start',
                    color: '#7EE787',
                    hideInput: true,
                    outputAnchors: \[{ id: 'startAgentflow\_0-output-0', name: 'start', label: 'Start', type: 'start' }]
                }
            }
        ],
        edges: \[],
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
`components`	`string\[]`	—	Palette'te hangi node type'larının görüneceğini sınırlar
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
