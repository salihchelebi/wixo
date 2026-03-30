# AGENTS.md

## FUNCTION ANA ILKE
Bu klasordeki function ve proxy dosyalari, Netlify preview'in saf Flowise UI'yi dogru acabilmesi icin kritik kabul edilir.
Sadece 200 donmesi yeterli degildir; UI'nin dogru render olmasi gerekir.

## ILK KONTROL DOSYALARI
- wixoo/functions/flowise-api-proxy.js
- wixoo/functions/_lib/netlifyEnv.js
- wixoo/functions/_lib/supabaseRest.js
- netlify.toml
- packages/ui/src/store/context/ConfigContext.jsx
- .env.example
- packages/ui/.env.example

## ZORUNLU KONTROLLER
Sunlari acikca kontrol et:
- proxy hangi env'i bekliyor
- /api/v1/settings dogru route ediliyor mu
- redirect function'a ulasiyor mu
- missing env 500 mi uretiyor yoksa kontrollu fallback mi
- fallback JSON yapisi UI'nin bekledigi yapiyla uyumlu mu
- CORS veya OPTIONS problemi var mi

## OZEL KURAL: /api/v1/settings
Preview bozuksa bu endpoint her zaman kontrol edilir:
- status code nedir
- response body nedir
- ConfigContext bunu kabul ediyor mu
- response gelse bile UI kirik mi
Settings verisi geliyor ama UI acilmiyorsa sorun cozulmus sayilmaz.

## NETLIFY ROUTING KURALI
Asagidaki alanlar arasindaki uyumsuzluk birinci sinif hatadir:
- netlify.toml
- function dosya yolu
- preview request yolu
- UI'nin cagdigi API yolu

## DUZELTME KURALI
- Minimum riskli patch yap.
- Alakasiz backend refactor yapma.
- Gecici cozum kalici mimariyi bozmamali.
- Env eksigini gizleme; acikca raporla.

## RAPORLAMA
Sonucu su formatta ozetle:
- bozuk endpoint
- gercek status/response
- ilgili env veya route sorunu
- UI'ye etkisi
- minimum riskli duzeltme
Kanit yoksa acikca "kanit yok" yaz.
