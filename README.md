# E-Commerce Site

E-commerce site, kullanıcıların ürünleri görüntüleyebileceği, detaylarını inceleyebileceği ve satın alma işlemleri yapabileceği bir platformdur. Proje, erkek ve kadın kıyafetleri, mücevher/takı, elektronik aletler gibi kategorilerde ürünler sunmaktadır.

## Kullanılan Teknolojiler

- **Vite** - Hızlı geliştirme ortamı
- **React** - Kullanıcı arayüzü için
- **TypeScript** - Güçlü tip güvenliği
- **JSON Server** - Sahte backend ile kullanıcı verisi ve ürün bilgisi
- **MUI (Material-UI)** - UI bileşenleri için

## Kurulum

Projeyi yerel ortamda çalıştırmak için:

1. Projeyi klonlayın:
    ```bash
    git clone https://github.com/your-username/e-commerce-site.git
    ```

2. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3. JSON Server'ı başlatın (db.json dosyasını kullanarak sahte backend başlatmak için):
    ```bash
    npm run server
    ```

4. Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

Proje şu anda yerel ortamda **`http://localhost:3000`** adresinde çalıştırılabilir.

## Klasör Yapısı

- `src/` - Uygulamanın kaynak dosyaları
- `db.json` - Kullanıcı isimleri, şifreleri ve bakiyelerinin yer aldığı JSON dosyası (JSON Server için)
- `vite.config.ts` - Vite yapılandırma dosyası

##Özellikler

- **Kullanıcı Girişi ve Kayıt** - Kullanıcılar hesap oluşturabilir ve giriş yapabilir.
- **Ürün Listeleme** - Kategorilere göre ürünleri listeleyebilir ve detaylarına ulaşabilirsiniz.
- **Sepet Özelliği** - Ürünleri sepete ekleyebilir ve satın alabilirsiniz.
- **Ürün Satın Alma** - Kullanıcılar ödeme yaparak ürün satın alabilirler.

##  Notlar

Bu proje bireysel gelişim amacıyla oluşturulmuştur ve bir sahte backend (JSON Server) kullanmaktadır.

