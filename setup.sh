BUNDAN SONRA YAPILMASI GEREKENLER

1. İlk zorunlu adım:
   LandingPage.jsx içindeki syntax hatasını düzeltip build’i yeşile çekmek.
   Bu aşama geçmeden diğer backend iyileştirmeleri “tamamlanmış teslim” sayılmamalı.

2. DB bağlantı kuralını tek ve açık hale getirmek:
   Bu iterasyonda hangi env’in gerçekten kullanılacağı net yazılmalı.
   Ana kanonik kaynak SUPABASE_CONNECT olacaksa bu açıkça korunmalı; fallback zinciri gizli değil, şeffaf ve kısa tutulmalı.

3. netlify/functions/_lib/db.js katmanını netleştirmek:
   pg pool, singleton kullanım, query helper, transaction helper, ensureSchema ve Türkçe/net hata sınıfları burada toplanmalı.
   Function dosyalarına dağınık SQL yayılmamalı.

4. Hafif ve idempotent şema bootstrap’ı tamamlamak:
   Admin user, admin session, assistant config, chat session, chat message ve lead tabloları minimum alanlarla kurulmalı.
   CREATE TABLE IF NOT EXISTS ve gerekli index mantığıyla ilerlenmeli.

5. assistantConfig storage’ı tek kaynağa bağlamak:
   assistantConfig.repo.js kalıcı tek kaynak olmalı.
   assistantConfig.kv.js sadece adapter olarak kalmalı ve mevcut export imzaları korunmalı.

6. admin-config endpoint’ini temiz ve güvenli hale getirmek:
   GET/POST/reset contract korunmalı.
   Env metadatası dönebilir ama secret value dönmemeli.
   apiKey gibi alanlar gerekiyorsa maskeli görünmeli.

7. Admin auth’ı tam anlamıyla DB-backed doğrulamak:
   Hardcoded fallback tamamen kalkmalı.
   İlk admin kullanıcı seed mantığı yalnız env üzerinden kontrollü çalışmalı.
   Signed cookie yaklaşımı korunmalı ama session gerçekten DB’de doğrulanmalı.
   Logout sırasında session invalidate edilmeli.

8. password katmanını netleştirmek:
   Plain text saklama olmamalı.
   Hash doğrulama güvenli ve sade tutulmalı.
   Auth akışında parola mantığı tek yerde yönetilmeli.

9. chat.js’i ince ama gerçek backend gibi tamamlamak:
   POST-only kontrolü, config okuma, enabled kontrolü, input validation, session açma, user message kaydı, provider çağrısı, assistant message kaydı ve response dönüş akışı korunmalı.
   Hata sınıfları net ayrılmalı: validation, config, db, provider bağlantı, provider bad response, boş yanıt.

10. Ollama bağlantısını net sırayla çözmek:
    baseUrl çözümlemesi şu sırada sabitlenmeli:
    config.baseUrl
    process.env.OLLAMA_BASE_URL
    güvenli localhost fallback

11. Sector prompt mantığı gerekiyorsa chat.js’ten çıkarmak:
    Sektöre özel davranış artacaksa ayrı helper dosyaya alınmalı.
    Chat endpoint içine gömülü büyüyen sabit harita bırakılmamalı.

12. Lead akışı gerçekten gerekiyorsa ayrı ve küçük eklenmeli:
    lead-create ancak landing/chat tarafında gerçek ihtiyaç varsa açılmalı.
    Gerekmiyorsa bu sprintte eklenmemeli.

13. netlify.toml yüzeyi korunmalı:
    Build, publish, functions ve mevcut redirect’ler bozulmamalı.
    Yeni function gerçekten eklendiyse sadece minimal redirect eklenmeli.

14. NISSAI public yüzeyi ile backend gerçekliği hizalanmalı:
    Public copy’de ürün dili korunmalı.
    Var olmayan özellik “varmış gibi” gösterilmemeli.
    Admin/chat/landing arasında semantik uyum sürdürülmeli.

15. Türkçe görünür yüzey taraması yapılmalı:
    Kullanıcıya görünen İngilizce kalan başlık, hata, CTA veya açıklama varsa Türkçeye çevrilmeli.
    Developer-facing kod semantiği gereksiz yere bozulmamalı.

16. Yerel doğrulama zinciri tamamlanmalı:

* node --check ilgili function dosyaları
* prettier/check
* LandingPage düzeltmesinden sonra build
* DB smoke test
* admin login/session smoke test
* admin-config GET/POST smoke test
* chat endpoint smoke test
* mümkünse lead akışı için ayrı smoke test

17. Teslim raporu delilli hazırlanmalı:
    Son raporda şu başlıklar net olmalı:

* değişen dosyalar
* yeni dosyalar
* korunan contract’lar
* kullanılan gerçek env
* hangi env’in ne için kullanıldığı
* şema özeti
* yapılan testler
* doğrulanamayan kalan engel

18. Sıradaki uygulama sırası kısa haliyle şu olmalı:
    Önce build kırığını kapat.
    Sonra db.js ve schema bootstrap’ı sağlamlaştır.
    Ardından config storage’ı repo-backed hale sabitle.
    Sonra admin auth/session doğrulamasını tamamla.
    Ardından chat session/message persistence ve hata sınıflarını bitir.
    En son gerçekten gerekiyorsa lead ve public sector config yüzeyini ekle.

