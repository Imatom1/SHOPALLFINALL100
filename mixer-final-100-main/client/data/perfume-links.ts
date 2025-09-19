// Perfume purchase links configuration
// This file makes it easy to update purchase links for each perfume

export interface PerfumeLink {
  perfumeId: string;
  buyUrl: string;
}

// Default placeholder link for perfumes without specific URLs
export const DEFAULT_BUY_URL = "https://golden-aroma.square.site/s/shop";

// Perfume-specific purchase links
export const perfumeLinks: PerfumeLink[] = [
  // Unisex/Designer Inspired Perfumes
  {
    perfumeId: "baccarat-rouge-540",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-baccarat-rouge-540-rouge-elixir/RCKA7CI3TLPLSXSILAADUSMR?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "black-afgano",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-afgano-black-spirit/PLC6GSJXX2PWVA27JDOUS7LK?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "ombre-nomade",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-ombre-nomade-dark-nomad/EQCXYSYU5WVQWRCNLXTZQXWR?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "interlude", buyUrl: "https://golden-aroma.square.site/product/inspired-by-interlude-eternal-interlude/SFVRVBE6DZW7YVSGGRFVDS4Z?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "oud-ispahan", buyUrl: "https://golden-aroma.square.site/product/inspired-by-oud-ispahan-oud-essence/Z7UKPIGJXCPV35SNQ7GXMLQ7?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "oud-wood", buyUrl: "https://golden-aroma.square.site/product/inspired-by-oud-wood-oud-majesty/O6FT6IIRXWWFHH23ELQRPZGA?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "rose-vanille",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-rose-vanille-rose-vanilla/T6JVCELFAGDSDFHIQRGPCAJU?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "red-tobacco", buyUrl: "https://golden-aroma.square.site/product/inspired-by-red-tobacco-red-tobacco-flame/W6RHZX74QVQTWZQI4ELTNJ5Y?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "imagination-lv",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-louis-vuitton-imagination-fantasy/PVU3UFYA4KV5AXW7IQGD4F74?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "accento", buyUrl: "https://golden-aroma.square.site/product/inspired-by-accento-golden-accento/4TSIZOIA7J5N2UWVPCO4HX5M?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "imperial-valley",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-imperial-valley-imperial-valley/JMXNVQIYGR25FAWBIDFEKSRU?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "alf-lele-w-lele",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-alf-lele-w-lele-thousand-nights/CRVWHSLI67R6QR226SAXPQJG?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "al-fares", buyUrl: "https://golden-aroma.square.site/product/inspired-by-al-fares-noble-knight/WSPOC64GFP7ESSBSRBU2MJ2N?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "i-am-white", buyUrl: "https://golden-aroma.square.site/product/inspired-by-i-am-white-pure-white/YRCO2K7GH7222OHZORA6NMXO?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "ana-walshok", buyUrl: "https://golden-aroma.square.site/product/inspired-by-ana-wal-shok-longing/K2TAHWQAFZBML3J2Z5IW75D2?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "sweet-oud", buyUrl: "https://golden-aroma.square.site/product/inspired-by-sweet-oud-sweet-oud/R3DHRKKQ6LS7YYVGGTJNCNHV?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "shams-al-emarat",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-shams-al-emarat-desert-sun/WDS5EDTP4H4N6WRBG2D3HJ7N?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "shay-oud", buyUrl: "https://golden-aroma.square.site/product/inspired-by-shay-oud-shay-oud/FIVBLXKPXEPOUCOLNFCOXTEN?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "amber-rasasi",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-amber-amber-glow/R3V7WGPEUKUJCPYMMJ3OL6IH?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "white-oud-sea",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-white-oud-white-oud/MR3AMUW5GICZ4GGTF6LN5AOF?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "dahen-al-oud",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-dahen-al-oud-oud-essence/KQ4ZC4VN4X6HYN4WPREUTT5C?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "gucci-oud", buyUrl: "https://golden-aroma.square.site/product/inspired-by-gucci-oud-oud-prestige/SI4FCMGHGZTZ4C754EV7MLYJ?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "royal-oud-chopard",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-royal-oud-oud-royale/3XQHKVMDW7FLFVWKAXTLMNPS?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "kalemat", buyUrl: "https://golden-aroma.square.site/product/inspired-by-kalemat-essence/Q5U7VEHLJN4JK6NTGDAXQ3YT?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "zanbak", buyUrl: "https://golden-aroma.square.site/product/inspired-by-zanbak-white-lily/VC542NJCC2UE6Z7AOMNAHJJ7?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "sultan-al-outor",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-sultan-al-outor-sultan-s-aura/VZCHHERJERQEFXGFH65FU2BM?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "white-musk-arabian",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-white-musk-pure-musk/4AIYAKHPRHP4TATYBRP7IOJD?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "black-musk", buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-musk-noir-musk/EJLDIHTOBBDIXLSJ7G3TDYLQ?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "musk-al-harameen",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-musk-al-harameen-sacred-musk/PVNZNQ7KV7GHBLMV2H6NWDUR?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "musk-pomegranate",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-musk-pomegranate-ruby-musk/O6MFYNXSGN6VBWXCZWFFZ64W?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "musk-al-tahara",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-musk-al-tahara-tahara-musk/TBEVHYKMIEBREIS7XHT7AHWT?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "strawberry-musk",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-strawberry-musk-sweet-strawberry-musk/YEWOPTURWPT2RRD6FVMDA6IB?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "madawe-gold", buyUrl: "https://golden-aroma.square.site/product/inspired-by-madawe-gold-golden-madawe/HPXXWRWKLMLQ44LXOP2DWILP?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "molecule-020",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-molecule-020-molecular-essence/SOBTBOW727KE37PLGDLP7PLV?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "meydan-dubai",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-meydan-dubai-spirit-of-dubai/XWY5VQTER5YT55FTQ372QRDN?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "la-luna", buyUrl: "https://golden-aroma.square.site/product/inspired-by-la-luna-luna-mystery/GUVSQ6H5HLZGWKZHSDXCZBUB?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "magic-al-jazeera",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-magic-al-jazeera-island-magic/PCEY3RRNSRFRXE7SK7HIPF3T?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  { perfumeId: "wared-jore", buyUrl: "https://golden-aroma.square.site/product/inspired-by-wared-jori-rose-garden/6EC53W6HREOW5DZU4LYJ4Z2U?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "wisal", buyUrl: "https://golden-aroma.square.site/product/inspired-by-wisal-ajmal-wisal-elegance/ZRXC7V2GEJ7WACGFFNVU2XCP?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "yasmin", buyUrl: "https://golden-aroma.square.site/product/inspired-by-yasmin-jasmine-petals/4D3MMWYAHIDAGUN4GNLQRH7S?cp=true&sa=true&sbp=false&q=false" },
  { perfumeId: "khamrah", buyUrl: "https://golden-aroma.square.site/product/inspired-by-khamrah-lattafa-khamrah-delight/ESARNZ3OTQ6KAJGKQGSVWGNV?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  { perfumeId: "oud-bouquet", buyUrl: "https://golden-aroma.square.site/product/inspired-by-oud-bouquet-oud-bouquet/7XZM5432NG3YUXK2P3F7UGAE?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N" },
  {
    perfumeId: "silver-ghubar",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-ghubar-al-fidda-silver-mist/NZT4NNLWO4ACT4WG6W5I36Q7?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N",
  },
  {
    perfumeId: "wared-al-fel",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-wared-al-fel-fel-rose/6CCNRXS5BNM2YQGT5GWDVFFS?cp=true&sa=false&sbp=false&q=false&category_id=2GCWNDMHNSKSAA2K76ASX36N    ",
  },

  // Men's Perfumes
  { perfumeId: "eternity-ck", buyUrl: "https://golden-aroma.square.site/product/inspired-by-eternity-timeless-essence/V4PAS4QG4Y5VJ4GBAVJ3XIGU?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "chrome-extreme",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-chrome-extreme-ocean-intensity/BDWNHIS63LLED6ADCSIGXSL7?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "aventus-absolu",
    buyUrl: "http://golden-aroma.square.site/product/inspired-by-aventus-absolu-royal-absolu/YJUM6YHBAL636YNCYHSGR6KL?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "acqua-di-gio",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-acqua-di-gio-aqua-legacy/O4BSYAGGXSHVVGUQO6YIRVNO?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "ultra-male", buyUrl: "https://golden-aroma.square.site/product/inspired-by-ultra-male-midnight-rebel/IKJZCQOQ735S6C3JCBK5FL3Y?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "invictus", buyUrl: "https://golden-aroma.square.site/product/inspired-by-invictus-victor-s-spirit/VGFRL5EK2MS6L3MQJHMVKBBJ?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "invictus-victory-elixir",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-invictus-victory-elixir-eternal-triumph/UT2X47CW3MTRBSU5AXDMY3BG?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "eros-versace",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-versace-eros-flame-of-eros/Y4UHMI26KSKBYBVIPPXR5VO5?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "black-xs", buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-xs-dark-pulse/QBY23ML3JTSNQ3OOTO5ZPOXU?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "black-xs-lexces",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-xs-l-exces-noir-excess/U635HIZFN3CF2BW36ZHMAS6N?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "bleu-de-chanel",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-bleu-de-chanel-blue-prestige/Y64FALUIRQXQUIENGWGF3NJF?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "pi-givenchy", buyUrl: "http://golden-aroma.square.site/product/inspired-by-pi-givenchy-infinite-pi/4WGYV7F6XP5UHN6FESIS752C?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "pegasus", buyUrl: "https://golden-aroma.square.site/product/inspired-by-pegasus-silver-stallion/5WYUJ3GEY2WLHRH2Y5EZGEBM?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "dunhill-desire",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-dunhill-desire-crimson-desire/JQFNDDZDISK7UWPACWREASQY?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "desire-blue", buyUrl: "https://golden-aroma.square.site/product/inspired-by-desire-blue-desire-sky/IGROB252NRRWB6NNYT7SSVFS?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "dior-homme-intense",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-dior-homme-intense-intense-longing/X7NM4CCLEUZ2NY3WZ3VRDULU?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "the-scent-elixir",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-the-scent-elixir-power-elixir/3ZSTAVJKO2XCSZSQX2EAL6ZJ?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "the-most-wanted",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-the-most-wanted-the-icon/X2JMFXW2BO3K3VTCUX7KSYUE?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "the-one-dg", buyUrl: "https://golden-aroma.square.site/product/inspired-by-dolce-gabbana-the-one-the-one-legend/WKCEO6TBYH4HF5ACF6YMG7L7?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "this-is-him-undressed",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-this-is-him-undressed-absolute-allure/TQQGG5RTT5DCLQERQ7LUUMLE?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "stronger-with-you",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-stronger-with-you-stronger/4CM6VGUTDQIBBRVGXQK6F652?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "stronger-with-you-tobacco",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-stronger-with-you-tobacco-tobacco-flame/6A6QCDCKCPFHMHHYIR3GCS47?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "sculpture", buyUrl: "https://golden-aroma.square.site/product/inspired-by-sculpture-marble-of-light/GI276LAFLTGU4JXTI2SKRJM4?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "silver-scent",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-silver-scent-silver-aura/GDMN5V4ELA3W3QGKNAEJZVS3?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "sauvage", buyUrl: "https://golden-aroma.square.site/product/inspired-by-dior-sauvage-wild-essence/GI35DEKWL7UPUCDUVDDOQLSF?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "sauvage-elixir",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-sauvage-elixir-savage-elixir/VJ74KGVOVDG4MEOA7ZN6IZFA?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "creed-silver-mountain",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-creed-silver-mountain-mountain-mist/JETFZGQ6GUILHFFFGNZ3P2MC?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "gucci-guilty-absolute",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-gucci-guilty-absolute-absolute-g/TBNXR5CJVCEDZLN475R35OBL?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "fahrenheit", buyUrl: "https://golden-aroma.square.site/product/inspired-by-fahrenheit-phoenix-blaze/KJPKTEGDRBE5LMLKMV3JWXWY?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "aventus", buyUrl: "https://golden-aroma.square.site/product/inspired-by-creed-aventus-noble-aventus/EKEVCCKQD2LBGAWMNLA3Z6XU?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "cool-water", buyUrl: "https://golden-aroma.square.site/product/inspired-by-cool-water-cool-horizon/7PPGOEQVSKBXYO4WWRUUSQ2H?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "lacoste-white",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-lacoste-white-l-12-12-white-spirit/LKVZVQQ7B7DZT44S4TB22TUD?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "le-male", buyUrl: "https://golden-aroma.square.site/product/inspired-by-le-male-le-masculine/6IJEFR4ZX5HM2GVKMAL23DLN?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "mr-thompson", buyUrl: "https://golden-aroma.square.site/product/inspired-by-mr-thompson-gentleman-s-legacy/TJGK4R32UCQUXYJQE6VRCAFB?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "legend-montblanc",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-montblanc-legend-legendaria/GDMQROX42ME4H4N7XHXEASB3?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  { perfumeId: "horizon", buyUrl: "https://golden-aroma.square.site/product/inspired-by-horizon-horizon-majesty/CXWTRWYOPLDVYTXRI46OHDRG?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "hugo-boss", buyUrl: "https://golden-aroma.square.site/product/inspired-by-hugo-boss-boss-essence/SUFIXKYXTCWWKIMB2KWCWAWB?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  { perfumeId: "one-million", buyUrl: "https://golden-aroma.square.site/product/inspired-by-one-million-millionaire/2IAMZ2SAUYFIBLB4ZGE5RCEI?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X" },
  {
    perfumeId: "one-million-extra",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-one-million-elixir-million-elixir/PIOUYQLKX4MK7D25VGJ2GWFS?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "one-million-gold-oud",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-one-million-gold-oud-golden-oud-million/NIO7KF3AN4LDBNDXGISI4EXK?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "one-million-lucky",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-one-million-lucky-million-lucky/EAYDET3LYKWJMQSQHBQPM36O?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },
  {
    perfumeId: "voyage-nautica",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-nautica-voyage-ocean-voyage/4QEBANC7BHWJOWLW5373JO3T?cp=true&sa=false&sbp=false&q=false&category_id=FUZUO42ZJVS4T5CR7UQPRF4X",
  },

  // Women's Perfumes
  {
    perfumeId: "armani-code-women",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-armani-code-secret-code/GXJ77YAE2YBVBO7HEBAXA2JD?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "taj-sunset", buyUrl: "http://golden-aroma.square.site/product/inspired-by-taj-sunset-sunset-glow/GEZFMDNYJJS6UT6EEJ7F3JGP?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "sexy-graffiti",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-sexy-graffiti-urban-muse/CDTM65IQZ5GADAR7UVMLT42V?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "moon-sparkle",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-moon-sparkle-moonlight-spark/3CZSQZHVD2NI3ZZ4APR5CQG6?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "oriana", buyUrl: "https://golden-aroma.square.site/product/inspired-by-oriana-dream/VIQNFSG3G757QOLV2MNARCHA?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "euphoria-ck", buyUrl: "https://golden-aroma.square.site/product/inspired-by-euphoria-euphoria-bloom/XH2ZJTYA7R422EKZTE5H6IBN?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "elie-saab", buyUrl: "https://golden-aroma.square.site/product/inspired-by-elie-saab-grace/2OD6NC7EFCSGZTBX62K3WX5H?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "alien-oud-majestueux",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-alien-oud-majestueux-majestic-alien/LH4GC2ZSLTOATZ3ITTVGTF4K?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "paris-hilton",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-bright-crystal-crystal-radiance/FKJGQZJJMV6EPEVSXB4FL3PH?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "bright-crystal",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-bright-crystal-crystal-radiance/FKJGQZJJMV6EPEVSXB4FL3PH?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "burberry-women",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-burberry-heritage-muse/XJIHWWMREYI5CKICR37CTMUC?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "black-opium", buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-opium-midnight-opium/4HP6G5R7FO2WSUQ5WSDRWFHS?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "black-orchid",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-orchid-orchid-noir/UENZ677JTGJ4ZLCDES6YJNQQ?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "black-opium-over-red",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-black-opium-over-red-scarlet-opium/4IAX2EB6CGJEWHLOR6WNXKDN?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "bombshell", buyUrl: "https://golden-aroma.square.site/product/inspired-by-bombshell-bombshell-glow/2EGR3TY3CHXZTWNXNM3JD3LK?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "baby-johnson",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-baby-johnson-baby-whisper/WAIO6MIWBVKXF7G6HRQWYG2F?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "jadore", buyUrl: "https://golden-aroma.square.site/product/inspired-by-j-adore-golden-bloom/SZ4PJWSMAXUDFCGIGHUHFGWE?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "delina", buyUrl: "https://golden-aroma.square.site/product/inspired-by-delina-rose-delight/6WNJMGQ2CWQOTSOEKLLPHXRV?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "ralph-lauren-women",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-ralph-lauren-polo-elegance/6OIIC5PZWBH2L3DQJDIUOJRV?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "rose-des-vents",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-rose-des-vents-rose-of-winds/7NGSFPMCJIX7FFTQ4RK5PKCP?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "romance-intense",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-romance-intense-romance-flame/OKOUE5SRL3NMA6XMOEIEAORQ?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "212-sexy", buyUrl: "https://golden-aroma.square.site/product/inspired-by-212-sexy-212-desire/YKI4YFZOECCMG6SBLYFEBKVR?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "si-armani", buyUrl: "https://golden-aroma.square.site/product/inspired-by-armani-s-silicon-beauty/H7D2C6UJLJGUXQKE3BELGXVJ?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "chanel-no5", buyUrl: "https://golden-aroma.square.site/product/inspired-by-chanel-no-5-eternal-5/IPBEUG64JILYHILBBIDDRZLC?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "chanel-chance",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-chanel-chance-chance-charm/GIKDRQ26NSZNFCKJXQZUWB7H?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "gucci-bloom", buyUrl: "https://golden-aroma.square.site/product/inspired-by-gucci-bloom-blooming-essence/OMTEW7O4GUAW3QZTBCNKOAS7?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "gucci-rush", buyUrl: "https://golden-aroma.square.site/product/inspired-by-gucci-rush-rush-desire/RUZ7GKVNBNCFEP6G76FNV67D?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "victorias-secret",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-victoria-s-secret-secret-muse/WUSPSTWQZPXNVWB5WIO6PIJ6?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "flora-gorgeous-jasmine",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-flora-gorgeous-jasmine-flora-jasmine/UYW3RV6EUBHNVX6SCHVMQLVT?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "flora-gucci", buyUrl: "https://golden-aroma.square.site/product/inspired-by-flora-gucci-flora-classic/DOGBNDIVC5EVXCWQR63OCENL?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "fantasy", buyUrl: "https://golden-aroma.square.site/product/inspired-by-fantasy-fantasy-dream/OTV7MO6E55TSXHUHE43GZ3QM?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "vip-carolina",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-vip-vip-allure/QXWYOIETIJZ2UQELTXGY7SOL?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "coco-mademoiselle",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-coco-mademoiselle-coco-mademoiselle/7U6U54ZZCT553ONOUWGC3M45?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "queen-of-silk",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-queen-of-silk-empress/UTGINEU3CSTVC7YM4MOB6L5V?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "la-vie-est-belle",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-la-vie-est-belle-life-is-beautiful/CQ2ETTU7OIEV7KLFPOLSTQZ5?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "love-is-heavenly",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-love-is-heavenly-heavenly-love/ICAO3FGI3Q42ZAHDUNGFAZW2?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "libre", buyUrl: "https://golden-aroma.square.site/product/inspired-by-libre-libre-spirit/PWZ3AFDTBOGQ2KGQ6BHT3ZW2?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  { perfumeId: "my-way", buyUrl: "https://golden-aroma.square.site/product/inspired-by-my-way-one-way/UA6TVW7NPDDBOJWZHH45JVSL?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
  {
    perfumeId: "midnight-fantasy",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-midnight-fantasy-dark-desire/RUCFWO2YW4IY5ESJADYHFZLE?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "narciso-rodriguez-black",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-narciso-black-noir-narcotic/YKOBLBFRIZVRYTZXUMRQI3BX?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "narciso-rodriguez-pink",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-narciso-pink-pink-narcotic/PKPZB6HXIACAY6TFFJ67S7KF?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  {
    perfumeId: "scandal-absolu",
    buyUrl: "https://golden-aroma.square.site/product/inspired-by-scandal-absolu-absolute-scandal/GIEUT6IAIFNRV6MF4KWSBZUH?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH",
  },
  { perfumeId: "212-herrera", buyUrl: "https://golden-aroma.square.site/product/inspired-by-herrera-212-212-chic/NTNURTIAOK2TVCT6EGOWROSA?cp=true&sa=false&sbp=false&q=false&category_id=S3Z2QFXX5J4UTDU6UA6QSOEH" },
];

/**
 * Get the purchase URL for a specific perfume
 * @param perfumeId - The ID of the perfume
 * @returns The purchase URL for the perfume, or default URL if not found
 */
export function getPerfumeBuyUrl(perfumeId: string): string {
  const link = perfumeLinks.find((link) => link.perfumeId === perfumeId);
  return link ? link.buyUrl : DEFAULT_BUY_URL;
}

/**
 * Set or update a perfume's purchase URL
 * @param perfumeId - The ID of the perfume
 * @param buyUrl - The purchase URL
 */
export function setPerfumeBuyUrl(perfumeId: string, buyUrl: string): void {
  const existingLinkIndex = perfumeLinks.findIndex(
    (link) => link.perfumeId === perfumeId,
  );

  if (existingLinkIndex >= 0) {
    perfumeLinks[existingLinkIndex].buyUrl = buyUrl;
  } else {
    perfumeLinks.push({ perfumeId, buyUrl });
  }
}
