console.log("Hello There");
var tesing = document.getElementById("testing");
var result = google.script.run.getUserInfo("hello");
testing.innerHTML = "Result: " + result;
