var testIchidan = new Ichidan('i', "食べる", "たべる", "to eat");
var testU   = new Godan('g', "洗う", "あらう", "to eat");
var testKu = new Godan('g', "書く", "かく", "to eat");
var testGu = new Godan('g', "泳ぐ", "およぐ", "to eat");
var testSu = new Godan('g', "話す", "はなす", "to eat");
var testTsu = new Godan('g', "立つ", "たつ", "to eat");
var testBu = new Godan('g', "遊ぶ", "あそぶ", "to eat");
var testMu = new Godan('g', "読む", "よむ", "to eat");
var testRu = new Godan('g', "入る", "はいる", "to eat");
document.getElementById("test-text").textContent = test.getMasu(1,1);