import type { Locale } from './i18n';

export const serviceNos = ['01', '02', '03', '04', '05', '06'] as const;
export type ServiceNo = (typeof serviceNos)[number];

export type ShowcaseAct = {
  no: ServiceNo;
  figure: string;
  title: string;
  purpose: string;
};

export type ShowcaseCopy = {
  kicker: string;
  title: string;
  lede: string;
  hint: string;
  outroKicker: string;
  outroTitle: string;
  outroBody: string;
  acts: ShowcaseAct[];
};

export type VisionSlide = {
  kicker: string;
  title: string;
  body: string;
  figure: string;
  mark?: string;
};

export type VisionDeck = {
  no: ServiceNo;
  figure: string;
  kicker: string;
  speculation: string;
  slides: VisionSlide[];
};

const showcase: Record<Locale, ShowcaseCopy> = {
  zh: {
    kicker: '0xE9 · six near jumps',
    title: '它们是用来做什么的',
    lede: '六条业务，六次近跳转。每一跳都有目的。先看动作，再读说明。',
    hint: '向下滚动，进入下一次跳转。',
    outroKicker: 'JMP still open',
    outroTitle: '说明在业务页，未来在各自的演示里。',
    outroBody: '公开正文没有被改写。下面的演示文稿讲的是智能爆炸里，这些工作会变成什么——那是推测，不是已经交付的产品。',
    acts: [
      { no: '01', figure: 'loop', title: '网络防御', purpose: '把监测、狩猎与运营收成一个可以真正跑起来的防御闭环。' },
      { no: '02', figure: 'timeline', title: '应急响应', purpose: '在事件发生之后，把经过还原出来，并把经验变成下一次用得上的流程。' },
      { no: '03', figure: 'corridor', title: '红队评估', purpose: '在授权的围栏里，沿真实路径检验防护是不是真的有效。' },
      { no: '04', figure: 'signals', title: 'APT 威胁情报研究', purpose: '把分散的弱信号收成可以查询、可以验证、可以拿来做决定的情报。' },
      { no: '05', figure: 'protocol', title: '非侵入式脑机接口', purpose: '在软件里推演协议与交互，而不踏进人体实验或临床用途。' },
      { no: '06', figure: 'ground', title: 'CTF赛事承办', purpose: '用赛事和赛题，把实战变成可以学习、可以复用的能力。' },
    ],
  },
  en: {
    kicker: '0xE9 · six near jumps',
    title: 'What they are for',
    lede: 'Six lines of work, six near jumps. Each jump has a purpose. Watch the motion first, then read the note.',
    hint: 'Scroll down to take the next jump.',
    outroKicker: 'JMP still open',
    outroTitle: 'The statements live on the services page. The future lives in each deck.',
    outroBody: 'The public wording has not been rewritten. The presentations that follow are about what this work becomes inside an intelligence explosion — speculation, not a product already shipped.',
    acts: [
      { no: '01', figure: 'loop', title: 'Network Defense', purpose: 'To close monitoring, hunting, and operations into a defensive loop that can actually be run.' },
      { no: '02', figure: 'timeline', title: 'Incident Response', purpose: 'After an incident, to reconstruct what happened, and turn the experience into a process that can be used the next time.' },
      { no: '03', figure: 'corridor', title: 'Red Team Assessment', purpose: 'Inside an authorized fence, to test whether protection actually holds along real paths.' },
      { no: '04', figure: 'signals', title: 'APT Threat Intelligence Research', purpose: 'To gather scattered weak signals into intelligence that can be queried, verified, and used to decide.' },
      { no: '05', figure: 'protocol', title: 'Non-invasive Brain-Computer Interface', purpose: 'To rehearse protocols and interaction in software, without stepping into human experiments or clinical use.' },
      { no: '06', figure: 'ground', title: 'CTF Competition Hosting', purpose: 'To turn practice into capability that can be learned and reused, through contests and challenges.' },
    ],
  },
  ko: {
    kicker: '0xE9 · six near jumps',
    title: '이것들은 무엇을 위한가',
    lede: '여섯 가지 업무, 여섯 번의 근거리 점프. 각 점프에는 목적이 있다. 먼저 움직임을 보고, 그다음 설명을 읽으면 된다.',
    hint: '아래로 스크롤해 다음 점프로 들어가라.',
    outroKicker: 'JMP still open',
    outroTitle: '설명은 업무 페이지에 있고, 미래는 각각의 프레젠테이션에 있다.',
    outroBody: '공개 본문은 다시 쓰지 않았다. 이어지는 프레젠테이션은 지능 폭발 속에서 이 일이 무엇이 될지를 말할 뿐이다. 그것은 추측이지, 이미 인도된 제품이 아니다.',
    acts: [
      { no: '01', figure: 'loop', title: '네트워크 방어', purpose: '모니터링, 헌팅, 운영을 실제로 돌아갈 수 있는 하나의 방어 루프로 모은다.' },
      { no: '02', figure: 'timeline', title: '사고 대응', purpose: '사건이 일어난 뒤, 경과를 재구성하고, 그 경험을 다음번에 쓸 수 있는 절차로 만든다.' },
      { no: '03', figure: 'corridor', title: '레드팀 평가', purpose: '인가된 울타리 안에서, 실제 경로를 따라 방어가 정말로 유효한지 시험한다.' },
      { no: '04', figure: 'signals', title: 'APT 위협 정보 연구', purpose: '흩어진 약한 신호를, 조회하고 검증하며 결정에 쓸 수 있는 정보로 모은다.' },
      { no: '05', figure: 'protocol', title: '비침습적 뇌-컴퓨터 인터페이스', purpose: '소프트웨어 안에서 프로토콜과 상호작용을 밀어 보며, 인체 실험이나 임상 용도로는 밟고 들어가지 않는다.' },
      { no: '06', figure: 'ground', title: 'CTF 대회 개최', purpose: '대회와 문제로, 실전을 배우고 재사용할 수 있는 역량으로 바꾼다.' },
    ],
  },
};