19. Bu aşamadan sonraki doğru teslim kriteri:
    Build geçmeli.
    Auth hardcoded olmamalı.
    Config dosya tabanlı olmamalı.
    Session DB-backed doğrulanmalı.
    Chat kayıtları kalıcı olmalı.
    Rapor test ve delille desteklenmeli.

20. Kurulum komut dosyası (setup.sh) aşağıdaki gibi olmalı ve Codex ortamında gerekli tüm bağımlılıkları, araçları, doğrulamaları ve geliştirme yardımcılarını eksiksiz şekilde otomatik kurmalıdır:

    ```bash
    #!/usr/bin/env bash
    set -euo pipefail

    echo "=== ORTAM BAŞLATILIYOR ==="

    echo "Node sürümü kontrol ediliyor..."
    node -v || { echo "Node yüklü değil"; exit 1; }

    echo "NPM sürümü kontrol ediliyor..."
    npm -v || { echo "NPM yüklü değil"; exit 1; }

    echo "Temel bağımlılıklar kuruluyor..."
    npm install

    echo "Ek runtime bağımlılıkları kuruluyor..."
    npm install pg axios uuid dotenv cookie jsonwebtoken bcrypt

    echo "Geliştirme bağımlılıkları kuruluyor..."
    npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-import nodemon

    echo "Netlify CLI kuruluyor (global)..."
    npm install -g netlify-cli

    echo "Prettier config oluşturuluyor..."
    cat <<EOF > .prettierrc
    {
      "semi": true,
      "singleQuote": true,
      "trailingComma": "all"
    }
    EOF

    echo "ESLint config oluşturuluyor..."
    cat <<EOF > .eslintrc.json
    {
      "env": {
        "node": true,
        "es2021": true
      },
      "extends": ["eslint:recommended", "prettier"],
      "parserOptions": {
        "ecmaVersion": 12
      },
      "rules": {}
    }
    EOF

    echo "Ortam değişkenleri kontrol ediliyor..."
    REQUIRED_VARS=("SUPABASE_CONNECT" "ADMIN_SECRET" "OLLAMA_BASE_URL")
    for VAR in "${REQUIRED_VARS[@]}"; do
      if [ -z "${!VAR:-}" ]; then
        echo "UYARI: $VAR tanımlı değil"
      else
        echo "$VAR mevcut"
      fi
    done

    echo "DB bağlantı testi yapılıyor..."
    node -e "
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.SUPABASE_CONNECT });
    client.connect()
      .then(() => { console.log('DB bağlantısı başarılı'); return client.end(); })
      .catch(err => { console.error('DB bağlantı hatası:', err.message); process.exit(1); });
    "

    echo "Kod format kontrolü..."
    npx prettier --check . || echo "Prettier uyarıları mevcut"

    echo "Lint kontrolü..."
    npx eslint . || echo "Lint uyarıları mevcut"

    echo "Build testi çalıştırılıyor..."
    npm run build || echo "Build başarısız, kontrol gerekli"

    echo "Fonksiyon syntax kontrolü..."
    find netlify/functions -name "*.js" -exec node --check {} \;

    echo "Smoke test başlatılıyor..."

    echo "Admin login endpoint testi..."
    curl -s -X POST http://localhost:8888/.netlify/functions/admin-login \
      -H "Content-Type: application/json" \
      -d '{"username":"test","password":"test"}' || echo "Admin login test başarısız"

    echo "Admin config GET testi..."
    curl -s http://localhost:8888/.netlify/functions/admin-config || echo "Admin config test başarısız"

    echo "Chat endpoint testi..."
    curl -s -X POST http://localhost:8888/.netlify/functions/chat \
      -H "Content-Type: application/json" \
      -d '{"message":"Merhaba"}' || echo "Chat test başarısız"

    echo "=== KURULUM TAMAMLANDI ==="
    ```

21. setup.sh dosyasını kurmak ve çalıştırmak için izlenecek adımlar:

    * Proje kök dizininde `setup.sh` adında yeni bir dosya oluştur.
    * Yukarıdaki script içeriğini eksiksiz şekilde bu dosyanın içine yapıştır.
    * Dosyaya çalıştırma izni ver:

      ```bash
      chmod +x setup.sh
      ```
    * Gerekli ortam değişkenlerini export et veya `.env` dosyasına ekle:

      ```bash
      export SUPABASE_CONNECT="postgres://..."
      export ADMIN_SECRET="..."
      export OLLAMA_BASE_URL="http://localhost:11434"
      ```
    * Script’i çalıştır:

      ```bash
      ./setup.sh
      ```
    * Script tamamlandıktan sonra:

      * Netlify local dev başlat:

        ```bash
        netlify dev
        ```
      * Endpoint’lerin gerçekten çalıştığını manuel olarak da doğrula.
      * Eğer herhangi bir adım hata verirse, script çıktısındaki ilgili bölümü inceleyerek düzeltme yap.
