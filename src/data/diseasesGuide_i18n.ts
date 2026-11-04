// Urdu and Roman Urdu translations of the disease guide.
// Keyed by the same entry id as diseasesData.ts. Only the
// explanatory text is translated: crop, disease and chemical /
// active-ingredient names stay in English, so a farmer can ask for
// the same product at a shop. No doses are added here — where the
// English original says "at the dose on the product label", the
// translation keeps that meaning. Bullet counts match the English
// original for every entry.

export type GuideLang = "ur" | "roman";

export interface GuideTranslation {
  cause: string;
  symptoms: string[];
  organicSolution: string[];
  chemicalSolution: string[];
  prevention: string[];
}

export const GUIDE_TRANSLATIONS: Record<string, Record<GuideLang, GuideTranslation>> = {
  "kb-wheat-yellow-rust": {
    ur: {
      cause: "یہ ایک پھپھوندی ہے جو ٹھنڈے اور نم موسم (10 سے 15 ڈگری) میں ہوا کے ذریعے سینکڑوں کلومیٹر تک پھیلتی ہے۔",
      symptoms: [
        "پتوں کی رگوں کے ساتھ ساتھ چمکدار پیلے رنگ کی دھاریاں اور دانے",
        "رگڑنے پر پیلے رنگ کا پاؤڈر جھڑتا ہے",
        "سب سے اوپر والا پتہ (flag leaf) وقت سے پہلے پیلا اور خشک ہو جاتا ہے، جس سے دانے سکڑ جاتے ہیں",
        "شدید حملے میں بالیوں پر بھی پیلے دانے بن جاتے ہیں",
      ],
      organicSolution: [
        "بیج کو Trichoderma viride سے تیار کریں۔",
        "سمندری جڑی بوٹیوں سے بنا محلول پتوں پر چھڑکیں تاکہ پودے کی قدرتی مدافعت بڑھے۔",
        "گندم کے ساتھ چنا یا مسور لگائیں تاکہ بیماری کا پھیلاؤ رکے۔",
      ],
      chemicalSolution: [
        "دھاریاں نظر آتے ہی Propiconazole 25% EC (Tilt) یا Tebuconazole 250 EC استعمال کریں، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "زیادہ دیر تک اثر کے لیے Azoxystrobin + Tebuconazole کا مکس اسپرے کریں، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "اسپرے اس طرح کریں کہ اوپر والا پتہ اور نیچے کے پتے دونوں اچھی طرح بھیگ جائیں۔",
      ],
      prevention: [
        "اپنے علاقے کے لیے منظور شدہ زنگ سے محفوظ اقسام لگائیں، جیسے Akbar-19، Ghazi-19، Fakhr-e-Bhakkar۔",
        "دیر سے کاشت نہ کریں، نومبر کے اندر کاشت مکمل کریں۔",
        "بہار کے شروع میں ہر ہفتے کھیت کا معائنہ کریں۔",
        "خود رو گندم کے پودے اور barberry جھاڑیاں ختم کریں۔",
      ],
    },
    roman: {
      cause: "Ye aik phaphundi hai jo thande aur num mausam (10 se 15 degree) mein hawa ke zariye sainkron kilometer tak phailti hai.",
      symptoms: [
        "Patton ki ragon ke saath saath chamakdar peele rang ki dhariyan aur dane",
        "Ragarne par peele rang ka powder jharta hai",
        "Sab se oopar wala patta (flag leaf) waqt se pehle peela aur khushk ho jata hai, jis se dane sikar jate hain",
        "Shadeed hamle mein baliyon par bhi peele dane ban jate hain",
      ],
      organicSolution: [
        "Beej ko Trichoderma viride se tayyar karein.",
        "Samundari jari bootion se bana mehlool patton par chharkein taake poday ki qudrati mudafiat barhe.",
        "Gandum ke saath chana ya masoor lagayein taake bimari ka phailao ruke.",
      ],
      chemicalSolution: [
        "Dhariyan nazar aate hi Propiconazole 25% EC (Tilt) ya Tebuconazole 250 EC istemal karein, sirf label par likhi miqdar ke mutabiq.",
        "Zyada der tak asar ke liye Azoxystrobin + Tebuconazole ka mix spray karein, sirf label par likhi miqdar ke mutabiq.",
        "Spray is tarah karein ke oopar wala patta aur neeche ke patte dono achhi tarah bheeg jayein.",
      ],
      prevention: [
        "Apne ilaqe ke liye manzoor shuda zang se mehfooz aqsaam lagayein, jaise Akbar-19, Ghazi-19, Fakhr-e-Bhakkar.",
        "Der se kasht na karein, November ke andar kasht mukammal karein.",
        "Bahar ke shuru mein har hafte khet ka muaina karein.",
        "Khud ro gandum ke poday aur barberry jhariyan khatam karein.",
      ],
    },
  },
  "kb-wheat-brown-rust": {
    ur: {
      cause: "یہ ہوا سے پھیلنے والی زنگ کی پھپھوندی ہے جو گرم اور مرطوب موسم میں تیزی سے بڑھتی ہے۔ اس کے بیج پتوں پر گرتے ہیں اور نمی میں اگ کر نارنجی بھورے دانے بناتے ہیں۔",
      symptoms: [
        "پتے کی اوپری سطح پر بکھرے ہوئے نارنجی بھورے گول دانے",
        "دانے پتے کی جلد پھاڑ کر پاؤڈر چھوڑتے ہیں",
        "شدید حملے میں پتے سرے سے پیلے اور خشک ہو جاتے ہیں",
        "پودے کمزور ہو جاتے ہیں اور دانے سکڑ کر ہلکے ہو جاتے ہیں",
      ],
      organicSolution: [
        "زیادہ متاثرہ پتے اتار کر کھیت سے باہر تلف کریں، وہیں نہ چھوڑیں۔",
        "ہوا کی آمدورفت بہتر کریں اور پانی دیتے وقت پتے نہ بھگوئیں۔",
        "جہاں دستیاب ہو، زنگ سے محفوظ گندم کی اقسام لگائیں۔",
      ],
      chemicalSolution: [
        "گندم کے brown rust کے لیے منظور شدہ fungicide استعمال کریں، جیسے propiconazole یا tebuconazole، یا strobilurin مکس، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "دانے نظر آتے ہی اسپرے کریں اور صرف اس وقت دہرائیں جب لیبل اجازت دے۔",
      ],
      prevention: [
        "محفوظ اقسام لگائیں اور دیر سے کاشت سے بچیں۔",
        "پانی جڑوں میں دیں، پودوں میں فاصلہ رکھیں اور فصلیں بدل بدل کر لگائیں۔",
        "کٹائی کے بعد گرے ہوئے پتے اور خود رو گندم صاف کریں۔",
        "بہار میں ہر ہفتے معائنہ کریں، خاص طور پر flag leaf کا۔",
      ],
    },
    roman: {
      cause: "Ye hawa se phailne wali zang ki phaphundi hai jo garam aur martub mausam mein tezi se barhti hai. Is ke beej patton par girte hain aur nami mein ug kar naranji bhoore dane banate hain.",
      symptoms: [
        "Patte ki oopri satah par bikhre hue naranji bhoore gol dane",
        "Dane patte ki jild phaar kar powder chhorte hain",
        "Shadeed hamle mein patte sire se peele aur khushk ho jate hain",
        "Poday kamzor ho jate hain aur dane sikar kar halke ho jate hain",
      ],
      organicSolution: [
        "Zyada mutasira patte utaar kar khet se bahar talaf karein, wahin na chhorein.",
        "Hawa ki aamad o raft behtar karein aur pani dete waqt patte na bhigoyein.",
        "Jahan dastiyab ho, zang se mehfooz gandum ki aqsaam lagayein.",
      ],
      chemicalSolution: [
        "Gandum ke brown rust ke liye manzoor shuda fungicide istemal karein, jaise propiconazole ya tebuconazole, ya strobilurin mix, sirf label par likhi miqdar ke mutabiq.",
        "Dane nazar aate hi spray karein aur sirf us waqt dohrayein jab label ijazat de.",
      ],
      prevention: [
        "Mehfooz aqsaam lagayein aur der se kasht se bachein.",
        "Pani jaron mein dein, podon mein fasla rakhein aur faslein badal badal kar lagayein.",
        "Katayi ke baad gire hue patte aur khud ro gandum saaf karein.",
        "Bahar mein har hafte muaina karein, khaas tor par flag leaf ka.",
      ],
    },
  },
  "kb-wheat-aphid": {
    ur: {
      cause: "یہ چھوٹے رس چوسنے والے کیڑے ہیں جو پتوں اور بالیوں پر جھنڈ کی صورت میں رہتے ہیں، خاص طور پر ہلکے اور خشک موسم میں۔ یہ barley yellow dwarf virus بھی پھیلاتے ہیں۔",
      symptoms: [
        "پتوں، تنوں اور بالیوں پر چھوٹے سبز، بھورے یا کالے کیڑوں کے جھنڈ",
        "پتے مڑنا، پیلے ہونا اور پودوں کی نشوونما رکنا",
        "پتوں پر چپچپا رس (honeydew)، کبھی کبھی کالی پھپھوندی کے ساتھ",
        "پودوں پر چیونٹیاں، جو اس چپچپے رس کی طرف آتی ہیں",
      ],
      organicSolution: [
        "جہاں ممکن ہو، زیادہ متاثرہ پتے ہاتھ سے اتار دیں۔",
        "aphids کے لیے منظور شدہ neem oil یا insecticidal soap کا اسپرے کریں۔",
        "ladybirds اور lacewings جیسے دوست کیڑوں کو بچائیں، ان کو مارنے والے عام اسپرے سے بچیں۔",
      ],
      chemicalSolution: [
        "صرف اس وقت aphids کے لیے منظور شدہ insecticide استعمال کریں، جیسے acetamiprid، جب تعداد زیادہ ہو اور پھیل رہی ہو، اور صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پھول آنے کے وقت اسپرے نہ کریں اگر شہد کی مکھیاں سرگرم ہوں، جب تک لیبل اجازت نہ دے۔",
      ],
      prevention: [
        "tillering سے لے کر ہر ہفتے پتے چیک کریں، خاص طور پر پتوں کی نچلی سطح۔",
        "پودے صحت مند رکھیں اور زیادہ nitrogen نہ دیں، جو aphids کو کھینچتی ہے۔",
        "کھیت کے کناروں سے وہ جڑی بوٹیاں ختم کریں جن پر aphids رہتے ہیں۔",
      ],
    },
    roman: {
      cause: "Ye chhote ras choosne wale keere hain jo patton aur baliyon par jhund ki surat mein rehte hain, khaas tor par halke aur khushk mausam mein. Ye barley yellow dwarf virus bhi phailate hain.",
      symptoms: [
        "Patton, tanon aur baliyon par chhote sabz, bhoore ya kale keeron ke jhund",
        "Patte murna, peele hona aur podon ki nashonuma rukna",
        "Patton par chipchipa ras (honeydew), kabhi kabhi kali phaphundi ke saath",
        "Podon par chuntiyan, jo is chipchipe ras ki taraf aati hain",
      ],
      organicSolution: [
        "Jahan mumkin ho, zyada mutasira patte haath se utaar dein.",
        "Aphids ke liye manzoor shuda neem oil ya insecticidal soap ka spray karein.",
        "Ladybirds aur lacewings jaise dost keeron ko bachayein, in ko maarne wale aam spray se bachein.",
      ],
      chemicalSolution: [
        "Sirf us waqt aphids ke liye manzoor shuda insecticide istemal karein, jaise acetamiprid, jab tadaad zyada ho aur phail rahi ho, aur sirf label par likhi miqdar ke mutabiq.",
        "Phool aane ke waqt spray na karein agar shehad ki makhiyan sargarm hon, jab tak label ijazat na de.",
      ],
      prevention: [
        "Tillering se le kar har hafte patte check karein, khaas tor par patton ki nichli satah.",
        "Poday sehatmand rakhein aur zyada nitrogen na dein, jo aphids ko khenchti hai.",
        "Khet ke kinaron se woh jari bootiyan khatam karein jin par aphids rehte hain.",
      ],
    },
  },
  "kb-cotton-aphids": {
    ur: {
      cause: "یہ رس چوسنے والے aphids ہیں جو گرم اور خشک موسم میں اور نرم نئی شاخوں پر تیزی سے بڑھتے ہیں۔ یہ کپاس کے وائرس بھی پھیلاتے ہیں۔",
      symptoms: [
        "پتوں کے نیچے اور بڑھتی ہوئی کونپلوں پر چھوٹے سبز یا کالے کیڑوں کے جھنڈ",
        "پتے مڑنا، سکڑنا اور پودوں کی نشوونما رکنا",
        "پتوں پر چپچپا رس (honeydew) اور کالی پھپھوندی",
        "شدید حملے میں پتے پیلے ہو کر جلدی گرنا",
      ],
      organicSolution: [
        "چھوٹے حملے کو تیز پانی کی دھار سے دھو دیں۔",
        "کپاس کے aphids کے لیے منظور شدہ neem oil یا insecticidal soap کا اسپرے کریں۔",
        "ladybirds، lacewings اور hoverflies کو بچائیں، جو aphids کھاتے ہیں۔",
      ],
      chemicalSolution: [
        "صرف اس وقت کپاس کے aphids کے لیے منظور شدہ insecticide استعمال کریں، جیسے acetamiprid، جب حملہ پھیل رہا ہو، اور صرف لیبل پر لکھی مقدار کے مطابق۔",
        "اسپرے کے درمیان کیمیکل گروپ بدلیں تاکہ کیڑوں میں مزاحمت دیر سے پیدا ہو۔",
      ],
      prevention: [
        "شروع کے موسم میں ہفتے میں دو بار پتوں کی نچلی سطح چیک کریں۔",
        "زیادہ nitrogen کھاد نہ دیں، جس سے نرم شاخیں بنتی ہیں جنہیں aphids پسند کرتے ہیں۔",
        "aphids والی جڑی بوٹیاں ختم کریں اور کھیت کی باڑیں صاف رکھیں۔",
      ],
    },
    roman: {
      cause: "Ye ras choosne wale aphids hain jo garam aur khushk mausam mein aur naram nayi shakhon par tezi se barhte hain. Ye kapas ke virus bhi phailate hain.",
      symptoms: [
        "Patton ke neeche aur barhti hui konplon par chhote sabz ya kale keeron ke jhund",
        "Patte murna, sikarna aur podon ki nashonuma rukna",
        "Patton par chipchipa ras (honeydew) aur kali phaphundi",
        "Shadeed hamle mein patte peele ho kar jaldi girna",
      ],
      organicSolution: [
        "Chhote hamle ko tez pani ki dhaar se dho dein.",
        "Kapas ke aphids ke liye manzoor shuda neem oil ya insecticidal soap ka spray karein.",
        "Ladybirds, lacewings aur hoverflies ko bachayein, jo aphids khate hain.",
      ],
      chemicalSolution: [
        "Sirf us waqt kapas ke aphids ke liye manzoor shuda insecticide istemal karein, jaise acetamiprid, jab hamla phail raha ho, aur sirf label par likhi miqdar ke mutabiq.",
        "Spray ke darmiyan chemical group badlein taake keeron mein muzahimat der se paida ho.",
      ],
      prevention: [
        "Shuru ke mausam mein hafte mein do baar patton ki nichli satah check karein.",
        "Zyada nitrogen khaad na dein, jis se naram shakhein banti hain jinhein aphids pasand karte hain.",
        "Aphids wali jari bootiyan khatam karein aur khet ki baarein saaf rakhein.",
      ],
    },
  },
  "kb-cotton-army-worm": {
    ur: {
      cause: "یہ رات کو اڑنے والے پروانے کی سنڈیاں ہیں۔ چھوٹی سنڈیاں مل کر پتے کھاتی ہیں، بڑی سنڈیاں پتے، ٹینڈے اور گولیاں کھاتی ہیں اور گروہوں میں چلتی ہیں، اسی لیے ان کا نام army worm ہے۔",
      symptoms: [
        "پتوں میں صرف رگیں رہ جانا، یا بڑے بے ترتیب سوراخ",
        "سبز سنڈیاں جن پر کالے نشان ہوتے ہیں، جو دن میں پتوں کے نیچے چھپتی ہیں",
        "خراب ٹینڈے اور نوجوان گولیاں، کبھی پتوں پر ان کی بیٹ بھی نظر آتی ہے",
        "چند دنوں میں پورے کھیت میں تیزی سے پھیلاؤ",
      ],
      organicSolution: [
        "چھوٹے کھیتوں میں سنڈیاں اور انڈوں کے جھنڈ ہاتھ سے چن لیں۔",
        "pheromone traps لگائیں تاکہ پروانوں کی تعداد معلوم ہو اور وقت پر علاج ہو۔",
        "سنڈیاں چھوٹی ہوں تو army worm کے لیے منظور شدہ Bt (Bacillus thuringiensis) یا neem oil کا اسپرے کریں۔",
      ],
      chemicalSolution: [
        "کپاس کے army worm کے لیے منظور شدہ insecticide استعمال کریں، جیسے chlorantraniliprole یا emamectin benzoate، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "شام کو اسپرے کریں جب سنڈیاں کھاتی ہیں، اور پتوں کی نچلی سطح بھی بھگوئیں۔",
      ],
      prevention: [
        "بڑھنے کے موسم میں ہر 2 سے 3 دن بعد معائنہ کریں، پتوں کے نیچے دیکھیں۔",
        "جڑی بوٹیاں اور فصل کی باقیات ختم کریں جن میں پروانے اور سنڈیاں چھپتے ہیں۔",
        "فصلیں بدل بدل کر لگائیں اور ہر سال اسی کھیت میں کپاس کے بعد کپاس نہ لگائیں۔",
      ],
    },
    roman: {
      cause: "Ye raat ko urne wale parwane ki sundiyan hain. Chhoti sundiyan mil kar patte khati hain, bari sundiyan patte, tinde aur goliyan khati hain aur grohon mein chalti hain, isi liye in ka naam army worm hai.",
      symptoms: [
        "Patton mein sirf ragein reh jana, ya bare be tartib sorakh",
        "Sabz sundiyan jin par kale nishan hote hain, jo din mein patton ke neeche chhupti hain",
        "Kharab tinde aur naujawan goliyan, kabhi patton par in ki beet bhi nazar aati hai",
        "Chand dinon mein poore khet mein tezi se phailao",
      ],
      organicSolution: [
        "Chhote kheton mein sundiyan aur andon ke jhund haath se chun lein.",
        "Pheromone traps lagayein taake parwanon ki tadaad maloom ho aur waqt par ilaaj ho.",
        "Sundiyan chhoti hon to army worm ke liye manzoor shuda Bt (Bacillus thuringiensis) ya neem oil ka spray karein.",
      ],
      chemicalSolution: [
        "Kapas ke army worm ke liye manzoor shuda insecticide istemal karein, jaise chlorantraniliprole ya emamectin benzoate, sirf label par likhi miqdar ke mutabiq.",
        "Shaam ko spray karein jab sundiyan khati hain, aur patton ki nichli satah bhi bhigoyein.",
      ],
      prevention: [
        "Barhne ke mausam mein har 2 se 3 din baad muaina karein, patton ke neeche dekhein.",
        "Jari bootiyan aur fasal ki baqiyat khatam karein jin mein parwane aur sundiyan chhupte hain.",
        "Faslein badal badal kar lagayein aur har saal isi khet mein kapas ke baad kapas na lagayein.",
      ],
    },
  },
  "kb-rice-diseased": {
    ur: {
      cause: "v1 ماڈل صرف یہ بتاتا ہے کہ چاول کا پتہ بیمار ہے، یہ نہیں بتاتا کہ کون سی بیماری ہے۔ وجہ پھپھوندی، بیکٹیریا، وائرس یا غذائی کمی بھی ہو سکتی ہے، اور ہر ایک کا علاج الگ ہے۔",
      symptoms: [
        "پتوں پر داغ، پیلا پن، مرجھانا یا خشک ہونا جو صحت مند پتے سے میل نہیں کھاتا",
        "علامات کا ایک پتے یا پودے سے پڑوسی پودوں تک پھیلنا",
        "اسی کھیت کے صحت مند پودوں کے مقابلے میں کمزور نشوونما",
      ],
      organicSolution: [
        "متاثرہ پتے اتار دیں اور بیمار مواد کھیت میں نہ گلائیں۔",
        "نکاسی اور ہوا کی آمدورفت بہتر کریں، اور جہاں ممکن ہو پانی کھڑا نہ ہونے دیں۔",
        "ایک پتے کی صاف تصویر لیں اور شناخت کے لیے مقامی زرعی افسر کو دکھائیں۔",
      ],
      chemicalSolution: [
        "جب تک بیماری کی درست شناخت نہ ہو جائے، کوئی خاص fungicide یا bactericide نہ لگائیں — غلط دوا پیسے کا ضیاع ہے اور فائدہ نہیں دے گی۔",
        "شناخت کے بعد صرف اس بیماری اور فصل کے لیے منظور شدہ دوا استعمال کریں، لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "صاف، منظور شدہ بیج اور جہاں دستیاب ہو، مزاحمتی اقسام استعمال کریں۔",
        "کھاد متوازن رکھیں — زیادہ nitrogen سے چاول بیماریوں کا زیادہ شکار ہوتا ہے۔",
        "فصلیں بدل بدل کر لگائیں اور کھیتوں کے درمیان باڑیں اور اوزار صاف کریں۔",
      ],
    },
    roman: {
      cause: "v1 model sirf ye batata hai ke chawal ka patta beemar hai, ye nahi batata ke kaun si bimari hai. Wajah phaphundi, bacteria, virus ya ghizai kami bhi ho sakti hai, aur har aik ka ilaaj alag hai.",
      symptoms: [
        "Patton par daagh, peela pan, murjhana ya khushk hona jo sehatmand patte se mail nahi khata",
        "Alamat ka aik patte ya poday se parosi podon tak phailna",
        "Isi khet ke sehatmand podon ke muqable mein kamzor nashonuma",
      ],
      organicSolution: [
        "Mutasira patte utaar dein aur beemar mawaad khet mein na galayein.",
        "Nikasi aur hawa ki aamad o raft behtar karein, aur jahan mumkin ho pani khara na hone dein.",
        "Aik patte ki saaf photo lein aur shanakht ke liye maqami zarae afsar ko dikhayein.",
      ],
      chemicalSolution: [
        "Jab tak bimari ki durust shanakht na ho jaye, koi khaas fungicide ya bactericide na lagayein — ghalat dawa paise ka ziya hai aur faida nahi de gi.",
        "Shanakht ke baad sirf is bimari aur fasal ke liye manzoor shuda dawa istemal karein, label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Saaf, manzoor shuda beej aur jahan dastiyab ho, muzahimti aqsaam istemal karein.",
        "Khaad mutawazan rakhein — zyada nitrogen se chawal bimariyon ka zyada shikar hota hai.",
        "Faslein badal badal kar lagayein aur kheton ke darmiyan baarein aur auzaar saaf karein.",
      ],
    },
  },
  "kb-healthy-wheat": {
    ur: {
      cause: "کوئی بیماری یا کیڑا نہیں ملا۔ پتہ عام طور پر بڑھ رہا ہے۔",
      symptoms: [
        "پورے پتے پر یکساں سبز رنگ، کوئی داغ، دھاری یا دانہ نہیں",
        "پتے پر کوئی کیڑا، چپچپا رس یا جالا نہیں",
        "پتے کی مضبوطی اور فصل کے مرحلے کے مطابق عام نشوونما",
      ],
      organicSolution: [
        "کسی علاج کی ضرورت نہیں۔",
        "پانی اور خوراک متوازن رکھیں، اور مردہ پتے فوراً ہٹا دیں۔",
      ],
      chemicalSolution: [
        "کسی اسپرے کی ضرورت نہیں۔ احتیاطی اسپرے نہ کریں جب تک مقامی مشورے میں وبا کی وارننگ نہ ہو۔",
      ],
      prevention: [
        "ہر ہفتے پتے چیک کریں تاکہ کوئی نیا مسئلہ جلدی پکڑا جائے۔",
        "ہوا کی اچھی آمدورفت رکھیں اور زیادہ پانی نہ دیں۔",
        "کھیت کی باڑیں خود رو گندم سے صاف رکھیں۔",
      ],
    },
    roman: {
      cause: "Koi bimari ya keera nahi mila. Patta aam tor par barh raha hai.",
      symptoms: [
        "Poore patte par yaksan sabz rang, koi daagh, dhari ya dana nahi",
        "Patte par koi keera, chipchipa ras ya jala nahi",
        "Patte ki mazbooti aur fasal ke marhale ke mutabiq aam nashonuma",
      ],
      organicSolution: [
        "Kisi ilaaj ki zaroorat nahi.",
        "Pani aur khurak mutawazan rakhein, aur murda patte foran hata dein.",
      ],
      chemicalSolution: [
        "Kisi spray ki zaroorat nahi. Ehtiyati spray na karein jab tak maqami mashware mein waba ki warning na ho.",
      ],
      prevention: [
        "Har hafte patte check karein taake koi naya masla jaldi pakra jaye.",
        "Hawa ki achhi aamad o raft rakhein aur zyada pani na dein.",
        "Khet ki baarein khud ro gandum se saaf rakhein.",
      ],
    },
  },
  "kb-healthy-cotton": {
    ur: {
      cause: "کوئی بیماری یا کیڑا نہیں ملا۔ پتہ عام طور پر بڑھ رہا ہے۔",
      symptoms: [
        "یکساں سبز رنگ، کوئی مڑنا، داغ یا چپچپا رس نہیں",
        "پتوں کے نیچے کیڑوں کے جھنڈ نہیں",
        "فصل کے مرحلے کے مطابق پتے کا عام سائز اور نشوونما",
      ],
      organicSolution: [
        "کسی علاج کی ضرورت نہیں۔",
        "پانی اور خوراک متوازن رکھیں، اور مردہ پتے فوراً ہٹا دیں۔",
      ],
      chemicalSolution: [
        "کسی اسپرے کی ضرورت نہیں۔",
      ],
      prevention: [
        "شروع کے موسم میں ہفتے میں دو بار پتوں کی نچلی سطح چیک کریں۔",
        "زیادہ nitrogen سے بچیں اور جڑی بوٹیاں قابو میں رکھیں۔",
      ],
    },
    roman: {
      cause: "Koi bimari ya keera nahi mila. Patta aam tor par barh raha hai.",
      symptoms: [
        "Yaksan sabz rang, koi murna, daagh ya chipchipa ras nahi",
        "Patton ke neeche keeron ke jhund nahi",
        "Fasal ke marhale ke mutabiq patte ka aam size aur nashonuma",
      ],
      organicSolution: [
        "Kisi ilaaj ki zaroorat nahi.",
        "Pani aur khurak mutawazan rakhein, aur murda patte foran hata dein.",
      ],
      chemicalSolution: [
        "Kisi spray ki zaroorat nahi.",
      ],
      prevention: [
        "Shuru ke mausam mein hafte mein do baar patton ki nichli satah check karein.",
        "Zyada nitrogen se bachein aur jari bootiyan qabu mein rakhein.",
      ],
    },
  },
  "kb-healthy-rice": {
    ur: {
      cause: "کوئی بیماری یا کیڑا نہیں ملا۔ پتہ عام طور پر بڑھ رہا ہے۔",
      symptoms: [
        "یکساں سبز رنگ، کوئی داغ، پیلا پن یا سروں پر خشک ہونا نہیں",
        "پتے پر کوئی کیڑا یا زخم نہیں",
        "فصل کے مرحلے کے مطابق عام نشوونما",
      ],
      organicSolution: [
        "کسی علاج کی ضرورت نہیں۔",
        "پانی اور خوراک متوازن رکھیں، اور مردہ پتے فوراً ہٹا دیں۔",
      ],
      chemicalSolution: [
        "کسی اسپرے کی ضرورت نہیں۔",
      ],
      prevention: [
        "ہر ہفتے پتے چیک کریں، خاص طور پر بارش یا سیلاب کے بعد۔",
        "صاف بیج استعمال کریں اور زیادہ nitrogen سے بچیں۔",
      ],
    },
    roman: {
      cause: "Koi bimari ya keera nahi mila. Patta aam tor par barh raha hai.",
      symptoms: [
        "Yaksan sabz rang, koi daagh, peela pan ya siron par khushk hona nahi",
        "Patte par koi keera ya zakham nahi",
        "Fasal ke marhale ke mutabiq aam nashonuma",
      ],
      organicSolution: [
        "Kisi ilaaj ki zaroorat nahi.",
        "Pani aur khurak mutawazan rakhein, aur murda patte foran hata dein.",
      ],
      chemicalSolution: [
        "Kisi spray ki zaroorat nahi.",
      ],
      prevention: [
        "Har hafte patte check karein, khaas tor par barish ya sailab ke baad.",
        "Saaf beej istemal karein aur zyada nitrogen se bachein.",
      ],
    },
  },
  "kb-tomato-early-blight": {
    ur: {
      cause: "یہ مٹی سے پھیلنے والی پھپھوندی ہے جو گرم اور گیلے موسم میں چھینٹوں والے پانی اور متاثرہ پودوں کی باقیات سے پھیلتی ہے۔",
      symptoms: [
        "سب سے پہلے نیچے والے پرانے پتوں پر گہرے بھورے داغ جن میں گول حلقے ہوتے ہیں",
        "داغوں کے ارد گرد پیلا پن، پتے نیچے سے اوپر کی طرف خشک ہو کر گرنا",
        "تنوں اور ڈنٹھل کے قریب پھل پر گہرے، دھنسے ہوئے داغ",
      ],
      organicSolution: [
        "متاثرہ نیچے والے پتے اتار کر کھیت سے دور تلف کریں۔",
        "پودوں کے نیچے ملچ بچھائیں تاکہ مٹی پتوں پر نہ اچھلے۔",
        "ٹماٹر کے early blight کے لیے منظور شدہ neem oil یا copper والی دوا کا اسپرے کریں۔",
      ],
      chemicalSolution: [
        "ٹماٹر کے early blight کے لیے منظور شدہ fungicide استعمال کریں، جیسے chlorothalonil یا mancozeb، یا azoxystrobin، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پہلے داغوں پر ہی شروع کریں اور صرف اس وقت دہرائیں جب لیبل اجازت دے۔",
      ],
      prevention: [
        "ٹماٹر کو 2 سے 3 سال تک انہی خاندان کی فصلوں کے بغیر بدل بدل کر لگائیں۔",
        "پانی جڑوں میں دیں، پودوں کو سہارا دیں تاکہ ہوا لگے، اور فاصلہ رکھیں۔",
        "صاف بیج اور جہاں دستیاب ہو، مزاحمتی اقسام استعمال کریں۔",
      ],
    },
    roman: {
      cause: "Ye mitti se phailne wali phaphundi hai jo garam aur geele mausam mein chheenton wale pani aur mutasira podon ki baqiyat se phailti hai.",
      symptoms: [
        "Sab se pehle neeche wale purane patton par gehre bhoore daagh jin mein gol halqe hote hain",
        "Daaghon ke ird gird peela pan, patte neeche se oopar ki taraf khushk ho kar girna",
        "Tanon aur danthal ke qareeb phal par gehre, dhanse hue daagh",
      ],
      organicSolution: [
        "Mutasira neeche wale patte utaar kar khet se door talaf karein.",
        "Podon ke neeche mulch bichhayein taake mitti patton par na uchhle.",
        "Tamatar ke early blight ke liye manzoor shuda neem oil ya copper wali dawa ka spray karein.",
      ],
      chemicalSolution: [
        "Tamatar ke early blight ke liye manzoor shuda fungicide istemal karein, jaise chlorothalonil ya mancozeb, ya azoxystrobin, sirf label par likhi miqdar ke mutabiq.",
        "Pehle daaghon par hi shuru karein aur sirf us waqt dohrayein jab label ijazat de.",
      ],
      prevention: [
        "Tamatar ko 2 se 3 saal tak inhi khandan ki faslon ke baghair badal badal kar lagayein.",
        "Pani jaron mein dein, podon ko sahara dein taake hawa lage, aur fasla rakhein.",
        "Saaf beej aur jahan dastiyab ho, muzahimti aqsaam istemal karein.",
      ],
    },
  },
  "kb-potato-late-blight": {
    ur: {
      cause: "یہ پانی کی پھپھوندی ہے جو ٹھنڈے، گیلے اور مرطوب موسم میں ہوا کے بیجوں اور متاثرہ بیج آلوؤں سے بہت تیزی سے پھیلتی ہے۔",
      symptoms: [
        "پتوں پر بڑے، گہرے، پانی سے بھرے دھبے، گیلے موسم میں نیچے سفید پھپھوندی کی جھالر کے ساتھ",
        "شدید حملے میں پتے چند دنوں میں کالے ہو کر گر جاتے ہیں",
        "بھورا، سخت سڑاؤ جو آلوؤں میں پھیل جاتا ہے",
      ],
      organicSolution: [
        "متاثرہ پودے فوراً نکال کر تلف کریں — انہیں کھاد میں نہ ملائیں۔",
        "پودوں کے گرد مٹی چڑھائیں اور پتے نہ بھگوئیں۔",
        "منظور شدہ بیماری سے پاک بیج آلو استعمال کریں۔",
      ],
      chemicalSolution: [
        "آلو کے late blight کے لیے منظور شدہ fungicide استعمال کریں، جیسے metalaxyl + mancozeb، یا dimethomorph + mancozeb، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "گیلے موسم میں حفاظتی اسپرے لیبل کے مطابق دہرانے ضروری ہیں — ایک اسپرے وبا نہیں روکے گا۔",
      ],
      prevention: [
        "منظور شدہ بیج اور جہاں دستیاب ہو، مزاحمتی اقسام لگائیں۔",
        "پودوں میں ہوا کے لیے فاصلہ رکھیں اور دن کے آخر میں اوپر سے پانی نہ دیں۔",
        "خود رو آلو اور کھیت میں رہ جانے والے متاثرہ آلو تلف کریں۔",
      ],
    },
    roman: {
      cause: "Ye pani ki phaphundi hai jo thande, geele aur martub mausam mein hawa ke beejon aur mutasira beej aaluon se bohat tezi se phailti hai.",
      symptoms: [
        "Patton par bare, gehre, pani se bhare dhabbe, geele mausam mein neeche safed phaphundi ki jhalar ke saath",
        "Shadeed hamle mein patte chand dinon mein kale ho kar gir jate hain",
        "Bhoora, sakht sarao jo aaluon mein phail jata hai",
      ],
      organicSolution: [
        "Mutasira poday foran nikaal kar talaf karein — inhein khaad mein na milayein.",
        "Podon ke gird mitti charhayein aur patte na bhigoyein.",
        "Manzoor shuda bimari se paak beej aalu istemal karein.",
      ],
      chemicalSolution: [
        "Aalu ke late blight ke liye manzoor shuda fungicide istemal karein, jaise metalaxyl + mancozeb, ya dimethomorph + mancozeb, sirf label par likhi miqdar ke mutabiq.",
        "Geele mausam mein hifazati spray label ke mutabiq dohrane zaroori hain — aik spray waba nahi roke ga.",
      ],
      prevention: [
        "Manzoor shuda beej aur jahan dastiyab ho, muzahimti aqsaam lagayein.",
        "Podon mein hawa ke liye fasla rakhein aur din ke aakhir mein oopar se pani na dein.",
        "Khud ro aalu aur khet mein reh jane wale mutasira aalu talaf karein.",
      ],
    },
  },
  "kb-mango-anthracnose": {
    ur: {
      cause: "یہ پھپھوندی مردہ پتوں اور ٹہنیوں پر رہتی ہے اور گرم، مرطوب موسم اور بارش میں پھیل کر پھولوں، پتوں اور پھل کو نقصان پہنچاتی ہے۔",
      symptoms: [
        "پتوں، پھولوں اور نوجوان پھل پر کالے، دھنسے ہوئے داغ",
        "پھول کالے ہو کر گرنا، جس سے پھل کم بنتا ہے",
        "پھل پر کالے داغ جو بڑھ کر گودا سڑا دیتے ہیں، خاص طور پر کٹائی کے بعد",
      ],
      organicSolution: [
        "مردہ ٹہنیاں کاٹیں اور درختوں کے نیچے سے گرا ہوا پھل اور پتے ہٹا دیں۔",
        "کٹائی کے بعد درخت کی چھتری چھانٹ کر ہوا کی آمدورفت بہتر کریں۔",
        "پھول آنے سے پہلے آم کے anthracnose کے لیے منظور شدہ neem oil یا copper والی دوا کا اسپرے کریں۔",
      ],
      chemicalSolution: [
        "آم کے anthracnose کے لیے منظور شدہ fungicide استعمال کریں، جیسے copper hydroxide، یا azoxystrobin + difenoconazole، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "اسپرے پھول آنے اور پھل بننے کے شروع کے وقت کریں، جیسا لیبل کہے۔",
      ],
      prevention: [
        "جہاں دستیاب ہو، کم متاثر ہونے والی اقسام لگائیں اور دھوپ والی، ہوادار جگہ پر درخت لگائیں۔",
        "اوپر سے پانی نہ دیں اور باغ کا فرش صاف رکھیں۔",
        "کٹائی احتیاط سے کریں اور پھل کو نرمی سے پکڑیں تاکہ چھلکا نہ ٹوٹے۔",
      ],
    },
    roman: {
      cause: "Ye phaphundi murda patton aur tehnion par rehti hai aur garam, martub mausam aur barish mein phail kar phoolon, patton aur phal ko nuqsan pahunchati hai.",
      symptoms: [
        "Patton, phoolon aur naujawan phal par kale, dhanse hue daagh",
        "Phool kale ho kar girna, jis se phal kam banta hai",
        "Phal par kale daagh jo barh kar goda sara dete hain, khaas tor par katayi ke baad",
      ],
      organicSolution: [
        "Murda tehnian kaatein aur darakhton ke neeche se gira hua phal aur patte hata dein.",
        "Katayi ke baad darakht ki chhatri chhant kar hawa ki aamad o raft behtar karein.",
        "Phool aane se pehle aam ke anthracnose ke liye manzoor shuda neem oil ya copper wali dawa ka spray karein.",
      ],
      chemicalSolution: [
        "Aam ke anthracnose ke liye manzoor shuda fungicide istemal karein, jaise copper hydroxide, ya azoxystrobin + difenoconazole, sirf label par likhi miqdar ke mutabiq.",
        "Spray phool aane aur phal banne ke shuru ke waqt karein, jaisa label kahe.",
      ],
      prevention: [
        "Jahan dastiyab ho, kam mutasir hone wali aqsaam lagayein aur dhoop wali, hawadar jagah par darakht lagayein.",
        "Oopar se pani na dein aur baagh ka farsh saaf rakhein.",
        "Katayi ehtiyat se karein aur phal ko narmi se pakrein taake chhilka na toote.",
      ],
    },
  },
  "kb-citrus-canker": {
    ur: {
      cause: "یہ بیکٹیریا بارش کی چھینٹوں، ہوا، کیڑوں اور آلودہ اوزاروں سے پھیلتے ہیں۔ یہ زخموں اور پتوں کے سوراخوں سے داخل ہوتے ہیں، خاص طور پر طوفان کے بعد۔",
      symptoms: [
        "پتوں، پھل اور ٹہنیوں پر ابھرے ہوئے، کارک جیسے بھورے داغ جن کے ارد گرد پیلا حلقہ ہوتا ہے",
        "پتے پیلے ہو کر گرنا، پھل داغدار ہونا اور جلدی گرنا",
        "بار بار شدید حملے میں ٹہنیوں کا خشک ہونا",
      ],
      organicSolution: [
        "متاثرہ ٹہنیاں کاٹ کر درختوں سے دور جلا دیں یا دفن کریں۔",
        "درختوں کے درمیان کٹائی کے اوزار جراثیم سے پاک کریں۔",
        "حفاظت کے لیے citrus canker کے لیے منظور شدہ copper والی دوا کا اسپرے کریں۔",
      ],
      chemicalSolution: [
        "citrus canker کے لیے منظور شدہ copper والی دوائیں ہی اصل علاج ہیں، صرف لیبل پر لکھی مقدار کے مطابق۔ اینٹی بائیوٹک کھیت کا معمول کا علاج نہیں ہے — مقامی قوانین اور زرعی مشورے پر عمل کریں۔",
      ],
      prevention: [
        "طوفان کے نقصان اور بیکٹیریا کے پھیلاؤ کو کم کرنے کے لیے ہوا روکنے والی باڑ لگائیں۔",
        "گیلے درختوں میں کام نہ کریں، اور صاف نرسری پودے استعمال کریں۔",
        "leaf miner کیڑوں کو قابو کریں، جن کی سرنگوں سے بیکٹیریا داخل ہوتے ہیں۔",
      ],
    },
    roman: {
      cause: "Ye bacteria barish ki chheenton, hawa, keeron aur aalooda auzaaron se phailte hain. Ye zakhmon aur patton ke sorakhon se dakhil hote hain, khaas tor par toofan ke baad.",
      symptoms: [
        "Patton, phal aur tehnion par ubhre hue, cork jaise bhoore daagh jin ke ird gird peela halqa hota hai",
        "Patte peele ho kar girna, phal daaghdar hona aur jaldi girna",
        "Baar baar shadeed hamle mein tehnion ka khushk hona",
      ],
      organicSolution: [
        "Mutasira tehnian kaat kar darakhton se door jala dein ya dafan karein.",
        "Darakhton ke darmiyan katayi ke auzaar jaraseem se paak karein.",
        "Hifazat ke liye citrus canker ke liye manzoor shuda copper wali dawa ka spray karein.",
      ],
      chemicalSolution: [
        "Citrus canker ke liye manzoor shuda copper wali dawayein hi asal ilaaj hain, sirf label par likhi miqdar ke mutabiq. Antibiotic khet ka mamool ka ilaaj nahi hai — maqami qawaneen aur zarae mashware par amal karein.",
      ],
      prevention: [
        "Toofan ke nuqsan aur bacteria ke phailao ko kam karne ke liye hawa rokne wali baar lagayein.",
        "Geele darakhton mein kaam na karein, aur saaf nursery poday istemal karein.",
        "Leaf miner keeron ko qabu karein, jin ki surangon se bacteria dakhil hote hain.",
      ],
    },
  },
  "kb-apple-scab": {
    ur: {
      cause: "یہ پھپھوندی گرے ہوئے پتوں میں سردیاں گزارتی ہے اور بہار کی بارش میں بیج چھوڑ کر ٹھنڈے، گیلے موسم میں نوجوان پتوں اور پھل کو متاثر کرتی ہے۔",
      symptoms: [
        "پتوں پر زیتونی سبز سے کالے مخملی داغ، جو پیلے ہو کر جلدی گر جاتے ہیں",
        "پھل پر گہرے، کارک جیسے، پھٹے ہوئے داغ، کبھی ٹیڑھے سیب بھی بنتے ہیں",
        "بار بار حملے میں نشوونما کم اور پھل چھوٹا رہنا",
      ],
      organicSolution: [
        "خزاں میں گرے ہوئے پتے اکٹھا کر کے تلف کریں تاکہ سردیاں گزارنے والی پھپھوندی ختم ہو۔",
        "ہوا اور دھوپ کے لیے درخت کی چھتری چھانٹیں۔",
        "بہار کے شروع میں apple scab کے لیے منظور شدہ neem oil یا sulphur والی دوا کا اسپرے کریں۔",
      ],
      chemicalSolution: [
        "apple scab کے لیے منظور شدہ fungicide استعمال کریں، جیسے captan، یا triazole جیسے myclobutanil، صرف لیبل پر لکھی مقدار کے مطابق، اور وقت کلیاں کھلنے سے لے کر بہار کے گیلے موسم تک رکھیں۔",
      ],
      prevention: [
        "جہاں دستیاب ہو، scab سے محفوظ اقسام لگائیں۔",
        "اوپر سے پانی نہ دیں اور باغ کا فرش صاف رکھیں۔",
        "بہار میں ہر ہفتے معائنہ کریں اور پہلے داغوں پر ہی عمل کریں۔",
      ],
    },
    roman: {
      cause: "Ye phaphundi gire hue patton mein sardiyan guzarti hai aur bahar ki barish mein beej chhor kar thande, geele mausam mein naujawan patton aur phal ko mutasir karti hai.",
      symptoms: [
        "Patton par zaitooni sabz se kale makhmali daagh, jo peele ho kar jaldi gir jate hain",
        "Phal par gehre, cork jaise, phate hue daagh, kabhi terhe seb bhi bante hain",
        "Baar baar hamle mein nashonuma kam aur phal chhota rehna",
      ],
      organicSolution: [
        "Khizan mein gire hue patte ikattha kar ke talaf karein taake sardiyan guzarne wali phaphundi khatam ho.",
        "Hawa aur dhoop ke liye darakht ki chhatri chhantein.",
        "Bahar ke shuru mein apple scab ke liye manzoor shuda neem oil ya sulphur wali dawa ka spray karein.",
      ],
      chemicalSolution: [
        "Apple scab ke liye manzoor shuda fungicide istemal karein, jaise captan, ya triazole jaise myclobutanil, sirf label par likhi miqdar ke mutabiq, aur waqt kaliyan khilne se le kar bahar ke geele mausam tak rakhein.",
      ],
      prevention: [
        "Jahan dastiyab ho, scab se mehfooz aqsaam lagayein.",
        "Oopar se pani na dein aur baagh ka farsh saaf rakhein.",
        "Bahar mein har hafte muaina karein aur pehle daaghon par hi amal karein.",
      ],
    },
  },
};
