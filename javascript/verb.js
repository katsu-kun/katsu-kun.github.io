class Verb{
	constructor(type, kanji, kana, meaning){
		this.type  = type;
		this.kanji = kanji;
		this.kana  = kana;
	}

	getMasu(tense, polarity){
		masu = this.getStem;

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
		tai = this.getStem;

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
}

class Ichidan extends Verb {
	constructor(type, kanji, kana, meaning){
		super(type, kanji, kana, meaning);
	}

	toPotential() {
		newKanji = this.kanji.substring(0, kanji.length - 1);
		newKana  = this.kana.substring(0,  kana.length -  1);

		newKanji += "られる";
		newKana  += "られる";

		return new Ichidan(1, newKanji, newKana, this.meaning);
	}

	toPassive() {
		return this.toPotential();
	}

	toCausative() {
		newKanji = this.kanji.substring(0, kanji.length - 1);
		newKana  = this.kana.substring(0,  kana.length -  1);

		newKanji += "させる";
		newKana  += "させる";

		return new Ichidan(1, newKanji, newKana, this.meaning);
	}

	toCausativePassive() {
		return this.toCausative().toPassive();
	}

	getStem(){
		stem = this.kanji.substring(0, kanji.length - 1);
		return stem;
	}
}