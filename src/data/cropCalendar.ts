// Crop calendar for Pakistan — wheat, cotton, rice.
// General timing only. Sowing and harvest dates shift with region,
// variety, rainfall and irrigation, so every section repeats the
// advice to confirm with a local agriculture officer. This is static
// educational data, not a live forecast and not a model prediction.
//
// English is the source text. The ur and roman fields are the same
// rows in Urdu script and Roman Urdu. Crop names are shown in the
// selected language with the English name in brackets, so a farmer
// can still ask for the same crop by its English name.

export interface CalendarText {
  crop: string;
  months: string;
  work: string;
  watch: string;
}

export interface CalendarRow {
  crop: string;
  months: string;
  work: string;
  watch: string;
  ur: CalendarText;
  roman: CalendarText;
}

export const CROP_CALENDAR: CalendarRow[] = [
  {
    crop: "Wheat",
    months: "Oct – Nov: sowing",
    work: "Prepare a fine seedbed, sow certified seed at the recommended rate, and apply basal fertilizer as per soil test. First irrigation at crown root initiation, about 3 weeks after sowing.",
    watch: "Late sowing raises rust risk. Check emergence and thin, patchy areas early.",
    ur: {
      crop: "گندم",
      months: "اکتوبر – نومبر: کاشت",
      work: "اچھی طرح تیار زمین میں منظور شدہ بیج تجویز کردہ مقدار میں بوئیں، اور مٹی کے ٹیسٹ کے مطابق بنیادی کھاد دیں۔ کاشت کے تقریباً 3 ہفتے بعد کراؤن روٹ کے وقت پہلی آبپاشی کریں۔",
      watch: "دیر سے کاشت سے رسٹ کا خطرہ بڑھتا ہے۔ اگاؤ اور پتلی جگہوں کو جلد چیک کریں۔",
    },
    roman: {
      crop: "Gandum",
      months: "October – November: kasht",
      work: "Achhi tarah tayyar zameen mein manzoor shuda beej tajweez kardah miqdar mein boyein, aur mitti ke test ke mutabiq bunyadi khaad dein. Kasht ke taqreeban 3 hafte baad crown root ke waqt pehli aabpashi karein.",
      watch: "Deir se kasht se rust ka khatra barhta hai. Ugao aur patli jaghon ko jaldi check karein.",
    },
  },
  {
    crop: "Wheat",
    months: "Dec – Feb: tillering to jointing",
    work: "Irrigate at tillering and jointing. Split nitrogen as recommended. Keep weeds down, especially in the first 6 weeks.",
    watch: "Yellow and brown rust appear in cool, damp weather. Inspect the flag leaf weekly.",
    ur: {
      crop: "گندم",
      months: "دسمبر – فروری: ٹلرنگ سے جوائنٹنگ",
      work: "ٹلرنگ اور جوائنٹنگ کے وقت آبپاشی کریں۔ نائٹروجن تجویز کے مطابق قسطوں میں دیں۔ خاص طور پر پہلے 6 ہفتوں میں جڑی بوٹیاں ختم کریں۔",
      watch: "ٹھنڈے، نم موسم میں یلو اور براؤن رسٹ آتا ہے۔ ہر ہفتے فلیگ لیف چیک کریں۔",
    },
    roman: {
      crop: "Gandum",
      months: "December – February: tillering se jointing",
      work: "Tillering aur jointing ke waqt aabpashi karein. Nitrogen tajweez ke mutabiq qiston mein dein. Khaas tor par pehle 6 hafton mein jari bootiyan khatam karein.",
      watch: "Thande, num mausam mein yellow aur brown rust aata hai. Har hafte flag leaf check karein.",
    },
  },
  {
    crop: "Wheat",
    months: "Mar – Apr: heading to harvest",
    work: "Irrigate at booting and grain filling if needed, but avoid lodging from over-watering late. Harvest when grains are hard and dry.",
    watch: "Aphids on ears, and rust spreading in warm, humid spells. Act at the first stripes or pustules.",
    ur: {
      crop: "گندم",
      months: "مارچ – اپریل: ہیڈنگ سے کٹائی",
      work: "اگر ضرورت ہو تو بوٹنگ اور دانہ بھرنے کے وقت آبپاشی کریں، لیکن دیر سے زیادہ پانی سے فصل گرنے سے بچیں۔ جب دانے سخت اور خشک ہوں تو کٹائی کریں۔",
      watch: "بالیوں پر افڈ، اور گرم، مرطوب موسم میں رسٹ پھیلتا ہے۔ پہلی دھاریاں یا دانے نظر آتے ہی عمل کریں۔",
    },
    roman: {
      crop: "Gandum",
      months: "March – April: heading se katai",
      work: "Agar zaroorat ho to booting aur dana bharne ke waqt aabpashi karein, lekin deir se zyada pani se fasal girne se bachein. Jab dane sakht aur khushk hon to katai karein.",
      watch: "Baliyon par aphid, aur garam, martub mausam mein rust phailta hai. Pehli dhariyan ya dane nazar aate hi amal karein.",
    },
  },
  {
    crop: "Cotton",
    months: "Apr – Jun: sowing and early growth",
    work: "Sow when soil is warm, use certified Bt or recommended seed, and thin to the recommended plant population. First irrigation about 3-4 weeks after sowing.",
    watch: "Aphids and jassids on young leaves. Inspect the underside of leaves twice a week.",
    ur: {
      crop: "کپاس",
      months: "اپریل – جون: کاشت اور ابتدائی نشوونما",
      work: "جب مٹی گرم ہو تو کاشت کریں، منظور شدہ بی ٹی یا تجویز کردہ بیج استعمال کریں، اور تجویز کردہ پودوں کی تعداد رکھیں۔ کاشت کے تقریباً 3 سے 4 ہفتے بعد پہلی آبپاشی کریں۔",
      watch: "نوجوان پتوں پر افڈ اور جیسڈ۔ ہفتے میں دو بار پتوں کے نیچے چیک کریں۔",
    },
    roman: {
      crop: "Kapas",
      months: "April – June: kasht aur ibtidai nashonuma",
      work: "Jab mitti garam ho to kasht karein, manzoor shuda Bt ya tajweez kardah beej use karein, aur tajweez kardah podon ki tadaad rakhein. Kasht ke taqreeban 3 se 4 hafte baad pehli aabpashi karein.",
      watch: "Naujawan patton par aphid aur jassid. Hafte mein do baar patton ke neeche check karein.",
    },
  },
  {
    crop: "Cotton",
    months: "Jul – Aug: flowering and boll formation",
    work: "Irrigate regularly through flowering — water stress at this stage loses bolls. Balance nitrogen; too much makes soft growth that pests prefer.",
    watch: "Army worm caterpillars and bollworms. Scout every 2-3 days, looking under leaves and in squares.",
    ur: {
      crop: "کپاس",
      months: "جولائی – اگست: پھول اور ٹینڈا بننا",
      work: "پھول کے دوران باقاعدگی سے آبپاشی کریں — اس مرحلے میں پانی کی کمی سے ٹینڈے گر جاتے ہیں۔ نائٹروجن متوازن رکھیں؛ زیادہ نائٹروجن سے نرم نشوونما ہوتی ہے جو کیڑوں کو پسند ہے۔",
      watch: "آرمی ورم اور بول ورم۔ ہر 2 سے 3 دن میں معائنہ کریں، پتوں کے نیچے اور مربعوں میں دیکھیں۔",
    },
    roman: {
      crop: "Kapas",
      months: "July – August: phool aur tinda banna",
      work: "Phool ke dauran baqaidagi se aabpashi karein — is marhale mein pani ki kami se tinde gir jate hain. Nitrogen mutawazan rakhein; zyada nitrogen se narm nashonuma hoti hai jo keeron ko pasand hai.",
      watch: "Army worm aur bollworm. Har 2 se 3 din mein muaaina karein, patton ke neeche aur squares mein dekhein.",
    },
  },
  {
    crop: "Cotton",
    months: "Sep – Nov: picking",
    work: "Pick clean, dry bolls in the morning. Keep picked cotton dry and clean for a better price.",
    watch: "Late-season aphids and boll rot in wet weather. Remove crop residue after the last picking.",
    ur: {
      crop: "کپاس",
      months: "ستمبر – نومبر: چنائی",
      work: "صبح کے وقت صاف، خشک ٹینڈے چنیں۔ بہتر قیمت کے لیے چنی ہوئی کپاس کو خشک اور صاف رکھیں۔",
      watch: "گیلے موسم میں دیر سے افڈ اور ٹینڈا سڑنا۔ آخری چنائی کے بعد فصل کی باقیات ہٹا دیں۔",
    },
    roman: {
      crop: "Kapas",
      months: "September – November: chunai",
      work: "Subah ke waqt saaf, khushk tinde chunein. Behtar qeemat ke liye chuni hui kapas ko khushk aur saaf rakhein.",
      watch: "Geele mausam mein deir se aphid aur tinda sarna. Aakhri chunai ke baad fasal ki baqiyat hata dein.",
    },
  },
  {
    crop: "Rice",
    months: "May – Jun: nursery and transplanting",
    work: "Raise nursery in May, transplant healthy 25-30 day seedlings in June-July at the recommended spacing. Keep the field level for even water.",
    watch: "Seedling diseases and stem borer in the nursery. Use clean, certified seed.",
    ur: {
      crop: "چاول",
      months: "مئی – جون: نرسری اور منتقلی",
      work: "مئی میں نرسری لگائیں، جون جولائی میں صحت مند 25 سے 30 دن کی پنیری تجویز کردہ فاصلے پر منتقل کریں۔ برابر پانی کے لیے کھیت ہموار رکھیں۔",
      watch: "نرسری میں پنیری کی بیماریاں اور تنا بورر۔ صاف، منظور شدہ بیج استعمال کریں۔",
    },
    roman: {
      crop: "Chawal",
      months: "May – June: nursery aur muntaqili",
      work: "May mein nursery lagayein, June-July mein sehatmand 25 se 30 din ki paneeri tajweez kardah fasle par muntaqil karein. Barabar pani ke liye khet hamwar rakhein.",
      watch: "Nursery mein paneeri ki bimariyan aur tana borer. Saaf, manzoor shuda beej use karein.",
    },
  },
  {
    crop: "Rice",
    months: "Jul – Sep: tillering to flowering",
    work: "Keep water at the recommended depth, drain briefly if advised locally, and split nitrogen. Control weeds in the first 6 weeks.",
    watch: "Leaf diseases spread fast in hot, humid, wet weather. Inspect leaves weekly, especially after rain.",
    ur: {
      crop: "چاول",
      months: "جولائی – ستمبر: ٹلرنگ سے پھول",
      work: "پانی تجویز کردہ گہرائی پر رکھیں، اگر مقامی طور پر مشورہ ہو تو تھوڑی دیر نکالیں، اور نائٹروجن قسطوں میں دیں۔ پہلے 6 ہفتوں میں جڑی بوٹیاں کنٹرول کریں۔",
      watch: "گرم، مرطوب، گیلے موسم میں پتوں کی بیماریاں تیزی سے پھیلتی ہیں۔ ہر ہفتے پتے چیک کریں، خاص طور پر بارش کے بعد۔",
    },
    roman: {
      crop: "Chawal",
      months: "July – September: tillering se phool",
      work: "Pani tajweez kardah gehraai par rakhein, agar maqami tor par mashwara ho to thori deir nikaalein, aur nitrogen qiston mein dein. Pehle 6 hafton mein jari bootiyan control karein.",
      watch: "Garam, martub, geele mausam mein patton ki bimariyan tezi se phailti hain. Har hafte patte check karein, khaas tor par barish ke baad.",
    },
  },
  {
    crop: "Rice",
    months: "Oct – Nov: grain filling to harvest",
    work: "Drain the field about 2 weeks before harvest so grains dry evenly. Harvest when most grains are straw-coloured and hard.",
    watch: "Grain discoloration and late leaf diseases. Dry harvested paddy promptly to avoid mould.",
    ur: {
      crop: "چاول",
      months: "اکتوبر – نومبر: دانہ بھرنا سے کٹائی",
      work: "کٹائی سے تقریباً 2 ہفتے پہلے کھیت کا پانی نکال دیں تاکہ دانے برابر خشک ہوں۔ جب زیادہ تر دانے بھوسے کے رنگ کے اور سخت ہوں تو کٹائی کریں۔",
      watch: "دانوں کی رنگت خراب ہونا اور دیر سے پتوں کی بیماریاں۔ کٹی ہوئی دھان کو جلد خشک کریں تاکہ پھپھوندی نہ لگے۔",
    },
    roman: {
      crop: "Chawal",
      months: "October – November: dana bharna se katai",
      work: "Katai se taqreeban 2 hafte pehle khet ka pani nikaal dein taake dane barabar khushk hon. Jab zyada tar dane bhoose ke rang ke aur sakht hon to katai karein.",
      watch: "Danon ki rangat kharab hona aur deir se patton ki bimariyan. Kati hui dhaan ko jaldi khushk karein taake phaphundi na lage.",
    },
  },
];
