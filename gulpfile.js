const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso"); //установить npm i -D postcss-csso
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp"); //установить npm i -D gulp-webp
const svgstore = require("gulp-svgstore") //установить npm i -D gulp-svgstore
const rename = require("gulp-rename"); //установить npm i -D gulp-rename
const htmlmin = require("gulp-htmlmin"); // установить npm i -D gulp-htmlmin

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"))

}


exports.html = html;
//Images

const images = () => {
  return gulp.src("source/img/**/*{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("dist/img"))
}

exports.images = images;

//WebP

const createWebp = () => {
  return gulp.src("source/img/**/*{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("dist/img"))
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(gulp.dest("dist/img"))
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'dist'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

//Build

const build = gulp.parallel(
  styles,
  html,
  sprite,
  images,
  createWebp
)

exports.build = build;

exports.default = gulp.series(
  styles, server, watcher
);
