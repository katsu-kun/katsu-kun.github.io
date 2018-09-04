var testIchidan = new Ichidan('i', "食べる", "たべる", "to eat");
var testU   = new Godan('g', "洗う", "あらう", "to eat");
var testIku = new Godan('g', "行く", "いく", "to eat");
var testKu = new Godan('g', "書く", "かく", "to eat");
var testGu = new Godan('g', "泳ぐ", "およぐ", "to eat");
var testSu = new Godan('g', "話す", "はなす", "to eat");
var testTsu = new Godan('g', "立つ", "たつ", "to eat");
var testBu = new Godan('g', "遊ぶ", "あそぶ", "to eat");
var testMu = new Godan('g', "読む", "よむ", "to eat");
var testRu = new Godan('g', "入る", "はいる", "to eat");

var testCases   = [testIchidan, testU, testIku, testKu, testGu,
                   testSu, testTsu, testBu, testMu, testRu];
var testCaseIds = ['ichi', 'u', 'iku', 'ku', 'gu', 'su', 'tsu', 'bu', 'mu', 'ru'];
var testCaseElement = document.getElementById("test-cases");

for(var i = 0; i < testCases.length; i++){
    var verb = testCases[i];
    var parentElement = document.getElementById(testCaseIds[i]);
    
    var paragraphText = "";
    paragraphText += verb.getShort(1,1) + verb.getShort(1,0) + 
                     verb.getShort(0,1) + verb.getShort(0,0);
}