# AGENTS.md

## UI ANA ILKE
Bu klasorde ana hedef, Netlify preview'da acilan yuzeyin saf Flowise arayuzu ile ayni davranmasidir.
Lite, demo, admin veya ozel landing ekranlari ana urun kabul edilmez.

## ONCELIK SIRASI
1. root
2. /chatflows
3. config ve settings fetch zinciri
4. ana shell render
5. diger rotalar

## HATA SAYILAN DURUMLAR
- root'ta ozel landing acilmasi
- /chatflows'in acilmamasi
- sadece header gorunmesi
- bos veya kirik #root
- /api/v1/settings kirildigi icin eksik render olmasi
- lite/demo/admin yuzeyinin ana preview olarak acilmasi

## ILK KONTROL DOSYALARI
- packages/ui/src/routes/index.jsx
- packages/ui/src/routes/MainRoutes.jsx
- packages/ui/src/store/context/ConfigContext.jsx
- packages/ui/src/store/constant.js
- packages/ui/src/api/client.js
- packages/ui/src/views/netlifyLite/LandingPage.jsx
- packages/ui/src/views/netlifyLite/ChatPage.jsx

## DUZELTME KURALI
- Minimum riskli patch yap.
- Gereksiz refactor yapma.
- Standart Flowise route ve shell mantigini bozma.
- Sorunu gizleyen gecici UI yamasi yapma.

## ZORUNLU DOGRULAMA
UI duzeldi demeden once sunlari kontrol et:
- root davranisi
- /chatflows davranisi
- console hatalari
- network hatalari
- DOM #root render durumu
- HTML bootstrap ve script yuklenmesi
- /api/v1/settings sonucu

## RAPORLAMA
Sonucu kisa ve teknik yaz:
- hangi rota bozuktu
- hangi dosya etkiledi
- hangi duzeltme yapildi
- hangi kanitla dogrulandi
Kanit yoksa acikca "kanit yok" yaz.
