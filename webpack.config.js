// استيراد المكتبات اللازمة
const path = require("path"); // التعامل مع المسارات
const HtmlWebpackPlugin = require("html-webpack-plugin"); // إنشاء ملف HTML تلقائيًا وإضافة السكربتات إليه
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // تنظيف مجلد `dist` قبل كل بناء جديد
const CopyWebpackPlugin = require("copy-webpack-plugin"); // نسخ الملفات الثابتة إلى مجلد `dist`

module.exports = {
  // الملف الرئيسي لنقطة الدخول
  entry: "./src/client/index.js",

  output: {
    // تحديد مسار الملفات المخرجة (المجلد `dist`)
    path: path.resolve(__dirname, "dist"),
    // اسم الملف النهائي الناتج بعد التجميع
    filename: "bundle.js",
  },

  // وضع التطوير (development mode) لتمكين ميزات مثل سرعة البناء وعدم تصغير الأكواد
  mode: "development",

  devServer: {
    // تحديد مجلد الملفات الثابتة التي سيتم تقديمها أثناء التطوير
    static: path.join(__dirname, "dist"),
    // تشغيل الخادم المحلي على المنفذ 8080
    port: 8080,
  },

  module: {
    rules: [
      {
        // قاعدة لمعالجة ملفات JavaScript باستخدام Babel لتحويل الأكواد الحديثة إلى متوافقة مع المتصفحات
        test: /\.js$/, // استهداف جميع الملفات ذات الامتداد .js
        exclude: /node_modules/, // استثناء ملفات مكتبات NPM من التحويل
        use: {
          loader: "babel-loader", // استخدام Babel لتحويل الأكواد
          options: {
            presets: ["@babel/preset-env"], // ضبط Babel لدعم JavaScript الحديث
          },
        },
      },
      {
        // قاعدة لمعالجة ملفات SCSS وتحويلها إلى CSS
        test: /\.scss$/, // استهداف جميع الملفات ذات الامتداد .scss
        use: [
          "style-loader", // تحميل الأنماط إلى DOM باستخدام `<style>`
          "css-loader", // تحويل CSS إلى JavaScript
          "sass-loader", // تحويل SCSS إلى CSS
        ],
      },
    ],
  },

  plugins: [
    // توليد ملف `index.html` تلقائيًا وإضافة `bundle.js` إليه
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html", // استخدام ملف HTML كمصدر للقالب
      filename: "index.html", // اسم الملف الناتج في `dist`
    }),

    // نسخ ملفات ثابتة إلى `dist`
    new CopyWebpackPlugin({
      patterns: [
        // نسخ ملف `service-worker.js` إلى `dist`
        { from: "src/client/views/service-worker.js", to: "service-worker.js" },
      ],
    }),

    // تنظيف مجلد `dist` قبل إنشاء ملفات جديدة لتجنب بقاء الملفات القديمة
    new CleanWebpackPlugin(),
  ],
};
