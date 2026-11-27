import type { Locale } from './i18n';

const zh = {
  skip: '跳到正文',
  navAria: '站点',
  openMenu: '打开菜单',
  closeMenu: '关闭菜单',
  themeToLight: '切换为亮色主题',
  themeToDark: '切换为暗色主题',
  langAria: '语言',
  footerLinksAria: '站外链接',
  officialLink: '官网',
  wechatFooter: '微信公众号',
  footerQuiet: '低调说话，高调做事。',
  rssTitle: 'Gh0xE9 文章',
  description:
    'Gh0xE9（Ghost In The Bytes）是一支研发型科技团队，以人类共同福祉与长远未来为价值坐标，核心方向覆盖网络防御、APT 威胁情报研究、安全防护与非侵入式脑机接口，我们坚持长期主义与负责任创新，不以短期热点为转移，而是把对安全、技术与社会福祉的长远判断，持续沉淀为用户可直接使用的产品与平台，让前沿技术更稳妥、更可持续地服务于人类共同利益。',
  motto: '观微知著，消隐于无形。',
  nav: {
    home: { label: '首页', sub: 'Home' },
    about: { label: '团队', sub: 'About' },
    services: { label: '业务', sub: 'Services' },
    tools: { label: '产品', sub: 'Products' },
    articles: { label: '文章', sub: 'Articles' },
    contact: { label: '联系', sub: 'Contact' },
  },
  home: {
    lede:
      '我们以网络防御、APT 威胁情报研究、安全防护和非侵入式脑机接口为核心方向，把红队评估、应急响应与取证、代码审计、CTF 承办与训练中的实战经验沉淀为产品能力，面向更广泛的行业开放使用。',
    readArticles: '阅读文章',
    meetTeam: '了解团队',
    servicesKicker: '01 / Services',
    servicesTitle: '业务',
    servicesNote: 'Gh0xE9（Ghost In The Bytes）是一支研发型科技团队，以人类共同福祉与长远未来为价值坐标，核心方向覆盖网络防御、APT 威胁情报研究、安全防护与非侵入式脑机接口，我们坚持长期主义与负责任创新，不以短期热点为转移，而是把对安全、技术与社会福祉的长远判断，持续沉淀为用户可直接使用的产品与平台，让前沿技术更稳妥、更可持续地服务于人类共同利益。',
    servicesLead:
      'Gh0xE9 以网络防御、APT 威胁情报研究、安全防护和非侵入式脑机接口为核心，自主研发面向用户的产品与平台；红队评估、应急响应与取证、CTF 训练等实战能力作为支撑。此处仅作概要，详细说明请见业务页。',
    seeServices: '查看业务说明',
    toolsKicker: '02 / Products',
    toolsTitle: '产品',
    toolsNote: '来自官网介绍与 GitHub 公开仓库。',
    allTools: '我们的产品',
    githubOrg: 'GitHub 组织',
    articlesKicker: '03 / Articles',
    articlesTitle: '文章',
    articlesNote: '团队后续会在这里发布技术文章。',
    noArticles: '还没有已发布的文章。',
    browseArticles: '进入文章栏目',
  },
  about: {
    title: '团队',
    kicker: 'About the team',
    description:
      '了解 Gh0xE9（Ghost In The Bytes）的核心方向与公开信息。',
    intro:
      'Gh0xE9，也写作 Ghost In The Bytes，团队定位于研究下一代网络防御、APT 威胁情报、安全防护与非侵入式脑机接口，以实战安全经验为底座，把研究成果做成用户可直接使用的产品与平台。',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'GitHub 组织的简介是「Observe subtle clues to eliminate hidden risks」，我们把它写成「观微知著，消隐于无形」，这是站点的声音，也是工作方式。',
    identityBody:
      '名称里的 0xE9，在 x86 指令里是一次近跳转（JMP），这不是一段编造的创立神话，而是这个门户用来辨认自己的图形语言：在字节里看见线索，再决定跳到哪里。',
    identityNote:
      'GitHub 组织创建于 2019 年 2 月 28 日。定位一栏公开写着 C:\\Windows\\lost+found\\etc。',
  },
  services: {
    title: '业务',
    kicker: 'What we do',
    description:
      '',
    intro:
      '',
    contactUs: '联系我们',
    existingSite: '已有官网',
    showcaseCta: '动画展示',
    visionCta: '智能爆炸',
    visionBack: '返回业务',
    items: [
      {
        "no": "01",
        "title": "网络防御",
        "sub": "Network Defense",
        "body": "面向网络空间的持续监测、威胁狩猎、防御策略设计与安全运营能力建设，围绕资产、流量、日志与告警建立可落地的防御闭环，我们关注的不只是发现风险，也包括把防御规则、响应流程和运营机制沉淀为可复用的产品能力。"
      },
      {
        "no": "02",
        "title": "应急响应",
        "sub": "Incident Response & Forensics",
        "body": "面向安全事件提供事件响应、入侵取证以及日志与监测分析，协助还原事件经过、定位影响范围并梳理处置要点，相关经验会进一步沉淀为应急响应流程、检测规则与取证分析能力，服务于更广泛的安全防护场景。"
      },
      {
        "no": "03",
        "title": "红队评估",
        "sub": "Red Team Assessment & Adversary Emulation",
        "body": "在明确授权范围内开展红队评估、攻防演练与攻击面验证，围绕真实攻击路径检验防护体系的有效性，评估结果用于发现防御短板、验证检测响应能力，并推动安全策略和产品能力持续改进。"
      },
      {
        "no": "04",
        "title": "APT 威胁情报研究",
        "sub": "APT Threat Intelligence Research",
        "body": "围绕高级持续性威胁开展线索发现、归因分析、情报生产与狩猎方法研究，关注攻击链中的弱信号、基础设施痕迹与行为模式，致力于把分散的情报线索转化为可查询、可验证、可用于防御决策的情报能力。"
      },
      {
        "no": "05",
        "title": "非侵入式脑机接口",
        "sub": "Non-invasive Brain-Computer Interface",
        "body": "聚焦非侵入式脑机接口的协议研究、软件仿真与交互流程验证，当前仅在软件层面开展模拟，不涉及人体实验、临床用途或医疗诊断，研究覆盖协议设计、数据流与处理流程、交互应用验证，以及数据安全、隐私保护与合规使用等问题。"
      },
      {
        "no": "06",
        "title": "CTF赛事承办",
        "sub": "CTF Competition Hosting & Challenge Design",
        "body": "面向高校或政企提供 CTF 赛事承办、赛题设计与配套能力训练，覆盖比赛组织、题目构建、环境保障和赛后复盘等环节，我们希望通过赛事与训练，把实战经验转化为可学习、可复用的安全能力。"
      },
    ],
  },
  tools: {
    title: '产品',
    kicker: 'Products & projects',
    description:
      '',
    intro:
      '',
    openGithub: '打开 GitHub 组织',
    officialKind: '官方介绍',
    githubKind: 'GitHub',
    internalKind: '内部',
    items: [
      {
        id: 'nextassets',
        name: 'NextAssets',
        kind: 'official' as const,
        body: '面向漏洞赏金、渗透测试与演习的智能资产发现、全球分布式外部资产发现、指纹识别、基础漏洞检测，以及信息泄露与薄弱点识别。',
      },
      {
        id: 'erraticgopher',
        name: 'ErraticGopher',
        kind: 'github' as const,
        body: '面向授权渗透测试与红队工作的桌面工具，源码公开在 GitHub 组织下。',
      },
      {
        id: 'eaglesword',
        name: 'EagleSword',
        kind: 'official' as const,
        body: '轻量、模块化的进攻性安全测试工具，用于排查企业API接口风险与资产发现、漏洞验证与内部评估，公开介绍强调模块化、自动化发现、内网辅助与高性能扫描。',
      },
      {
        id: 'erraticvaelor',
        name: 'ErraticVaelor',
        kind: 'internal' as const,
        body: '内部研发的自主进攻型网络攻击产品，在多个项目中实现 100% RCE，暂不提供公开仓库或文档。',
      },
      {
        id: 'intellentropy',
        name: 'IntellEntropy',
        kind: 'internal' as const,
        body: '非侵入式脑机接口协议的研究与软件模拟实现，当前处于软件仿真阶段，聚焦协议设计、数据流与交互流程验证，不涉及人体实验或临床用途'
      },
    ],
  },
  articles: {
    title: '文章',
    kicker: 'Field notes',
    description: '',
    intro:
      '',
    empty: '还没有已发布的文章。',
    back: '返回文章列表',
    updated: '更新',
  },
  contact: {
    title: '联系',
    kicker: 'Get in touch',
    description: '通过已有官网、GitHub、X 或微信公众号联系 Gh0xE9。',
    intro:
      '',
    officialTitle: '官网',
    wechatTitle: '公众号',
    wechatAria: '微信公众号',
    emailTitle: '邮箱',
    locationTitle: '地点',
    location:
      '银河系猎户旋臂内侧，人类族群仍在把思想写成字节、并把线索留在跳转之前的这一带。',
    welcome:
      '有事请通过以上窗口联系。',
  },
  notFound: {
    title: '未找到',
    description: '这个地址没有对应的页面。',
    kicker: 'Jump missed',
    lede: '没有落地。这条路径上找不到页面，回到入口再跳一次。',
    home: '回到首页',
    articles: '查看文章',
  },
} as const;

