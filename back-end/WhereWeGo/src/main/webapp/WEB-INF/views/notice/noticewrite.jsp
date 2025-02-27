<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<script src="ckeditor/ckeditor.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="text/javaScript" language="javascript"></script>
<script>
	$(document).ready(function() {
		CKEDITOR.replace('content');
		$(function() {
			$('input[type=button]').click(function() {
				console.log(CKEDITOR.instances.content.getData());
			});
		});
	});
	
	 var allEditors = document.querySelector('.content');
     ClassicEditor.create(allEditors);
     $("#noticeFrm").submit(function(e) {
         var content = $('.content').val();
         html = $(content).text();
         if ($.trim(html) == '') {
             alert("Please enter message");
             e.preventDefault();
         } else {
             alert("Success");
         }
     });
</script>
<style>
	#mainDiv {
		width: 72%;
		margin: 0 auto;
		color: #00282e;
		text-align: center;
	}
	
	#mainDiv>h1 {
		margin-bottom: 30px;
		text-align: left;
	}
	
	#noticeDiv {
		background-color:#f5ebe3;
		padding : 5% 10% 13% 13%;
		border-radius: 8px;
	}
	
	button{font-family: "TmoneyRoundWindRegular";}
	
	input[type=text], input[type=file] {
		width : 94%;
		border-radius: 4px;
		padding: 10px;
		margin-bottom: 40px;
		border: 1px solid white;
		background-color: white;
		font-family: "TmoneyRoundWindRegular";
	}
	
	input[type=text]:focus, input[type=file]:focus, input[type=file]:focus, textarea:focus {
		width : 94%;
		border-radius: 4px;
		padding: 10px;
		margin-bottom: 40px;
		border: 1px solid white;
		background-color: #efcac3;
		outline: none;
	}
	
	textarea {height:700px;}
	
	#buttonMenu {
		float: right;
	}
	
	.button {
		background-color: #fd7d73;
		border: none;
		color: #f5ebe3;
		padding: 10px 20px;
		margin: 10px 0px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		border-radius: 12px;
		transition-duration: 0.4s;
		font-size: 13px;
		width: 70px;
		text-align: center;
	}
	
	.button:hover {
		color: #0e595f;
	}
	
	body::-webkit-scrollbar { display:none; }
</style>

<div id="mainDiv">
	<h1>공지사항 등록</h1>
	
	<form method="post" action="/wherewego/noticeWriteOk" name="noticeFrm" id="noticeFrm" enctype="multipart/form-data">
		<div id="noticeDiv">

			
			<label><b>제목</b></label> : <input type="text" id="title" name="title" required/><br />
			<textarea name="content" class="content" id="content" ></textarea><br />
			<label><b>파일</b></label> : <input type="file" id="filename" name="filename"/><br/>

			
			<div id="buttonMenu">
				<button type="submit" class="button">작성</button>
				<a class="button" href="/wherewego/noticeList">목록</a>
			</div>
		</div>
	</form>
</div>
<html>