// استيراد المكتبات المطلوبة
const path = require("path"); // مكتبة للتعامل مع مسارات الملفات
const webpack = require("webpack"); // مكتبة ويب باك الأساسية
const HtmlWebPackPlugin = require("html-webpack-plugin"); // لإنشاء ملف HTML تلقائيًا
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // لاستخراج CSS إلى ملفات منفصلة
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // لتحسين حجم ملفات CSS
const TerserPlugin = require("terser-webpack-plugin"); // لتحسين (minify) ملفات JavaScript
const WorkboxPlugin = require("workbox-webpack-plugin"); // لإضافة خدمة العامل (Service Worker) لتطبيقات الويب التقدمية (PWA)

// تصدير إعدادات ويب باك
module.exports = {
  // نقطة الدخول للتطبيق، الملف الرئيسي الذي يبدأ منه التطبيق
  entry: "./src/client/index.js",

  // وضع الإنتاج، يتم تحسين الكود للأداء وتقليل الحجم
  mode: "production",

  // إعدادات التحسين (optimization)
  optimization: {
    minimizer: [
      new TerserPlugin({}), // تحسين JavaScript باستخدام TerserPlugin
      new OptimizeCSSAssetsPlugin({}), // تحسين CSS باستخدام OptimizeCSSAssetsPlugin
    ],
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
        test: /\.(png|jpg|gif)$/i, // تطبيق القاعدة على ملفات الصور
        use: {
          loader: "file-loader", // استخدام file-loader لتحميل الصور
          options: {
            name: "[name].[ext]", // الحفاظ على اسم الملف الأصلي وامتداده
          },
        },
      },
      {
        test: /\.(scss|css)$/, // تطبيق القاعدة على ملفات CSS و SCSS
        use: [
          MiniCssExtractPlugin.loader, // استخراج CSS إلى ملفات منفصلة بدلاً من حقنها في JavaScript
          "css-loader", // تحويل CSS إلى JavaScript
          "sass-loader", // تحويل SCSS إلى CSS
        ],
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

    // استخراج CSS إلى ملفات منفصلة
    new MiniCssExtractPlugin({
      filename: "[name].css", // تسمية ملف CSS الناتج بنفس اسم الملف الأصلي
    }),

    // إضافة خدمة العامل (Service Worker) لتطبيقات الويب التقدمية (PWA)
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // المطالبة بالتحكم في الصفحة فور تنشيط Service Worker
      skipWaiting: true, // تخطي الانتظار وتنشيط Service Worker فورًا
    }),
  ],
};