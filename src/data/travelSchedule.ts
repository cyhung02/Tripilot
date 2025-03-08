import { ScheduleDay } from '../types/Schedule';

export const scheduleData: ScheduleDay[] = [
  {
    id: 'day1',
    date: '3/28（五）',
    title: '出發日',
    description: '啟程日本：美食與文化之旅開啟！',
    mainActivities: [
      {
        title: '航班資訊',
        details: ['航班 IT220 桃園機場 T1 → 大阪關西機場 T1（19:35—23:00）']
      },
      {
        title: '機場領車票',
        details: []
      }
    ],
    transportation: [],
    foodRecommendations: [],
    accommodation: {
      name: '關西機場 ホテル日航関西空港',
    },
    themeElement: 'sakura'
  },
  {
    id: 'day2',
    date: '3/29（六）',
    title: '大阪探索日',
    description: '大阪市區觀光',
    mainActivities: [
      {
        title: '機場領車票',
        details: []
      },
      {
        title: '大阪城公園 & 天守閣',
        details: []
      },
      {
        title: '黑門市場',
        details: ['海鮮、章魚燒']
      },
      {
        title: '新世界 & 通天閣',
        details: ['炸串、昭和風情']
      },
      {
        title: '道頓堀 & 心齋橋',
        details: ['Glico 拍照、大阪燒、藥妝購物']
      }
    ],
    foodRecommendations: ['章魚燒', '炸串', '大阪燒', '和牛壽喜燒'],
    mustBuyItems: ['大阪限定零食（Pablo起司塔、Calbee薯條）', '藥妝', '美妝用品', '章魚燒造型紀念品'],
    accommodation: {
      name: '大阪 ホテルオリエンタルエクスプレス大阪心斎橋',
    },
    themeElement: 'osaka-castle'
  },
  {
    id: 'day3',
    date: '3/30（日）',
    title: '溫泉放鬆日',
    description: '有馬溫泉之旅',
    mainActivities: [
      {
        title: '有馬溫泉',
        details: ['金湯、銀湯']
      },
      {
        title: '有馬本街道（湯本坂）逛街散策',
        details: []
      }
    ],
    foodRecommendations: ['炭酸煎餅', '神戶牛料理', '溫泉蛋', '金泉饅頭'],
    accommodation: {
      name: '有馬溫泉 中の坊 瑞苑',
    },
    themeElement: 'onsen'
  },
  {
    id: 'day4',
    date: '3/31（一）',
    title: '廣島文化巡禮',
    description: '廣島市區探索',
    mainActivities: [
      {
        title: '交通',
        details: ['有馬溫泉 → 新神戶 10:30 ＪＲ新幹線のぞみ13号 → 廣島']
      },
      {
        title: '廣島和平紀念公園 & 原爆圓頂',
        details: []
      },
      {
        title: '縮景園',
        details: []
      },
      {
        title: '廣島城',
        details: []
      },
      {
        title: '本通商店街 & 廣島 PARCO',
        details: []
      }
    ],
    foodRecommendations: ['廣島燒', '牡蠣料理', '紅葉饅頭', '廣島沾麵'],
    mustBuyItems: ['廣島牡蠣醬油', '熊野筆化妝刷（白鳳堂、竹宝堂）'],
    accommodation: {
      name: '廣島 広島ワシントンホテル',
    },
    themeElement: 'peace-memorial'
  },
  {
    id: 'day5',
    date: '4/1（二）',
    title: '神秘宮島之旅',
    description: '宮島一日遊',
    mainActivities: [
      {
        title: 'etto宮島交流館',
        details: ['巨大杓子']
      },
      {
        title: '嚴島神社 & 大鳥居',
        details: ['事先查詢潮汐時間']
      },
      {
        title: '宮島表參道商店街',
        details: []
      },
      {
        title: '杓子の家',
        details: ['書法老師現場寫字']
      }
    ],
    foodRecommendations: ['烤牡蠣', '紅葉饅頭', '星鰻飯', '紅葉天婦羅'],
    mustBuyItems: ['宮島木製杓子', '星鰻相關食品', '清酒伴手禮'],
    accommodation: {
      name: '廣島 広島ワシントンホテル',
    },
    themeElement: 'torii-gate'
  },
  {
    id: 'day6',
    date: '4/2（三）',
    title: '浪漫尾道漫步',
    description: '尾道風情之旅',
    mainActivities: [
      {
        title: '交通',
        details: ['広島 9:38 ＪＲ新幹線こだま844号 → 三原 → 尾道（09:38—10:45）']
      },
      {
        title: '寄放行李',
        details: []
      },
      {
        title: '尾道拉麵 尾道ラーメン 壱番館本店',
        details: []
      },
      {
        title: '千光寺纜車 & 千光寺公園',
        details: []
      },
      {
        title: '貓之細道 & 艮神社',
        details: []
      },
      {
        title: '尾道本通商店街',
        details: []
      },
      {
        title: '領行李',
        details: []
      },
      {
        title: '交通',
        details: ['尾道 → 岡山（末班車 22:50）']
      }
    ],
    foodRecommendations: ['尾道拉麵', '鯛魚料理', '文青麵包'],
    accommodation: {
      name: '岡山 ホテルアベストグランデ 岡山 なごみの湯',
    },
    themeElement: 'onomichi-cat'
  },
  {
    id: 'day7',
    date: '4/3（四）',
    title: '津山歷史文化探索',
    description: '津山文化巡禮',
    mainActivities: [
      {
        title: '津山城（鶴山公園）',
        details: []
      },
      {
        title: '吉備津神社',
        details: []
      }
    ],
    foodRecommendations: ['津山ホルモンうどん（內臟烏龍麵）', '津山牛（燒烤、肉乾）', '羊羹'],
    accommodation: {
      name: '岡山 ホテルアベストグランデ 岡山 なごみの湯',
    },
    themeElement: 'tsuyama-castle'
  },
  {
    id: 'day8',
    date: '4/4（五）',
    title: '姬路城歷史探訪',
    description: '姬路文化體驗',
    mainActivities: [
      {
        title: '姬路城 & 好古園',
        details: []
      },
      {
        title: '書寫山圓教寺',
        details: []
      }
    ],
    foodRecommendations: ['姬路名物穴子飯', '播州素麵', '夢前味噌料理'],
    accommodation: {
      name: '岡山 ホテルアベストグランデ 岡山 なごみの湯',
    },
    themeElement: 'himeji-castle'
  },
  {
    id: 'day9',
    date: '4/5（六）',
    title: '倉敷美觀探索',
    description: '倉敷美觀歷史巡禮',
    mainActivities: [
      {
        title: '倉敷美觀',
        details: ['可體驗川舟遊覽，欣賞江戶時代風情']
      },
      {
        title: '大原美術館',
        details: []
      },
      {
        title: '阿智神社',
        details: []
      }
    ],
    foodRecommendations: ['倉敷牛排', '桃太郎壽司', '倉敷布丁', '麝香葡萄甜點'],
    mustBuyItems: ['倉敷帆布包', '倉敷牛仔製品'],
    accommodation: {
      name: '岡山 ホテルアベストグランデ 岡山 なごみの湯',
    },
    themeElement: 'kurashiki'
  },
  {
    id: 'day10',
    date: '4/6（日）',
    title: '岡山名勝巡禮 & 回程',
    description: '岡山名勝巡禮',
    mainActivities: [
      {
        title: '岡山城 & 後樂園',
        details: []
      },
      {
        title: '表町商店街',
        details: []
      },
      {
        title: '航班',
        details: ['航班 IT715 岡山機場 → 桃園機場 T1（17:55—20:00）']
      }
    ],
    foodRecommendations: ['岡山壽司', '桃子甜點', '吉備團子', '白桃果凍', '千屋牛'],
    mustBuyItems: ['岡山白桃果凍', '吉備團子', '岡山葡萄酒'],
    accommodation: {
      name: '回程',
    },
    themeElement: 'okayama-garden'
  }
];