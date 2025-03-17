// استيراد المكتبات اللازمة
const path = require("path"); // لتحديد المسارات
const express = require("express"); // لتشغيل الخادم وإنشاء الـ API
const cors = require("cors"); // لمعالجة مشاكل Cross-Origin (CORS)

// إنشاء تطبيق Express
const app = express();
const port = process.env.PORT || 8001; // تحديد المنفذ (إذا لم يكن موجودًا في البيئة سيتم استخدام 8001)

// إعدادات الـ Middleware
app.use(cors()); // تمكين CORS للسماح بالوصول من مصادر مختلفة
app.use(express.urlencoded({ extended: false })); // معالجة بيانات النماذج (مثل فورمات الـ URL-encoded)
app.use(express.json()); // معالجة بيانات الـ JSON الواردة
app.use(express.static("dist")); // تقديم الملفات الثابتة (مثل الصور وملفات CSS وJavaScript) من مجلد dist

// تخزين البيانات (يمكنك تعديلها لاحقًا لتستخدم قاعدة بيانات)
let projectData = {}; // سيتم تخزين البيانات المستقبلة في هذا الكائن

// نقطة الوصول للصفحة الرئيسية: إرسال ملف index.html للمستخدم
app.get("/", (req, res) => {
  res.sendFile(path.resolve("dist/index.html")); // إرسال ملف HTML من مجلد dist
});

// نقطة الوصول لجلب البيانات المخزنة
app.get("/all", (req, res) => {
  res.status(200).json(projectData); // إرسال البيانات المخزنة بتنسيق JSON
});

// استقبال البيانات من العميل وتخزينها
app.post("/projectData", (req, res) => {
  if (req.body) { // إذا كانت البيانات موجودة
    projectData = req.body; // تخزين البيانات في المتغير projectData
    res.status(200).json(projectData); // إرسال البيانات المخزنة كرد
  } else {
    res.status(400).json({ error: "لم يتم إرسال بيانات" }); // إذا كانت البيانات مفقودة
  }
});

// معالجة المسارات غير المعرفة
app.use((req, res, next) => {
  res.status(404).json({ error: "المسار غير موجود" }); // إرسال رسالة خطأ للمسارات غير الموجودة
});

// تشغيل الخادم على المنفذ المحدد
const appServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`); // إظهار رسالة تأكيد بأن الخادم يعمل
});

// تصدير الخادم لتتمكن من استخدامه في ملفات أخرى إذا لزم الأمر
module.exports = appServer;