const en = {
  skip: 'Skip to content',
  navAria: 'Site',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  themeToLight: 'Switch to light theme',
  themeToDark: 'Switch to dark theme',
  langAria: 'Language',
  footerLinksAria: 'Off-site links',
  officialLink: 'Official site',
  wechatFooter: 'WeChat official account',
  footerQuiet: 'Speak softly, work loudly.',
  rssTitle: 'Gh0xE9 articles',
  description:
    'Gh0xE9 (Ghost In The Bytes) is a research-driven technology team. Its coordinates are the shared well-being of humanity and the long future. Its core directions cover network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces. We hold to long-termism and responsible innovation, and do not pivot with short-lived trends. Instead we keep settling our long view of security, technology, and social well-being into products and platforms people can use directly, so that frontier technology can serve humanity’s common interest more steadily and more sustainably.',
  motto: 'Observe subtle clues to eliminate hidden risks.',
  nav: {
    home: { label: 'Home', sub: '首页' },
    about: { label: 'Team', sub: '团队' },
    services: { label: 'Services', sub: '业务' },
    tools: { label: 'Products', sub: '产品' },
    articles: { label: 'Articles', sub: '文章' },
    contact: { label: 'Contact', sub: '联系' },
  },
  home: {
    lede:
      'Our core directions are network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces. We settle practical experience from red-team assessment, incident response and forensics, code audit, and CTF hosting and training into product capability, and open it to a wider range of industries.',
    readArticles: 'Read the articles',
    meetTeam: 'Meet the team',
    servicesKicker: '01 / Services',
    servicesTitle: 'Services',
    servicesNote:
      'Gh0xE9 (Ghost In The Bytes) is a research-driven technology team. Its coordinates are the shared well-being of humanity and the long future. Its core directions cover network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces. We hold to long-termism and responsible innovation, and do not pivot with short-lived trends. Instead we keep settling our long view of security, technology, and social well-being into products and platforms people can use directly, so that frontier technology can serve humanity’s common interest more steadily and more sustainably.',
    servicesLead:
      'Gh0xE9 takes network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces as its core, and independently develops products and platforms for users. Practical capabilities such as red-team assessment, incident response and forensics, and CTF training serve as support. This is only a brief outline; details are on the services page.',
    seeServices: 'See the services',
    toolsKicker: '02 / Products',
    toolsTitle: 'Products',
    toolsNote: 'From the official site and public GitHub repositories.',
    allTools: 'Our products',
    githubOrg: 'GitHub organization',
    articlesKicker: '03 / Articles',
    articlesTitle: 'Articles',
    articlesNote: 'Technical writing from the team will appear here later.',
    noArticles: 'No published articles yet.',
    browseArticles: 'Browse articles',
  },
  about: {
    title: 'The team',
    kicker: 'About the team',
    description:
      'The core directions and public information of Gh0xE9 (Ghost In The Bytes).',
    intro:
      'Gh0xE9, also written Ghost In The Bytes, is positioned to research next-generation network defense, APT threat intelligence, security protection, and non-invasive brain-computer interfaces. With practical security experience as the base, the team turns research into products and platforms people can use directly.',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'The GitHub organization’s bio is “Observe subtle clues to eliminate hidden risks.” We write it in Chinese as 「观微知著，消隐于无形」. That is the voice of this site, and the way the work is done.',
    identityBody:
      'The 0xE9 in the name is a near jump (JMP) in x86. This is not an invented origin myth; it is the graphic language this portal uses to recognize itself: see the clue in the bytes, then decide where to jump.',
    identityNote:
      'The GitHub organization was created on 28 February 2019. The location field is published as C:\\Windows\\lost+found\\etc.',
  },
  services: {
    title: 'Services',
    kicker: 'What we do',
    description: '',
    intro: '',
    contactUs: 'Contact us',
    existingSite: 'Existing official site',
    showcaseCta: 'Animated showcase',
    visionCta: 'Intelligence explosion',
    visionBack: 'Back to services',
    items: [
      {
        no: '01',
        title: 'Network Defense',
        sub: '网络防御',
        body: 'Continuous monitoring, threat hunting, defensive strategy design, and security-operations capability building for cyberspace. Around assets, traffic, logs, and alerts we establish a defensive loop that can actually be run. We care not only about finding risk, but also about settling defensive rules, response processes, and operating mechanisms into reusable product capability.',
      },
      {
        no: '02',
        title: 'Incident Response',
        sub: 'Incident Response & Forensics',
        body: 'For security incidents we provide incident response, intrusion forensics, and log and monitoring analysis, helping reconstruct what happened, locate the scope of impact, and sort out the points of handling. That experience is further settled into incident-response processes, detection rules, and forensic-analysis capability, in service of a wider range of protection scenarios.',
      },
      {
        no: '03',
        title: 'Red Team Assessment',
        sub: 'Red Team Assessment & Adversary Emulation',
        body: 'Within a clearly authorized scope we conduct red-team assessment, attack-defense exercises, and attack-surface validation, testing the effectiveness of a protection system along real attack paths. The results are used to find defensive gaps, verify detection and response capability, and drive continual improvement of security policy and product capability.',
      },
      {
        no: '04',
        title: 'APT Threat Intelligence Research',
        sub: 'APT Threat Intelligence Research',
        body: 'Around advanced persistent threats we conduct clue discovery, attribution analysis, intelligence production, and research on hunting methods. We attend to weak signals, infrastructure traces, and behavioral patterns in the attack chain, and work to turn scattered intelligence clues into intelligence capability that can be queried, verified, and used in defensive decisions.',
      },
      {
        no: '05',
        title: 'Non-invasive Brain-Computer Interface',
        sub: 'Non-invasive Brain-Computer Interface',
        body: 'We focus on protocol research, software simulation, and interaction-flow validation for non-invasive brain-computer interfaces. At present the work is simulation at the software layer only, and does not involve human experiments, clinical use, or medical diagnosis. The research covers protocol design, data flow and processing, validation of interactive applications, and questions of data security, privacy protection, and compliant use.',
      },
      {
        no: '06',
        title: 'CTF Competition Hosting',
        sub: 'CTF Competition Hosting & Challenge Design',
        body: 'For universities or government and enterprise we provide CTF competition hosting, challenge design, and supporting capability training, covering organization, challenge construction, environment support, and after-action review. We hope, through contests and training, to turn practical experience into security capability that can be learned and reused.',
      },
    ],
  },
  tools: {
    title: 'Products',
    kicker: 'Products & projects',
    description: '',
    intro: '',
    openGithub: 'Open the GitHub organization',
    officialKind: 'Official introduction',
    githubKind: 'GitHub',
    internalKind: 'Internal',
    items: [
      {
        id: 'nextassets',
        name: 'NextAssets',
        kind: 'official' as const,
        body: 'Intelligent asset discovery for bug bounty, penetration testing, and exercises: globally distributed external asset discovery, fingerprinting, basic vulnerability detection, and identification of information leaks and weak points.',
      },
      {
        id: 'erraticgopher',
        name: 'ErraticGopher',
        kind: 'github' as const,
        body: 'A desktop tool for authorized penetration testing and red-team work. The source is published under the GitHub organization.',
      },
      {
        id: 'eaglesword',
        name: 'EagleSword',
        kind: 'official' as const,
        body: 'A lightweight, modular offensive-security testing tool used to investigate enterprise API interface risk and for asset discovery, vulnerability validation, and internal assessment. The public introduction emphasizes modularity, automated discovery, internal-network assistance, and high-performance scanning.',
      },
      {
        id: 'erraticvaelor',
        name: 'ErraticVaelor',
        kind: 'internal' as const,
        body: 'An internally developed autonomous offensive network-attack product. It has achieved 100% RCE in multiple projects. No public repository or documentation is provided for now.',
      },
      {
        id: 'intellentropy',
        name: 'IntellEntropy',
        kind: 'internal' as const,
        body: 'Research and software-simulated implementation of a non-invasive brain-computer interface protocol. It is currently in a software-simulation stage, focused on protocol design and validation of data flow and interaction, and does not involve human experiments or clinical use',
      },
    ],
  },
  articles: {
    title: 'Articles',
    kicker: 'Field notes',
    description: '',
    intro: '',
    empty: 'No published articles yet.',
    back: 'Back to articles',
    updated: 'Updated',
  },
  contact: {
    title: 'Contact',
    kicker: 'Get in touch',
    description: 'Reach Gh0xE9 through the existing official site, GitHub, X, or the WeChat official account.',
    intro: '',
    officialTitle: 'Official site',
    wechatTitle: 'Official account',
    wechatAria: 'WeChat official account',
    emailTitle: 'Email',
    locationTitle: 'Location',
    location:
      'The inner Orion Arm of the Milky Way, where the human species still writes thought as bytes and leaves the clue just before the jump.',
    welcome:
      'If you need to reach us, use the channels above.',
  },
  notFound: {
    title: 'Not found',
    description: 'Nothing at this address.',
    kicker: 'Jump missed',
    lede: 'No landing. Nothing at this path. Return to the entry and jump again.',
    home: 'Back to home',
    articles: 'View articles',
  },
} as const;

