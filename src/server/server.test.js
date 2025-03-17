// استيراد مكتبة Supertest لاختبار الـ API
const request = require("supertest");
let server; // متغير لتخزين الخادم الذي سيتم اختباره

// سيتم تشغيل هذا قبل بدء الاختبارات
beforeAll(() => {
  process.env.PORT = 8001; // تحديد منفذ مختلف للاختبار
  server = require("./server"); // استيراد الخادم من ملف index.js
});

// سيتم تشغيل هذا بعد انتهاء الاختبارات لإغلاق الخادم
afterAll((done) => {
  server.close(done); // إغلاق الخادم بعد انتهاء جميع الاختبارات
});

// مجموعة من الاختبارات الخاصة بنقطة الوصول GET /
describe("GET /", () => {
  // اختبار الاستجابة من نقطة الوصول الرئيسية
  it("should respond with the index.html file", async () => {
    // إجراء الطلب GET إلى الصفحة الرئيسية
    const response = await request(server).get("/");

    // التأكد من أن حالة الاستجابة هي 200 (نجاح)
    expect(response.statusCode).toBe(200);

    // التأكد من أن نوع المحتوى في الاستجابة هو HTML
    expect(response.headers["content-type"]).toBe("text/html; charset=UTF-8");
  });
});

