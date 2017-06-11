var gulp=require("gulp");
var uglify=require("gulp-uglify");
var concat=require("gulp-concat");
var minify_css = require('gulp-minify-css');
var htmlmin=require("gulp-htmlmin");
var imagemin = require('gulp-imagemin');//图片的压缩
var jpegtran = require('imagemin-jpegtran');
var webserver = require('gulp-webserver');

gulp.task("jsmin",function(){
	gulp.src("src/js/*.js")
	       .pipe(concat("main.js"))                  //合并
	       .pipe(uglify())      			//压缩
	       .pipe(gulp.dest("bound/js/"))    	//复制
})
gulp.task("cssmin",function(){
	gulp.src("src/css/*.css")
	       .pipe(concat("main.css"))
	       .pipe(minify_css())
	       .pipe(gulp.dest("bound/css/"))
})
gulp.task("htmlmin",function(){
	gulp.src("src/html/*.html")
	       .pipe(concat("main.html"))
	       .pipe(htmlmin({collapseWhitespace:true}))
	       .pipe(gulp.dest("bound/html/"))
})
gulp.task("imgmin",function(){
	gulp.src("src/images/*.jpeg")
	.pipe(imagemin([
			imagemin.jpegtran({progressive:true})
		]))
	.pipe(gulp.dest("bound/images/"))
})

gulp.task("server",["jsmin","cssmin","htmlmin","imgmin"],function(){
	gulp.watch("./src/html/*.html",["htmlmin"])
	gulp.watch("./src/css/*.css",["cssmin"])
	gulp.watch("./src/js/*.js",["jsmin"])

	gulp.src("./bound")
	      .pipe(webserver({
	      livereload: true,
	      port: 2333,
	      directoryListing: true,
	      middleware:function(req,res,next){
	      	//console.log(req.url)
	      	var datas={
	      		name:"1504a"
	      	}
	      	res.writeHead(200,{
	      		"Content-type":"application/json;charset=UTF-8",
	      		"Access-Control-Allow-Origin":"*"
	      	})
	      	res.write(JSON.stringify(datas))
	      	res.end()
	      },
	      open: "/html/main.html"
	    }));
})