const ko = {
  skip: '본문으로 건너뛰기',
  navAria: '사이트',
  openMenu: '메뉴 열기',
  closeMenu: '메뉴 닫기',
  themeToLight: '밝은 테마로 전환',
  themeToDark: '어두운 테마로 전환',
  langAria: '언어',
  footerLinksAria: '외부 링크',
  officialLink: '공식 사이트',
  wechatFooter: '위챗 공식 계정',
  footerQuiet: '말은 낮게, 일은 높게.',
  rssTitle: 'Gh0xE9 글',
  description:
    'Gh0xE9(Ghost In The Bytes)는 연구개발형 기술 팀이다. 인류의 공동 복지와 장기적 미래를 가치의 좌표로 삼고, 핵심 방향은 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 아우른다. 우리는 장기주의와 책임 있는 혁신을 지키며, 단기 유행에 흔들리지 않는다. 그 대신 보안, 기술, 사회 복지에 대한 장기적 판단을 사용자가 직접 쓸 수 있는 제품과 플랫폼으로 계속해서 응축해, 최전선의 기술이 더 안정적이고 지속 가능한 방식으로 인류의 공동 이익에 봉사하게 한다.',
  motto: '미세한 단서를 관찰해, 숨은 위험을 없앤다.',
  nav: {
    home: { label: '홈', sub: 'Home' },
    about: { label: '팀', sub: 'Team' },
    services: { label: '업무', sub: 'Services' },
    tools: { label: '제품', sub: 'Products' },
    articles: { label: '글', sub: 'Articles' },
    contact: { label: '연락', sub: 'Contact' },
  },
  home: {
    lede:
      '우리는 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 핵심 방향으로 삼고, 레드팀 평가, 사고 대응과 포렌식, 코드 감사, CTF 개최와 훈련에서 쌓은 실전 경험을 제품 역량으로 응축해, 더 넓은 산업에 개방한다.',
    readArticles: '글 읽기',
    meetTeam: '팀 소개',
    servicesKicker: '01 / Services',
    servicesTitle: '업무',
    servicesNote:
      'Gh0xE9(Ghost In The Bytes)는 연구개발형 기술 팀이다. 인류의 공동 복지와 장기적 미래를 가치의 좌표로 삼고, 핵심 방향은 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 아우른다. 우리는 장기주의와 책임 있는 혁신을 지키며, 단기 유행에 흔들리지 않는다. 그 대신 보안, 기술, 사회 복지에 대한 장기적 판단을 사용자가 직접 쓸 수 있는 제품과 플랫폼으로 계속해서 응축해, 최전선의 기술이 더 안정적이고 지속 가능한 방식으로 인류의 공동 이익에 봉사하게 한다.',
    servicesLead:
      'Gh0xE9는 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 핵심으로, 사용자를 위한 제품과 플랫폼을 자체 개발한다. 레드팀 평가, 사고 대응과 포렌식, CTF 훈련 등 실전 역량은 이를 뒷받침한다. 여기는 개요만 적으며, 자세한 안내는 업무 페이지에 있다.',
    seeServices: '업무 안내',
    toolsKicker: '02 / Products',
    toolsTitle: '제품',
    toolsNote: '공식 사이트 소개와 공개 GitHub 저장소에서 가져왔다.',
    allTools: '우리의 제품',
    githubOrg: 'GitHub 조직',
    articlesKicker: '03 / Articles',
    articlesTitle: '글',
    articlesNote: '팀의 기술 글을 이후 이곳에 게시한다.',
    noArticles: '아직 게시된 글이 없다.',
    browseArticles: '글 목록',
  },
  about: {
    title: '팀',
    kicker: 'About the team',
    description:
      'Gh0xE9(Ghost In The Bytes)의 핵심 방향과 공개 정보를 소개한다.',
    intro:
      'Gh0xE9, 대외적으로는 Ghost In The Bytes. 팀은 차세대 네트워크 방어, APT 위협 정보, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 연구하는 데 자리하며, 실전 보안 경험을 바탕으로 연구 성과를 사용자가 직접 쓸 수 있는 제품과 플랫폼으로 만든다.',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'GitHub 조직의 소개문은 “Observe subtle clues to eliminate hidden risks.”이다. 우리는 이를 「观微知著，消隐于无形」로 쓴다. 이것이 이 사이트의 목소리이며, 일의 방식이기도 하다.',
    identityBody:
      '이름 안의 0xE9는 x86 명령어에서 근거리 점프(JMP)다. 이것은 지어낸 창립 신화가 아니라, 이 포털이 자신을 알아보게 하는 그래픽 언어다. 바이트 속에서 단서를 보고, 어디로 점프할지를 정한다.',
    identityNote:
      'GitHub 조직은 2019년 2월 28일에 만들어졌다. 위치란에는 C:\\Windows\\lost+found\\etc가 공개되어 있다.',
  },
  services: {
    title: '업무',
    kicker: 'What we do',
    description: '',
    intro: '',
    contactUs: '연락하기',
    existingSite: '기존 공식 사이트',
    showcaseCta: '애니메이션 전시',
    visionCta: '지능 폭발',
    visionBack: '업무로 돌아가기',
    items: [
      {
        no: '01',
        title: '네트워크 방어',
        sub: 'Network Defense',
        body: '사이버 공간을 향한 지속 모니터링, 위협 헌팅, 방어 전략 설계, 보안 운영 역량 구축. 자산, 트래픽, 로그, 경보를 중심으로 실제로 운영할 수 있는 방어 루프를 세운다. 우리가 관심 갖는 것은 위험을 발견하는 일만이 아니라, 방어 규칙, 대응 절차, 운영 메커니즘을 재사용할 수 있는 제품 역량으로 응축하는 일이기도 하다.',
      },
      {
        no: '02',
        title: '사고 대응',
        sub: 'Incident Response & Forensics',
        body: '보안 사고를 대상으로 사고 대응, 침입 포렌식, 로그 및 모니터링 분석을 제공하며, 사건의 경과를 재구성하고 영향 범위를 파악하며 조치 요점을 정리하는 일을 돕는다. 그 경험은 사고 대응 절차, 탐지 규칙, 포렌식 분석 역량으로 더 응축되어, 더 넓은 보안 방어 현장에 쓰인다.',
      },
      {
        no: '03',
        title: '레드팀 평가',
        sub: 'Red Team Assessment & Adversary Emulation',
        body: '명확히 인가된 범위 안에서 레드팀 평가, 공방 훈련, 공격 표면 검증을 수행하며, 실제 공격 경로를 따라 방어 체계의 유효성을 시험한다. 평가 결과는 방어의 빈틈을 찾고, 탐지와 대응 역량을 검증하며, 보안 정책과 제품 역량의 지속적인 개선을 이끄는 데 쓰인다.',
      },
      {
        no: '04',
        title: 'APT 위협 정보 연구',
        sub: 'APT Threat Intelligence Research',
        body: '지능형 지속 위협을 둘러싸고 단서 발견, 귀속 분석, 정보 생산, 헌팅 방법 연구를 수행한다. 공격 사슬 안의 약한 신호, 인프라 흔적, 행동 패턴에 주목하며, 흩어진 정보 단서를 조회하고 검증하며 방어 결정에 쓸 수 있는 정보 역량으로 바꾸는 데 힘쓴다.',
      },
      {
        no: '05',
        title: '비침습적 뇌-컴퓨터 인터페이스',
        sub: 'Non-invasive Brain-Computer Interface',
        body: '비침습적 뇌-컴퓨터 인터페이스의 프로토콜 연구, 소프트웨어 시뮬레이션, 상호작용 흐름 검증에 초점을 둔다. 현재는 소프트웨어 계층의 모의만 수행하며, 인체 실험, 임상 용도, 의료 진단은 포함하지 않는다. 연구는 프로토콜 설계, 데이터 흐름과 처리 과정, 상호작용 응용 검증, 그리고 데이터 보안, 프라이버시 보호, 준법 사용 등의 문제를 다룬다.',
      },
      {
        no: '06',
        title: 'CTF 대회 개최',
        sub: 'CTF Competition Hosting & Challenge Design',
        body: '대학 또는 정부·기업을 대상으로 CTF 대회 개최, 문제 설계, 그에 따른 역량 훈련을 제공하며, 대회 조직, 문제 구축, 환경 보장, 사후 복기 등의 과정을 아우른다. 우리는 대회와 훈련을 통해 실전 경험을 학습하고 재사용할 수 있는 보안 역량으로 바꾸기를 바란다.',
      },
    ],
  },
  tools: {
    title: '제품',
    kicker: 'Products & projects',
    description: '',
    intro: '',
    openGithub: 'GitHub 조직 열기',
    officialKind: '공식 소개',
    githubKind: 'GitHub',
    internalKind: '내부',
    items: [
      {
        id: 'nextassets',
        name: 'NextAssets',
        kind: 'official' as const,
        body: '취약점 포상, 침투 테스트, 훈련을 위한 지능형 자산 탐색, 전 세계 분산 외부 자산 탐색, 핑거프린팅, 기본 취약점 탐지, 그리고 정보 유출과 취약 지점 식별.',
      },
      {
        id: 'erraticgopher',
        name: 'ErraticGopher',
        kind: 'github' as const,
        body: '인가된 침투 테스트와 레드팀 작업을 위한 데스크톱 도구. 소스 코드는 GitHub 조직에 공개되어 있다.',
      },
      {
        id: 'eaglesword',
        name: 'EagleSword',
        kind: 'official' as const,
        body: '기업 API 인터페이스 위험 조사와 자산 탐색, 취약점 검증, 내부 평가에 쓰이는 가볍고 모듈화된 공격적 보안 테스트 도구. 공개 소개는 모듈성, 자동 탐색, 내부 네트워크 지원, 고성능 스캔을 강조한다.',
      },
      {
        id: 'erraticvaelor',
        name: 'ErraticVaelor',
        kind: 'internal' as const,
        body: '내부에서 개발한 자율 공격형 네트워크 공격 제품. 여러 프로젝트에서 100% RCE를 달성했다. 공개 저장소나 문서는 당분간 제공하지 않는다.',
      },
      {
        id: 'intellentropy',
        name: 'IntellEntropy',
        kind: 'internal' as const,
        body: '비침습적 뇌-컴퓨터 인터페이스 프로토콜의 연구와 소프트웨어 모의 구현. 현재는 소프트웨어 시뮬레이션 단계에 있으며, 프로토콜 설계와 데이터 흐름·상호작용 검증에 초점을 두고, 인체 실험이나 임상 용도는 포함하지 않는다',
      },
    ],
  },
  articles: {
    title: '글',
    kicker: 'Field notes',
    description: '',
    intro: '',
    empty: '아직 게시된 글이 없다.',
    back: '글 목록으로',
    updated: '수정',
  },
  contact: {
    title: '연락',
    kicker: 'Get in touch',
    description: '기존 공식 사이트, GitHub, X, 위챗 공식 계정으로 Gh0xE9에 연락할 수 있다.',
    intro: '',
    officialTitle: '공식 사이트',
    wechatTitle: '공식 계정',
    wechatAria: '위챗 공식 계정',
    emailTitle: '이메일',
    locationTitle: '장소',
    location:
      '은하수 오리온 팔 안쪽, 인류가 여전히 생각을 바이트로 남기고, 단서는 점프 직전에 남겨 두는 이 일대.',
    welcome:
      '연락이 필요하면 위의 창구를 이용하면 된다.',
  },
  notFound: {
    title: '찾을 수 없음',
    description: '이 주소에 해당하는 페이지가 없다.',
    kicker: 'Jump missed',
    lede: '착지하지 못했다. 이 경로에는 페이지가 없다. 입구로 돌아가 다시 점프하면 된다.',
    home: '홈으로',
    articles: '글 보기',
  },
} as const;


export const messages = { zh, en, ko } as const;
export type Messages = typeof zh;

export function t(locale: Locale): Messages {
  return messages[locale] as Messages;
}