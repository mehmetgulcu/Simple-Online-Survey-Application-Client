# Angular Uygulaması - Basit Online Anket Uygulaması

## Açıklama

Bu Angular uygulaması, kullanıcıların anketler oluşturabileceği, mevcut anketlere oy verebileceği ve kendi oluşturdukları anketleri görüntüleyebileceği basit bir platformdur. Uygulama, JWT (JSON Web Token) ile kimlik doğrulama ve yetkilendirme kullanmaktadır. Kullanıcılar, giriş yaparak anketlere erişebilir, yeni anketler oluşturabilir ve kendi oluşturdukları anketleri yönetebilir.

---

## Uygulamanın Bileşenleri

### **AppComponent**
Uygulamanın kök bileşenidir ve şu temel işlevleri yerine getirir:
- **Yönlendirme (Routing)**: Uygulamanın yönlendirme mekanizmasını yapılandırır ve kullanıcıların login, kayıt, anket oluşturma ve anket detaylarını görmelerini sağlar.
- **HTTP Client**: Angular’ın `HttpClient` servisini kullanarak, backend sunucusuyla iletişim kurar. Bu servis, anket verilerini almayı (anketler, kullanıcı bilgileri) ve sunucuya veri göndermeyi (giriş, kayıt, anket oluşturma, oy verme) sağlar.
- **Authentication Interceptors**: `AuthInterceptor` yapılandırılır ve HTTP isteği ile birlikte JWT token'ı otomatik olarak ekler, böylece korunan kaynaklara yetkilendirilmiş erişim sağlanır.
- **Toastr Entegrasyonu (Opsiyonel)**: Kullanıcıya bilgilendirici mesajlar sunmak için `Toastr` kütüphanesi kullanılabilir. Örneğin, giriş başarısı, kayıt tamamlanması ve oy verme sonuçları hakkında bilgilendirme yapılabilir.

### **LoginComponent**
Kullanıcı girişini yönetir:
- **Giriş Formu**: Kullanıcıların e-posta ve şifre bilgilerini girmesine olanak tanır.
- **Giriş Butonu**: Bu butona tıklanarak giriş işlemi başlatılır.
- **Form Doğrulama**: Kullanıcıların geçerli e-posta ve şifre formatları girmeleri sağlanır.
- **Authentication Service**: Bu bileşen, giriş için sunucuya istek gönderir ve sunucudan gelen yanıtı işler. Başarılı girişte, JWT token'ı yerel depolamaya kaydedilir.

### **RegisterComponent**
Yeni kullanıcı kayıt işlemini yönetir:
- **Kayıt Formu**: E-posta ve şifre gibi kullanıcı bilgilerini alır.
- **Kayıt Butonu**: Bu butona tıklanarak kayıt işlemi başlatılır.
- **Form Doğrulama**: Güçlü şifre politikaları ve geçerli e-posta formatları doğrulanır.
- **Kayıt Servisi**: Kayıt bilgileri sunucuya gönderilir ve kullanıcı hesabı oluşturulur.

### **DashboardComponent**
Giriş yapmış kullanıcılar için merkezi bir hub görevi görür:
- **Anketler Listesi**: Kullanıcının JWT token'ı ile sunucudan alınan anketler listelenir. Yalnızca kimliği doğrulanmış kullanıcılar erişebilir.
- **Navigasyon**: Kullanıcılara yeni anket oluşturma ve mevcut anketleri görüntüleme gibi seçenekler sunar.

### **CreatePollComponent**
Kullanıcıların yeni anket oluşturmasını sağlar:
- **Anket Başlığı Girişi**: Kullanıcıların anket başlıklarını girmesine olanak tanır.
- **Seçenek Girişi**: Anket seçeneklerini belirlemek için birden fazla giriş alanı içerir.
- **Anket Oluştur Butonu**: Bu butona tıklanarak yeni anket sunucuya gönderilir.
- **Hata Yönetimi**: Anket oluşturulurken herhangi bir hata oluşursa kullanıcıya geri bildirim verilir.

### **MyPollsComponent**
Kullanıcıların oluşturduğu anketleri görüntüler:
- **Yetkilendirilmiş Kullanıcı Kontrolü**: Yalnızca giriş yapmış kullanıcılar bu bileşene erişebilir.
- **Oluşturulan Anketler Listesi**: Kullanıcıların oluşturduğu anketler listelenir ve JWT token'ı ile sunucudan alınır.

### **PollDetailComponent**
Bir anketin detaylarını görüntüler:
- **Anket Bilgisi**: Anket başlığı, seçenekler ve her bir seçenek için oy sayıları gibi bilgileri gösterir.
- **Oy Verme Fonksiyonu (Opsiyonel)**: Kullanıcılar, aktif anketlere oy verebilir. Oy verme işlemi sunucuya gönderilir ve JWT token ile yetkilendirilir.

---

## Kimlik Doğrulama ve Yetkilendirme:

Uygulama, JWT (JSON Web Token) kullanarak kimlik doğrulama işlemlerini gerçekleştirir. JWT, sunucu ve istemci arasında güvenli bir şekilde kullanıcı bilgilerini taşıyan bir yapıdır.

1. **Giriş İşlemi**: Kullanıcılar, LoginComponent üzerinden e-posta ve şifre bilgilerini sunucuya gönderir.
2. **JWT Token**: Sunucu, kullanıcının kimliğini doğruladıktan sonra bir JWT token'ı oluşturur. Bu token, kullanıcı bilgilerini ve gizli bir anahtarı içerir ve istemciye gönderilir.
3. **Token Depolama**: İstemci, JWT token'ını yerel depolama (localStorage) içinde saklar.
4. **İleri Seviye İstekler**: Gelecekteki tüm korunan kaynaklara yapılacak isteklerde, istemci bu token'ı başlık olarak ekler. Bu, kullanıcının yetkilendirilmiş olduğunun doğrulanmasını sağlar.

---

## Kurulum ve Başlatma:

1. **Proje Klasörüne Git**:
   ```bash
   cd /path/to/project
2. **Gerekli Bağımlılıkları Yükleyin**:

   ```bash
   npm install
3. **Uygulamayı Çalıştırın**:
   ```bash
   ng serve

4. Uygulamayı Tarayıcıda Görüntüleyin
http://localhost:4200 adresinden uygulamayı açabilirsiniz.

Bu proje, basit bir online anket uygulaması olarak tasarlanmıştır ve Angular ile backend entegrasyonu konusunda temel bir anlayış sunmaktadır.

## Proje Görselleri
![Login Sayfası](https://github.com/mehmetgulcu/Simple-Online-Survey-Application-Client/blob/main/assets/login.PNG)
![Kayıt Sayfası](https://github.com/mehmetgulcu/Simple-Online-Survey-Application-Client/blob/main/assets/register.PNG)
![Dashboard Sayfası](https://github.com/mehmetgulcu/Simple-Online-Survey-Application-Client/blob/main/assets/dashboard.PNG)
![Anket Detay ve Oylama Sayfası](https://github.com/mehmetgulcu/Simple-Online-Survey-Application-Client/blob/main/assets/poll-detail.PNG)
![Anket Oluşturma Sayfası](https://github.com/mehmetgulcu/Simple-Online-Survey-Application-Client/blob/main/assets/create-poll.PNG)
