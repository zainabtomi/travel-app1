// استيراد ملفات الأنماط (CSS/SCSS) الخاصة برأس الصفحة، النموذج، وتذييل الصفحة
import "./styles/header.scss";
import "./styles/form.scss";
import "./styles/footer.scss";
import "./styles/responsive.scss";


// استيراد الدوال اللازمة من ملف app.js
import {
  getFromGeonamesAPI, // جلب إحداثيات الموقع من API GeoNames
  getFromWeatherbit,   // جلب بيانات الطقس من API Weatherbit
  getFromPixabayAPI,   // جلب صورة للموقع من API Pixabay
  tripInfo,            // معالجة وعرض معلومات الرحلة
  primaryObject,       // كائن يحتوي على البيانات الرئيسية (غير مستخدم هنا)
  countDays,           // حساب عدد الأيام بين تواريخ الرحلة (غير مستخدم هنا)
} from "./js/app.js";

// التأكد من تحميل المحتوى بالكامل قبل تشغيل الكود
document.addEventListener("DOMContentLoaded", () => {
  // الحصول على العنصر النموذجي (form) من الـ HTML
  const formElement = document.getElementById("myform");

  // إضافة مستمع لحدث الإرسال (submit) لاستدعاء دالة المعالجة
  formElement.addEventListener("submit", handleFormSubmit);

  // دالة لمعالجة إرسال النموذج
  async function handleFormSubmit(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة عند الإرسال

    // الحصول على القيم المدخلة من المستخدم
    const destinationInput = document.getElementById("location").value;
    const tripStartDate = document.getElementById("start-date").value;
    const tripEndDate = document.getElementById("return-date").value;

    try {
      // استدعاء API GeoNames لجلب إحداثيات الوجهة المدخلة
      const locationCoordinates = await getFromGeonamesAPI(destinationInput);

      // استدعاء API Weatherbit لجلب بيانات الطقس بناءً على الإحداثيات
      const locationWeather = await getFromWeatherbit(
        locationCoordinates.lat,
        locationCoordinates.lng
      );

      // استدعاء API Pixabay لجلب صورة متعلقة بالموقع المدخل
      const locationImage = await getFromPixabayAPI(destinationInput);

      // معالجة وعرض معلومات الرحلة باستخدام البيانات التي تم جلبها
      tripInfo(
        locationCoordinates,
        locationWeather,
        locationImage,
        tripStartDate,
        tripEndDate
      );
    } catch (error) {
      // طباعة الخطأ في وحدة التحكم وعرض تنبيه للمستخدم
      console.error("An error occurred while fetching trip data:", error);
      alert(
        "Failed to retrieve trip details. Please check your input and try again later."
      );
    }
  }
});

