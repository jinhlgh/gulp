//引入gulp
var gulp = require("gulp");

//拷贝index.html
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//拷贝数据
gulp.task("data", function(){
    return gulp.src("*.json")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//拷贝图片 压缩图片
var imagemin = require("gulp-imagemin");
gulp.task("images", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(imagemin())
    .pipe(connect.reload());
})

//拷贝js文件 
gulp.task("scripts", function(){
    return gulp.src(["js/*.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//编译scss
var scss = require("gulp-sass-china");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
gulp.task("index_scss", function () {
    return gulp.src("style/index.scss")
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})
gulp.task("login_scss", function () {
    return gulp.src("style/login.scss")
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("login.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})
gulp.task("register_scss", function () {
    return gulp.src("style/register.scss")
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("register.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})
gulp.task("detail_scss", function () {
    return gulp.src("style/detail.scss")
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(gulp.dest("dist/css"))
        
        .pipe(minifyCSS())
        .pipe(rename("detail.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})
gulp.task("product_scss", function () {
    return gulp.src("style/product.scss")
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCSS())
        .pipe(rename("product.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

//测试
gulp.task("build", ["copy-html", "data", "images", "index_scss", "login_scss", "register_scss", "detail_scss", "product_scss", "scripts"], function(){
    console.log("编译成功");
})

//监听
gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.json", ["data"]);
    gulp.watch("images/**/*", ["images"]);  //拷贝images下的所有文件
    gulp.watch("style/*.scss", ["index_scss"]);
    gulp.watch("style/*.scss", ["login_scss"]);
    gulp.watch("style/*.scss", ["register_scss"]);
    gulp.watch("style/*.scss", ["detail_scss"]);
    gulp.watch("style/*.scss", ["product_scss"]);
    gulp.watch("js/*.js", ["scripts"]);
})

//启动服务
var connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})

gulp.task("default", ["watch", "server"]);