const decks: Record<Locale, Record<ServiceNo, VisionDeck>> = {
  zh: {
    '01': {
      no: '01',
      figure: 'loop',
      kicker: '网络防御 · 智能爆炸',
      speculation: '以下是对未来的推测，不是已经上线的能力。',
      slides: [
        { kicker: '01 / 00', figure: 'burst', mark: '推测', title: '防御的时间会被压到几乎看不见。', body: '可以先放下锚定。事情会变得很快，也会变得很疯狂，因为它们确实会。这不是一份产品手册。这是网络防御被抛进智能爆炸之后，可能出现的天气。' },
        { kicker: '01 / 01', figure: 'loop', mark: '公开说明', title: '此刻这条业务在做什么。', body: '持续监测，威胁狩猎，防御策略，安全运营。围绕资产、流量、日志与告警，建立一个可以落地的闭环。关注的不只是发现风险，也包括把规则、流程和机制沉淀为可复用的产品能力。' },
        { kicker: '01 / 02', figure: 'clock', mark: '推测', title: '循环会自己加速。', body: '当狩猎、告警与处置都被机器推着跑，防御不再等早会。夜晚也不再结束。闭环还在，只是它的一圈会短过一次呼吸。我们并不声称已经跑着那样的循环。' },
        { kicker: '01 / 03', figure: 'burst', mark: '推测', title: '攻防两边都会化合物一样堆叠。', body: '进攻会写进攻，防御会写防御。规则刚沉淀下来，对面已经换了一种走法。产品能力若只是一张静态的清单，会在第一周过时。疯狂之处不在工具更多，而在双方同时学会自我改写。' },
        { kicker: '01 / 04', figure: 'hold', mark: '仍需守住', title: '人还是要在回路里。', body: '可复用不是无人值守的许可。策略、授权与责任不能跟着速度一起蒸发。爆炸会来，围栏还是要在。发现风险之后，仍要有人决定哪一条规则可以留下来。' },
        { kicker: '01 / 05', figure: 'horizon', mark: '推测', title: '防御将变成一种活着的气候。', body: '资产会自己报到，流量会自己解释，告警会自己结成天气图。那不是今天的交付物。那是这条业务必须学会面向的地平线：一个不断改写自己、却仍可运营的闭环。' },
        { kicker: '01 / 06', figure: 'jump', mark: '观微知著', title: '在字节里看见线索，再决定跳到哪里。', body: '消隐于无形，不是消失。是在加速的噪声里，仍能看见该守住的那一条线，然后落下准确的一跳。' },
      ],
    },
    '02': {
      no: '02',
      figure: 'timeline',
      kicker: '应急响应 · 智能爆炸',
      speculation: '以下是对未来的推测，不是已经上线的能力。',
      slides: [
        { kicker: '02 / 00', figure: 'burst', mark: '推测', title: '事件的时钟会被拧断。', body: '曾经用天来量的入侵，会用秒来爆发。还原经过、划定范围、写下处置要点——这些动作还在，只是窗口会窄到近乎无礼。事情会变得疯狂，因为它们确实会。' },
        { kicker: '02 / 01', figure: 'timeline', mark: '公开说明', title: '此刻这条业务在做什么。', body: '面向安全事件：事件响应，入侵取证，日志与监测分析。协助还原经过，定位影响范围，梳理处置要点。经验再沉淀为流程、检测规则与取证能力，服务于更广泛的防护场景。' },
        { kicker: '02 / 02', figure: 'clock', mark: '推测', title: '每一枚字节都想作证。', body: '日志会自我繁殖，证据会堆成气候。取证不再是翻一只抽屉，而像在暴雨里收集所有落在地上的名字。机器可以帮着排列，却不能被允许擅自宣判。' },
        { kicker: '02 / 03', figure: 'timeline', mark: '推测', title: '时间线会自己书写，也会自己撒谎。', body: '生成的痕迹、伪造的顺序、被改写的记忆，都会挤进同一条河。还原经过将变成一场对时间本身的辩论。疯狂的不是材料不够，而是材料太多，并且有一部分在表演。' },
        { kicker: '02 / 04', figure: 'hold', mark: '仍需守住', title: '流程必须比速度更可验证。', body: '经验要沉淀为可复用的规则，不是沉淀为无法追问的自动结论。谁看过原始材料，谁做了取舍，范围是怎样划出的——这些在爆炸之后只会更重要，不会更少。' },
        { kicker: '02 / 05', figure: 'horizon', mark: '推测', title: '响应会变成一种可排练的记忆。', body: '下一次事件到来之前，流程已经在无数条模拟的时间线里走过。那仍是推测中的能力。它服务的是更广泛的防护，而不是对某一个案件的神话。' },
        { kicker: '02 / 06', figure: 'jump', mark: '观微知著', title: '先看见线索，再落下处置的那一跳。', body: '在被拧断的时钟里，仍然把经过说清楚。这是应急响应在智能爆炸里不应放弃的工作。' },
      ],
    },
    '03': {
      no: '03',
      figure: 'corridor',
      kicker: '红队评估 · 智能爆炸',
      speculation: '以下是对未来的推测，不是已经上线的能力。评估仍只在明确授权的范围内。',
      slides: [
        { kicker: '03 / 00', figure: 'burst', mark: '推测', title: '可能的攻击路径会自己生长。', body: '授权范围还在。围栏还在。里面的路径却会像枝条一样分叉、改写、重新组合。事情会变得疯狂，因为它们确实会。我们仍然只在许可之内谈论它们。' },
        { kicker: '03 / 01', figure: 'corridor', mark: '公开说明', title: '此刻这条业务在做什么。', body: '在明确授权范围内开展红队评估、攻防演练与攻击面验证，沿真实攻击路径检验防护体系的有效性。结果用于发现防御短板，验证检测与响应，并推动安全策略和产品能力改进。' },
        { kicker: '03 / 02', figure: 'corridor', mark: '推测', title: '演练会变成许多种未来的对打。', body: '对手不再是一份写死的剧本。评估会面对一整族可能的走法——仍被关在授权的走廊里。走廊可以很长，但不能没有墙。没有围栏的想象，不是红队，只是失散。' },
        { kicker: '03 / 03', figure: 'burst', mark: '推测', title: '短板会在更短的时间里暴露，也会伪装。', body: '检测与响应会被用它自己都没见过的速度来检验。有些缺口会亮得刺眼，有些会假装已经被补上。评估的工作将是把真实的路径从表演里认出来。' },
        { kicker: '03 / 04', figure: 'hold', mark: '仍需守住', title: '授权不是脚注，是整个场地。', body: '智能爆炸不能把围栏烧成装饰。范围、许可、可撤回的同意，是这条业务存在的理由。再疯狂的推演，也必须停在授权结束的那条线上。' },
        { kicker: '03 / 05', figure: 'horizon', mark: '推测', title: '评估将帮助策略学会自我修订。', body: '每一次沿真实路径走完，都应把短板交还给防御和产品，而不是变成一份只被收藏的报告。那是改进的方向，不是一份已经完成的成绩单。' },
        { kicker: '03 / 06', figure: 'jump', mark: '观微知著', title: '看清路径，再跳。不要翻出围栏。', body: '红队评估在爆炸里会更加必要，也更加需要克制。许可之内的一跳，才是有效的一跳。' },
      ],
    },
    '04': {
      no: '04',
      figure: 'signals',
      kicker: 'APT 威胁情报研究 · 智能爆炸',
      speculation: '以下是对未来的推测，不是已经上线的能力。',
      slides: [
        { kicker: '04 / 00', figure: 'burst', mark: '推测', title: '弱信号会变成一种天气。', body: '线索不再稀疏。它们会下雨一样落下，也会互相干扰。归因、生产、狩猎，都会被卷进同一场气候。事情会变得疯狂，因为它们确实会。' },
        { kicker: '04 / 01', figure: 'signals', mark: '公开说明', title: '此刻这条业务在做什么。', body: '围绕高级持续性威胁，做线索发现、归因分析、情报生产与狩猎方法研究。关注攻击链中的弱信号、基础设施痕迹与行为模式，把分散的线索转化为可查询、可验证、可用于防御决策的情报能力。' },
        { kicker: '04 / 02', figure: 'signals', mark: '推测', title: '基础设施会像星图一样闪烁。', body: '域名、节点、跳板，会亮起又熄灭。行为模式会在你还没命名之前就换一套衣服。狩猎方法必须学会在闪烁里保持追问，而不是抓住第一颗亮点就宣布真相。' },
        { kicker: '04 / 03', figure: 'burst', mark: '推测', title: '归因会变得又快又吵。', body: '机器会给出许多看似完整的故事。有些故事互相打架，有些只是把噪声绣成了图案。情报的价值不在故事好听，而在它仍能被查询、被复核、被拿去作防御上的决定。' },
        { kicker: '04 / 04', figure: 'hold', mark: '仍需守住', title: '可验证比壮观更重要。', body: '把分散线索收拢，不是把它们熔化成不可追问的结论。来源、方法、不确定的边界，都要留下来。用于决策的情报，必须还能被打开看。' },
        { kicker: '04 / 05', figure: 'horizon', mark: '推测', title: '情报将更像一份活着的索引。', body: '不是一本印死的年报，而是可以不断改写、不断被查问的能力。弱信号进来，痕迹被交叉，行为被对照——然后仍给人留下否决的位置。那是地平线，不是已经铺开的产品。' },
        { kicker: '04 / 06', figure: 'jump', mark: '观微知著', title: '先看见微弱的那一笔，再跳。', body: '消隐于无形的，往往是真正的线索。爆炸越亮，越要学会在亮里把微光认出来。' },
      ],
    },
    '05': {
      no: '05',
      figure: 'protocol',
      kicker: '非侵入式脑机接口 · 智能爆炸',
      speculation: '以下是对未来的推测与问题，不是临床承诺。当前工作仅在软件层面模拟，不涉及人体实验、临床用途或医疗诊断。',
      slides: [
        { kicker: '05 / 00', figure: 'burst', mark: '推测', title: '思想与机器之间的边界会变得很吵。', body: '接口问题会来得比人们准备好的更快。那不意味着今天要踏进人体或诊所。当前的工作停在软件里。下面说的是这个问题会怎样变疯，以及哪些线仍不能踩。' },
        { kicker: '05 / 01', figure: 'protocol', mark: '公开说明', title: '此刻这条业务在做什么。', body: '聚焦非侵入式脑机接口的协议研究、软件仿真与交互流程验证。当前仅在软件层面开展模拟，不涉及人体实验、临床用途或医疗诊断。研究覆盖协议设计、数据流与处理、交互应用验证，以及数据安全、隐私保护与合规使用。' },
        { kicker: '05 / 02', figure: 'protocol', mark: '推测', title: '协议会先于身体到达未来。', body: '在仿真里，数据流、握手、权限、拒绝权，都可以被反复推演。智能爆炸会让这些协议面对更诡异的输入、更快的误读、更贪心的调用。研究可以走在前面，但不必、也不应提前成为植入或诊断。' },
        { kicker: '05 / 03', figure: 'burst', mark: '推测', title: '交互会提出一些令人不安的问题。', body: '谁在发起一次读取。一次拒绝是否真的被执行。模拟中的“意图”被写错时，系统怎样停下来。这些问题可以、也应当在软件里被问得很彻底。它们不是一份临床计划。' },
        { kicker: '05 / 04', figure: 'hold', mark: '仍需守住', title: '安全、隐私与合规不是结尾的致谢。', body: '数据安全、隐私保护、合规使用，是这条研究的一部分，不是装饰。非侵入、软件模拟、不进入人体实验或医疗诊断——这几条线在爆炸之后仍然有效。未来尽可以疯狂，场地却必须清楚。' },
        { kicker: '05 / 05', figure: 'horizon', mark: '推测', title: '我们谈论接口，而不许诺增强。', body: '地平线上会出现更多关于注意、语言、代理权的问题。可以讨论它们。不能把讨论写成已经完成的人体试验，也不能把仿真写成治疗或增强的承诺。' },
        { kicker: '05 / 06', figure: 'jump', mark: '观微知著', title: '先把协议看清楚，再决定跳不跳。', body: '在软件的围栏里把交互问完，是这条业务面对疯狂未来时仍然体面的方式。' },
      ],
    },
    '06': {
      no: '06',
      figure: 'ground',
      kicker: 'CTF赛事承办 · 智能爆炸',
      speculation: '以下是对未来的推测，不是已经举办的某一场比赛。',
      slides: [
        { kicker: '06 / 00', figure: 'burst', mark: '推测', title: '训练场也会被爆炸点着。', body: '赛题会自己改写，解题会自己加速，复盘会来不及写成文字。事情会变得疯狂，因为它们确实会。赛事仍可以是学习的地方——如果它不被做成纯奇观。' },
        { kicker: '06 / 01', figure: 'ground', mark: '公开说明', title: '此刻这条业务在做什么。', body: '面向高校或政企，提供 CTF 赛事承办、赛题设计与配套能力训练。覆盖比赛组织、题目构建、环境保障和赛后复盘。希望通过赛事与训练，把实战经验转化为可学习、可复用的安全能力。' },
        { kicker: '06 / 02', figure: 'ground', mark: '推测', title: '题目会开始对解题者说话。', body: '环境和题目不再是一套冻住的道具。它们可能随对手的路径而分支，也可能被自动生成后再被仔细挑选。设计的工作不会消失，只会从“出一道题”变成“守住一座会呼吸的场地”。' },
        { kicker: '06 / 03', figure: 'clock', mark: '推测', title: '训练的节奏会离开学期的日历。', body: '能力如果只按赛季更新，会跟不上爆炸的步距。高校与政企需要的，将是更能迁移的方法，而不只是一张当时的榜。复盘必须快，也必须仍能被读懂。' },
        { kicker: '06 / 04', figure: 'hold', mark: '仍需守住', title: '可学习、可复用，高于热闹。', body: '承办可以很壮观，但不能只剩下壮观。组织、环境、公平、赛后把经验交还给训练——这些在速度起来之后更加要紧。一场无法被学习的比赛，只是一阵烟。' },
        { kicker: '06 / 05', figure: 'horizon', mark: '推测', title: '赛事会成为一种集体的消防演习。', body: '不是预言某一年的某项杯赛。是想象：当实战经验必须被更快地变成公共能力，承办与赛题设计会站在这条传送带上。那是方向，不是已经盖章的日程。' },
        { kicker: '06 / 06', figure: 'jump', mark: '观微知著', title: '把经验交给下一跳的人。', body: '看清题目里的线索，再决定怎么跳。训练的意义不在当场的喧哗，而在走出会场之后仍用得上的那一部分。' },
      ],
    },
  },
  en: {
    '01': {
      no: '01',
      figure: 'loop',
      kicker: 'Network Defense · Intelligence explosion',
      speculation: 'What follows is speculation about the future, not a capability already in production.',
      slides: [
        { kicker: '01 / 00', figure: 'burst', mark: 'Speculation', title: 'The time of defense will be pressed almost out of sight.', body: 'Drop the anchor if you have one. Things will get fast, and they will get wild, because they will. This is not a product manual. It is the weather that may arrive when network defense is thrown into an intelligence explosion.' },
        { kicker: '01 / 01', figure: 'loop', mark: 'Public note', title: 'What this line of work does now.', body: 'Continuous monitoring, threat hunting, defensive strategy, security operations. Around assets, traffic, logs, and alerts, a loop that can actually be run. The concern is not only finding risk, but also settling rules, processes, and mechanisms into reusable product capability.' },
        { kicker: '01 / 02', figure: 'clock', mark: 'Speculation', title: 'The loop will accelerate itself.', body: 'When hunting, alerting, and handling are all pushed by machines, defense no longer waits for the morning meeting. The night no longer ends. The loop remains; one turn of it may be shorter than a breath. We do not claim to be running that loop today.' },
        { kicker: '01 / 03', figure: 'burst', mark: 'Speculation', title: 'Both sides will stack like compounds.', body: 'Offense will write offense. Defense will write defense. A rule has barely settled before the other side changes its walk. If product capability is only a static list, it will be dated in a week. The madness is not that there are more tools. It is that both sides learn to rewrite themselves at once.' },
        { kicker: '01 / 04', figure: 'hold', mark: 'Still to be held', title: 'A person still belongs in the loop.', body: 'Reusable is not a license for no one to be present. Policy, authorization, and responsibility must not evaporate with speed. The explosion will come; the fence should remain. After risk is found, someone still decides which rule may stay.' },
        { kicker: '01 / 05', figure: 'horizon', mark: 'Speculation', title: 'Defense will become a living climate.', body: 'Assets will report themselves, traffic will explain itself, alerts will gather into a weather map. That is not a deliverable of today. It is the horizon this work has to learn to face: a loop that keeps rewriting itself and can still be operated.' },
        { kicker: '01 / 06', figure: 'jump', mark: '观微知著', title: 'See the clue in the bytes, then decide where to jump.', body: 'To vanish into the formless is not to disappear. It is, in accelerating noise, still to see the line that must be held — and then to land the accurate jump.' },
      ],
    },
    '02': {
      no: '02',
      figure: 'timeline',
      kicker: 'Incident Response · Intelligence explosion',
      speculation: 'What follows is speculation about the future, not a capability already in production.',
      slides: [
        { kicker: '02 / 00', figure: 'burst', mark: 'Speculation', title: 'The clock of an incident will be wrung until it breaks.', body: 'Intrusions once measured in days will erupt in seconds. Reconstructing what happened, fixing the scope, writing down what to do — the actions remain, but the window will narrow to the point of rudeness. Things will get wild, because they will.' },
        { kicker: '02 / 01', figure: 'timeline', mark: 'Public note', title: 'What this line of work does now.', body: 'For security incidents: response, intrusion forensics, log and monitoring analysis. Help reconstruct the course of events, locate the scope of impact, and sort out the points of handling. Experience is then settled into processes, detection rules, and forensic capability, in service of a wider range of protection.' },
        { kicker: '02 / 02', figure: 'clock', mark: 'Speculation', title: 'Every byte will want to testify.', body: 'Logs will breed. Evidence will pile into climate. Forensics will no longer be the opening of a drawer; it will be gathering every name that fell in a rainstorm. Machines can help with the arrangement. They must not be allowed to pass judgment on their own.' },
        { kicker: '02 / 03', figure: 'timeline', mark: 'Speculation', title: 'The timeline will write itself, and it will also lie.', body: 'Generated traces, forged order, rewritten memory will all crowd into the same river. Reconstructing what happened will become an argument with time itself. The madness is not that material is scarce. It is that there is too much of it, and some of it is performing.' },
        { kicker: '02 / 04', figure: 'hold', mark: 'Still to be held', title: 'Process must be more verifiable than speed.', body: 'Experience should settle into reusable rules, not into automatic conclusions that cannot be questioned. Who saw the raw material, who made the cuts, how the scope was drawn — after the explosion these will matter more, not less.' },
        { kicker: '02 / 05', figure: 'horizon', mark: 'Speculation', title: 'Response will become a memory that can be rehearsed.', body: 'Before the next incident arrives, the process will already have walked a great many simulated timelines. That is still a capability in speculation. It would serve a wider protection, not the mythology of a single case.' },
        { kicker: '02 / 06', figure: 'jump', mark: '观微知著', title: 'See the clue first, then make the jump of handling.', body: 'Inside a wrung clock, still say clearly what happened. That is the work incident response should not abandon in an intelligence explosion.' },
      ],
    },
    '03': {
      no: '03',
      figure: 'corridor',
      kicker: 'Red Team Assessment · Intelligence explosion',
      speculation: 'What follows is speculation about the future, not a capability already in production. Assessment remains inside a clearly authorized scope.',
      slides: [
        { kicker: '03 / 00', figure: 'burst', mark: 'Speculation', title: 'Possible attack paths will grow by themselves.', body: 'The authorized scope remains. The fence remains. Inside it, paths will fork, rewrite, and recombine like branches. Things will get wild, because they will. We still speak of them only inside permission.' },
        { kicker: '03 / 01', figure: 'corridor', mark: 'Public note', title: 'What this line of work does now.', body: 'Within a clearly authorized scope: red-team assessment, attack-defense exercises, and attack-surface validation, testing a protection system along real attack paths. The results find defensive gaps, verify detection and response, and drive improvement in security policy and product capability.' },
        { kicker: '03 / 02', figure: 'corridor', mark: 'Speculation', title: 'An exercise will become a match against many futures.', body: 'The adversary will no longer be a script written once. Assessment will meet a family of possible walks — still shut inside an authorized corridor. The corridor may be long. It cannot be without walls. Imagination with no fence is not a red team. It is only a wandering-off.' },
        { kicker: '03 / 03', figure: 'burst', mark: 'Speculation', title: 'Gaps will show sooner, and they will also disguise themselves.', body: 'Detection and response will be tested at speeds they have not seen. Some openings will glare. Some will pretend already to have been closed. The work of assessment will be to recognize the real path inside the performance.' },
        { kicker: '03 / 04', figure: 'hold', mark: 'Still to be held', title: 'Authorization is not a footnote. It is the ground.', body: 'An intelligence explosion must not burn the fence into décor. Scope, permission, and consent that can be withdrawn are why this work exists. However wild the rehearsal, it has to stop at the line where authorization ends.' },
        { kicker: '03 / 05', figure: 'horizon', mark: 'Speculation', title: 'Assessment will help policy learn to revise itself.', body: 'Each time a real path is walked to the end, the gap should be handed back to defense and to product, not filed as a report that is only collected. That is a direction of improvement, not a report card already finished.' },
        { kicker: '03 / 06', figure: 'jump', mark: '观微知著', title: 'See the path clearly, then jump. Do not climb the fence.', body: 'In the explosion, red-team assessment will be more necessary, and will need more restraint. A jump inside permission is the jump that counts.' },
      ],
    },
    '04': {
      no: '04',
      figure: 'signals',
      kicker: 'APT Threat Intelligence Research · Intelligence explosion',
      speculation: 'What follows is speculation about the future, not a capability already in production.',
      slides: [
        { kicker: '04 / 00', figure: 'burst', mark: 'Speculation', title: 'Weak signals will become a kind of weather.', body: 'Clues will no longer be sparse. They will fall like rain, and they will interfere with one another. Attribution, production, and hunting will be drawn into the same climate. Things will get wild, because they will.' },
        { kicker: '04 / 01', figure: 'signals', mark: 'Public note', title: 'What this line of work does now.', body: 'Around advanced persistent threats: clue discovery, attribution analysis, intelligence production, and research on hunting methods. Attention to weak signals, infrastructure traces, and behavioral patterns in the attack chain, turning scattered clues into intelligence that can be queried, verified, and used in defensive decisions.' },
        { kicker: '04 / 02', figure: 'signals', mark: 'Speculation', title: 'Infrastructure will flicker like a star map.', body: 'Domains, nodes, stepping-stones will light and go dark. Behavioral patterns will change their clothes before they have been named. Hunting methods will have to keep asking questions inside the flicker, and not declare a truth at the first bright point.' },
        { kicker: '04 / 03', figure: 'burst', mark: 'Speculation', title: 'Attribution will become fast, and loud.', body: 'Machines will offer many stories that look complete. Some will fight each other. Some will only have embroidered noise into a pattern. The value of intelligence is not that the story is pleasing. It is that it can still be queried, checked, and taken into a defensive decision.' },
        { kicker: '04 / 04', figure: 'hold', mark: 'Still to be held', title: 'Being verifiable matters more than being spectacular.', body: 'To gather scattered clues is not to melt them into a conclusion that cannot be questioned. Sources, methods, and the edges of uncertainty should remain. Intelligence used for decisions must still be able to be opened and read.' },
        { kicker: '04 / 05', figure: 'horizon', mark: 'Speculation', title: 'Intelligence will look more like a living index.', body: 'Not a yearbook printed once, but a capability that can be rewritten and interrogated. Weak signals come in, traces are crossed, behaviors are compared — and a person is still left a place to refuse. That is a horizon, not a product already unrolled.' },
        { kicker: '04 / 06', figure: 'jump', mark: '观微知著', title: 'See the faint stroke first, then jump.', body: 'What vanishes into the formless is often the real clue. The brighter the explosion, the more one has to learn to recognize a dim light inside the glare.' },
      ],
    },
    '05': {
      no: '05',
      figure: 'protocol',
      kicker: 'Non-invasive BCI · Intelligence explosion',
      speculation: 'What follows is speculation and a set of questions, not a clinical promise. Present work is software-layer simulation only, and does not involve human experiments, clinical use, or medical diagnosis.',
      slides: [
        { kicker: '05 / 00', figure: 'burst', mark: 'Speculation', title: 'The border between thought and machine will get noisy.', body: 'Questions of interface will arrive faster than people are ready for. That does not mean stepping into the body or the clinic today. Present work stays in software. What follows is how the question may go wild, and which lines still must not be crossed.' },
        { kicker: '05 / 01', figure: 'protocol', mark: 'Public note', title: 'What this line of work does now.', body: 'Protocol research, software simulation, and interaction-flow validation for non-invasive brain-computer interfaces. At present, simulation at the software layer only; no human experiments, clinical use, or medical diagnosis. The work covers protocol design, data flow and processing, validation of interactive applications, and data security, privacy protection, and compliant use.' },
        { kicker: '05 / 02', figure: 'protocol', mark: 'Speculation', title: 'Protocol will reach the future before the body does.', body: 'In simulation, data flow, handshake, permission, and the right to refuse can be rehearsed again and again. An intelligence explosion will throw stranger inputs, faster misreadings, and greedier calls at those protocols. Research can walk ahead. It need not, and should not, become an implant or a diagnosis in advance.' },
        { kicker: '05 / 03', figure: 'burst', mark: 'Speculation', title: 'Interaction will ask some uneasy questions.', body: 'Who initiates a read. Whether a refusal is actually executed. How the system stops when a simulated “intent” is written wrongly. These questions can and should be asked thoroughly in software. They are not a clinical plan.' },
        { kicker: '05 / 04', figure: 'hold', mark: 'Still to be held', title: 'Security, privacy, and compliance are not an acknowledgments page.', body: 'Data security, privacy protection, and compliant use are part of this research, not décor. Non-invasive, software simulation, no human experiments or medical diagnosis — these lines still hold after the explosion. The future may be wild. The ground must stay clear.' },
        { kicker: '05 / 05', figure: 'horizon', mark: 'Speculation', title: 'We talk about interfaces. We do not promise enhancement.', body: 'On the horizon there will be more questions about attention, language, and agency. They can be discussed. The discussion must not be written as a completed human trial, nor the simulation as a promise of therapy or enhancement.' },
        { kicker: '05 / 06', figure: 'jump', mark: '观微知著', title: 'See the protocol clearly, then decide whether to jump.', body: 'To finish asking the questions of interaction inside a software fence is still a decent way for this work to face a wild future.' },
      ],
    },
    '06': {
      no: '06',
      figure: 'ground',
      kicker: 'CTF Competition Hosting · Intelligence explosion',
      speculation: 'What follows is speculation about the future, not a contest already held.',
      slides: [
        { kicker: '06 / 00', figure: 'burst', mark: 'Speculation', title: 'The training ground will be set alight by the explosion too.', body: 'Challenges will rewrite themselves, solving will accelerate, and the after-action review will barely keep up in words. Things will get wild, because they will. A contest can still be a place of learning — if it is not made into pure spectacle.' },
        { kicker: '06 / 01', figure: 'ground', mark: 'Public note', title: 'What this line of work does now.', body: 'For universities or government and enterprise: CTF hosting, challenge design, and supporting capability training. Organization, challenge construction, environment support, and after-action review. The hope is that, through contests and training, practical experience becomes security capability that can be learned and reused.' },
        { kicker: '06 / 02', figure: 'ground', mark: 'Speculation', title: 'Challenges will begin to speak back to those who solve them.', body: 'Environments and problems will no longer be a set of frozen props. They may branch with an opponent’s path, or be generated and then carefully chosen. Design will not vanish. It will move from “set one problem” to “keep a breathing ground.”' },
        { kicker: '06 / 03', figure: 'clock', mark: 'Speculation', title: 'The tempo of training will leave the academic calendar.', body: 'If capability updates only by season, it will not keep the stride of the explosion. Universities and enterprises will need methods that travel, not only a table of scores from that day. Review must be fast, and still readable.' },
        { kicker: '06 / 04', figure: 'hold', mark: 'Still to be held', title: 'Learnable and reusable stand above the noise.', body: 'Hosting may be spectacular. It cannot be only spectacle. Organization, environment, fairness, and handing experience back to training after the contest — these matter more once speed rises. A contest that cannot be learned from is only a puff of smoke.' },
        { kicker: '06 / 05', figure: 'horizon', mark: 'Speculation', title: 'Contests will become a kind of collective fire drill.', body: 'This is not a prophecy of a cup in a given year. It is an imagining: when practical experience must be turned faster into a shared capability, hosting and challenge design will stand on that conveyor. That is a direction, not a calendar already stamped.' },
        { kicker: '06 / 06', figure: 'jump', mark: '观微知著', title: 'Hand the experience to the person who takes the next jump.', body: 'See the clue in the challenge, then decide how to jump. The point of training is not the noise in the hall, but the part that can still be used after leaving it.' },
      ],
    },
  },
  ko: {
    '01': {
      no: '01',
      figure: 'loop',
      kicker: '네트워크 방어 · 지능 폭발',
      speculation: '이하는 미래에 대한 추측이며, 이미 운용 중인 역량이 아니다.',
      slides: [
        { kicker: '01 / 00', figure: 'burst', mark: '추측', title: '방어의 시간은 거의 보이지 않을 만큼 눌릴 것이다.', body: '닻을 내려놓아도 좋다. 일은 빨라질 것이고, 미친 듯이 변할 것이다. 왜냐하면 정말로 그렇게 될 것이기 때문이다. 이것은 제품 설명서가 아니다. 네트워크 방어가 지능 폭발 속으로 던져진 뒤에 찾아올 수 있는 날씨다.' },
        { kicker: '01 / 01', figure: 'loop', mark: '공개 설명', title: '지금 이 업무가 하는 일.', body: '지속 모니터링, 위협 헌팅, 방어 전략, 보안 운영. 자산, 트래픽, 로그, 경보를 둘러싸고 실제로 운영할 수 있는 루프를 세운다. 관심을 두는 것은 위험의 발견만이 아니라, 규칙과 절차와 메커니즘을 재사용 가능한 제품 역량으로 응축하는 일이다.' },
        { kicker: '01 / 02', figure: 'clock', mark: '추측', title: '루프는 스스로 가속할 것이다.', body: '헌팅, 경보, 조치가 모두 기계에 밀려 달릴 때, 방어는 아침 회의를 기다리지 않는다. 밤도 더 이상 끝나지 않는다. 루프는 남는다. 다만 한 바퀴가 숨 한 번보다 짧아질 수 있다. 우리가 이미 그런 순환을 돌리고 있다고 주장하지는 않는다.' },
        { kicker: '01 / 03', figure: 'burst', mark: '추측', title: '공방의 양쪽이 화합물처럼 쌓일 것이다.', body: '공격은 공격을 쓰고, 방어는 방어를 쓴다. 규칙이 겨우 자리 잡으면 상대는 이미 걸음걸이를 바꾼다. 제품 역량이 정적 목록에 불과하면 일주일 만에 낡은 것이 된다. 광기는 도구가 많아진다는 데 있지 않다. 양쪽이 동시에 자신을 다시 쓰는 법을 배운다는 데 있다.' },
        { kicker: '01 / 04', figure: 'hold', mark: '지켜야 할 것', title: '사람은 여전히 루프 안에 있어야 한다.', body: '재사용 가능하다는 것이 무인 허가증은 아니다. 정책, 인가, 책임은 속도를 따라 증발해서는 안 된다. 폭발은 올 것이다. 울타리는 남아 있어야 한다. 위험을 발견한 뒤에도, 어떤 규칙을 남길지는 사람이 정해야 한다.' },
        { kicker: '01 / 05', figure: 'horizon', mark: '추측', title: '방어는 살아 있는 기후가 될 것이다.', body: '자산은 스스로 보고하고, 트래픽은 스스로 설명하며, 경보는 일기 지도로 모일 것이다. 그것은 오늘의 산출물이 아니다. 이 업무가 마주하는 법을 배워야 할 지평이다. 자신을 계속 다시 쓰면서도 운영될 수 있는 루프.' },
        { kicker: '01 / 06', figure: 'jump', mark: '观微知著', title: '바이트 속에서 단서를 보고, 어디로 점프할지를 정한다.', body: '형체 없는 것 속으로 스며드는 것은 소멸이 아니다. 가속하는 소음 속에서도 지켜야 할 선을 보고, 정확한 한 번의 점프를 착지하는 일이다.' },
      ],
    },
    '02': {
      no: '02',
      figure: 'timeline',
      kicker: '사고 대응 · 지능 폭발',
      speculation: '이하는 미래에 대한 추측이며, 이미 운용 중인 역량이 아니다.',
      slides: [
        { kicker: '02 / 00', figure: 'burst', mark: '추측', title: '사건의 시계는 비틀려 끊어질 것이다.', body: '하루 단위로 재던 침입이 초 단위로 터질 것이다. 경과를 재구성하고, 범위를 정하고, 조치 요점을 적는 동작은 남는다. 다만 창은 무례하리만큼 좁아질 것이다. 일은 미친 듯이 변할 것이다. 왜냐하면 정말로 그렇게 될 것이기 때문이다.' },
        { kicker: '02 / 01', figure: 'timeline', mark: '공개 설명', title: '지금 이 업무가 하는 일.', body: '보안 사고를 대상으로 사고 대응, 침입 포렌식, 로그와 모니터링 분석. 경과를 재구성하고 영향 범위를 파악하며 조치 요점을 정리하는 일을 돕는다. 경험은 절차, 탐지 규칙, 포렌식 역량으로 응축되어 더 넓은 방어 현장에 쓰인다.' },
        { kicker: '02 / 02', figure: 'clock', mark: '추측', title: '모든 바이트가 증언하고 싶어 할 것이다.', body: '로그는 스스로 증식하고, 증거는 기후처럼 쌓인다. 포렌식은 서랍 하나를 여는 일이 아니라, 폭우 속에 떨어진 모든 이름을 모으는 일에 가까워진다. 기계는 배열을 도울 수 있다. 혼자 선고하도록 두어서는 안 된다.' },
        { kicker: '02 / 03', figure: 'timeline', mark: '추측', title: '타임라인은 스스로 쓰이고, 스스로 거짓말할 것이다.', body: '생성된 흔적, 위조된 순서, 다시 쓰인 기억이 같은 강으로 몰려든다. 경과를 재구성하는 일은 시간 자체와의 논쟁이 된다. 광기는 재료가 부족한 데 있지 않다. 재료가 너무 많고, 그중 일부가 연기를 한다는 데 있다.' },
        { kicker: '02 / 04', figure: 'hold', mark: '지켜야 할 것', title: '절차는 속도보다 검증 가능해야 한다.', body: '경험은 재사용 가능한 규칙으로 응축되어야 하며, 물을 수 없는 자동 결론으로 응축되어서는 안 된다. 누가 원자료를 보았는지, 누가 취사선택했는지, 범위가 어떻게 그어졌는지. 폭발 이후 이것들은 더 중요해질 뿐, 덜해지지 않는다.' },
        { kicker: '02 / 05', figure: 'horizon', mark: '추측', title: '대응은 리허설할 수 있는 기억이 될 것이다.', body: '다음 사건이 오기 전에, 절차는 이미 수많은 모의 타임라인을 걸어 보았을 것이다. 그것은 아직 추측 속의 역량이다. 그것이 섬기는 것은 더 넓은 방어이지, 어느 한 사건에 대한 신화가 아니다.' },
        { kicker: '02 / 06', figure: 'jump', mark: '观微知著', title: '먼저 단서를 보고, 그다음 조치의 점프를 한다.', body: '비틀린 시계 안에서도 경과를 분명하게 말한다. 그것이 지능 폭발 속에서 사고 대응이 포기해서는 안 되는 일이다.' },
      ],
    },
    '03': {
      no: '03',
      figure: 'corridor',
      kicker: '레드팀 평가 · 지능 폭발',
      speculation: '이하는 미래에 대한 추측이며, 이미 운용 중인 역량이 아니다. 평가는 여전히 명확히 인가된 범위 안에서만 이루어진다.',
      slides: [
        { kicker: '03 / 00', figure: 'burst', mark: '추측', title: '가능한 공격 경로는 스스로 자랄 것이다.', body: '인가 범위는 남는다. 울타리도 남는다. 그 안에서 경로는 가지처럼 갈라지고, 다시 쓰이며, 다시 결합할 것이다. 일은 미친 듯이 변할 것이다. 왜냐하면 정말로 그렇게 될 것이기 때문이다. 우리는 여전히 허가 안에서만 그것을 말한다.' },
        { kicker: '03 / 01', figure: 'corridor', mark: '공개 설명', title: '지금 이 업무가 하는 일.', body: '명확히 인가된 범위 안에서 레드팀 평가, 공방 훈련, 공격 표면 검증을 수행하고, 실제 공격 경로를 따라 방어 체계의 유효성을 시험한다. 결과는 방어의 빈틈을 찾고, 탐지와 대응을 검증하며, 보안 정책과 제품 역량의 개선을 이끈다.' },
        { kicker: '03 / 02', figure: 'corridor', mark: '추측', title: '훈련은 여러 미래를 상대로 한 대결이 될 것이다.', body: '상대는 더 이상 한 번 적힌 대본이 아니다. 평가는 가능한 걸음걸이의 한 가족을 만나게 된다.  그러나 여전히 인가된 회랑 안에 갇힌 채로. 회랑은 길 수 있다. 벽이 없어서는 안 된다. 울타리 없는 상상은 레드팀이 아니라, 그저 흩어짐이다.' },
        { kicker: '03 / 03', figure: 'burst', mark: '추측', title: '빈틈은 더 짧은 시간에 드러나고, 위장도 할 것이다.', body: '탐지와 대응은 본 적 없는 속도로 시험당할 것이다. 어떤 틈은 눈부시게 빛나고, 어떤 틈은 이미 메워진 척할 것이다. 평가의 일은 연기의 한가운데에서 진짜 경로를 알아보는 것이다.' },
        { kicker: '03 / 04', figure: 'hold', mark: '지켜야 할 것', title: '인가는 각주가 아니라, 이 일이 서는 자리 전체다.', body: '지능 폭발이 울타리를 장식으로 태워서는 안 된다. 범위, 허가, 철회할 수 있는 동의는 이 업무가 존재하는 이유다. 아무리 미친 리허설이라도, 인가가 끝나는 선에서 멈추어야 한다.' },
        { kicker: '03 / 05', figure: 'horizon', mark: '추측', title: '평가는 정책이 스스로를 개정하도록 도울 것이다.', body: '실제 경로를 끝까지 걸을 때마다, 빈틈은 방어와 제품으로 돌려져야 하며, 수집만 되는 보고서로 남아서는 안 된다. 그것은 개선의 방향이지, 이미 끝난 성적표가 아니다.' },
        { kicker: '03 / 06', figure: 'jump', mark: '观微知著', title: '경로를 보고 점프하라. 울타리를 넘지 마라.', body: '폭발 속에서 레드팀 평가는 더 필요해지고, 더 절제가 필요해진다. 허가 안의 점프만이 유효한 점프다.' },
      ],
    },
    '04': {
      no: '04',
      figure: 'signals',
      kicker: 'APT 위협 정보 연구 · 지능 폭발',
      speculation: '이하는 미래에 대한 추측이며, 이미 운용 중인 역량이 아니다.',
      slides: [
        { kicker: '04 / 00', figure: 'burst', mark: '추측', title: '약한 신호는 일종의 날씨가 될 것이다.', body: '단서는 더 이상 드물지 않다. 비처럼 내리고, 서로 간섭할 것이다. 귀속, 생산, 헌팅이 같은 기후 속으로 말려들 것이다. 일은 미친 듯이 변할 것이다. 왜냐하면 정말로 그렇게 될 것이기 때문이다.' },
        { kicker: '04 / 01', figure: 'signals', mark: '공개 설명', title: '지금 이 업무가 하는 일.', body: '지능형 지속 위협을 둘러싸고 단서 발견, 귀속 분석, 정보 생산, 헌팅 방법 연구. 공격 사슬의 약한 신호, 인프라 흔적, 행동 패턴에 주목하며, 흩어진 단서를 조회하고 검증하며 방어 결정에 쓸 수 있는 정보 역량으로 바꾼다.' },
        { kicker: '04 / 02', figure: 'signals', mark: '추측', title: '인프라는 별자리처럼 깜박일 것이다.', body: '도메인, 노드, 징검다리는 켜졌다가 꺼진다. 행동 패턴은 이름이 붙기도 전에 옷을 갈아입는다. 헌팅 방법은 깜박임 속에서도 질문을 유지해야 하며, 첫 번째 빛만 보고 진실을 선언해서는 안 된다.' },
        { kicker: '04 / 03', figure: 'burst', mark: '추측', title: '귀속은 빨라지고, 시끄러워질 것이다.', body: '기계는 완결되어 보이는 이야기를 많이 내놓을 것이다. 어떤 이야기는 서로 싸우고, 어떤 이야기는 소음을 무늬로 수놓았을 뿐이다. 정보의 가치는 이야기가 듣기 좋다는 데 있지 않다. 조회되고, 재검토되며, 방어의 결정에 쓰일 수 있다는 데 있다.' },
        { kicker: '04 / 04', figure: 'hold', mark: '지켜야 할 것', title: '검증 가능성이 장관보다 중요하다.', body: '흩어진 단서를 모으는 것은 물을 수 없는 결론으로 녹이는 일이 아니다. 출처, 방법, 불확실성의 경계는 남아 있어야 한다. 결정에 쓰이는 정보는 열어서 볼 수 있어야 한다.' },
        { kicker: '04 / 05', figure: 'horizon', mark: '추측', title: '정보는 살아 있는 색인에 더 가까워질 것이다.', body: '한 번 인쇄된 연감이 아니라, 계속해서 다시 쓰이고 추궁당할 수 있는 역량. 약한 신호가 들어오고, 흔적이 교차되며, 행동이 대조된다. 그리고 사람에게는 거부할 자리가 남는다. 그것은 지평이지, 이미 펼쳐진 제품이 아니다.' },
        { kicker: '04 / 06', figure: 'jump', mark: '观微知著', title: '희미한 한 획을 먼저 보고, 그다음 점프하라.', body: '형체 없는 것 속으로 스며드는 것이 종종 진짜 단서다. 폭발이 밝을수록, 그 밝음 안에서 미광을 알아볼 줄 알아야 한다.' },
      ],
    },
    '05': {
      no: '05',
      figure: 'protocol',
      kicker: '비침습적 뇌-컴퓨터 인터페이스 · 지능 폭발',
      speculation: '이하는 추측과 질문이며, 임상적 약속이 아니다. 현재 작업은 소프트웨어 계층의 시뮬레이션만 수행하며, 인체 실험, 임상 용도, 의료 진단을 포함하지 않는다.',
      slides: [
        { kicker: '05 / 00', figure: 'burst', mark: '추측', title: '생각과 기계 사이의 경계는 매우 시끄러워질 것이다.', body: '인터페이스의 질문은 사람들이 준비된 것보다 빨리 도착할 것이다. 그것이 오늘 인체나 진료실로 들어가라는 뜻은 아니다. 현재의 작업은 소프트웨어 안에 머문다. 아래는 이 질문이 어떻게 미쳐 갈 수 있는지, 그리고 어떤 선은 여전히 밟아서는 안 되는지를 말한다.' },
        { kicker: '05 / 01', figure: 'protocol', mark: '공개 설명', title: '지금 이 업무가 하는 일.', body: '비침습적 뇌-컴퓨터 인터페이스의 프로토콜 연구, 소프트웨어 시뮬레이션, 상호작용 흐름 검증. 현재는 소프트웨어 계층의 모의만 수행하며, 인체 실험, 임상 용도, 의료 진단은 포함하지 않는다. 연구는 프로토콜 설계, 데이터 흐름과 처리, 상호작용 응용 검증, 데이터 보안, 프라이버시 보호, 준법 사용을 다룬다.' },
        { kicker: '05 / 02', figure: 'protocol', mark: '추측', title: '프로토콜은 몸보다 먼저 미래에 도착할 것이다.', body: '시뮬레이션 안에서 데이터 흐름, 핸드셰이크, 권한, 거부권은 반복해 밀어 볼 수 있다. 지능 폭발은 이 프로토콜에 더 기이한 입력, 더 빠른 오독, 더 탐욕스러운 호출을 던질 것이다. 연구는 앞설 수 있다. 그러나 미리 이식이나 진단이 될 필요는, 되어서도, 없다.' },
        { kicker: '05 / 03', figure: 'burst', mark: '추측', title: '상호작용은 불편한 질문을 던질 것이다.', body: '누가 읽기를 시작하는가. 거부가 정말로 실행되는가. 모의된 “의도”가 잘못 쓰였을 때 시스템은 어떻게 멈추는가. 이 질문들은 소프트웨어 안에서 철저히 물어야 하며, 물을 수 있다. 그것은 임상 계획이 아니다.' },
        { kicker: '05 / 04', figure: 'hold', mark: '지켜야 할 것', title: '보안, 프라이버시, 준법은 마지막 감사의 글이 아니다.', body: '데이터 보안, 프라이버시 보호, 준법 사용은 이 연구의 일부이지 장식이 아니다. 비침습, 소프트웨어 시뮬레이션, 인체 실험이나 의료 진단의 금지. 이 선들은 폭발 이후에도 유효하다. 미래는 미쳐도 좋다. 자리는 분명해야 한다.' },
        { kicker: '05 / 05', figure: 'horizon', mark: '추측', title: '우리는 인터페이스를 이야기하지, 증강을 약속하지 않는다.', body: '지평선에는 주의, 언어, 대리권에 관한 질문이 더 많이 나타날 것이다. 이야기할 수 있다. 그 이야기를 완료된 인체 실험으로 적어서는 안 되며, 시뮬레이션을 치료나 증강의 약속으로 적어서도 안 된다.' },
        { kicker: '05 / 06', figure: 'jump', mark: '观微知著', title: '프로토콜을 먼저 보고, 점프할지 정한다.', body: '소프트웨어의 울타리 안에서 상호작용의 질문을 끝까지 묻는 것. 그것이 이 업무가 미친 미래를 마주하면서도 여전히 품위를 지키는 방식이다.' },
      ],
    },
    '06': {
      no: '06',
      figure: 'ground',
      kicker: 'CTF 대회 개최 · 지능 폭발',
      speculation: '이하는 미래에 대한 추측이며, 이미 열린 어떤 대회가 아니다.',
      slides: [
        { kicker: '06 / 00', figure: 'burst', mark: '추측', title: '훈련장도 폭발에 불이 붙을 것이다.', body: '문제는 스스로를 다시 쓰고, 풀이는 가속되며, 복기는 글로 따라가기 어려워질 것이다. 일은 미친 듯이 변할 것이다. 왜냐하면 정말로 그렇게 될 것이기 때문이다. 대회는 여전히 배움의 자리일 수 있다. 순수한 스펙터클로만 만들지 않는다면.' },
        { kicker: '06 / 01', figure: 'ground', mark: '공개 설명', title: '지금 이 업무가 하는 일.', body: '대학 또는 정부·기업을 대상으로 CTF 개최, 문제 설계, 역량 훈련. 대회 조직, 문제 구축, 환경 보장, 사후 복기. 대회와 훈련을 통해 실전 경험을 배우고 재사용할 수 있는 보안 역량으로 바꾸기를 바란다.' },
        { kicker: '06 / 02', figure: 'ground', mark: '추측', title: '문제는 푸는 사람에게 말을 걸기 시작할 것이다.', body: '환경과 문제는 더 이상 얼어 있는 소품 세트가 아니다. 상대의 경로에 따라 갈라질 수도 있고, 자동 생성된 뒤 신중히 고를 수도 있다. 설계는 사라지지 않는다. “문제 하나를 내는 일”에서 “숨 쉬는 자리를 지키는 일”로 옮겨 갈 뿐이다.' },
        { kicker: '06 / 03', figure: 'clock', mark: '추측', title: '훈련의 리듬은 학기의 달력을 떠날 것이다.', body: '역량이 시즌 단위로만 갱신된다면 폭발의 보폭을 따라가지 못한다. 대학과 기업이 필요로 하는 것은 그날의 순위표만이 아니라, 옮겨 갈 수 있는 방법이다. 복기는 빨라야 하고, 여전히 읽힐 수 있어야 한다.' },
        { kicker: '06 / 04', figure: 'hold', mark: '지켜야 할 것', title: '학습 가능과 재사용 가능이 소란보다 앞선다.', body: '개최는 장관일 수 있다. 장관만으로 남아서는 안 된다. 조직, 환경, 공정, 대회가 끝난 뒤 경험을 훈련으로 되돌리는 일. 속도가 붙은 뒤에 이것들은 더 중요해진다. 배울 수 없는 대회는 한 줌의 연기일 뿐이다.' },
        { kicker: '06 / 05', figure: 'horizon', mark: '추측', title: '대회는 일종의 집단 소방 훈련이 될 것이다.', body: '어느 해의 어느 컵을 예언하는 말이 아니다. 실전 경험이 더 빨리 공동의 역량으로 바뀌어야 할 때, 개최와 문제 설계가 그 컨베이어 위에 서리라는 상상이다. 그것은 방향이지, 이미 도장이 찍힌 일정이 아니다.' },
        { kicker: '06 / 06', figure: 'jump', mark: '观微知著', title: '경험을 다음 점프를 할 사람에게 넘겨라.', body: '문제 속의 단서를 보고, 어떻게 점프할지를 정한다. 훈련의 의미는 장내의 소음이 아니라, 회장을 떠난 뒤에도 쓸 수 있는 그 부분에 있다.' },
      ],
    },
  },
};

export function getShowcase(locale: Locale): ShowcaseCopy {
  return showcase[locale];
}

export function getDeck(locale: Locale, no: string): VisionDeck | undefined {
  if (!serviceNos.includes(no as ServiceNo)) return undefined;
  return decks[locale][no as ServiceNo];
}
