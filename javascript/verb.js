class Verb{
	constructor(type, kanji, kana, meaning){
		this.type  = type; //i, g, s, or k
		this.kanji = kanji;
		this.kana  = kana;
	}

	getMasu(tense, polarity){
		var masu = this.getStem();

		if(tense && polarity){
			masu += "ます";
		}
		else if(tense && !polarity){
			masu += "ません";
		}
		else if(!tense && polarity){
			masu += "ました";
		}
		else{
			masu += "ませんでした";
		}

		return masu;
	}

	getTai(tense, polarity, stem){
		var tai = this.getStem();

		if(tense && polarity){
			tai += "たい";
		}
		else if(tense && !polarity){
			tai += "たくない";
		}
		else if(!tense && polarity){
			tai += "たかった";
		}
		else{
			tai += "たくなかった";
		}

		return tai;
	}

	getTara(polarity){
		return this.getShort(0, polarity) + "ら";
	}

	toCausativePassive() {
		return this.toCausative().toPassive();
	}
}

class Ichidan extends Verb {
	constructor(type, kanji, kana, meaning){
		super(type, kanji, kana, meaning);
	}

	toPotential() {
		var newKanji = this.kanji.substring(0, this.kanji.length - 1);
		var newKana  = this.kana.substring(0,  this.kana.length -  1);

		newKanji += "られる";
		newKana  += "られる";

		return new Ichidan('i', newKanji, newKana, this.meaning);
	}

	toPassive() {
		return this.toPotential();
	}

	toCausative() {
		var newKanji = this.kanji.substring(0, this.kanji.length - 1);
		var newKana  = this.kana.substring(0,  this.kana.length -  1);

		newKanji += "させる";
		newKana  += "させる";

		return new Ichidan('i', newKanji, newKana, this.meaning);
	}

	getShort(tense, polarity){
		if(tense && polarity){
			return this.kanji;
		}

		else if(tense && !polarity){
			return this.getStem() + "ない";
		}

		else if(!tense && polarity){
			return this.getStem() + "た";
		}

		else if(!tense && !polarity){
			return this.getStem() + "なかった";
		}
	}

	getStem(){
		var stem = this.kanji.substring(0, this.kanji.length - 1);
		return stem;
	}

	getTe(polarity){
		if(polarity){
			return this.getStem() + "て";
		} 

		return this.getStem() + "なくて";
	}

	getBa(polarity){
		if(polarity){
			return this.getStem() + "れば";
		} 

		return this.getStem() + "なければ";
	}
}

var aChanges = {};
aChanges["う"] = "わ";
aChanges["く"] = "か";
aChanges["ぐ"] = "が";
aChanges["す"] = "さ";
aChanges["つ"] = "た";
aChanges["ぶ"] = "ば";
aChanges["む"] = "ま";
aChanges["る"] = "ら";

var iChanges = {};
iChanges["う"] = "い";
iChanges["く"] = "き";
iChanges["ぐ"] = "ぎ";
iChanges["す"] = "し";
iChanges["つ"] = "ち";
iChanges["ぶ"] = "び";
iChanges["む"] = "み";
iChanges["る"] = "り";

var eChanges = {};
eChanges["う"] = "え";
eChanges["く"] = "け";
eChanges["ぐ"] = "げ";
eChanges["す"] = "せ";
eChanges["つ"] = "て";
eChanges["ぶ"] = "べ";
eChanges["む"] = "め";
eChanges["る"] = "れ";

var teChanges = {};
teChanges["う"] = "って";
teChanges["く"] = "いて";
teChanges["ぐ"] = "いで";
teChanges["す"] = "して";
teChanges["つ"] = "って";
teChanges["ぶ"] = "んで";
teChanges["む"] = "んで";
teChanges["る"] = "って";

var taChanges = {};
taChanges["う"] = "った";
taChanges["く"] = "いた";
taChanges["ぐ"] = "いだ";
taChanges["す"] = "した";
taChanges["つ"] = "った";
taChanges["ぶ"] = "んだ";
taChanges["む"] = "んだ";
taChanges["る"] = "った";

class Godan extends Verb{
	constructor(type, kanji, kana, meaning){
		super(type, kanji, kana, meaning);
	}

	toPotential() {
		var lastChar = this.kanji.slice(-1);
		var ending = eChanges[lastChar] + "る";

		var newKanji = this.kanji.substring(0, this.kanji.length - 1);
		var newKana  = this.kana.substring(0,  this.kana.length - 1);

		newKanji += ending;
		newKana  += ending;

		return new Ichidan('i', newKanji, newKana, this.meaning);
	}

	toPassive() {
		var lastChar = this.kanji.slice(-1);
		var ending = aChanges[lastChar] + "れる";

		var newKanji = this.kanji.substring(0, this.kanji.length - 1);
		var newKana  = this.kana.substring(0,  this.kana.length -  1);

		newKanji += ending;
		newKana  += ending;

		return new Ichidan('i', newKanji, newKana, this.meaning);
	}

	toCausative() {
		var lastChar = this.kanji.slice(-1);
		var ending = aChanges[lastChar] + "せる";

		var newKanji = this.kanji.substring(0, this.kanji.length - 1);
		var newKana  = this.kana.substring(0,  this.kana.length -  1);

		newKanji += ending;
		newKana  += ending;

		return new Ichidan('i', newKanji, newKana, this.meaning);
	}

	getShort(tense, polarity){
		var lastChar = this.kanji.slice(-1);
		var base = this.kanji.substring(0, this.kanji.length - 1);

		if(tense && polarity){
			return this.kanji;
		}

		else if(tense && !polarity){
			return base + aChanges[lastChar] + "ない";
		}

		else if(!tense && polarity){
			// Exception for　verbs ending in いく
			if(this.kana.slice(-2) === "いく"){
				return base + "った";
			}

			return base + taChanges[lastChar];
		}

		else if(!tense && !polarity){
			return base + aChanges[lastChar] + "なかった";
		}
	}

	getStem(){
		var lastChar = this.kanji.slice(-1);
		var base = this.kanji.substring(0, this.kanji.length - 1);

		return base + iChanges[lastChar];
	}

	getTe(polarity){
		var lastChar = this.kanji.slice(-1);
		var base = this.kanji.substring(0, this.kanji.length - 1);
		
		if(polarity){
			// Account for verbs ending in いく
			if(this.kana.slice(-2) === "いく"){
				return base + "って";
			}

			var ending = teChanges[lastChar];
			return base + ending;
		}

		else{
			ending = aChanges[lastChar] + "なくて";
			return base + ending;
		}
	}

	getBa(polarity){
		var lastChar = this.kanji.slice(-1);
		var base = this.kanji.substring(0, this.kanji.length - 1);

		if(polarity){
			return base + eChanges[lastChar] + "ば";
		} 

		return base + aChanges[lastChar] + "なければ";
	}
}


