export const levels = [
  { id: 1, name: 'Level 1', description: '入门级', color: 'bg-red-500' },
  { id: 2, name: 'Level 2', description: '基础级', color: 'bg-orange-500' },
  { id: 3, name: 'Level 3', description: '进阶级', color: 'bg-yellow-500' },
  { id: 4, name: 'Level 4', description: '提高级', color: 'bg-green-500' },
  { id: 5, name: 'Level 5', description: '高级', color: 'bg-blue-500' },
  { id: 6, name: 'Level 6', description: '精通级', color: 'bg-purple-500' },
];

export const wordsByLevel = {
  1: [
    { id: 1, word: 'apple', meaning: '苹果', image: '🍎', phonetic: '/ˈæpl/' },
    { id: 2, word: 'banana', meaning: '香蕉', image: '🍌', phonetic: '/bəˈnænə/' },
    { id: 3, word: 'cat', meaning: '猫', image: '🐱', phonetic: '/kæt/' },
    { id: 4, word: 'dog', meaning: '狗', image: '🐕', phonetic: '/dɒɡ/' },
    { id: 5, word: 'egg', meaning: '鸡蛋', image: '🥚', phonetic: '/eɡ/' },
    { id: 6, word: 'fish', meaning: '鱼', image: '🐟', phonetic: '/fɪʃ/' },
    { id: 7, word: 'girl', meaning: '女孩', image: '👧', phonetic: '/ɡɜːl/' },
    { id: 8, word: 'hand', meaning: '手', image: '✋', phonetic: '/hænd/' },
  ],
  2: [
    { id: 9, word: 'happy', meaning: '快乐的', image: '😊', phonetic: '/ˈhæpi/' },
    { id: 10, word: 'water', meaning: '水', image: '💧', phonetic: '/ˈwɔːtər/' },
    { id: 11, word: 'book', meaning: '书', image: '📚', phonetic: '/bʊk/' },
    { id: 12, word: 'school', meaning: '学校', image: '🏫', phonetic: '/skuːl/' },
    { id: 13, word: 'friend', meaning: '朋友', image: '👫', phonetic: '/frend/' },
    { id: 14, word: 'family', meaning: '家庭', image: '👨‍👩‍👧‍👦', phonetic: '/ˈfæməli/' },
    { id: 15, word: 'teacher', meaning: '老师', image: '👩‍🏫', phonetic: '/ˈtiːtʃər/' },
    { id: 16, word: 'student', meaning: '学生', image: '🎒', phonetic: '/ˈstjuːdnt/' },
  ],
  3: [
    { id: 17, word: 'beautiful', meaning: '美丽的', image: '🌸', phonetic: '/ˈbjuːtɪfl/' },
    { id: 18, word: 'important', meaning: '重要的', image: '⭐', phonetic: '/ɪmˈpɔːtənt/' },
    { id: 19, word: 'different', meaning: '不同的', image: '🔄', phonetic: '/ˈdɪfrənt/' },
    { id: 20, word: 'together', meaning: '一起', image: '🤝', phonetic: '/təˈɡeðər/' },
    { id: 21, word: 'morning', meaning: '早晨', image: '🌅', phonetic: '/ˈmɔːrnɪŋ/' },
    { id: 22, word: 'afternoon', meaning: '下午', image: '☀️', phonetic: '/ˌɑːftərˈnuːn/' },
    { id: 23, word: 'evening', meaning: '傍晚', image: '🌆', phonetic: '/ˈiːvnɪŋ/' },
    { id: 24, word: 'night', meaning: '夜晚', image: '🌙', phonetic: '/naɪt/' },
  ],
};

export const sentencesByLevel = {
  1: [
    { id: 1, sentence: 'I am a student.', meaning: '我是一名学生。', image: '👨‍🎓' },
    { id: 2, sentence: 'This is a cat.', meaning: '这是一只猫。', image: '🐱' },
    { id: 3, sentence: 'I like apples.', meaning: '我喜欢苹果。', image: '🍎' },
    { id: 4, sentence: 'She is happy.', meaning: '她很开心。', image: '😊' },
  ],
  2: [
    { id: 5, sentence: 'I go to school every day.', meaning: '我每天去上学。', image: '🏫' },
    { id: 6, sentence: 'My friend is very nice.', meaning: '我的朋友非常好。', image: '👫' },
    { id: 7, sentence: 'We have lunch at noon.', meaning: '我们中午吃午饭。', image: '🍛' },
    { id: 8, sentence: 'The book is on the desk.', meaning: '书在桌子上。', image: '📚' },
  ],
};

export const grammarByLevel = {
  1: [
    { id: 1, title: '名词', description: '表示人、事物、地点或概念的名称', examples: ['cat', 'book', 'school'] },
    { id: 2, title: '动词', description: '表示动作或状态', examples: ['run', 'eat', 'sleep'] },
    { id: 3, title: '形容词', description: '描述名词的特征', examples: ['big', 'happy', 'red'] },
  ],
  2: [
    { id: 4, title: '一般现在时', description: '表示经常性、习惯性的动作', examples: ['I go to school.', 'She reads books.'] },
    { id: 5, title: '不定冠词 a/an', description: '用于单数可数名词前', examples: ['a cat', 'an apple'] },
    { id: 6, title: '人称代词', description: '代替人或事物的代词', examples: ['I', 'you', 'he', 'she'] },
  ],
};

export const phonetics = [
  { id: 1, phonetic: '/iː/', examples: ['bee', 'see', 'tree'] },
  { id: 2, phonetic: '/ɪ/', examples: ['big', 'sit', 'fish'] },
  { id: 3, phonetic: '/e/', examples: ['bed', 'pen', 'red'] },
  { id: 4, phonetic: '/æ/', examples: ['cat', 'hat', 'apple'] },
  { id: 5, phonetic: '/ɑː/', examples: ['car', 'far', 'star'] },
  { id: 6, phonetic: '/ɒ/', examples: ['dog', 'hot', 'box'] },
  { id: 7, phonetic: '/ʌ/', examples: ['cup', 'bus', 'sun'] },
  { id: 8, phonetic: '/uː/', examples: ['moon', 'food', 'blue'] },
  { id: 9, phonetic: '/ʊ/', examples: ['book', 'look', 'good'] },
  { id: 10, phonetic: '/ɜː/', examples: ['bird', 'word', 'girl'] },
];

export const users = [
  { id: 1, name: '小明', avatar: '👦', level: 2, points: 1250, streak: 7 },
  { id: 2, name: '小红', avatar: '👧', level: 2, points: 1180, streak: 5 },
  { id: 3, name: '小华', avatar: '👦', level: 3, points: 2340, streak: 12 },
  { id: 4, name: '小丽', avatar: '👧', level: 2, points: 980, streak: 3 },
  { id: 5, name: '小强', avatar: '👦', level: 3, points: 1890, streak: 8 },
];

export const friends = [
  { id: 2, name: '小红', avatar: '👧', level: 2, todayPoints: 50 },
  { id: 4, name: '小丽', avatar: '👧', level: 2, todayPoints: 30 },
];

export const gamePuzzles = [
  { id: 1, type: 'jigsaw', word: 'apple', image: '🍎', pieces: 4 },
  { id: 2, type: 'crossword', question: '一种水果，红色的', answer: 'apple' },
  { id: 3, type: '接龙', startWord: 'cat', nextWords: ['tiger', 'rabbit', 'turtle'] },
];
