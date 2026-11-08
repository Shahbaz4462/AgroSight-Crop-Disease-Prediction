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

  "kb-cotton-bacterial-blight": {
    ur: {
      cause: "یہ ایک جراثیم (بیکٹیریا) کی بیماری ہے جو بارش کے چھینٹوں، ہوا اور متاثرہ بیج سے پھیلتی ہے۔ یہ پتوں کے مساموں اور زخموں سے اندر جاتا ہے اور گرم، نم موسم میں تیزی سے پھیلتا ہے۔",
      symptoms: [
        "پتوں پر چھوٹے، گہرے، پانی جیسے کونے دار دھبے، اکثر رگوں کے ساتھ",
        "رگیں کالی ہو جاتی ہیں اور شدید حملے میں پتے جلدی گر جاتے ہیں",
        "تنوں اور شاخوں پر گہری، دھنسی ہوئی دھاریاں (black arm)",
        "متاثرہ ٹینڈے سڑ جاتے ہیں اور اچھی طرح نہیں کھلتے، روئی پر داغ پڑ جاتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھیت میں کھاد کے طور پر نہ ڈالیں۔",
        "جب پودے گیلے ہوں تو کھیت میں کام نہ کریں، اور متاثرہ پودوں کو چھونے کے بعد اوزار صاف کریں۔",
        "نکاسی بہتر کریں اور اوپر سے پانی دینے سے گریز کریں۔",
      ],
      chemicalSolution: [
        "کپاس کی bacterial blight کے لیے لیبل شدہ تانبے والی دوا (جیسے Copper oxychloride)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پہلے دھبے نظر آتے ہی اسپرے کریں — تانبہ صحت مند پتوں کو بچاتا ہے لیکن پہلے سے متاثرہ پتوں کو ٹھیک نہیں کر سکتا۔",
      ],
      prevention: [
        "صاف، تصدیق شدہ، بیماری سے پاک بیج اور جہاں ممکن ہو مزاحم اقسام لگائیں۔",
        "کپاس کو دوسری فصلوں کے ساتھ بدل بدل کر لگائیں اور کٹائی کے بعد متاثرہ باقیات ختم کر دیں۔",
        "ہوا کی گزر کے لیے پودوں میں فاصلہ رکھیں اور زیادہ نائٹروجن سے گریز کریں۔",
        "نم موسم میں ہر ہفتے معائنہ کریں، خاص طور پر بارش یا طوفان کے بعد۔",
      ],
    },
    roman: {
      cause: "Ye aik jaraseem (bacteria) ki bimari hai jo barish ke chheenton, hawa aur mutasira beej se phailti hai. Ye patton ke masaamon aur zakhmon se andar jata hai aur garam, num mausam mein tezi se phailta hai.",
      symptoms: [
        "Patton par chhote, gehre, paani jaise kone daar dhabbe, aksar ragon ke saath",
        "Ragein kaali ho jati hain aur shadeed hamle mein patte jaldi gir jate hain",
        "Tanon aur shakhon par gehri, dhansi hui dhariyan (black arm)",
        "Mutasira tinde sar jate hain aur achhi tarah nahi khulte, rooi par daagh par jate hain",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khet mein khaad ke tor par na daalein.",
        "Jab poday geelay hon to khet mein kaam na karein, aur mutasira podon ko chhoone ke baad auzaar saaf karein.",
        "Nikasi behtar karein aur oopar se paani dene se gurez karein.",
      ],
      chemicalSolution: [
        "Kapaas ki bacterial blight ke liye label shuda taanbe wali dawa (jaise Copper oxychloride), sirf label par likhi miqdar ke mutabiq.",
        "Pehle dhabbe nazar aate hi spray karein — taanba sehatmand patton ko bachata hai lekin pehle se mutasira patton ko theek nahi kar sakta.",
      ],
      prevention: [
        "Saaf, tasdeeq shuda, bimari se paak beej aur jahan mumkin ho muzahim aqsaam lagayein.",
        "Kapaas ko doosri faslon ke saath badal badal kar lagayein aur katai ke baad mutasira baqiyat khatam kar dein.",
        "Hawa ki guzar ke liye podon mein faasla rakhein aur zyada nitrogen se gurez karein.",
        "Num mausam mein har hafte muaina karein, khaas tor par barish ya toofan ke baad.",
      ],
    },
  },
  "kb-cotton-powdery-mildew": {
    ur: {
      cause: "یہ ایک پھپھوندی ہے جو گرم، خشک موسم اور ٹھنڈی راتوں میں پتے کی سطح پر اگتی ہے۔ اس کے بیج ہوا سے پھیلتے ہیں اور بیماری موسم کے آخر میں بڑھتی ہے۔",
      symptoms: [
        "پتوں کے نیچے اور پھر اوپر کی طرف سفید، پاؤڈر جیسے دھبے",
        "شدید حملے میں پتے کناروں سے پیلے اور خشک ہو جاتے ہیں",
        "پتے وقت سے پہلے گر جاتے ہیں، جس سے ٹینڈے دھوپ سے متاثر ہوتے ہیں",
        "زیادہ پتے گرنے سے ٹینڈے چھوٹے اور روئی کی کوالٹی خراب ہو جاتی ہے",
      ],
      organicSolution: [
        "زیادہ متاثرہ پتے ہٹا دیں اور ہوا کی گزر بہتر کریں۔",
        "پاؤڈر والی پھپھوندی کے لیے لیبل شدہ Sulphur یا نیم والی مصنوعات اسپرے کریں، تیز دھوپ میں اسپرے نہ کریں۔",
        "پانی جڑوں میں دیں اور پتوں کو گیلا کرنے سے گریز کریں۔",
      ],
      chemicalSolution: [
        "کپاس کی powdery mildew کے لیے لیبل شدہ فنجیسائیڈ (جیسے Sulphur یا Hexaconazole جیسی triazole دوا)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پہلے سفید دھبے نظر آتے ہی اسپرے کریں — پتے پر پھیل جانے کے بعد اسے روکنا بہت مشکل ہو جاتا ہے۔",
      ],
      prevention: [
        "ہوا کی گزر کے لیے پودوں میں فاصلہ رکھیں اور گھنی، سایہ دار فصل سے گریز کریں۔",
        "زیادہ نائٹروجن سے گریز کریں، جس سے نرم پتے بنتے ہیں جنہیں پھپھوندی پسند کرتی ہے۔",
        "فصلیں بدل بدل کر لگائیں اور کٹائی کے بعد گرے ہوئے پتے صاف کر دیں۔",
        "موسم کے آخر میں ہر ہفتے نیچے والے پتوں کے نیچے کا حصہ چیک کریں۔",
      ],
    },
    roman: {
      cause: "Ye aik phaphundi hai jo garam, khushk mausam aur thandi raaton mein patte ki satah par ugti hai. Is ke beej hawa se phailte hain aur bimari mausam ke aakhir mein barhti hai.",
      symptoms: [
        "Patton ke neeche aur phir oopar ki taraf safed, powder jaise dhabbe",
        "Shadeed hamle mein patte kinaron se peele aur khushk ho jate hain",
        "Patte waqt se pehle gir jate hain, jis se tinde dhoop se mutasir hote hain",
        "Zyada patte girne se tinde chhote aur rooi ki quality kharab ho jati hai",
      ],
      organicSolution: [
        "Zyada mutasira patte hata dein aur hawa ki guzar behtar karein.",
        "Powder wali phaphundi ke liye label shuda Sulphur ya neem wali masnooaat spray karein, tez dhoop mein spray na karein.",
        "Paani jaron mein dein aur patton ko geela karne se gurez karein.",
      ],
      chemicalSolution: [
        "Kapaas ki powdery mildew ke liye label shuda fungicide (jaise Sulphur ya Hexaconazole jaisi triazole dawa), sirf label par likhi miqdar ke mutabiq.",
        "Pehle safed dhabbe nazar aate hi spray karein — patte par phail jaane ke baad isay rokna bohat mushkil ho jata hai.",
      ],
      prevention: [
        "Hawa ki guzar ke liye podon mein faasla rakhein aur ghani, saya daar fasal se gurez karein.",
        "Zyada nitrogen se gurez karein, jis se naram patte bante hain jinhein phaphundi pasand karti hai.",
        "Faslein badal badal kar lagayein aur katai ke baad giray hue patte saaf kar dein.",
        "Mausam ke aakhir mein har hafte neeche wale patton ke neeche ka hissa check karein.",
      ],
    },
  },
  "kb-cotton-target-spot": {
    ur: {
      cause: "یہ ایک پھپھوندی ہے جو فصل کی باقیات میں زندہ رہتی ہے اور گرم، مرطوب موسم میں ہوا اور بارش کے چھینٹوں سے پھیلتی ہے۔ یہ پہلے پتوں، پھر ٹینڈوں کے ڈھکنوں اور ٹینڈوں پر حملہ کرتی ہے۔",
      symptoms: [
        "گول بھورے دھبے جن کے درمیان ہلکا اور دائرے بنے ہوں، جیسے نشانہ",
        "دھبے بڑھ کر مل جاتے ہیں اور پتے کا درمیانی حصہ گر سکتا ہے",
        "نیچے والے پتوں سے شروع ہو کر شدید پتے گرنا",
        "شدید حالت میں ٹینڈے سڑ جاتے ہیں اور روئی خراب ہو جاتی ہے",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "ہوا کی گزر بہتر کریں اور پانی دیتے وقت پتوں کو گیلا کرنے سے گریز کریں۔",
        "کٹائی کے بعد فصل کی باقیات کو دفن کریں یا ختم کر دیں تاکہ پھپھوندی زندہ نہ رہے۔",
      ],
      chemicalSolution: [
        "کپاس کے target spot کے لیے لیبل شدہ فنجیسائیڈ (جیسے Azoxystrobin + Difenoconazole، یا Mancozeb)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "جب نیچے والے پتوں پر پہلے دھبے نظر آئیں تو اسپرے کریں اور صرف لیبل کے مطابق دہرائیں۔",
      ],
      prevention: [
        "کپاس کو کم از کم ایک موسم کے لیے دوسری فصلوں کے ساتھ بدل بدل کر لگائیں۔",
        "صاف بیج اور جہاں ممکن ہو مزاحم اقسام استعمال کریں۔",
        "کھاد متوازن رکھیں — زیادہ نائٹروجن سے پتے زیادہ کمزور ہوتے ہیں۔",
        "گرم، مرطوب موسم میں ہر ہفتے نیچے والے پتے چیک کریں۔",
      ],
    },
    roman: {
      cause: "Ye aik phaphundi hai jo fasal ki baqiyat mein zinda rehti hai aur garam, martub mausam mein hawa aur barish ke chheenton se phailti hai. Ye pehle patton, phir tindon ke dhaknon aur tindon par hamla karti hai.",
      symptoms: [
        "Gol bhoore dhabbe jin ke darmiyan halka aur dairay bane hon, jaise nishana",
        "Dhabbe barh kar mil jate hain aur patte ka darmiyani hissa gir sakta hai",
        "Neeche wale patton se shuru ho kar shadeed patte girna",
        "Shadeed haalat mein tinde sar jate hain aur rooi kharab ho jati hai",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khet mein na chhorein.",
        "Hawa ki guzar behtar karein aur paani dete waqt patton ko geela karne se gurez karein.",
        "Katai ke baad fasal ki baqiyat ko dafan karein ya khatam kar dein taake phaphundi zinda na rahe.",
      ],
      chemicalSolution: [
        "Kapaas ke target spot ke liye label shuda fungicide (jaise Azoxystrobin + Difenoconazole, ya Mancozeb), sirf label par likhi miqdar ke mutabiq.",
        "Jab neeche wale patton par pehle dhabbe nazar aayein to spray karein aur sirf label ke mutabiq dohrayein.",
      ],
      prevention: [
        "Kapaas ko kam az kam aik mausam ke liye doosri faslon ke saath badal badal kar lagayein.",
        "Saaf beej aur jahan mumkin ho muzahim aqsaam istemal karein.",
        "Khaad mutawazan rakhein — zyada nitrogen se patte zyada kamzor hote hain.",
        "Garam, martub mausam mein har hafte neeche wale patte check karein.",
      ],
    },
  },
  "kb-wheat-black-rust": {
    ur: {
      cause: "یہ ہوا سے پھیلنے والی زنگ کی پھپھوندی (stem rust) ہے جو گرم، مرطوب موسم میں تیزی سے بڑھتی ہے۔ اس کے بیج تنوں اور پتوں پر گرتے ہیں، نمی میں اگتے ہیں اور پودے کی جلد پھاڑ کر گہرے دانے بناتے ہیں۔",
      symptoms: [
        "تنوں، پتے کی میان اور پتوں پر گہرے سرخی مائل بھورے، لمبے دانے",
        "دانے تنے کی جلد پھاڑ کر پاؤڈر چھوڑتے ہیں",
        "شدید حملے میں تنے کمزور ہو کر گر جاتے ہیں",
        "دانے سکڑ کر ہلکے ہو جاتے ہیں اور پیداوار میں بھاری نقصان ہوتا ہے، اگر سب سے اوپر والا پتہ اور تنا جلدی متاثر ہو",
      ],
      organicSolution: [
        "زیادہ متاثرہ پودے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "ہوا کی گزر بہتر کریں اور پتوں کو گیلا کرنے سے گریز کریں۔",
        "جہاں ممکن ہو black rust سے مزاحم گندم کی اقسام استعمال کریں۔",
      ],
      chemicalSolution: [
        "گندم کے black rust کے لیے لیبل شدہ فنجیسائیڈ (جیسے Propiconazole یا Tebuconazole جیسی triazole دوا)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "دانے نظر آتے ہی اسپرے کریں اور صرف لیبل کے مطابق دہرائیں۔",
      ],
      prevention: [
        "مزاحم اقسام لگائیں اور دیر سے کاشت نہ کریں۔",
        "پانی جڑوں میں دیں، پودوں میں فاصلہ رکھیں اور فصلیں بدل بدل کر لگائیں۔",
        "خود رو گندم کے پودے اور barberry جھاڑیاں ختم کریں، جو موسموں کے درمیان زنگ کو زندہ رکھتے ہیں۔",
        "بہار میں ہر ہفتے معائنہ کریں، خاص طور پر تنے اور سب سے اوپر والے پتے کا۔",
      ],
    },
    roman: {
      cause: "Ye hawa se phailne wali zang ki phaphundi (stem rust) hai jo garam, martub mausam mein tezi se barhti hai. Is ke beej tanon aur patton par girte hain, nami mein ugte hain aur poday ki jild phaad kar gehre dane banate hain.",
      symptoms: [
        "Tanon, patte ki miyan aur patton par gehre surkhi mael bhoore, lambe dane",
        "Dane tane ki jild phaad kar powder chhorte hain",
        "Shadeed hamle mein tane kamzor ho kar gir jate hain",
        "Dane sikar kar halke ho jate hain aur paidawar mein bhaari nuqsan hota hai, agar sab se oopar wala patta aur tana jaldi mutasir ho",
      ],
      organicSolution: [
        "Zyada mutasira poday hata dein aur khet mein na chhorein.",
        "Hawa ki guzar behtar karein aur patton ko geela karne se gurez karein.",
        "Jahan mumkin ho black rust se muzahim gandum ki aqsaam istemal karein.",
      ],
      chemicalSolution: [
        "Gandum ke black rust ke liye label shuda fungicide (jaise Propiconazole ya Tebuconazole jaisi triazole dawa), sirf label par likhi miqdar ke mutabiq.",
        "Dane nazar aate hi spray karein aur sirf label ke mutabiq dohrayein.",
      ],
      prevention: [
        "Muzahim aqsaam lagayein aur der se kasht na karein.",
        "Paani jaron mein dein, podon mein faasla rakhein aur faslein badal badal kar lagayein.",
        "Khud ro gandum ke poday aur barberry jhariyan khatam karein, jo mausamon ke darmiyan zang ko zinda rakhte hain.",
        "Bahar mein har hafte muaina karein, khaas tor par tane aur sab se oopar wale patte ka.",
      ],
    },
  },
  "kb-wheat-blast": {
    ur: {
      cause: "V23 ماڈل صرف یہ بتاتا ہے کہ گندم کے پتے پر blast ہے، اس کی صحیح وجہ نہیں بتاتا۔ گندم کا blast اکثر Magnaporthe oryzae نامی پھپھوندی سے ہوتا ہے جو گرم، نم موسم میں ہوا سے پھیلتی ہے — لیکن علاج سے پہلے وجہ کی تصدیق مقامی زرعی افسر سے کرانی چاہیے، کیونکہ ہر وجہ کا علاج مختلف ہوتا ہے۔",
      symptoms: [
        "بالیاں اور دانے سفید ہو کر جلے ہوئے لگتے ہیں، جبکہ باقی پودا ہرا رہتا ہے",
        "پتوں پر گہرے، آنکھ جیسے دھبے جن کا درمیان سرمئی ہوتا ہے",
        "شدید حالت میں بالی کے نیچے تنا کالا ہو جاتا ہے",
      ],
      organicSolution: [
        "متاثرہ بالیاں اور پتے ہٹا دیں اور کھیت میں کھاد کے طور پر نہ ڈالیں۔",
        "ہوا کی گزر بہتر کریں اور پانی کھڑا نہ ہونے دیں۔",
        "ایک پتے اور بالی کی صاف تصویر لیں اور شناخت کے لیے مقامی زرعی افسر کو دکھائیں۔",
      ],
      chemicalSolution: [
        "صحیح وجہ معلوم ہونے تک کوئی مخصوص فنجیسائیڈ یا بیکٹیریسائیڈ نہ لگائیں — غلط دوا پیسے کا ضیاع ہے اور فائدہ نہیں دے گی۔",
        "وجہ معلوم ہونے کے بعد صرف وہی دوا استعمال کریں جو اس بیماری اور فصل کے لیے لیبل شدہ ہو، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "صاف، تصدیق شدہ بیج اور جہاں ممکن ہو blast سے محفوظ اقسام لگائیں۔",
        "دیر سے کاشت اور زیادہ نائٹروجن سے گریز کریں، جس سے فصل زیادہ کمزور ہوتی ہے۔",
        "فصلیں بدل بدل کر لگائیں اور کٹائی کے بعد متاثرہ باقیات صاف کر دیں۔",
      ],
    },
    roman: {
      cause: "V23 model sirf ye batata hai ke gandum ke patte par blast hai, is ki sahi wajah nahi batata. Gandum ka blast aksar Magnaporthe oryzae nami phaphundi se hota hai jo garam, num mausam mein hawa se phailti hai — lekin ilaaj se pehle wajah ki tasdeeq maqami zarae afsar se karani chahiye, kyun ke har wajah ka ilaaj mukhtalif hota hai.",
      symptoms: [
        "Baliyan aur dane safed ho kar jale hue lagte hain, jab ke baqi poda hara rehta hai",
        "Patton par gehre, aankh jaise dhabbe jin ka darmiyan surmai hota hai",
        "Shadeed haalat mein baali ke neeche tana kaala ho jata hai",
      ],
      organicSolution: [
        "Mutasira baliyan aur patte hata dein aur khet mein khaad ke tor par na daalein.",
        "Hawa ki guzar behtar karein aur paani khara na hone dein.",
        "Aik patte aur baali ki saaf photo lein aur shanakht ke liye maqami zarae afsar ko dikhayein.",
      ],
      chemicalSolution: [
        "Sahi wajah maloom hone tak koi makhsoos fungicide ya bactericide na lagayein — ghalat dawa paise ka zaya hai aur faida nahi de gi.",
        "Wajah maloom hone ke baad sirf wohi dawa istemal karein jo is bimari aur fasal ke liye label shuda ho, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Saaf, tasdeeq shuda beej aur jahan mumkin ho blast se mehfooz aqsaam lagayein.",
        "Der se kasht aur zyada nitrogen se gurez karein, jis se fasal zyada kamzor hoti hai.",
        "Faslein badal badal kar lagayein aur katai ke baad mutasira baqiyat saaf kar dein.",
      ],
    },
  },
  "kb-wheat-common-root-rot": {
    ur: {
      cause: "یہ مٹی میں رہنے والی پھپھوندی ہے جو جڑوں، تنے کی بنیاد اور نچلے تنے پر حملہ کرتی ہے، خاص طور پر خشک، دباؤ والی مٹی میں اور جہاں ہر سال ایک ہی زمین پر گندم لگائی جائے۔",
      symptoms: [
        "جڑوں، تنے کی بنیاد اور نچلے تنے پر بھورے سے گہرے دھبے",
        "پودے چھوٹے اور پیلے رہ جاتے ہیں اور اچھی طرح شاخیں نہیں بناتے",
        "سفید، خالی بالیاں باقی کھیت سے پہلے پک جاتی ہیں",
        "دانے کم بھرتے ہیں اور سکڑ جاتے ہیں",
      ],
      organicSolution: [
        "گندم کو دوسری فصلوں کے ساتھ بدل بدل کر لگائیں اور ہر سال ایک ہی زمین پر گندم نہ لگائیں۔",
        "مٹی کی نکاسی اور نامی مادہ بہتر کریں تاکہ جڑیں صحت مند رہیں۔",
        "کٹائی کے بعد متاثرہ باقیات ہٹا دیں اور ختم کر دیں۔",
      ],
      chemicalSolution: [
        "عام root rot کے لیے لیبل شدہ بیج کی دوا (جیسے Tebuconazole، یا Carboxin + Thiram)، کاشت سے پہلے بیج پر لگائیں، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پتوں پر اسپرے سے root rot ٹھیک نہیں ہوتا — علاج کاشت سے پہلے بیج یا مٹی میں ہونا چاہیے۔",
      ],
      prevention: [
        "صاف، دوا لگا ہوا، تصدیق شدہ بیج لگائیں۔",
        "فصلیں بدل بدل کر لگائیں اور زیادہ متاثرہ باقیات والی زمین میں گندم نہ لگائیں۔",
        "پودوں کو اچھی خوراک اور پانی دیں تاکہ جڑیں مضبوط رہیں۔",
        "اپنے علاقے کے لیے تجویز کردہ گہرائی اور وقت پر کاشت کریں۔",
      ],
    },
    roman: {
      cause: "Ye mitti mein rehne wali phaphundi hai jo jaron, tane ki bunyad aur neeche wale tane par hamla karti hai, khaas tor par khushk, dabao wali mitti mein aur jahan har saal aik hi zameen par gandum lagayi jaye.",
      symptoms: [
        "Jaron, tane ki bunyad aur neeche wale tane par bhoore se gehre dhabbe",
        "Poday chhote aur peele reh jate hain aur achhi tarah shakhein nahi banate",
        "Safed, khaali baliyan baqi khet se pehle pak jati hain",
        "Dane kam bharte hain aur sikar jate hain",
      ],
      organicSolution: [
        "Gandum ko doosri faslon ke saath badal badal kar lagayein aur har saal aik hi zameen par gandum na lagayein.",
        "Mitti ki nikasi aur naami mada behtar karein taake jarein sehatmand rahein.",
        "Katai ke baad mutasira baqiyat hata dein aur khatam kar dein.",
      ],
      chemicalSolution: [
        "Aam root rot ke liye label shuda beej ki dawa (jaise Tebuconazole, ya Carboxin + Thiram), kasht se pehle beej par lagayein, sirf label par likhi miqdar ke mutabiq.",
        "Patton par spray se root rot theek nahi hota — ilaaj kasht se pehle beej ya mitti mein hona chahiye.",
      ],
      prevention: [
        "Saaf, dawa laga hua, tasdeeq shuda beej lagayein.",
        "Faslein badal badal kar lagayein aur zyada mutasira baqiyat wali zameen mein gandum na lagayein.",
        "Podon ko achhi khoraak aur paani dein taake jarein mazboot rahein.",
        "Apne ilaqe ke liye tajweez kardah gehrai aur waqt par kasht karein.",
      ],
    },
  },
  "kb-wheat-fusarium-head-blight": {
    ur: {
      cause: "یہ ایک پھپھوندی ہے جو پھول آنے کے وقت گرم، نم موسم میں گندم کی بالیوں پر حملہ کرتی ہے۔ اس کے بیج متاثرہ باقیات سے آتے ہیں، خاص طور پر مکئی کی باقیات سے، اور یہ بیماری دانوں میں نقصان دہ زہر (mycotoxins) چھوڑ سکتی ہے۔",
      symptoms: [
        "ایک یا زیادہ دانے سفید ہو جاتے ہیں جبکہ باقی بالی ہری رہتی ہے",
        "نم موسم میں متاثرہ دانوں پر گلابی یا نارنجی پھپھوندی اگتی ہے",
        "دانے سکڑ کر ہلکے اور چاک جیسے ہو جاتے ہیں",
        "بالیاں سیدھی کھڑی رہتی ہیں اور بھر نہیں پاتیں",
      ],
      organicSolution: [
        "جہاں ممکن ہو متاثرہ بالیاں ہٹا دیں اور ختم کر دیں، اور متاثرہ دانے بیج کے لیے نہ رکھیں۔",
        "گندم کو دوسری فصلوں کے ساتھ بدل بدل کر لگائیں اور مکئی اور گندم کی باقیات کو دفن کریں۔",
        "ہوا کی گزر بہتر کریں اور زیادہ نائٹروجن سے گریز کریں۔",
      ],
      chemicalSolution: [
        "Fusarium head blight کے لیے لیبل شدہ فنجیسائیڈ (جیسے Prothioconazole + Tebuconazole، یا صرف Tebuconazole)، پھول آنے/بالی نکلنے کے وقت اسپرے کریں جیسا کہ لیبل بتاتا ہے، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "اسپرے کا وقت بہت اہم ہے — بالی مکمل متاثر ہونے کے بعد اسپرے دانوں میں موجود زہر کو ختم نہیں کرے گا۔",
      ],
      prevention: [
        "جہاں ممکن ہو مزاحم یا برداشت کرنے والی اقسام لگائیں۔",
        "دوسری فصلوں کے ساتھ بدل بدل کر لگائیں اور مکئی کی باقیات کا انتظام کریں، جو اس پھپھوندی کو لے کر آتی ہیں۔",
        "صاف، تصدیق شدہ بیج لگائیں اور جہاں ممکن ہو نم موسم میں دیر سے پھول آنے سے گریز کریں۔",
        "بہت زیادہ متاثرہ دانے جانوروں کو مشورے کے بغیر نہ کھلائیں — ان میں زہر ہو سکتا ہے۔",
      ],
    },
    roman: {
      cause: "Ye aik phaphundi hai jo phool aane ke waqt garam, num mausam mein gandum ki baliyon par hamla karti hai. Is ke beej mutasira baqiyat se aate hain, khaas tor par makai ki baqiyat se, aur ye bimari danon mein nuqsan deh zeher (mycotoxins) chhor sakti hai.",
      symptoms: [
        "Aik ya zyada dane safed ho jate hain jab ke baqi baali hari rehti hai",
        "Num mausam mein mutasira danon par gulabi ya narangi phaphundi ugti hai",
        "Dane sikar kar halke aur chaak jaise ho jate hain",
        "Baliyan seedhi khari rehti hain aur bhar nahi paatin",
      ],
      organicSolution: [
        "Jahan mumkin ho mutasira baliyan hata dein aur khatam kar dein, aur mutasira dane beej ke liye na rakhein.",
        "Gandum ko doosri faslon ke saath badal badal kar lagayein aur makai aur gandum ki baqiyat ko dafan karein.",
        "Hawa ki guzar behtar karein aur zyada nitrogen se gurez karein.",
      ],
      chemicalSolution: [
        "Fusarium head blight ke liye label shuda fungicide (jaise Prothioconazole + Tebuconazole, ya sirf Tebuconazole), phool aane/baali nikalne ke waqt spray karein jaisa ke label batata hai, sirf label par likhi miqdar ke mutabiq.",
        "Spray ka waqt bohat ahem hai — baali mukammal mutasir hone ke baad spray danon mein maujood zeher ko khatam nahi kare ga.",
      ],
      prevention: [
        "Jahan mumkin ho muzahim ya bardasht karne wali aqsaam lagayein.",
        "Doosri faslon ke saath badal badal kar lagayein aur makai ki baqiyat ka intezam karein, jo is phaphundi ko le kar aati hain.",
        "Saaf, tasdeeq shuda beej lagayein aur jahan mumkin ho num mausam mein der se phool aane se gurez karein.",
        "Bohat zyada mutasira dane janwaron ko mashware ke baghair na khilayein — in mein zeher ho sakta hai.",
      ],
    },
  },
  "kb-wheat-leaf-blight": {
    ur: {
      cause: "یہ بیج سے پھیلنے والی پھپھوندی ہے جو گرم (تقریباً 25 ڈگری)، مرطوب موسم میں پتوں پر حملہ کرتی ہے، عام طور پر جب فصل 7 سے 8 ہفتے کی ہوتی ہے۔ یہ ہوا اور بارش کے چھینٹوں سے متاثرہ پتوں اور باقیات سے پھیلتی ہے۔",
      symptoms: [
        "پتوں پر سرخی مائل بھورے، بیضوی دھبے جو چمکدار پیلے کنارے کے ساتھ بے ترتیب ہو جاتے ہیں",
        "دھبوں پر گہرے، دائروں والے نشانات ہوتے ہیں اور شدید حملے میں مل جاتے ہیں",
        "پتے سرے سے خشک ہو کر جلدی گر جاتے ہیں، جس سے پودا کمزور ہو جاتا ہے",
        "زیادہ پتے گرنے سے دانے سکڑ کر ہلکے ہو جاتے ہیں",
      ],
      organicSolution: [
        "زیادہ متاثرہ پتے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "صاف، دوا لگا ہوا بیج استعمال کریں — یہ پھپھوندی بیج سے پھیلتی ہے۔",
        "ہوا کی گزر بہتر کریں اور پانی دیتے وقت پتوں کو گیلا کرنے سے گریز کریں۔",
      ],
      chemicalSolution: [
        "گندم کے leaf blight کے لیے لیبل شدہ فنجیسائیڈ (جیسے Propiconazole یا Mancozeb)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پہلے دھبے نظر آتے ہی اسپرے کریں اور صرف لیبل کے مطابق دہرائیں۔",
      ],
      prevention: [
        "صاف، تصدیق شدہ، دوا لگا ہوا بیج لگائیں۔",
        "فصلیں بدل بدل کر لگائیں اور متاثرہ باقیات کو دفن کریں یا کٹائی کے بعد ختم کر دیں۔",
        "دیر سے کاشت نہ کریں اور پانی جڑوں میں دیں۔",
        "ٹلرنگ کے بعد سے ہر ہفتے معائنہ کریں، خاص طور پر مرطوب موسم میں۔",
      ],
    },
    roman: {
      cause: "Ye beej se phailne wali phaphundi hai jo garam (taqreeban 25 degree), martub mausam mein patton par hamla karti hai, aam tor par jab fasal 7 se 8 hafte ki hoti hai. Ye hawa aur barish ke chheenton se mutasira patton aur baqiyat se phailti hai.",
      symptoms: [
        "Patton par surkhi mael bhoore, baizvi dhabbe jo chamakdar peele kinare ke saath be tarteeb ho jate hain",
        "Dhabbon par gehre, dairon wale nishanaat hote hain aur shadeed hamle mein mil jate hain",
        "Patte saray se khushk ho kar jaldi gir jate hain, jis se poda kamzor ho jata hai",
        "Zyada patte girne se dane sikar kar halke ho jate hain",
      ],
      organicSolution: [
        "Zyada mutasira patte hata dein aur khet mein na chhorein.",
        "Saaf, dawa laga hua beej istemal karein — ye phaphundi beej se phailti hai.",
        "Hawa ki guzar behtar karein aur paani dete waqt patton ko geela karne se gurez karein.",
      ],
      chemicalSolution: [
        "Gandum ke leaf blight ke liye label shuda fungicide (jaise Propiconazole ya Mancozeb), sirf label par likhi miqdar ke mutabiq.",
        "Pehle dhabbe nazar aate hi spray karein aur sirf label ke mutabiq dohrayein.",
      ],
      prevention: [
        "Saaf, tasdeeq shuda, dawa laga hua beej lagayein.",
        "Faslein badal badal kar lagayein aur mutasira baqiyat ko dafan karein ya katai ke baad khatam kar dein.",
        "Der se kasht na karein aur paani jaron mein dein.",
        "Tillering ke baad se har hafte muaina karein, khaas tor par martub mausam mein.",
      ],
    },
  },
  "kb-wheat-mildew": {
    ur: {
      cause: "یہ ایک پھپھوندی ہے (گندم کی powdery mildew) جو ہلکے، مرطوب موسم میں گھنی، سایہ دار فصل میں پتے کی سطح پر اگتی ہے۔ اس کے بیج ہوا سے پھیلتے ہیں۔",
      symptoms: [
        "پتوں، پتے کی میان اور تنوں پر سفید، پاؤڈر جیسے دھبے",
        "دھبے سرمئی بھورے ہو جاتے ہیں اور نیچے والے پتے پیلے ہو جاتے ہیں",
        "شدید حملے میں پودے چھوٹے رہ جاتے ہیں اور شاخیں کم بنتی ہیں",
        "شدید حالت میں بالیوں پر بھی سفید پاؤڈر لگ سکتا ہے",
      ],
      organicSolution: [
        "زیادہ متاثرہ پتے ہٹا دیں اور ہوا کی گزر بہتر کریں۔",
        "پاؤڈر والی پھپھوندی کے لیے لیبل شدہ Sulphur یا نیم والی مصنوعات اسپرے کریں، تیز دھوپ میں اسپرے نہ کریں۔",
        "پانی جڑوں میں دیں اور پتوں کو گیلا کرنے سے گریز کریں۔",
      ],
      chemicalSolution: [
        "گندم کی powdery mildew کے لیے لیبل شدہ فنجیسائیڈ (جیسے Propiconazole یا Sulphur)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پہلے سفید دھبے نظر آتے ہی اسپرے کریں — پتے پر پھیل جانے کے بعد اسے روکنا بہت مشکل ہو جاتا ہے۔",
      ],
      prevention: [
        "مزاحم اقسام لگائیں اور گھنی کاشت سے گریز کریں۔",
        "زیادہ نائٹروجن سے گریز کریں، جس سے نرم پتے بنتے ہیں جنہیں پھپھوندی پسند کرتی ہے۔",
        "فصلیں بدل بدل کر لگائیں اور کٹائی کے بعد گرے ہوئے پتے صاف کر دیں۔",
        "ہلکے، مرطوب موسم میں ہر ہفتے نیچے والے پتے چیک کریں۔",
      ],
    },
    roman: {
      cause: "Ye aik phaphundi hai (gandum ki powdery mildew) jo halke, martub mausam mein ghani, saya daar fasal mein patte ki satah par ugti hai. Is ke beej hawa se phailte hain.",
      symptoms: [
        "Patton, patte ki miyan aur tanon par safed, powder jaise dhabbe",
        "Dhabbe surmai bhoore ho jate hain aur neeche wale patte peele ho jate hain",
        "Shadeed hamle mein poday chhote reh jate hain aur shakhein kam banti hain",
        "Shadeed haalat mein baliyon par bhi safed powder lag sakta hai",
      ],
      organicSolution: [
        "Zyada mutasira patte hata dein aur hawa ki guzar behtar karein.",
        "Powder wali phaphundi ke liye label shuda Sulphur ya neem wali masnooaat spray karein, tez dhoop mein spray na karein.",
        "Paani jaron mein dein aur patton ko geela karne se gurez karein.",
      ],
      chemicalSolution: [
        "Gandum ki powdery mildew ke liye label shuda fungicide (jaise Propiconazole ya Sulphur), sirf label par likhi miqdar ke mutabiq.",
        "Pehle safed dhabbe nazar aate hi spray karein — patte par phail jaane ke baad isay rokna bohat mushkil ho jata hai.",
      ],
      prevention: [
        "Muzahim aqsaam lagayein aur ghani kasht se gurez karein.",
        "Zyada nitrogen se gurez karein, jis se naram patte bante hain jinhein phaphundi pasand karti hai.",
        "Faslein badal badal kar lagayein aur katai ke baad giray hue patte saaf kar dein.",
        "Halke, martub mausam mein har hafte neeche wale patte check karein.",
      ],
    },
  },
  "kb-wheat-mite": {
    ur: {
      cause: "یہ چھوٹے رس چوسنے والے کیڑے (mite) ہیں جو گرم، خشک موسم میں پتوں کا رس چوستے ہیں۔ یہ اتنے چھوٹے ہوتے ہیں کہ بغیر لینس کے صاف نظر نہیں آتے، اور کچھ اقسام گندم کے وائرس بھی پھیلاتی ہیں۔",
      symptoms: [
        "پتوں پر باریک سفید یا چاندی جیسے چھوٹے دھبے",
        "پتے مڑ جاتے ہیں، پیلے ہو کر سرے سے خشک ہو جاتے ہیں",
        "شدید حملے میں پودے چھوٹے رہ جاتے ہیں اور شاخیں کم بنتی ہیں",
        "کچھ صورتوں میں پتوں کے نیچے باریک جالا یا دھول جیسی تہہ نظر آتی ہے",
      ],
      organicSolution: [
        "جہاں ممکن ہو زیادہ متاثرہ پتے ہاتھ سے ہٹا دیں۔",
        "Mite کے لیے لیبل شدہ نیم کا تیل یا insecticidal soap اسپرے کریں، پتوں کے نیچے کا حصہ بھی بھیگوئیں۔",
        "قدرتی شکاری کیڑوں کی حوصلہ افزائی کریں اور ایسے اسپرے سے گریز کریں جو انہیں مار دیتے ہیں۔",
      ],
      chemicalSolution: [
        "گندم پر mite کے لیے لیبل شدہ miticide (جیسے Abamectin)، صرف اس وقت جب تعداد زیادہ ہو اور پھیل رہی ہو، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "استعمال سے پہلے چیک کریں کہ دوا کے لیبل پر گندم اور mite لکھا ہو۔",
      ],
      prevention: [
        "گرم، خشک موسم میں ہر ہفتے پتے چیک کریں، خاص طور پر نیچے کا حصہ۔",
        "پودوں کو صحت مند رکھیں اور جہاں ممکن ہو خشک، دھول والی فصل سے گریز کریں۔",
        "کھیت کے کنارے جڑی بوٹیاں اور خود رو گندم ہٹا دیں جو mite کو پناہ دیتی ہیں۔",
      ],
    },
    roman: {
      cause: "Ye chhote ras choosne wale keere (mite) hain jo garam, khushk mausam mein patton ka ras chooste hain. Ye itne chhote hote hain ke baghair lens ke saaf nazar nahi aate, aur kuch aqsaam gandum ke virus bhi phailati hain.",
      symptoms: [
        "Patton par bareek safed ya chaandi jaise chhote dhabbe",
        "Patte mur jate hain, peele ho kar saray se khushk ho jate hain",
        "Shadeed hamle mein poday chhote reh jate hain aur shakhein kam banti hain",
        "Kuch sooraton mein patton ke neeche bareek jaala ya dhool jaisi teh nazar aati hai",
      ],
      organicSolution: [
        "Jahan mumkin ho zyada mutasira patte haath se hata dein.",
        "Mite ke liye label shuda neem ka tail ya insecticidal soap spray karein, patton ke neeche ka hissa bhi bhigoyein.",
        "Qudrati shikari keeron ki hosla afzai karein aur aise spray se gurez karein jo inhein maar dete hain.",
      ],
      chemicalSolution: [
        "Gandum par mite ke liye label shuda miticide (jaise Abamectin), sirf is waqt jab tadad zyada ho aur phail rahi ho, sirf label par likhi miqdar ke mutabiq.",
        "Istemal se pehle check karein ke dawa ke label par gandum aur mite likha ho.",
      ],
      prevention: [
        "Garam, khushk mausam mein har hafte patte check karein, khaas tor par neeche ka hissa.",
        "Podon ko sehatmand rakhein aur jahan mumkin ho khushk, dhool wali fasal se gurez karein.",
        "Khet ke kinare jari bootiyan aur khud ro gandum hata dein jo mite ko panah deti hain.",
      ],
    },
  },
  "kb-wheat-septoria": {
    ur: {
      cause: "V23 ماڈل صرف یہ بتاتا ہے کہ گندم کے پتے پر septoria ہے، اس کی صحیح وجہ نہیں بتاتا۔ Septoria leaf blotch اکثر Zymoseptoria tritici نامی پھپھوندی سے ہوتا ہے جو نم موسم میں بارش کے چھینٹوں سے پھیلتی ہے — لیکن علاج سے پہلے وجہ کی تصدیق مقامی زرعی افسر سے کرانی چاہیے، کیونکہ ہر وجہ کا علاج مختلف ہوتا ہے۔",
      symptoms: [
        "پتوں پر سرمئی بھورے دھبے، جن کے اندر اکثر چھوٹے کالے نقطے (بیج کے خول) ہوتے ہیں",
        "نم موسم میں دھبے نیچے والے پتوں سے اوپر کی طرف پھیلتے ہیں",
        "دھبے مل جانے سے پتے جلدی خشک ہو کر مر جاتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھیت میں کھاد کے طور پر نہ ڈالیں۔",
        "ہوا کی گزر بہتر کریں اور پانی کھڑا نہ ہونے دیں۔",
        "ایک پتے کی صاف تصویر لیں اور شناخت کے لیے مقامی زرعی افسر کو دکھائیں۔",
      ],
      chemicalSolution: [
        "صحیح وجہ معلوم ہونے تک کوئی مخصوص فنجیسائیڈ نہ لگائیں — غلط دوا پیسے کا ضیاع ہے اور فائدہ نہیں دے گی۔",
        "وجہ معلوم ہونے کے بعد صرف وہی دوا استعمال کریں جو اس بیماری اور فصل کے لیے لیبل شدہ ہو، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "صاف، تصدیق شدہ بیج اور جہاں ممکن ہو مزاحم اقسام لگائیں۔",
        "فصلیں بدل بدل کر لگائیں اور متاثرہ باقیات کو کٹائی کے بعد دفن کریں۔",
        "دیر سے کاشت اور زیادہ نائٹروجن سے گریز کریں۔",
      ],
    },
    roman: {
      cause: "V23 model sirf ye batata hai ke gandum ke patte par septoria hai, is ki sahi wajah nahi batata. Septoria leaf blotch aksar Zymoseptoria tritici nami phaphundi se hota hai jo num mausam mein barish ke chheenton se phailti hai — lekin ilaaj se pehle wajah ki tasdeeq maqami zarae afsar se karani chahiye, kyun ke har wajah ka ilaaj mukhtalif hota hai.",
      symptoms: [
        "Patton par surmai bhoore dhabbe, jin ke andar aksar chhote kaale nuqte (beej ke khol) hote hain",
        "Num mausam mein dhabbe neeche wale patton se oopar ki taraf phailte hain",
        "Dhabbe mil jaane se patte jaldi khushk ho kar mar jate hain",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khet mein khaad ke tor par na daalein.",
        "Hawa ki guzar behtar karein aur paani khara na hone dein.",
        "Aik patte ki saaf photo lein aur shanakht ke liye maqami zarae afsar ko dikhayein.",
      ],
      chemicalSolution: [
        "Sahi wajah maloom hone tak koi makhsoos fungicide na lagayein — ghalat dawa paise ka zaya hai aur faida nahi de gi.",
        "Wajah maloom hone ke baad sirf wohi dawa istemal karein jo is bimari aur fasal ke liye label shuda ho, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Saaf, tasdeeq shuda beej aur jahan mumkin ho muzahim aqsaam lagayein.",
        "Faslein badal badal kar lagayein aur mutasira baqiyat ko katai ke baad dafan karein.",
        "Der se kasht aur zyada nitrogen se gurez karein.",
      ],
    },
  },
  "kb-wheat-smut": {
    ur: {
      cause: "یہ بیج سے پھیلنے والی پھپھوندی ہے (loose smut) جو پودے کے اندر بغیر نظر آئے بڑھتی ہے، پھر بالی نکلنے کے وقت پوری بالی کو کالے، پاؤڈر جیسے بیجوں میں بدل دیتی ہے۔ ایک متاثرہ بالی سے بیج اڑ کر کئی صحت مند پھولوں کو متاثر کر سکتے ہیں۔",
      symptoms: [
        "پوری بالی دانے کی بجائے کالے، پاؤڈر جیسے مادے میں بدل جاتی ہے",
        "متاثرہ بالیاں پہلے نکلتی ہیں اور صحت مند بالیوں سے اوپر کھڑی ہوتی ہیں",
        "کالے بیج ہوا میں اڑ جاتے ہیں اور خالی ڈنڈی رہ جاتی ہے",
        "متاثرہ بالیوں پر کوئی دانہ نہیں بنتا",
      ],
      organicSolution: [
        "کالا پاؤڈر اڑنے سے پہلے متاثرہ بالیاں ہٹا دیں اور ختم کر دیں — انہیں تھیلے میں ڈالیں، کھیت میں نہ جھٹکیں۔",
        "صحت مند فصل سے صاف، تصدیق شدہ بیج استعمال کریں۔",
        "متاثرہ کھیت کا دانہ بیج کے لیے نہ رکھیں۔",
      ],
      chemicalSolution: [
        "Loose smut کے لیے لیبل شدہ بیج کی دوا (جیسے Carboxin یا Tebuconazole)، کاشت سے پہلے بیج پر لگائیں، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پتوں پر اسپرے سے smut ٹھیک نہیں ہوتا — پھپھوندی پہلے سے پودے کے اندر ہے، اس لیے علاج بیج پر ہونا چاہیے۔",
      ],
      prevention: [
        "ہمیشہ تصدیق شدہ، دوا لگا ہوا بیج لگائیں — یہ سب سے مؤثر علاج ہے۔",
        "جیسے ہی متاثرہ بالیاں نظر آئیں انہیں ہٹا دیں، ہر موسم میں۔",
        "فصلیں بدل بدل کر لگائیں اور متاثرہ کھیتوں سے بیج نہ بچائیں۔",
        "بالی نکلنے کے وقت کھیت کا معائنہ کریں، جب smut آسانی سے نظر آتا ہے۔",
      ],
    },
    roman: {
      cause: "Ye beej se phailne wali phaphundi hai (loose smut) jo poday ke andar baghair nazar aaye barhti hai, phir baali nikalne ke waqt poori baali ko kaale, powder jaise beejon mein badal deti hai. Aik mutasira baali se beej ur kar kai sehatmand phoolon ko mutasir kar sakte hain.",
      symptoms: [
        "Poori baali dane ki bajaye kaale, powder jaise made mein badal jati hai",
        "Mutasira baliyan pehle nikalti hain aur sehatmand baliyon se oopar khari hoti hain",
        "Kaale beej hawa mein ur jate hain aur khaali dandi reh jati hai",
        "Mutasira baliyon par koi dana nahi banta",
      ],
      organicSolution: [
        "Kaala powder urne se pehle mutasira baliyan hata dein aur khatam kar dein — inhein thaile mein daalein, khet mein na jhatkein.",
        "Sehatmand fasal se saaf, tasdeeq shuda beej istemal karein.",
        "Mutasira khet ka dana beej ke liye na rakhein.",
      ],
      chemicalSolution: [
        "Loose smut ke liye label shuda beej ki dawa (jaise Carboxin ya Tebuconazole), kasht se pehle beej par lagayein, sirf label par likhi miqdar ke mutabiq.",
        "Patton par spray se smut theek nahi hota — phaphundi pehle se poday ke andar hai, is liye ilaaj beej par hona chahiye.",
      ],
      prevention: [
        "Hamesha tasdeeq shuda, dawa laga hua beej lagayein — ye sab se moassar ilaaj hai.",
        "Jaise hi mutasira baliyan nazar aayein inhein hata dein, har mausam mein.",
        "Faslein badal badal kar lagayein aur mutasira kheton se beej na bachayein.",
        "Baali nikalne ke waqt khet ka muaina karein, jab smut aasani se nazar aata hai.",
      ],
    },
  },
  "kb-wheat-stem-fly": {
    ur: {
      cause: "V23 ماڈل صرف یہ بتاتا ہے کہ گندم کے پودے پر stem fly کا نقصان ہے، اس کی صحیح وجہ نہیں بتاتا۔ گندم کے stem fly کا نقصان اکثر shoot fly کے کیڑوں (Atherigona اقسام) سے ہوتا ہے جو نوجوان تنوں میں سوراخ کرتے ہیں — لیکن علاج سے پہلے کیڑے کی تصدیق مقامی زرعی افسر سے کرانی چاہیے، کیونکہ ہر کیڑے کا علاج مختلف ہوتا ہے۔",
      symptoms: [
        "نوجوان پودے مرجھا جاتے ہیں اور درمیانی شاخ مر جاتی ہے (dead heart)، اور آسانی سے کھینچی جا سکتی ہے",
        "سفید، خالی بالیاں جن سے کوئی دانہ نہیں بنتا",
        "تنے کو چیرنے پر اندر چھوٹے کیڑے یا سرنگیں ملتی ہیں",
      ],
      organicSolution: [
        "متاثرہ پودے ہٹا دیں اور ختم کر دیں تاکہ کیڑے نہ پھیلیں۔",
        "تجویز کردہ وقت پر کاشت کریں — جلدی کاشت عام طور پر سب سے زیادہ حملے سے بچ جاتی ہے۔",
        "صاف تصویر لیں اور نقصان والا تنا شناخت کے لیے مقامی زرعی افسر کو دکھائیں۔",
      ],
      chemicalSolution: [
        "صحیح کیڑا معلوم ہونے تک کوئی مخصوص کیڑے مار دوا نہ لگائیں — غلط دوا پیسے کا ضیاع ہے اور فائدہ نہیں دے گی۔",
        "کیڑا معلوم ہونے کے بعد صرف وہی دوا استعمال کریں جو اس کیڑے اور فصل کے لیے لیبل شدہ ہو، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "تجویز کردہ وقت پر کاشت کریں اور صاف، صحت مند بیج استعمال کریں۔",
        "خود رو گندم اور باقیات ہٹا دیں جو موسموں کے درمیان مکھی کو پناہ دیتی ہیں۔",
        "کھاد متوازن رکھیں اور فصل کو مضبوطی سے بڑھنے دیں۔",
      ],
    },
    roman: {
      cause: "V23 model sirf ye batata hai ke gandum ke poday par stem fly ka nuqsan hai, is ki sahi wajah nahi batata. Gandum ke stem fly ka nuqsan aksar shoot fly ke keeron (Atherigona aqsaam) se hota hai jo naujawan tanon mein surakh karte hain — lekin ilaaj se pehle keere ki tasdeeq maqami zarae afsar se karani chahiye, kyun ke har keere ka ilaaj mukhtalif hota hai.",
      symptoms: [
        "Naujawan poday murjha jate hain aur darmiyani shaakh mar jati hai (dead heart), aur aasani se khainchi ja sakti hai",
        "Safed, khaali baliyan jin se koi dana nahi banta",
        "Tane ko cheerne par andar chhote keere ya surangein milti hain",
      ],
      organicSolution: [
        "Mutasira poday hata dein aur khatam kar dein taake keere na phailain.",
        "Tajweez kardah waqt par kasht karein — jaldi kasht aam tor par sab se zyada hamle se bach jati hai.",
        "Saaf photo lein aur nuqsan wala tana shanakht ke liye maqami zarae afsar ko dikhayein.",
      ],
      chemicalSolution: [
        "Sahi keera maloom hone tak koi makhsoos keere maar dawa na lagayein — ghalat dawa paise ka zaya hai aur faida nahi de gi.",
        "Keera maloom hone ke baad sirf wohi dawa istemal karein jo is keere aur fasal ke liye label shuda ho, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Tajweez kardah waqt par kasht karein aur saaf, sehatmand beej istemal karein.",
        "Khud ro gandum aur baqiyat hata dein jo mausamon ke darmiyan makkhi ko panah deti hain.",
        "Khaad mutawazan rakhein aur fasal ko mazbooti se barhne dein.",
      ],
    },
  },
  "kb-wheat-tan-spot": {
    ur: {
      cause: "یہ ایک پھپھوندی ہے جو گندم کی باقیات میں زندہ رہتی ہے اور گرم، نم موسم میں ہوا اور بارش کے چھینٹوں سے پھیلتی ہے۔ یہ پہلے پتوں پر حملہ کرتی ہے اور سب سے اوپر والے پتے تک پہنچ سکتی ہے، جہاں سب سے زیادہ پیداوار کا نقصان ہوتا ہے۔",
      symptoms: [
        "پتوں پر بھورے دھبے جن کے گرد پیلا حلقہ اور درمیان میں گہرا نقطہ ہوتا ہے",
        "دھبے بڑھ کر مل جاتے ہیں اور پتے سرے سے مر جاتے ہیں",
        "پرانے دھبوں کے درمیان چھوٹے کالے نقطے نظر آ سکتے ہیں",
        "سب سے اوپر والے پتے پر شدید حملے سے دانے سکڑ جاتے ہیں",
      ],
      organicSolution: [
        "زیادہ متاثرہ پتے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "کٹائی کے بعد گندم کی باقیات کو دفن کریں یا ختم کر دیں تاکہ پھپھوندی زندہ نہ رہے۔",
        "ہوا کی گزر بہتر کریں اور پانی دیتے وقت پتوں کو گیلا کرنے سے گریز کریں۔",
      ],
      chemicalSolution: [
        "گندم کے tan spot کے لیے لیبل شدہ فنجیسائیڈ (جیسے Propiconazole، یا Azoxystrobin + Difenoconazole)، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پہلے دھبے نظر آتے ہی اسپرے کریں اور سب سے اوپر والے پتے کو بچائیں — صرف لیبل کے مطابق دہرائیں۔",
      ],
      prevention: [
        "گندم کو دوسری فصلوں کے ساتھ بدل بدل کر لگائیں اور باقیات کا انتظام کریں۔",
        "مزاحم اقسام لگائیں اور دیر سے کاشت نہ کریں۔",
        "پانی جڑوں میں دیں اور ہر ہفتے معائنہ کریں، خاص طور پر سب سے اوپر والے پتے کا۔",
        "کٹائی کے بعد گرے ہوئے پتے اور خود رو گندم صاف کر دیں۔",
      ],
    },
    roman: {
      cause: "Ye aik phaphundi hai jo gandum ki baqiyat mein zinda rehti hai aur garam, num mausam mein hawa aur barish ke chheenton se phailti hai. Ye pehle patton par hamla karti hai aur sab se oopar wale patte tak pahunch sakti hai, jahan sab se zyada paidawar ka nuqsan hota hai.",
      symptoms: [
        "Patton par bhoore dhabbe jin ke gird peela halqa aur darmiyan mein gehra nuqta hota hai",
        "Dhabbe barh kar mil jate hain aur patte saray se mar jate hain",
        "Purane dhabbon ke darmiyan chhote kaale nuqte nazar aa sakte hain",
        "Sab se oopar wale patte par shadeed hamle se dane sikar jate hain",
      ],
      organicSolution: [
        "Zyada mutasira patte hata dein aur khet mein na chhorein.",
        "Katai ke baad gandum ki baqiyat ko dafan karein ya khatam kar dein taake phaphundi zinda na rahe.",
        "Hawa ki guzar behtar karein aur paani dete waqt patton ko geela karne se gurez karein.",
      ],
      chemicalSolution: [
        "Gandum ke tan spot ke liye label shuda fungicide (jaise Propiconazole, ya Azoxystrobin + Difenoconazole), sirf label par likhi miqdar ke mutabiq.",
        "Pehle dhabbe nazar aate hi spray karein aur sab se oopar wale patte ko bachayein — sirf label ke mutabiq dohrayein.",
      ],
      prevention: [
        "Gandum ko doosri faslon ke saath badal badal kar lagayein aur baqiyat ka intezam karein.",
        "Muzahim aqsaam lagayein aur der se kasht na karein.",
        "Paani jaron mein dein aur har hafte muaina karein, khaas tor par sab se oopar wale patte ka.",
        "Katai ke baad giray hue patte aur khud ro gandum saaf kar dein.",
      ],
    },
  },  "kb-rice-bacterial-blight": {
    ur: {
      cause: "یہ بیکٹیریا کی بیماری ہے جو بارش اور آبپاشی کے پانی سے پھیلتی ہے۔ بیکٹیریا پتوں کے زخموں اور مساموں سے داخل ہوتا ہے اور متاثرہ بیج، بھوسے اور کھونٹوں میں زندہ رہتا ہے۔",
      symptoms: [
        "پتوں کی نوک اور کناروں سے پانی بھرے پیلے دھبے شروع ہوتے ہیں",
        "بیماری بڑھنے پر دھبے سرمئی سبز سے بھوسے کے رنگ کے ہو جاتے ہیں",
        "پتے نوک سے اندر کی طرف خشک ہونا شروع ہو جاتے ہیں",
        "شدید حملے میں پورا گچھا مرجھا کر خشک ہو جاتا ہے",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھاد میں نہ ڈالیں۔",
        "گیلے پودوں کے ساتھ کام نہ کریں۔",
        "بیماری سے پاک بیج استعمال کریں۔",
      ],
      chemicalSolution: [
        "چاول کی Bacterial Leaf Blight کے لیے لیبل شدہ Copper oxychloride، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "جہاں رجسٹرڈ ہو وہاں Streptocycline، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "جہاں دستیاب ہو مدافعت رکھنے والی اقسام لگائیں۔",
        "نائٹروجن زیادہ نہ ڈالیں۔",
        "پانی کی نکاسی بہتر کریں اور فصلیں بدل بدل کر لگائیں۔",
        "صاف اور بیماری سے پاک بیج استعمال کریں۔",
      ],
    },
    roman: {
      cause: "Ye bacteria ki bimari hai jo barish aur aabpashi ke pani se phailti hai. Bacteria patton ke zakhmon aur masamon se dakhil hota hai aur mutasira beej, bhuse aur khonton mein zinda rehta hai.",
      symptoms: [
        "Patton ki nok aur kinaron se pani bhare peele dhabbe shuru hote hain",
        "Bimari barhne par dhabbe surmayi sabz se bhuse ke rang ke ho jate hain",
        "Patte nok se andar ki taraf khushk hona shuru ho jate hain",
        "Shadeed hamle mein poora guchha murjha kar khushk ho jata hai",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khaad mein na dalein.",
        "Geele podon ke saath kaam na karein.",
        "Bimari se pak beej istemal karein.",
      ],
      chemicalSolution: [
        "Chawal ki Bacterial Leaf Blight ke liye label shuda Copper oxychloride, sirf label par likhi miqdar ke mutabiq.",
        "Jahan registered ho wahan Streptocycline, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Jahan dastiyab ho mudafiat rakhne wali aqsaam lagayein.",
        "Nitrogen zyada na dalein.",
        "Pani ki nikasi behtar karein aur faslein badal badal kar lagayein.",
        "Saaf aur bimari se pak beej istemal karein.",
      ],
    },
  },
  "kb-rice-blast": {
    ur: {
      cause: "یہ پھپھوندی گرم اور نم موسم میں ہوا کے ذریعے پھیلنے والے بیجوں سے پھیلتی ہے۔ ایک ساتھ زیادہ نائٹروجن ڈالنے سے پودے زیادہ کمزور ہو جاتے ہیں۔",
      symptoms: [
        "سرمئی سفید مرکز اور بھورے کناروں والے ہیرے جیسے دھبے",
        "دھبے مل جاتے ہیں اور پتہ مر جاتا ہے",
        "گرہوں اور بالی کی گردن پر گہرے دھبے",
        "شدید حملے میں دانے خالی رہ جاتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "پانی دیتے وقت پتے گیلے نہ کریں۔",
        "جہاں دستیاب ہو مدافعت رکھنے والی اقسام استعمال کریں۔",
      ],
      chemicalSolution: [
        "چاول کی Blast کے لیے لیبل شدہ Tricyclazole یا Propiconazole، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "کاشت سے پہلے Tricyclazole یا Carbendazim سے بیج کا علاج کریں۔",
      ],
      prevention: [
        "مدافعت رکھنے والی اقسام اور تصدیق شدہ بیج لگائیں۔",
        "نائٹروجن ایک ساتھ نہیں بلکہ قسطوں میں ڈالیں۔",
        "پانی جڑ کے پاس دیں اور متاثرہ بھوسہ صاف کریں۔",
        "خاص طور پر نم موسم میں ہر ہفتے کھیت کا معائنہ کریں۔",
      ],
    },
    roman: {
      cause: "Ye phaphundi garam aur num mausam mein hawa ke zariye phailne wale beejon se phailti hai. Aik saath zyada nitrogen dalne se poday zyada kamzor ho jate hain.",
      symptoms: [
        "Surmayi safed markaz aur bhure kinaron wale heere jaise dhabbe",
        "Dhabbe mil jate hain aur patta mar jata hai",
        "Girahon aur bali ki gardan par gehre dhabbe",
        "Shadeed hamle mein dane khaali reh jate hain",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khet mein na chhodein.",
        "Pani dete waqt patte geele na karein.",
        "Jahan dastiyab ho mudafiat rakhne wali aqsaam istemal karein.",
      ],
      chemicalSolution: [
        "Chawal ki Blast ke liye label shuda Tricyclazole ya Propiconazole, sirf label par likhi miqdar ke mutabiq.",
        "Kasht se pehle Tricyclazole ya Carbendazim se beej ka ilaaj karein.",
      ],
      prevention: [
        "Mudafiat rakhne wali aqsaam aur tasdeeq shuda beej lagayein.",
        "Nitrogen aik saath nahi balki qiston mein dalein.",
        "Pani jar ke paas dein aur mutasira bhusa saaf karein.",
        "Khaas taur par num mausam mein har hafte khet ka muaaina karein.",
      ],
    },
  },
  "kb-rice-brown-spot": {
    ur: {
      cause: "یہ بیج سے پھیلنے والی پھپھوندی ہے جو کمزور اور کم خوراک والے پودوں پر اور خشک، دباؤ والے کھیتوں میں پھلتی پھولتی ہے۔ یہ متاثرہ بیج اور بھوسے سے پھیلتی ہے۔",
      symptoms: [
        "پتوں پر تل کے دانے جتنے چھوٹے بھورے دھبے",
        "دھبے بڑے ہو کر گہرے کناروں اور سرمئی مرکز والے بیضوی دھبے بن جاتے ہیں",
        "دانوں اور بھوسے پر بھی دھبے نظر آتے ہیں",
        "شدید حملے میں پتے خشک ہو جاتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "کاشت سے پہلے بیج کو گرم پانی (53 سے 54 ڈگری، 10 سے 12 منٹ) میں بھگوئیں۔",
        "پودوں کو اچھی خوراک دیں، خاص طور پر پوٹاش۔",
      ],
      chemicalSolution: [
        "چاول کی Brown Spot کے لیے لیبل شدہ Propiconazole یا Azoxystrobin، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "بیماری سے پاک بیج استعمال کریں۔",
        "پودوں کو متوازن خوراک دیں، خاص طور پر پوٹاش۔",
        "پانی کی نکاسی بہتر کریں۔",
        "فصلیں بدل بدل کر لگائیں۔",
      ],
    },
    roman: {
      cause: "Ye beej se phailne wali phaphundi hai jo kamzor aur kam khurak wale podon par aur khushk, dabao wale kheton mein phalti phoolti hai. Ye mutasira beej aur bhuse se phailti hai.",
      symptoms: [
        "Patton par til ke dane jitne chhote bhure dhabbe",
        "Dhabbe bare ho kar gehre kinaron aur surmayi markaz wale bezvi dhabbe ban jate hain",
        "Danon aur bhuse par bhi dhabbe nazar aate hain",
        "Shadeed hamle mein patte khushk ho jate hain",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khet mein na chhodein.",
        "Kasht se pehle beej ko garam pani (53 se 54 degree, 10 se 12 minute) mein bhigoyein.",
        "Podon ko achhi khurak dein, khaas taur par potash.",
      ],
      chemicalSolution: [
        "Chawal ki Brown Spot ke liye label shuda Propiconazole ya Azoxystrobin, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Bimari se pak beej istemal karein.",
        "Podon ko mutawazan khurak dein, khaas taur par potash.",
        "Pani ki nikasi behtar karein.",
        "Faslein badal badal kar lagayein.",
      ],
    },
  },
  "kb-rice-tungro": {
    ur: {
      cause: "یہ وائرس سبز ٹڈے (Green Leafhopper) کے ذریعے ایک پودے سے دوسرے پودے تک پہنچتا ہے۔ یہ کیڑا متاثرہ پودے کا رس چوستا ہے، پھر صحت مند پودے پر کھاتے وقت وائرس پھیلا دیتا ہے۔",
      symptoms: [
        "بونے پودے جن کے پتے پیلے نارنجی ہو جاتے ہیں",
        "صحت مند پودوں سے کم ٹلر",
        "پھول آنے میں تاخیر",
        "خالی یا آدھے بھرے دانے",
      ],
      organicSolution: [
        "شدید متاثرہ پودے ہٹا دیں تاکہ وائرس نہ پھیلے۔",
        "سبز ٹڈوں کو کنٹرول کریں۔",
        "بندوں کو ان جڑی بوٹیوں سے پاک رکھیں جن میں وائرس رہتا ہے۔",
      ],
      chemicalSolution: [
        "Tungro وائرس کا کوئی کیمیائی علاج نہیں ہے۔",
        "Green Leafhopper کے لیے لیبل شدہ Imidacloprid اس کیڑے کو کنٹرول کرتا ہے جو وائرس پھیلاتا ہے، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "جہاں دستیاب ہو مدافعت رکھنے والی اقسام استعمال کریں۔",
        "پڑوسی کھیتوں کے ساتھ ایک ہی وقت میں کاشت کریں۔",
        "موسم کے شروع میں ہی ٹڈوں کو کنٹرول کریں۔",
        "بندوں کو جڑی بوٹیوں سے پاک رکھیں۔",
      ],
    },
    roman: {
      cause: "Ye virus sabz tidde (Green Leafhopper) ke zariye aik poday se dusre poday tak pahunchta hai. Ye keera mutasira poday ka ras chusta hai, phir sehatmand poday par khate waqt virus phaila deta hai.",
      symptoms: [
        "Boune poday jin ke patte peele narangi ho jate hain",
        "Sehatmand podon se kam tiller",
        "Phool aane mein takheer",
        "Khaali ya aadhe bhare dane",
      ],
      organicSolution: [
        "Shadeed mutasira poday hata dein taake virus na phaile.",
        "Sabz tiddon ko control karein.",
        "Bandon ko un jari bootion se pak rakhein jin mein virus rehta hai.",
      ],
      chemicalSolution: [
        "Tungro virus ka koi kimiyai ilaaj nahi hai.",
        "Green Leafhopper ke liye label shuda Imidacloprid is keere ko control karta hai jo virus phailata hai, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Jahan dastiyab ho mudafiat rakhne wali aqsaam istemal karein.",
        "Parosi kheton ke saath aik hi waqt mein kasht karein.",
        "Mausam ke shuru mein hi tiddon ko control karein.",
        "Bandon ko jari bootion se pak rakhein.",
      ],
    },
  },
  "kb-rice-leaf-scald": {
    ur: {
      cause: "یہ فنگس بارش کے چھینٹوں اور ہوا سے گرم اور نم موسم میں پھیلتی ہے۔ یہ متاثرہ بیج اور بھوسے میں زندہ رہتی ہے اور زیادہ دیر گیلے رہنے والے پتوں پر حملہ کرتی ہے۔",
      symptoms: [
        "پتوں پر جلے ہوئے دھبے، جن میں ہلکی اور گہری پٹیاں باری باری آتی ہیں",
        "پتوں کی نوک خشک ہو کر بھوسے کے رنگ کی ہو جاتی ہے",
        "گہرے بھورے کناروں والے زخم",
        "شدید حملے میں پورے پتے خشک ہو جاتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پتے ہٹا دیں اور کھیت میں نہ چھوڑیں۔",
        "بیماری سے پاک بیج استعمال کریں۔",
        "نائٹروجن زیادہ نہ ڈالیں۔",
      ],
      chemicalSolution: [
        "چاول کی Leaf Scald کے لیے لیبل شدہ Propiconazole، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "چاول کے لیے لیبل شدہ Copper oxychloride، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "جہاں دستیاب ہو مدافعت رکھنے والی اقسام لگائیں۔",
        "صاف اور بیماری سے پاک بیج استعمال کریں۔",
        "نائٹروجن زیادہ نہ ڈالیں۔",
        "پانی کی نکاسی بہتر کریں اور فصلیں بدل بدل کر لگائیں۔",
      ],
    },
    roman: {
      cause: "Ye fungus barish ke chheenton aur hawa se garam aur nam mausam mein phailti hai. Ye mutasira beej aur bhuse mein zinda rehti hai aur zyada der geele rehne wale patton par hamla karti hai.",
      symptoms: [
        "Patton par jale hue dhabbe, jin mein halki aur gehri pattiyan bari bari aati hain",
        "Patton ki nok khushk ho kar bhuse ke rang ki ho jati hai",
        "Gehre bhure kinaron wale zakham",
        "Shadeed hamle mein poore patte khushk ho jate hain",
      ],
      organicSolution: [
        "Mutasira patte hata dein aur khet mein na chhodein.",
        "Bimari se pak beej istemal karein.",
        "Nitrogen zyada na dalein.",
      ],
      chemicalSolution: [
        "Chawal ki Leaf Scald ke liye label shuda Propiconazole, sirf label par likhi miqdar ke mutabiq.",
        "Chawal ke liye label shuda Copper oxychloride, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Jahan dastiyab ho mudafiat rakhne wali aqsaam lagayein.",
        "Saaf aur bimari se pak beej istemal karein.",
        "Nitrogen zyada na dalein.",
        "Pani ki nikasi behtar karein aur faslein badal badal kar lagayein.",
      ],
    },
  },
  "kb-rice-sheath-blight": {
    ur: {
      cause: "یہ مٹی اور پانی سے پھیلنے والی فنگس ہے جو گھنی، نم فصل اور زیادہ نائٹروجن میں خوب بڑھتی ہے۔ یہ پانی اور رابطے سے ایک پودے سے دوسرے پودے تک پھیلتی ہے۔",
      symptoms: [
        "پانی کی سطح کے پاس پتوں کی میان پر گہرے بھورے کناروں والے بیضوی سرمئی سبز دھبے",
        "دھبے مل کر پودے کے اوپر چڑھ جاتے ہیں",
        "میان پر سفید فنگس کی بڑھوتری",
        "متاثرہ میان پر چھوٹی گہری بھوری گیندیں (اسکلیروشیا)",
      ],
      organicSolution: [
        "پودوں کے درمیان فاصلہ بڑھائیں تاکہ ہوا گزر سکے۔",
        "کھیت سے اضافی پانی نکال دیں۔",
        "کٹائی کے بعد متاثرہ بھوسا ہٹا دیں۔",
        "نائٹروجن زیادہ نہ ڈالیں۔",
      ],
      chemicalSolution: [
        "چاول کی Sheath Blight کے لیے لیبل شدہ Validamycin، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "چاول کی Sheath Blight کے لیے لیبل شدہ Hexaconazole، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "پودوں کے درمیان ہوا کے گزرنے کے لیے جگہ رکھیں۔",
        "نائٹروجن ایک ساتھ نہیں بلکہ قسطوں میں ڈالیں۔",
        "اضافی پانی نکال دیں۔",
        "فصلیں بدل بدل کر لگائیں۔",
      ],
    },
    roman: {
      cause: "Ye mitti aur pani se phailne wali fungus hai jo ghani, nam fasal aur zyada nitrogen mein khoob barhti hai. Ye pani aur rabte se ek poday se doosre poday tak phailti hai.",
      symptoms: [
        "Pani ki satah ke paas patton ki miyan par gehre bhure kinaron wale bezwi surmayi sabz dhabbe",
        "Dhabbe mil kar poday ke upar charh jate hain",
        "Miyan par safed fungus ki barhotri",
        "Mutasira miyan par chhoti gehri bhuri gendein (sclerotia)",
      ],
      organicSolution: [
        "Podon ke darmiyan fasla barhayein taake hawa guzar sake.",
        "Khet se izafi pani nikal dein.",
        "Katai ke baad mutasira bhusa hata dein.",
        "Nitrogen zyada na dalein.",
      ],
      chemicalSolution: [
        "Chawal ki Sheath Blight ke liye label shuda Validamycin, sirf label par likhi miqdar ke mutabiq.",
        "Chawal ki Sheath Blight ke liye label shuda Hexaconazole, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Podon ke darmiyan hawa ke guzarne ke liye jagah rakhein.",
        "Nitrogen ek saath nahi balkay qiston mein dalein.",
        "Izafi pani nikal dein.",
        "Faslein badal badal kar lagayein.",
      ],
    },
  },
  "kb-cotton-curl-virus": {
    ur: {
      cause: "یہ وائرس سفید مکھی سے ایک پودے سے دوسرے پودے تک پہنچتا ہے۔ کیڑا متاثرہ پودے کا رس چوستا ہے، پھر صحت مند پودے پر کھانا کھاتے وقت وائرس پھیلا دیتا ہے۔ یہ بیج سے نہیں پھیلتا۔",
      symptoms: [
        "پتے اوپر کی طرف مڑ جاتے ہیں اور رگیں موٹی ہو جاتی ہیں",
        "پتوں کی نچلی سطح پر پتے جیسی بڑھوتریاں (اینیشنز)",
        "پودے چھوٹے رہ جاتے ہیں",
        "ٹینڈے کم اور چھوٹے بنتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پودے اکھاڑ کر تلف کر دیں تاکہ وائرس نہ پھیلے۔",
        "پیلے چپکنے والے جال سے سفید مکھی کنٹرول کریں۔",
        "کھیت کے آس پاس جڑی بوٹیاں ہٹا دیں۔",
        "ہلکے حملے میں نیم کا تیل استعمال کریں۔",
      ],
      chemicalSolution: [
        "وائرس کا کوئی کیمیائی علاج نہیں۔",
        "سفید مکھی کے لیے لیبل شدہ Imidacloprid یا Acetamiprid اس کیڑے کو کنٹرول کرتی ہے جو وائرس پھیلاتا ہے، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "جہاں دستیاب ہو مدافعت رکھنے والی اقسام لگائیں۔",
        "صاف اور مصدقہ بیج استعمال کریں۔",
        "کپاس کو ٹماٹر یا سفید مکھی کے دیگر میزبان پودوں کے پاس نہ لگائیں۔",
        "موسم کے شروع میں سفید مکھی کنٹرول کریں۔",
      ],
    },
    roman: {
      cause: "Ye virus safed makhi se ek poday se doosre poday tak pahunchta hai. Keera mutasira poday ka ras choosta hai, phir sehat mand poday par khana khate waqt virus phaila deta hai. Ye beej se nahi phailta.",
      symptoms: [
        "Patte upar ki taraf mur jate hain aur ragein moti ho jati hain",
        "Patton ki nichli satah par patte jaisi barhotriyan (enations)",
        "Poday chhote reh jate hain",
        "Tinday kam aur chhote bante hain",
      ],
      organicSolution: [
        "Mutasira poday ukhaar kar talaf kar dein taake virus na phaile.",
        "Peele chipakne wale jaal se safed makhi control karein.",
        "Khet ke aas paas jari bootiyan hata dein.",
        "Halke hamle mein neem ka tail istemal karein.",
      ],
      chemicalSolution: [
        "Virus ka koi chemical ilaaj nahi.",
        "Safed makhi ke liye label shuda Imidacloprid ya Acetamiprid us keere ko control karti hai jo virus phailata hai, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Jahan dastiyab ho mudafiat rakhne wali aqsaam lagayein.",
        "Saaf aur musaddaqa beej istemal karein.",
        "Kapas ko tamatar ya safed makhi ke deegar mezban podon ke paas na lagayein.",
        "Mausam ke shuru mein safed makhi control karein.",
      ],
    },
  },
  "kb-cotton-fusarium-wilt": {
    ur: {
      cause: "یہ مٹی سے پھیلنے والی فنگس ہے جو مٹی میں سالوں تک زندہ رہتی ہے۔ یہ جڑوں سے داخل ہو کر پانی کی نالیاں بند کر دیتی ہے، اس لیے پودا مٹی میں پانی ہوتے ہوئے بھی مرجھا جاتا ہے۔",
      symptoms: [
        "پتے پیلے پڑ کر مرجھا جاتے ہیں، اکثر پہلے پودے کے ایک طرف",
        "پودے چھوٹے رہ جاتے ہیں",
        "تنے کے اندر بھوری رنگت",
        "شدید حملے میں ننھے پودے مرجھا کر مر جاتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پودے اکھاڑ کر تلف کر دیں۔",
        "کپاس کے علاوہ دیگر فصلیں بدل بدل کر لگائیں۔",
        "پانی کی نکاسی بہتر کریں۔",
        "متاثرہ کھیت کی مٹی دوسرے کھیت میں نہ لے جائیں۔",
      ],
      chemicalSolution: [
        "بوائی سے پہلے بیج کے علاج کے طور پر Carbendazim یا Thiophanate-methyl، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "پودے متاثر ہونے کے بعد کوئی علاج نہیں — مقامی زرعی افسر سے تصدیق کریں۔",
      ],
      prevention: [
        "مدافعت رکھنے والی اقسام لگائیں — یہی سب سے اہم دفاع ہے۔",
        "فصلیں بدلیں اور ہر سال ایک ہی کھیت میں کپاس نہ لگائیں۔",
        "صاف اور مصدقہ بیج استعمال کریں۔",
        "جڑ کی گرہ والے نیماٹوڈ کنٹرول کریں، جو ولٹ کو بڑھاتے ہیں۔",
      ],
    },
    roman: {
      cause: "Ye mitti se phailne wali fungus hai jo mitti mein saalon tak zinda rehti hai. Ye jadon se dakhil ho kar pani ki naliyan band kar deti hai, is liye poda mitti mein pani hote hue bhi murjha jata hai.",
      symptoms: [
        "Patte peele par kar murjha jate hain, aksar pehle poday ke ek taraf",
        "Poday chhote reh jate hain",
        "Tane ke andar bhuri rangat",
        "Shadeed hamle mein nanhe poday murjha kar mar jate hain",
      ],
      organicSolution: [
        "Mutasira poday ukhaar kar talaf kar dein.",
        "Kapas ke ilawa deegar faslein badal badal kar lagayein.",
        "Pani ki nikasi behtar karein.",
        "Mutasira khet ki mitti doosre khet mein na le jayein.",
      ],
      chemicalSolution: [
        "Bawai se pehle beej ke ilaaj ke tor par Carbendazim ya Thiophanate-methyl, sirf label par likhi miqdar ke mutabiq.",
        "Poday mutasir hone ke baad koi ilaaj nahi — maqami zarae afsar se tasdeeq karein.",
      ],
      prevention: [
        "Mudafiat rakhne wali aqsaam lagayein — yehi sab se ahem difa hai.",
        "Faslein badlein aur har saal ek hi khet mein kapas na lagayein.",
        "Saaf aur musaddaqa beej istemal karein.",
        "Jar ki girah wale nematode control karein, jo wilt ko barhate hain.",
      ],
    },
  },
  "kb-cotton-alternaria-leaf-spot": {
    ur: {
      cause: "یہ فنگس متاثرہ کپاس کے ملبے اور بیج پر زندہ رہتی ہے۔ یہ گرم اور نم موسم میں ہوا اور بارش کے چھینٹوں سے پھیلتی ہے، اور پتوں، بریکٹس اور ٹینڈوں پر حملہ کرتی ہے۔",
      symptoms: [
        "پتوں پر گہرے بھورے دھبے جن میں گول حلقے بنے ہوتے ہیں",
        "دھبے بڑھ کر مل جاتے ہیں، پتے پیلے پڑ کر جلدی گر جاتے ہیں",
        "ٹینڈوں پر چھوٹے سرخی مائل بھورے دھنسے ہوئے دھبے",
        "ننھے پودوں کے بیج پتیوں اور پہلے پتوں پر چھوٹے سرخ دھبے",
      ],
      organicSolution: [
        "متاثرہ پتے اور پودوں کا ملبہ کٹائی کے بعد جلا کر تلف کر دیں۔",
        "بوائی سے پہلے بیج کا Pseudomonas fluorescens یا Trichoderma سے علاج کریں۔",
        "نائٹروجن زیادہ نہ ڈالیں۔",
        "فصلیں بدل بدل کر لگائیں اور ہر سال ایک ہی کھیت میں کپاس نہ لگائیں۔",
      ],
      chemicalSolution: [
        "کپاس کی Alternaria Leaf Spot کے لیے لیبل شدہ Mancozeb یا Copper oxychloride، صرف لیبل پر لکھی مقدار کے مطابق۔",
        "کپاس کی Alternaria Leaf Spot کے لیے لیبل شدہ Propiconazole، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "صاف اور بیماری سے پاک بیج استعمال کریں۔",
        "کٹائی کے بعد متاثرہ پودوں کا ملبہ جلا کر تلف کر دیں۔",
        "فصلیں بدل بدل کر لگائیں۔",
        "نائٹروجن زیادہ نہ ڈالیں اور پانی کی نکاسی بہتر کریں۔",
      ],
    },
    roman: {
      cause: "Ye fungus mutasira kapas ke malbe aur beej par zinda rehti hai. Ye garam aur nam mausam mein hawa aur barish ke chheenton se phailti hai, aur patton, bracts aur tindon par hamla karti hai.",
      symptoms: [
        "Patton par gehre bhure dhabbe jin mein gol halqe bane hote hain",
        "Dhabbe barh kar mil jate hain, patte peele par kar jaldi gir jate hain",
        "Tindon par chhote surkhi mail bhure dhanse hue dhabbe",
        "Nanhe podon ke beej pattiyon aur pehle patton par chhote surkh dhabbe",
      ],
      organicSolution: [
        "Mutasira patte aur podon ka malba katai ke baad jala kar talaf kar dein.",
        "Bawai se pehle beej ka Pseudomonas fluorescens ya Trichoderma se ilaaj karein.",
        "Nitrogen zyada na dalein.",
        "Faslein badal badal kar lagayein aur har saal ek hi khet mein kapas na lagayein.",
      ],
      chemicalSolution: [
        "Kapas ki Alternaria Leaf Spot ke liye label shuda Mancozeb ya Copper oxychloride, sirf label par likhi miqdar ke mutabiq.",
        "Kapas ki Alternaria Leaf Spot ke liye label shuda Propiconazole, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Saaf aur bimari se pak beej istemal karein.",
        "Katai ke baad mutasira podon ka malba jala kar talaf kar dein.",
        "Faslein badal badal kar lagayein.",
        "Nitrogen zyada na dalein aur pani ki nikasi behtar karein.",
      ],
    },
  },
  "kb-cotton-verticillium-wilt": {
    ur: {
      cause: "یہ مٹی سے پھیلنے والی فنگس ہے جو مٹی میں چھوٹی سیاہ آرام کرنے والی ساختوں (مائیکرو اسکلیروشیا) کی صورت میں سالوں تک زندہ رہتی ہے۔ یہ جڑوں سے داخل ہو کر پانی کی نالیاں بند کر دیتی ہے۔ یہ ٹھنڈے، گیلے موسم اور بھاری مٹی میں خوب بڑھتی ہے، اور متاثرہ مٹی اور جن کے کچرے سے پھیلتی ہے۔",
      symptoms: [
        "رگوں کے درمیان پیلا پن جبکہ رگیں سبز رہتی ہیں — شیر کی دھاری جیسا نمونہ",
        "پتے کناروں سے اندر کی طرف خشک ہو کر جلدی گر جاتے ہیں",
        "تنے کے اندر بھوری رنگت",
        "پودے چھوٹے رہ جاتے ہیں، پھول آنے کے بعد مرجھا جاتے ہیں اور ننھے ٹینڈے گرا دیتے ہیں",
      ],
      organicSolution: [
        "متاثرہ پودے اکھاڑ کر تلف کر دیں۔",
        "اناج جیسی غیر میزبان فصلوں سے فصلیں بدل بدل کر لگائیں۔",
        "گہرا ہل چلائیں اور کٹائی کے بعد متاثرہ پودوں کا ملبہ تلف کر دیں۔",
        "بوائی سے پہلے بیج کا Trichoderma سے علاج کریں۔",
      ],
      chemicalSolution: [
        "پودے متاثر ہونے کے بعد کوئی کیمیائی علاج نہیں، اور کوئی فنجیسائیڈ اس بیماری کو کنٹرول نہیں کرتی۔",
        "بوائی سے پہلے بیج کے علاج کے طور پر Trichoderma viride اگلی فصل میں شدت کم کر سکتی ہے، صرف لیبل پر لکھی مقدار کے مطابق۔",
      ],
      prevention: [
        "مدافعت رکھنے والی اقسام لگائیں — یہی سب سے اہم دفاع ہے۔",
        "اناج جیسی غیر میزبان فصلوں سے فصلیں بدلیں اور ہر سال ایک ہی کھیت میں کپاس نہ لگائیں۔",
        "صاف اور مصدقہ بیج استعمال کریں۔",
        "نائٹروجن اور آبپاشی زیادہ نہ کریں۔",
      ],
    },
    roman: {
      cause: "Ye mitti se phailne wali fungus hai jo mitti mein chhoti siyah aaram karne wali sakhton (microsclerotia) ki surat mein saalon tak zinda rehti hai. Ye jadon se dakhil ho kar pani ki naliyan band kar deti hai. Ye thande, geele mausam aur bhari mitti mein khoob barhti hai, aur mutasira mitti aur gin ke kachre se phailti hai.",
      symptoms: [
        "Ragon ke darmiyan peela pan jabke ragein sabz rehti hain — sher ki dhari jaisa namuna",
        "Patte kinaron se andar ki taraf khushk ho kar jaldi gir jate hain",
        "Tane ke andar bhuri rangat",
        "Poday chhote reh jate hain, phool aane ke baad murjha jate hain aur nanhe tinday gira dete hain",
      ],
      organicSolution: [
        "Mutasira poday ukhaar kar talaf kar dein.",
        "Anaaj jaisi ghair mezban faslon se faslein badal badal kar lagayein.",
        "Gehra hal chalayein aur katai ke baad mutasira podon ka malba talaf kar dein.",
        "Bawai se pehle beej ka Trichoderma se ilaaj karein.",
      ],
      chemicalSolution: [
        "Poday mutasir hone ke baad koi chemical ilaaj nahi, aur koi fungicide is bimari ko control nahi karti.",
        "Bawai se pehle beej ke ilaaj ke tor par Trichoderma viride agli fasal mein shiddat kam kar sakti hai, sirf label par likhi miqdar ke mutabiq.",
      ],
      prevention: [
        "Mudafiat rakhne wali aqsaam lagayein — yehi sab se ahem difa hai.",
        "Anaaj jaisi ghair mezban faslon se faslein badlein aur har saal ek hi khet mein kapas na lagayein.",
        "Saaf aur musaddaqa beej istemal karein.",
        "Nitrogen aur aabpashi zyada na karein.",
      ],
    },
  },
};
