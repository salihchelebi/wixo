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

## Test / Kontrol Önerisi

```bash
pnpm --filter flowise-ui build
```

Deploy sonrası Netlify Function kontrolü:

- `POST /api/supabase-flow` çağrısı 200 dönmeli.
- `/netlify-lite/chat` ekranında Yükleniyor/Başarılı/Hata durumları görünmeli.
