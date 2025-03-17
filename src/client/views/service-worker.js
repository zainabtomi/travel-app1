// الاستماع لحدث التثبيت (install) الخاص بـ Service Worker
self.addEventListener("install", (event) => {
  console.log("Service worker installed"); // طباعة رسالة عند تثبيت الـ Service Worker
});

// الاستماع لحدث التفعيل (activate) عند تفعيل الـ Service Worker بعد التثبيت
self.addEventListener("activate", (event) => {
  console.log("Service worker activated"); // طباعة رسالة عند تفعيل الـ Service Worker
});

// الاستماع لطلبات الشبكة (fetch) واعتراضها
self.addEventListener("fetch", (event) => {
  console.log(event.request); // طباعة تفاصيل الطلب (مثل عنوان URL، الطريقة المستخدمة، وغيرها)
});

