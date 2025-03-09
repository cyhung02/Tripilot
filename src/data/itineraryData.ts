// src/data/itineraryData.ts
import { DayInfo } from './types';

// 定義旅行的起始日期，方便後續日期計算
export const TRIP_START_DATE = new Date(2025, 3 - 1, 28); // 月份是從0開始，3月為2
export const TRIP_END_DATE = new Date(2025, 4 - 1, 6, 23, 59, 59);

export const itineraryData: DayInfo[] = [
    {
        date: "3/28",
        day: "星期五",
        title: "出發日",
        highlights: [
            { type: "交通", name: "桃園機場 → 大阪關西機場" },
            { type: "其他", name: "機場領車票" }
        ],
        itinerary: [
            {
                type: "交通",
                name: "搭乘航班前往關西機場",
                from: "桃園機場 T1",
                to: "大阪關西機場 T1",
                departure_time: "19:35",
                arrival_time: "23:00",
                train_info: "航班 IT220"
            },
            {
                type: "其他",
                name: "機場領車票",
                time: "23:00-23:30",
                description: "抵達後於機場領取預約的車票"
            }
        ],
        accommodation: "關西機場 ホテル日航関西空港",
        food_recommendations: ["機上餐"],
        shopping_recommendations: []
    },
    {
        date: "3/29",
        day: "星期六",
        title: "大阪探索日",
        highlights: [
            { type: "其他", name: "機場領車票" },
            { type: "景點", name: "大阪城公園 & 天守閣" },
            { type: "景點", name: "黑門市場" },
            { type: "景點", name: "新世界 & 通天閣" },
            { type: "景點", name: "道頓堀 & 心齋橋" }
        ],
        itinerary: [
            {
                type: "其他",
                name: "機場領車票",
                time: "",
                description: "領取預約的車票"
            },
            {
                type: "景點",
                name: "大阪城公園 & 天守閣",
                time: "",
                description: "日本著名歷史景點，可欣賞大阪城天守閣及其周圍美麗的公園。",
                tips: "參觀天守閣需要額外購票，建議提前在官網查詢開放時間。",
                location: "https://goo.gl/maps/YpJK6wNwQDmVnvhZ7"
            },
            {
                type: "景點",
                name: "黑門市場",
                time: "",
                description: "大阪著名的美食街市，提供新鮮海鮮和當地小吃。",
                tips: "建議品嚐章魚燒和新鮮生魚片，用餐高峰期可能需要排隊。",
                location: "https://goo.gl/maps/YCcWvUshGtAxPU4x9"
            },
            {
                type: "景點",
                name: "新世界 & 通天閣",
                time: "",
                description: "充滿昭和時代氛圍的懷舊區域，通天閣是大阪的地標性建築。",
                tips: "可以在附近品嚐大阪著名的串炸料理，推薦參觀比利肯神像。",
                location: "https://goo.gl/maps/8KjS27hgcYmvvzGp9"
            },
            {
                type: "景點",
                name: "道頓堀 & 心齋橋",
                time: "",
                description: "大阪最繁華的購物和美食區域，有著名的固力果跑者廣告牌。",
                tips: "晚上霓虹燈非常壯觀，適合拍照。可以在此品嚐道頓堀名店的大阪燒。",
                location: "https://goo.gl/maps/BDWRDCgMZHr8KMRCA"
            }
        ],
        food_recommendations: ["章魚燒", "炸串", "大阪燒", "和牛壽喜燒"],
        shopping_recommendations: ["大阪限定零食（Pablo起司塔、Calbee薯條）", "藥妝", "美妝用品", "章魚燒造型紀念品"],
        accommodation: "大阪 ホテルオリエンタルエクスプレス大阪心斎橋"
    },
    {
        date: "3/30",
        day: "星期日",
        title: "溫泉放鬆日",
        highlights: [
            { type: "景點", name: "有馬溫泉（金湯、銀湯）" },
            { type: "景點", name: "有馬本街道（湯本坂）逛街散策" }
        ],
        itinerary: [
            {
                type: "景點",
                name: "有馬溫泉（金湯、銀湯）",
                time: "",
                description: "日本最古老的溫泉之一，以含鐵的「金湯」和含碳酸的「銀湯」聞名。",
                tips: "建議先體驗金湯，之後再享受銀湯。溫泉水溫較高，注意身體狀況。",
                location: "https://goo.gl/maps/XUKzNJ2v4kE8xqtR9"
            },
            {
                type: "景點",
                name: "有馬本街道（湯本坂）逛街散策",
                time: "",
                description: "充滿傳統氛圍的溫泉街道，有各種特色商店和小吃。",
                tips: "可購買當地特產炭酸煎餅和金泉饅頭作為伴手禮。",
                location: "https://goo.gl/maps/ckCURdQ7d2qRHMLv5"
            }
        ],
        food_recommendations: ["炭酸煎餅", "神戶牛料理", "溫泉蛋", "金泉饅頭"],
        shopping_recommendations: ["溫泉相關產品", "炭酸煎餅", "金泉饅頭"],
        accommodation: "有馬溫泉 中の坊 瑞苑"
    },
    {
        date: "3/31",
        day: "星期一",
        title: "廣島文化巡禮",
        highlights: [
            { type: "交通", name: "有馬溫泉 → 廣島" },
            { type: "景點", name: "廣島和平紀念公園 & 原爆圓頂" },
            { type: "景點", name: "縮景園" },
            { type: "景點", name: "廣島城" },
            { type: "景點", name: "本通商店街 & 廣島 PARCO" }
        ],
        itinerary: [
            {
                type: "交通",
                name: "前往廣島",
                from: "有馬溫泉",
                to: "廣島",
                departure_time: "10:30",
                arrival_time: "12:30",
                train_info: "ＪＲ新幹線のぞみ13号"
            },
            {
                type: "景點",
                name: "廣島和平紀念公園 & 原爆圓頂",
                time: "13:00-15:00",
                description: "象徵和平的世界文化遺產，原爆圓頂是唯一保留的原子彈爆炸痕跡建築。",
                tips: "參觀和平紀念資料館需要1-2小時，請預留足夠時間。",
                location: "https://goo.gl/maps/Z9YJ5qfqWBrTGdH36"
            },
            {
                type: "景點",
                name: "縮景園",
                time: "15:30-16:30",
                description: "江戶時代的日本傳統庭園，四季景色各異。",
                tips: "園內有茶屋，可以在此休息品茶。",
                location: "https://goo.gl/maps/QcTTfHUbdiFVkdBJ6"
            },
            {
                type: "景點",
                name: "廣島城",
                time: "17:00-18:00",
                description: "廣島地標性的城堡，被稱為「鯉城」，現為歷史博物館。",
                tips: "城內展示有武士盔甲和歷史文物，從頂層可俯瞰廣島市區。",
                location: "https://goo.gl/maps/UX87dJPUH3HoJBsQ8"
            },
            {
                type: "景點",
                name: "本通商店街 & 廣島 PARCO",
                time: "18:30-20:30",
                description: "廣島主要購物區，有多家百貨公司和特色商店。",
                tips: "可在本通商店街尋找廣島特產和伴手禮。",
                location: "https://goo.gl/maps/zSM71S7dYJFVHVnY7"
            }
        ],
        food_recommendations: ["廣島燒", "牡蠣料理", "紅葉饅頭", "廣島沾麵"],
        shopping_recommendations: ["廣島牡蠣醬油", "熊野筆化妝刷（白鳳堂、竹宝堂）"],
        accommodation: "廣島 広島ワシントンホテル"
    },
    {
        date: "4/1",
        day: "星期二",
        title: "神秘宮島之旅",
        highlights: [
            { type: "景點", name: "etto宮島交流館（巨大杓子）" },
            { type: "景點", name: "嚴島神社 & 大鳥居" },
            { type: "景點", name: "宮島表參道商店街" },
            { type: "景點", name: "杓子の家（書法老師現場寫字）" }
        ],
        itinerary: [
            {
                type: "景點",
                name: "etto宮島交流館",
                time: "",
                description: "展示巨大杓子的交流館，可了解宮島木製杓子的歷史。",
                tips: "入場免費，館內有介紹宮島傳統工藝的展示。",
                location: "https://goo.gl/maps/32FHnUZzQTBhGJz56"
            },
            {
                type: "景點",
                name: "嚴島神社 & 大鳥居",
                time: "",
                description: "世界文化遺產，建在海上的神社，大鳥居是日本最著名的景觀之一。",
                tips: "潮汐會影響參觀體驗，退潮時可步行至大鳥居附近。",
                location: "https://goo.gl/maps/s3Jf93MfuK2CXBwW7"
            },
            {
                type: "景點",
                name: "宮島表參道商店街",
                time: "",
                description: "宮島主要購物街，有多家特產店和美食店。",
                tips: "此處可品嚐著名的烤牡蠣和紅葉饅頭。",
                location: "https://goo.gl/maps/nVFppwkqVQPuwzC79"
            },
            {
                type: "景點",
                name: "杓子の家",
                time: "",
                description: "可以觀賞書法老師現場在木杓上寫字的特色店鋪。",
                tips: "可以請書法老師在木杓上寫下自己喜歡的文字作為紀念品。",
                location: "https://goo.gl/maps/Tj1XcLKnqPfnr69d7"
            }
        ],
        food_recommendations: ["烤牡蠣", "紅葉饅頭", "星鰻飯", "紅葉天婦羅"],
        shopping_recommendations: ["宮島木製杓子", "星鰻相關食品", "清酒伴手禮"],
        accommodation: "廣島 広島ワシントンホテル"
    },
    {
        date: "4/2",
        day: "星期三",
        title: "浪漫尾道漫步",
        highlights: [
            { type: "交通", name: "広島 → 尾道" },
            { type: "餐廳", name: "尾道拉麵 尾道ラーメン 壱番館本店" },
            { type: "景點", name: "千光寺纜車 & 千光寺公園" },
            { type: "景點", name: "貓之細道 & 艮神社" },
            { type: "景點", name: "尾道本通商店街" },
            { type: "交通", name: "尾道 → 岡山" }
        ],
        itinerary: [
            {
                type: "交通",
                name: "前往尾道",
                from: "広島",
                to: "尾道",
                departure_time: "09:38",
                arrival_time: "10:45",
                train_info: "ＪＲ新幹線こだま844号 → 三原 → 尾道"
            },
            {
                type: "其他",
                name: "寄放行李",
                time: "10:50-11:10",
                description: "在尾道站附近寄放行李，方便輕裝遊覽"
            },
            {
                type: "餐廳",
                name: "尾道拉麵 壱番館本店",
                time: "11:30-12:30",
                description: "尾道著名的拉麵店，以醬油湯底和背脂拉麵聞名。",
                recommended_dishes: "尾道拉麵、尾道背脂拉麵、叉燒飯",
                location: "https://goo.gl/maps/8eypEvTsj9XQg3Fy5"
            },
            {
                type: "景點",
                name: "千光寺纜車 & 千光寺公園",
                time: "13:00-14:30",
                description: "搭乘纜車前往山頂的千光寺，可俯瞰尾道市區和瀨戶內海美景。",
                tips: "千光寺公園的櫻花和楓葉季節特別美麗，山頂有多個觀景台。",
                location: "https://goo.gl/maps/L7UZsGnqDYUVN7cn6"
            },
            {
                type: "景點",
                name: "貓之細道 & 艮神社",
                time: "15:00-16:30",
                description: "蜿蜒於山坡間的小徑，以眾多流浪貓而聞名，途經古樸的艮神社。",
                tips: "道路較陡，請穿著舒適的鞋子。沿途有許多文藝小店和咖啡館。",
                location: "https://goo.gl/maps/JNgQxwZgHZkTEXLG6"
            },
            {
                type: "景點",
                name: "尾道本通商店街",
                time: "17:00-19:00",
                description: "尾道主要商店街，有各種特色小店和美食。",
                tips: "推薦品嚐尾道特色甜點和文青麵包店。",
                location: "https://goo.gl/maps/qJcxs7JaX5bBTdEH7"
            },
            {
                type: "其他",
                name: "領行李",
                time: "19:30-19:50",
                description: "取回寄放的行李"
            },
            {
                type: "交通",
                name: "前往岡山",
                from: "尾道",
                to: "岡山",
                departure_time: "20:30",
                arrival_time: "21:50",
                train_info: "JR山陽本線"
            }
        ],
        food_recommendations: ["尾道拉麵", "鯛魚料理", "文青麵包"],
        shopping_recommendations: ["尾道文創商品", "手作工藝品"],
        accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
        date: "4/3",
        day: "星期四",
        title: "津山歷史文化探索",
        highlights: [
            { type: "景點", name: "津山城（鶴山公園）" },
            { type: "景點", name: "吉備津神社" }
        ],
        itinerary: [
            {
                type: "景點",
                name: "津山城（鶴山公園）",
                time: "",
                description: "保存完好的日本城郭遺址，位於鶴山公園內，春季櫻花特別美麗。",
                tips: "登上天守台可俯瞰津山市區全景，公園內有許多歷史建築遺跡。",
                location: "https://goo.gl/maps/JRdLCL5h53bWvUuZ8"
            },
            {
                type: "景點",
                name: "吉備津神社",
                time: "",
                description: "歷史悠久的神社，建築風格獨特，有著名的「鳴釜神事」。",
                tips: "參拜後可獲得「桃太郎」相關的護身符，神社迴廊非常壯觀。",
                location: "https://goo.gl/maps/CStUPZ8yPvLu52zF9"
            }
        ],
        food_recommendations: ["津山ホルモンうどん（內臟烏龍麵）", "津山牛（燒烤、肉乾）", "羊羹"],
        shopping_recommendations: ["津山特產", "吉備津神社護身符"],
        accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
        date: "4/4",
        day: "星期五",
        title: "姬路城歷史探訪",
        highlights: [
            { type: "景點", name: "姬路城 & 好古園" },
            { type: "景點", name: "書寫山圓教寺" }
        ],
        itinerary: [
            {
                type: "景點",
                name: "姬路城 & 好古園",
                time: "",
                description: "日本最著名的城堡之一，被譽為「白鷺城」，是世界文化遺產。好古園是其附屬的日本庭園。",
                tips: "城內參觀路線是單向的，請跟隨指示行進。週末可能人潮較多，建議提早到訪。",
                location: "https://goo.gl/maps/hNd9tKh2LPTEzxqN8"
            },
            {
                type: "景點",
                name: "書寫山圓教寺",
                time: "",
                description: "歷史悠久的佛教寺院，被稱為「西之比叡山」，建築群依山而建。",
                tips: "參觀需要爬一些石階，請穿著舒適的鞋子。寺內有多個殿堂和寶物。",
                location: "https://goo.gl/maps/2cESNkAQrRKzeDNy9"
            }
        ],
        food_recommendations: ["姬路名物穴子飯", "播州素麵", "夢前味噌料理"],
        shopping_recommendations: ["姬路城紀念品", "播州織布製品"],
        accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
        date: "4/5",
        day: "星期六",
        title: "倉敷美觀探索",
        highlights: [
            { type: "景點", name: "倉敷美觀" },
            { type: "景點", name: "大原美術館" },
            { type: "景點", name: "阿智神社" }
        ],
        itinerary: [
            {
                type: "景點",
                name: "倉敷美觀",
                time: "",
                description: "保存完好的江戶時代商家街區，白壁建築和柳樹倒映在水面上，非常美麗。",
                tips: "可體驗川船遊覽，從水上欣賞美觀地區的另一番風景。",
                location: "https://goo.gl/maps/2Z1NSDynXJk5NU4W8"
            },
            {
                type: "景點",
                name: "大原美術館",
                time: "",
                description: "日本第一家西洋美術館，收藏有多件世界級藝術品。",
                tips: "美術館分為本館、分館和工藝館，可能需要分別購票。",
                location: "https://goo.gl/maps/UFXC5xhXoGLw1XB78"
            },
            {
                type: "景點",
                name: "阿智神社",
                time: "",
                description: "倉敷地區歷史悠久的神社，以祈求生意興隆和學業有成聞名。",
                tips: "神社內有「良緣之鈴」，據說搖動後可以求得良緣。",
                location: "https://goo.gl/maps/n9zcAB3DKAthSu5J8"
            }
        ],
        food_recommendations: ["倉敷牛排", "桃太郎壽司", "倉敷布丁", "麝香葡萄甜點"],
        shopping_recommendations: ["倉敷帆布包", "倉敷牛仔製品"],
        accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
        date: "4/6",
        day: "星期日",
        title: "岡山名勝巡禮 & 回程",
        highlights: [
            { type: "景點", name: "岡山城 & 後樂園" },
            { type: "景點", name: "表町商店街" },
            { type: "交通", name: "岡山機場 → 桃園機場" }
        ],
        itinerary: [
            {
                type: "景點",
                name: "岡山城 & 後樂園",
                time: "",
                description: "日本三大名園之一的後樂園，與烏黑的岡山城（又稱烏城）形成鮮明對比。",
                tips: "後樂園的最佳觀賞點是唯心山頂，可同時眺望庭園全景和岡山城。",
                location: "https://goo.gl/maps/66Y7Sc8KDZEEFsHu9"
            },
            {
                type: "景點",
                name: "表町商店街",
                time: "",
                description: "岡山最大的購物區，有超過400家店鋪的商店街。",
                tips: "可在此採購最後的伴手禮，包括岡山特產水果甜點。",
                location: "https://goo.gl/maps/3kX2AfrTHQXEDjzY9"
            },
            {
                type: "交通",
                name: "返回台灣",
                from: "岡山機場",
                to: "桃園機場 T1",
                departure_time: "17:55",
                arrival_time: "20:00",
                train_info: "航班 IT715"
            }
        ],
        food_recommendations: ["岡山壽司", "桃子甜點", "吉備團子", "白桃果凍", "千屋牛"],
        shopping_recommendations: ["岡山白桃果凍", "吉備團子", "岡山葡萄酒"],
        accommodation: ""
    }
];