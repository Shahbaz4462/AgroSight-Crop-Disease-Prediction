// Crop calendar for Pakistan — wheat, cotton, rice.
// General timing only. Sowing and harvest dates shift with region,
// variety, rainfall and irrigation, so every section repeats the
// advice to confirm with a local agriculture officer. This is static
// educational data, not a live forecast and not a model prediction.

export interface CalendarRow {
  crop: string;
  months: string;
  work: string;
  watch: string;
}

export const CROP_CALENDAR: CalendarRow[] = [
  {
    crop: "Wheat",
    months: "Oct – Nov: sowing",
    work: "Prepare a fine seedbed, sow certified seed at the recommended rate, and apply basal fertilizer as per soil test. First irrigation at crown root initiation, about 3 weeks after sowing.",
    watch: "Late sowing raises rust risk. Check emergence and thin, patchy areas early.",
  },
  {
    crop: "Wheat",
    months: "Dec – Feb: tillering to jointing",
    work: "Irrigate at tillering and jointing. Split nitrogen as recommended. Keep weeds down, especially in the first 6 weeks.",
    watch: "Yellow and brown rust appear in cool, damp weather. Inspect the flag leaf weekly.",
  },
  {
    crop: "Wheat",
    months: "Mar – Apr: heading to harvest",
    work: "Irrigate at booting and grain filling if needed, but avoid lodging from over-watering late. Harvest when grains are hard and dry.",
    watch: "Aphids on ears, and rust spreading in warm, humid spells. Act at the first stripes or pustules.",
  },
  {
    crop: "Cotton",
    months: "Apr – Jun: sowing and early growth",
    work: "Sow when soil is warm, use certified Bt or recommended seed, and thin to the recommended plant population. First irrigation about 3-4 weeks after sowing.",
    watch: "Aphids and jassids on young leaves. Inspect the underside of leaves twice a week.",
  },
  {
    crop: "Cotton",
    months: "Jul – Aug: flowering and boll formation",
    work: "Irrigate regularly through flowering — water stress at this stage loses bolls. Balance nitrogen; too much makes soft growth that pests prefer.",
    watch: "Army worm caterpillars and bollworms. Scout every 2-3 days, looking under leaves and in squares.",
  },
  {
    crop: "Cotton",
    months: "Sep – Nov: picking",
    work: "Pick clean, dry bolls in the morning. Keep picked cotton dry and clean for a better price.",
    watch: "Late-season aphids and boll rot in wet weather. Remove crop residue after the last picking.",
  },
  {
    crop: "Rice",
    months: "May – Jun: nursery and transplanting",
    work: "Raise nursery in May, transplant healthy 25-30 day seedlings in June-July at the recommended spacing. Keep the field level for even water.",
    watch: "Seedling diseases and stem borer in the nursery. Use clean, certified seed.",
  },
  {
    crop: "Rice",
    months: "Jul – Sep: tillering to flowering",
    work: "Keep water at the recommended depth, drain briefly if advised locally, and split nitrogen. Control weeds in the first 6 weeks.",
    watch: "Leaf diseases spread fast in hot, humid, wet weather. Inspect leaves weekly, especially after rain.",
  },
  {
    crop: "Rice",
    months: "Oct – Nov: grain filling to harvest",
    work: "Drain the field about 2 weeks before harvest so grains dry evenly. Harvest when most grains are straw-coloured and hard.",
    watch: "Grain discoloration and late leaf diseases. Dry harvested paddy promptly to avoid mould.",
  },
];
