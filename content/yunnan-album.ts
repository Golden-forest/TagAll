import type { PhotoAlbumData } from './types'

export const yunnanAlbum: PhotoAlbumData = {
  tagline: { zh: '一次旅行手记 · 07.2026', en: 'A TRAVELOGUE · 07.2026' },
  heroTitle: {
    zh: '去了一趟云南，我好像理解了什么叫生活。',
    en: 'A week in Yunnan, and life made sense again.',
  },
  heroSubtitle: {
    zh: '五个同事，一辆 SUV，从昆明到香格里拉再到丽江。一路上遇到了大集、雷雨、经幡、菌子，还有那些选择慢下来的人。',
    en: 'Five colleagues, one SUV, from Kunming to Shangri-La to Lijiang. Along the way: wet markets, thunderstorms, prayer flags, wild mushrooms, and people who chose to slow down.',
  },
  heroPhotos: [
    {
      src: '/demo-assets/yunnan-hero-01.webp',
      alt: {
        zh: '滇池的晨光洒在湖面上，海鸥掠过波光',
        en: 'Dianchi Lake at dawn — gulls gliding over shimmering waters',
      },
    },
    {
      src: '/demo-assets/yunnan-hero-02.webp',
      alt: {
        zh: '云南古镇的青石板路，远处群山如黛',
        en: 'A Yunnan old town — stone lanes under the shadow of mountains',
      },
    },
    {
      src: '/demo-assets/yunnan-hero-03.webp',
      alt: {
        zh: '松赞林寺的金顶在高原阳光下熠熠生辉',
        en: "Songzanlin Monastery's golden roofs blazing in highland sun",
      },
    },
    {
      src: '/demo-assets/yunnan-hero-04.webp',
      alt: {
        zh: '纳帕海的辽阔草甸，云影在天际线上缓缓移动',
        en: 'Napa Sea grasslands — cloud shadows drifting across the horizon',
      },
    },
    {
      src: '/demo-assets/yunnan-hero-05.webp',
      alt: {
        zh: '虎跳峡的怒涛在峡谷中奔涌，两岸壁立千仞',
        en: 'Tiger Leaping Gorge — torrential waters between towering cliffs',
      },
    },
    {
      src: '/demo-assets/yunnan-hero-06.webp',
      alt: {
        zh: '虎跳峡峡谷深处，金沙江劈开雪山',
        en: 'Deep in Tiger Leaping Gorge — the Jinsha River carving through mountains',
      },
    },
    {
      src: '/demo-assets/yunnan-hero-07.webp',
      alt: {
        zh: '丽江玉龙雪山下，古寺屋檐与远峰相映',
        en: 'Lijiang — temple eaves framing the snow peaks of Jade Dragon Mountain',
      },
    },
    {
      src: '/demo-assets/yunnan-hero-08.webp',
      alt: {
        zh: '云南高原的山城暮色，层叠的屋顶没入群山',
        en: 'A highland town at dusk — tiered rooftops melting into the mountains',
      },
    },
  ],
  closingQuote: {
    zh: '读好书，交高人，见世面。这些世面，不是从书上看来的，不是从视频里刷来的，是亲自走了一遍云南之后，自己长在身体里的。',
    en: 'Read good books, meet great people, see the world. And some of that world only grows inside you after you have walked it yourself.',
  },
  authorName: 'hl',
  authorLocation: { zh: '云南 · 07.2026', en: 'Yunnan · 07.2026' },

  chapters: [
    // ── 序章 ────────────────────────────────────────────
    {
      id: 0,
      label: { zh: '序章', en: 'Prologue' },
      date: '2026.07.13',
      title: { zh: '从深圳出逃。', en: 'Escaping Shenzhen.' },
      body: {
        zh: '出发前其实有点犹豫。五个同事，两男三女，谁也不清楚这趟下来会不会好玩。但七月中旬的深圳实在太热了，于是我们坐上了去昆明的高铁。到了昆明高铁站附近的民宿住了一晚，第二天去神州租车提了一辆 BJ30——选它的理由很实在：后面空间大，能装下五个人的行李。',
        en: 'We almost didn\'t go. Five colleagues — would it be fun? But July in Shenzhen was unbearable, so we boarded the high-speed train to Kunming. The next morning we picked up a BJ30 SUV from the rental lot. We chose it for one reason: enough trunk space for five people\'s luggage.',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-prologue-01.webp',
          alt: { zh: '出发前暂定的攻略', en: 'The rough itinerary we sketched before leaving' },
          caption: { zh: '出发前的攻略', en: 'The rough plan' },
          time: '出发前',
          location: { zh: '深圳', en: 'Shenzhen' },
        },
        {
          src: '/demo-assets/yunnan-prologue-02.webp',
          alt: { zh: '高速服务区休息', en: 'Rest stop on the highway' },
          caption: { zh: '服务区，歇一脚', en: 'Highway rest stop' },
          location: { zh: '昆明近郊', en: 'Outside Kunming' },
        },
        {
          src: '/demo-assets/yunnan-prologue-03.webp',
          alt: { zh: '自驾路上的云和山', en: 'Clouds and mountains on the road' },
          caption: { zh: '雨停之后，天边出现了光', en: 'After the rain, light appeared' },
          location: { zh: '昆明→巍山', en: 'Kunming → Weishan' },
        },
      ],
      gridVariant: 'feature',
    },

    // ── Day 1 ────────────────────────────────────────────
    {
      id: 1,
      label: { zh: '第一天', en: 'Day 1' },
      date: '2026.07.14',
      title: { zh: '滇池、赶大集，然后是雷雨。', en: 'Lake Dian, a wet market, then thunderstorms.' },
      body: {
        zh: '来都来了，不去滇池说不过去。七月的滇池，湖风吹在身上，凉快得有点不真实——这会儿的深圳出门五分钟就跟蒸桑拿一样。我那天就穿了件背心，平时上班领子扣到最上面，难得见我穿得这么"不正式"。逛完滇池拐去了一个农贸市场赶大集，水果可以随便试吃，光试吃就快把肚子填饱了。晚上开高速去巍山，路上一段倾盆大雨，能见度低到离谱，车速压到 20 迈。郑江稳住了，硬是一点一点把车开出了雷雨区。',
        en: 'You can\'t come to Kunming and skip Lake Dian. The July breeze was so cool it felt fake — back in Shenzhen, stepping outside for five minutes felt like a sauna. I wore a tank top for the first time; at work my collar is always buttoned to the top. After the lake we detoured to a wet market, where the fruit tasting alone almost filled us up. That night, driving to Weishan, we hit a downpour so heavy we could barely see. Zheng Jiang kept it at 20 km/h and slowly drove us out of the storm.',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-day1-01.webp',
          alt: { zh: '滇池的湖风', en: 'Lake Dian breeze' },
          caption: { zh: '滇池边，湖风就是最大的道具', en: 'Lake Dian — the wind is the best prop' },
          location: { zh: '滇池', en: 'Lake Dian' },
        },
        {
          src: '/demo-assets/yunnan-day1-02.webp',
          alt: { zh: '在滇池边拍大片', en: 'Taking photos by the lake' },
          caption: { zh: '怎么拍都好看', en: 'Every shot looked good' },
          location: { zh: '滇池', en: 'Lake Dian' },
        },
        {
          src: '/demo-assets/yunnan-day1-03.webp',
          alt: { zh: '云南农贸大集', en: 'Yunnan wet market' },
          caption: { zh: '云南的水果是真的甜', en: 'The fruit here is impossibly sweet' },
          location: { zh: '昆明农贸市场', en: 'Kunming wet market' },
        },
        {
          src: '/demo-assets/yunnan-day1-04.webp',
          alt: { zh: '排骨炸薄荷', en: 'Fried mint with ribs' },
          caption: { zh: '排骨炸薄荷', en: 'Fried mint with ribs' },
          location: { zh: '昆明', en: 'Kunming' },
        },
        {
          src: '/demo-assets/yunnan-day1-05.webp',
          alt: { zh: '自驾路边风景', en: 'Roadside scenery' },
          caption: { zh: '路边随手一拍', en: 'A roadside pull-over' },
          location: { zh: '昆明→巍山', en: 'Kunming → Weishan' },
        },
        {
          src: '/demo-assets/yunnan-day1-06.webp',
          alt: { zh: '云南第一餐野生菌火锅', en: 'First meal: wild mushroom hotpot' },
          caption: { zh: '野生菌火锅，十年老店', en: 'Wild mushroom hotpot at a 10-year-old shop' },
          location: { zh: '巍山', en: 'Weishan' },
        },
      ],
      gridVariant: 'dense',
    },

    // ── Day 2 ────────────────────────────────────────────
    {
      id: 2,
      label: { zh: '第二天', en: 'Day 2' },
      date: '2026.07.15',
      title: { zh: '巍山古城，然后一路到香格里拉。', en: 'Weishan old town, then all the way to Shangri-La.' },
      body: {
        zh: '巍山古城是明清时期留下来的，保存得挺完整。早上在古城里逛，吃了饵丝，找了个茶馆坐下——说是喝茶，其实是因为下雨被困住了。后来开高速去香格里拉，阴天，下着小雨，远处有山，又一次被自驾的魅力征服了。又是晚上十点多到的。第二天一早去租了民族传统服饰，第一次化妆，还花钱让人化的。然后去了松赞林寺——确实非常出片，但对宗教还是有一些敬畏，很少拍里面的照片，纯纯用心去感受。',
        en: 'Weishan\'s old town dates back to the Ming and Qing dynasties, remarkably well-preserved. We wandered in the morning, ate rice noodles, and took shelter in a teahouse when it started raining. Then we drove to Shangri-La — overcast, drizzling, mountains in the distance. We arrived past 10 PM again. The next morning we rented traditional clothing; it was my first time getting my makeup done, and I paid for it. Songzanlin Monastery was stunningly photogenic, but I held back out of reverence — some things are better felt than photographed.',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-day2-01.webp',
          alt: { zh: '自驾路上的云和山', en: 'Clouds and mountains on the road' },
          caption: { zh: '这才是旅行的乐趣', en: 'This is what road trips are about' },
          location: { zh: '巍山→香格里拉', en: 'Weishan → Shangri-La' },
        },
        {
          src: '/demo-assets/yunnan-day2-02.webp',
          alt: { zh: '香格里拉的经幡', en: 'Prayer flags in Shangri-La' },
          caption: { zh: '经幡在风中飘动', en: 'Prayer flags in the wind' },
          location: { zh: '香格里拉', en: 'Shangri-La' },
        },
        {
          src: '/demo-assets/yunnan-day2-03.webp',
          alt: { zh: '松赞林寺全景', en: 'Songzanlin Monastery, full view' },
          caption: { zh: '敬畏是最好的滤镜', en: 'Reverence is the best filter' },
          location: { zh: '松赞林寺', en: 'Songzanlin Monastery' },
        },
        {
          src: '/demo-assets/yunnan-day2-04.webp',
          alt: { zh: '穿着民族服饰在松赞林寺', en: 'In traditional attire at the monastery' },
          caption: { zh: '第一次化妆，还挺帅的', en: 'First time getting makeup — not bad' },
          location: { zh: '松赞林寺', en: 'Songzanlin Monastery' },
        },
        {
          src: '/demo-assets/yunnan-day2-05.webp',
          alt: { zh: '松赞林寺的建筑细节', en: 'Architectural details of the monastery' },
          caption: { zh: '藏传佛教的味道', en: 'A hint of Tibetan Buddhism' },
          location: { zh: '松赞林寺', en: 'Songzanlin Monastery' },
        },
        {
          src: '/demo-assets/yunnan-day2-06.webp',
          alt: { zh: '纳帕海草原', en: 'Napa Sea grasslands' },
          caption: { zh: '云很低，天很蓝，让人不想离开', en: 'Low clouds, deep blue sky — hard to leave' },
          location: { zh: '纳帕海', en: 'Napa Sea' },
        },
      ],
      gridVariant: 'spacious',
    },

    // ── Day 3 ────────────────────────────────────────────
    {
      id: 3,
      label: { zh: '第三天', en: 'Day 3' },
      date: '2026.07.16',
      title: { zh: '草原、吐司宴，和一条差点要了命的路。', en: 'Grasslands, a tusi banquet, and a road that almost killed us.' },
      body: {
        zh: '纳帕海虽然叫"海"，其实是一片大草原。在那里第一次在草原上射箭。傍晚去参加了吐司宴——前半段是小火锅和歌舞表演，献哈达、教你用当地礼仪敬酒，仪式感很足。后来走国道去虎跳峡，路边看到美景就停下来拍照。在云南，随便找个路边停下来，就能拍出国家地理杂志的封面。有一段山路实在太难开了——七十度的坡，连续 S 型弯，会车时弯道窄到不行。郑江开到一半心里打怵，我们一合计，还是小命要紧，果断掉头。',
        en: 'Napa Sea is named after a "sea" but is actually a vast grassland. I tried archery there for the first time. At dusk we attended a tusi banquet — personal hotpots, singing and dancing, hada ceremonies, and local toasting etiquette. Then we took the national highway toward Tiger Leaping Gorge, pulling over whenever the view demanded it. In Yunnan, any random roadside can look like a National Geographic cover. One mountain road was so treacherous — 70-degree inclines, endless S-curves — that Zheng Jiang lost his nerve halfway up. We weighed our options and chose our lives. We turned around.',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-day3-01.webp',
          alt: { zh: '纳帕海草原全景', en: 'Napa Sea grasslands, panoramic' },
          caption: { zh: '在这里生活，幸福感真的会很高', en: 'Life here must feel deeply happy' },
          location: { zh: '纳帕海', en: 'Napa Sea' },
        },
        {
          src: '/demo-assets/yunnan-day3-02.webp',
          alt: { zh: '纳帕海的牦牛和远山', en: 'Yaks and distant peaks at Napa Sea' },
          caption: { zh: '牦牛、羊和小鸟', en: 'Yaks, sheep, and little birds' },
          location: { zh: '纳帕海', en: 'Napa Sea' },
        },
        {
          src: '/demo-assets/yunnan-day3-03.webp',
          alt: { zh: '吐司宴的小火锅', en: 'Tusi banquet hotpot' },
          caption: { zh: '当地的小火锅和歌舞表演', en: 'Local hotpot with singing and dancing' },
          location: { zh: '香格里拉', en: 'Shangri-La' },
        },
        {
          src: '/demo-assets/yunnan-day3-04.webp',
          alt: { zh: '国道边随手一拍', en: 'A roadside stop on the national highway' },
          caption: { zh: '路边就是国家地理封面', en: 'Every roadside is a magazine cover' },
          location: { zh: '香格里拉→虎跳峡', en: 'Shangri-La → Tiger Leaping Gorge' },
        },
        {
          src: '/demo-assets/yunnan-day3-05.webp',
          alt: { zh: '虎跳峡的险峻山路', en: 'The treacherous road to Tiger Leaping Gorge' },
          caption: { zh: '七十度的坡，连续的 S 型弯', en: '70-degree slopes, endless S-curves' },
          location: { zh: '虎跳峡上山口', en: 'Tiger Leaping Gorge ascent' },
        },
        {
          src: '/demo-assets/yunnan-day3-06.webp',
          alt: { zh: '虎跳峡徒步，对面是日照金山', en: 'Tiger Leaping Gorge trail with golden peaks across' },
          caption: { zh: '对面是日照金山，脚下是金沙江', en: 'Golden peaks ahead, Jinsha River below' },
          location: { zh: '虎跳峡', en: 'Tiger Leaping Gorge' },
        },
      ],
      gridVariant: 'dense',
    },

    // ── Day 4 ────────────────────────────────────────────
    {
      id: 4,
      label: { zh: '第四天', en: 'Day 4' },
      date: '2026.07.17',
      title: { zh: '菌子、当归小院，和一碗米线。', en: 'Mushrooms, the Danggui courtyard, and a bowl of noodles.' },
      body: {
        zh: '虎跳峡的徒步路线真的不错，花了两个小时走完中途的路程。下山后驱车前往丽江，临时换到了束河古镇住——这是一次随机的决定，也正因为这次决定，才有了后面更精彩的故事。如琛联系了她的师兄，调研基地就在束河。我们雇了向导带我们进山采菌子。向导说，长得越好看的蘑菇就越有毒。如琛接了一句："那我岂不是恐怖分子？"在大山里辛苦找了两个小时，能吃的菌子却不多。从山里出来，直接去了师兄推荐的那个民宿——老板娘姐姐做了一桌丰盛的饭菜来招待我们，沾了师兄的光。',
        en: 'The Tiger Leaping Gorge hike was spectacular — two hours of trail with the Jinsha River roaring below. Afterward we drove to Lijiang and on a whim switched our stay to Shuhe Ancient Town. That spur-of-the-moment decision led to everything that followed. Ruochen contacted her senior, whose research base was in Shuhe. We hired a guide and went mushroom hunting in the mountains. "The prettier the mushroom, the more poisonous," the guide said. Ruochen shot back: "Then I must be a weapon of mass destruction." Two hours of foraging, but not much to eat. Afterward, we went to a guesthouse her senior recommended. The owner cooked us a feast — a kindness we owed entirely to the introduction.',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-day4-01.webp',
          alt: { zh: '虎跳峡峡谷', en: 'Tiger Leaping Gorge canyon' },
          caption: { zh: '金沙江在峡谷中奔流', en: 'The Jinsha River roars through the canyon' },
          location: { zh: '虎跳峡', en: 'Tiger Leaping Gorge' },
        },
        {
          src: '/demo-assets/yunnan-day4-02.webp',
          alt: { zh: '虎跳峡的悬崖', en: 'Tiger Leaping Gorge cliffs' },
          caption: { zh: '又惊险又刺激', en: 'Terrifying and thrilling' },
          location: { zh: '虎跳峡', en: 'Tiger Leaping Gorge' },
        },
        {
          src: '/demo-assets/yunnan-day4-03.webp',
          alt: { zh: '虎跳峡对面的玉龙雪山', en: 'Jade Dragon Snow Mountain across the gorge' },
          caption: { zh: '玉龙雪山的宏伟', en: 'The scale of Jade Dragon Snow Mountain' },
          location: { zh: '虎跳峡', en: 'Tiger Leaping Gorge' },
        },
        {
          src: '/demo-assets/yunnan-day4-04.webp',
          alt: { zh: '颜色鲜艳的毒蘑菇', en: 'Brightly colored poisonous mushrooms' },
          caption: { zh: '越好看的蘑菇越有毒', en: 'The prettier, the more poisonous' },
          location: { zh: '束河山中', en: 'Mountains near Shuhe' },
        },
        {
          src: '/demo-assets/yunnan-day4-05.webp',
          alt: { zh: '钻进大山里找菌子', en: 'Foraging for mushrooms in the mountains' },
          caption: { zh: '找了两个小时', en: 'Two hours of foraging' },
          location: { zh: '束河山中', en: 'Mountains near Shuhe' },
        },
        {
          src: '/demo-assets/yunnan-day4-06.webp',
          alt: { zh: '采菌子大本营', en: 'Mushroom foraging base camp' },
          caption: { zh: '向导帮我们把能吃的和不能吃的分了类', en: 'Our guide sorted the edible from the toxic' },
          location: { zh: '束河山中', en: 'Mountains near Shuhe' },
        },
        {
          src: '/demo-assets/yunnan-day4-07.webp',
          alt: { zh: '老板娘姐姐盛情款待的一桌饭菜', en: 'The feast our guesthouse host prepared' },
          caption: { zh: '沾了师兄的光才能吃上这顿饭', en: 'We owed this meal to the introduction' },
          location: { zh: '当归小院', en: 'Danggui Courtyard, Shuhe' },
        },
      ],
      gridVariant: 'feature',
    },

    // ── Day 5 ────────────────────────────────────────────
    {
      id: 5,
      label: { zh: '第五天', en: 'Day 5' },
      date: '2026.07.18',
      title: { zh: '束河古镇的慢，和凌晨四点的机场。', en: 'The slowness of Shuhe, and a 4 AM airport.' },
      body: {
        zh: '当归小院的装修不算华丽，但透露着一种文艺青年的气息。花花草草、秋千、椅子、阳台，都做得很用心。里面的东西齐全到有点出乎意料——驱蚊的、防晒的、洗面奶、身体乳、面膜，甚至还有卫生巾。晚上去束河古镇逛了逛，路过一家卖埙和箫的店，老板正在演奏，那个声音特别好听。他知道我们不会买，但还是非常耐心地教我们，还跟我们说了他来这里的故事。后来继续走，到一个卖咖啡的地方，门口小哥一听我们是广东人，话匣子一下子就打开了。',
        en: 'The Danggui Courtyard wasn\'t luxurious, but it had the warmth of someone who cares deeply. Flowers, a swing, chairs, a balcony — every detail considered. The room was stocked with things I\'d never expect: mosquito repellent, sunscreen, cleanser, body lotion, sheet masks, even sanitary pads. That night we wandered through Shuhe and heard the sound of a xun — a clay ocarina — drifting from a shop. The owner knew we wouldn\'t buy anything, but he patiently taught us how to play and told us his story. Later, at a coffee shop, the guy at the door heard we were from Guangdong and started talking like an old friend.',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-day5-01.webp',
          alt: { zh: '当归小院的乌托邦标语', en: 'Utopian slogan at Danggui Courtyard' },
          caption: { zh: '小镇上的乌托邦', en: 'A small-town utopia' },
          location: { zh: '当归小院，束河', en: 'Danggui Courtyard, Shuhe' },
        },
        {
          src: '/demo-assets/yunnan-day5-02.webp',
          alt: { zh: '当归小院的晚餐', en: 'Dinner at Danggui Courtyard' },
          caption: { zh: '老板娘姐姐沏茶给我们喝', en: 'The host brewed tea for us' },
          location: { zh: '当归小院，束河', en: 'Danggui Courtyard, Shuhe' },
        },
        {
          src: '/demo-assets/yunnan-day5-03.webp',
          alt: { zh: '鲜花饼的碎渣', en: 'Flower cake crumbs' },
          caption: { zh: '小哥把试吃剩下的全给了我们', en: 'The vendor gave us all the leftovers' },
          location: { zh: '束河古镇', en: 'Shuhe Ancient Town' },
        },
        {
          src: '/demo-assets/yunnan-day5-04.webp',
          alt: { zh: '丽江机场延误', en: 'Lijiang airport delay' },
          caption: { zh: '等了六七个小时', en: 'A six-hour wait' },
          location: { zh: '丽江三义机场', en: 'Lijiang Sanyi Airport' },
        },
        {
          src: '/demo-assets/yunnan-day5-05.webp',
          alt: { zh: '离开香格里拉时的风景', en: 'Leaving Shangri-La' },
          caption: { zh: '也许明年，也许后年，我还会回去', en: 'Maybe next year, maybe the year after, I\'ll return' },
          location: { zh: '云南', en: 'Yunnan' },
        },
      ],
      gridVariant: 'spacious',
    },

    // ── 尾声 ────────────────────────────────────────────
    {
      id: 6,
      label: { zh: '尾声', en: 'Epilogue' },
      date: '',
      title: { zh: '读好书，交高人，见世面。', en: 'Read good books, meet great people, see the world.' },
      body: {
        zh: '这趟旅行是一次很好的体验。认识了好多人，产生了很多故事，也体验了很多不一样的人生。第一次化妆，穿着民族服饰站在松赞林寺前。第一次在草原上射箭，看着远处的经幡和牦牛。第一次在七十度的山路上，把一百块钱花出了买命钱的感觉。第一次在深山的菌子里，想起我妈年轻时爬八角林的身影。第一次在凌晨四点的丽江机场，看着北京老炮据理力争，开始反思这个世道运行的逻辑。这些瞬间，就是我的"见世面"。',
        en: 'This trip gave me so much. So many people, so many stories, so many glimpses of different lives. My first time wearing makeup, standing in traditional clothes before Songzanlin Monastery. My first time shooting a bow on a grassland, prayer flags and yaks in the distance. My first time spending 100 yuan to save my life on a 70-degree mountain road. My first time thinking of my mother — and her youth spent climbing up to the star-anise grove — while foraging for mushrooms deep in the mountains. My first time, at 4 AM in Lijiang airport, watching Beijing passengers fight for their rights and starting to understand how the world really works. These moments were my "seeing the world."',
      },
      photos: [
        {
          src: '/demo-assets/yunnan-epilogue-01.webp',
          alt: { zh: '随时随地都能睡着', en: 'Can sleep anywhere, anytime' },
          caption: { zh: '随时随地睡觉的本事', en: 'The skill of sleeping anywhere' },
        },
        {
          src: '/demo-assets/yunnan-epilogue-02.webp',
          alt: { zh: '旅途的回忆', en: 'Memories from the road' },
          caption: { zh: '自己长在身体里的世面', en: 'The world that grew inside me' },
        },
        {
          src: '/demo-assets/yunnan-epilogue-03.webp',
          alt: { zh: '云南的天空', en: 'The Yunnan sky' },
          caption: { zh: '也许明年，也许后年', en: 'Maybe next year, maybe the year after' },
        },
      ],
      gridVariant: 'feature',
    },
  ],
}
