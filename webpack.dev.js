// استيراد المكتبات المطلوبة
const path = require("path"); // مكتبة للتعامل مع مسارات الملفات
const webpack = require("webpack"); // مكتبة ويب باك الأساسية
const HtmlWebPackPlugin = require("html-webpack-plugin"); // لإنشاء ملف HTML تلقائيًا
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // لتنظيف مجلد البناء (dist) قبل كل بناء جديد
const WorkboxPlugin = require("workbox-webpack-plugin"); // لإضافة خدمة العامل (Service Worker) لتطبيقات الويب التقدمية (PWA)

// تصدير إعدادات ويب باك
module.exports = {
  // نقطة الدخول للتطبيق، الملف الرئيسي الذي يبدأ منه التطبيق
  entry: "./src/client/index.js",

  // وضع التطوير، يمكن تغييره إلى "production" عند بناء التطبيق للنشر
  mode: "development",

  // إنشاء خرائط المصدر (source maps) لتسهيل تصحيح الأخطاء
  devtool: "source-map",

  // إعدادات خادم التطوير
  devServer: {
    static: path.join(__dirname, "dist"), // المجلد الذي سيتم تقديم الملفات منه
    port: 8080, // المنفذ الذي سيتم تشغيل الخادم عليه
  },

  // قواعد تحويل الملفات
  module: {
    rules: [
      {
        test: /\.js$/, // تطبيق القاعدة على ملفات JavaScript
        exclude: /node_modules/, // استبعاد مجلد node_modules
        use: {
          loader: "babel-loader", // استخدام Babel لتحويل JavaScript الحديث إلى إصدارات متوافقة مع المتصفحات
        },
      },
      {
        test: /\.(scss|css)$/, // تطبيق القاعدة على ملفات CSS و SCSS
        use: ["style-loader", "css-loader", "sass-loader"], // استخدام loaders لتحويل SCSS إلى CSS وحقنه في الصفحة
      },
      {
        test: /\.(png|jpg|gif)$/i, // تطبيق القاعدة على ملفات الصور
        use: {
          loader: "file-loader", // استخدام file-loader لتحميل الصور
          options: {
            name: "[name].[ext]", // الحفاظ على اسم الملف الأصلي وامتداده
          },
        },
      },
    ],
  },

  // الإضافات (Plugins) المستخدمة في المشروع
  plugins: [
    // إنشاء ملف HTML تلقائيًا بناءً على القالب المحدد
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html", // مسار القالب
      filename: "./index.html", // اسم الملف الناتج
    }),

    // تنظيف مجلد dist قبل كل بناء جديد
    new CleanWebpackPlugin({
      dry: true, // وضع التجربة الجافة (لا يتم حذف أي ملفات فعليًا)
      verbose: true, // عرض تفاصيل العمليات في الكونسول
      cleanStaleWebpackAssets: true, // تنظيف الأصول القديمة
      protectWebpackAssets: false, // عدم حماية أصول ويب باك
    }),

    // إضافة خدمة العامل (Service Worker) لتطبيقات الويب التقدمية (PWA)
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // المطالبة بالتحكم في الصفحة فور تنشيط Service Worker
      skipWaiting: true, // تخطي الانتظار وتنشيط Service Worker فورًا
    }),
  ],
};
