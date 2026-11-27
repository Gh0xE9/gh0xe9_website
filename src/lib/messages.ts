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
    'Gh0xE9 (Ghost In The Bytes) is a research-driven technology team focused on network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces, turning research into products and platforms people can use directly.',
  motto: 'Observe subtle clues to eliminate hidden risks.',
  nav: {
    home: { label: 'Home', sub: '首页' },
    about: { label: 'Team', sub: '团队' },
    services: { label: 'Work', sub: '业务' },
    tools: { label: 'Products', sub: '产品' },
    articles: { label: 'Articles', sub: '文章' },
    contact: { label: 'Contact', sub: '联系' },
  },
  home: {
    lede:
      'We focus on network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces. Practical experience from authorized red-team assessments, incident response and forensics, code audit, and CTF hosting and training is being distilled into products opened to a wider range of industries.',
    readArticles: 'Read the articles',
    meetTeam: 'Meet the team',
    servicesKicker: '01 / Services',
    servicesTitle: 'Work',
    servicesNote: 'A brief, carefully worded overview of the work.',
    servicesLead:
      'Gh0xE9 focuses on network defense, APT threat intelligence research, security protection, and non-invasive brain-computer interfaces, and develops products and platforms for direct use. Red-team assessment, incident response and forensics, and CTF training remain supporting capabilities. This is only a brief note; details are on the work page.',
    seeServices: 'See the work',
    toolsKicker: '02 / Products',
    toolsTitle: 'Products',
    toolsNote: 'From the official site and public GitHub repositories.',
    allTools: 'All products and projects',
    githubOrg: 'GitHub organization',
    articlesKicker: '03 / Articles',
    articlesTitle: 'Articles',
    articlesNote: 'Technical writing from the team will appear here.',
    noArticles: 'No published articles yet.',
    browseArticles: 'Browse articles',
  },
  about: {
    title: 'The team',
    kicker: 'About the team',
    description:
      'Meet Gh0xE9 (Ghost In The Bytes): core directions and sourced public information.',
    intro:
      'Gh0xE9, also written Ghost In The Bytes, is positioned to research next-generation network defense, APT threat intelligence, security protection, and non-invasive brain-computer interfaces. Built on practical security experience, the team turns research into products and platforms people can use directly.',
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
    title: 'Work',
    kicker: 'What we do',
    description:
      'Gh0xE9’s public work: network defense, APT threat intelligence research, security protection, non-invasive brain-computer interfaces, with supporting capabilities in red-team assessment, incident response and forensics, code audit, and CTF training.',
    intro:
      'For further conversation, use the public channels on the contact page.',
    contactUs: 'Contact us',
    existingSite: 'Existing site',
    items: [
      {
        no: '01',
        title: 'Network Defense',
        sub: '网络防御',
        body: 'Continuous monitoring, threat hunting, defensive strategy, and security-operations capability building for cyberspace.',
      },
      {
        no: '02',
        title: 'APT Threat Intelligence Research',
        sub: 'APT 威胁情报研究',
        body: 'Research on clue discovery, attribution analysis, intelligence production, and hunting methods around advanced persistent threats.',
      },
      {
        no: '03',
        title: 'Security Protection',
        sub: '安全防护',
        body: 'Protection products and security-baseline capabilities for endpoints, networks, and business systems.',
      },
      {
        no: '04',
        title: 'Non-invasive Brain-Computer Interface',
        sub: '非侵入式脑机接口',
        body: 'Research, engineering, and security and privacy assurance for non-invasive brain-computer interfaces.',
      },
      {
        no: '05',
        title: 'Red Team Assessment & Adversary Emulation',
        sub: '红队评估与攻防演练',
        body: 'Authorized red-team assessment, adversary emulation, and attack-surface validation.',
      },
      {
        no: '06',
        title: 'Incident Response & Forensics',
        sub: '应急响应与取证',
        body: 'Incident response, intrusion forensics, and log and monitoring analysis.',
      },
      {
        no: '07',
        title: 'Code Audit',
        sub: '代码审计',
        body: 'Static analysis, vulnerability reporting, and remediation guidance.',
      },
      {
        no: '08',
        title: 'CTF Competition Hosting & Training',
        sub: 'CTF 赛事承办与训练',
        body: 'Competition hosting and capability training for universities and communities.',
      },
    ],
  },
  tools: {
    title: 'Products',
    kicker: 'Products & projects',
    description:
      'Products and public repositories associated with Gh0xE9: EagleSword, NextAssets, NextDetect, ErraticGopher, open_artex, and hello-writeup. Also an internal product, ErraticVaelor.',
    intro:
      'The first three are taken from product descriptions on the existing official site; ErraticGopher, open_artex, and hello-writeup are public repositories under the GitHub organization. ErraticVaelor is an internal product, with no public repository or documentation. These are high-level summaries only. We do not provide exploitation steps or reproduction procedures.',
    openGithub: 'Open the GitHub organization',
    officialKind: 'Official site',
    githubKind: 'GitHub',
    internalKind: 'Internal',
    items: [
      {
        id: 'eaglesword',
        name: 'EagleSword',
        kind: 'official' as const,
        body: 'A lightweight, modular offensive-security testing tool for asset discovery, vulnerability validation, and internal assessment. Public materials emphasize modularity, automated discovery, internal-network assistance, and high-performance scanning.',
      },
      {
        id: 'nextassets',
        name: 'NextAssets',
        kind: 'official' as const,
        body: 'Intelligent asset discovery for bug bounty, penetration testing, and exercises: external asset discovery, fingerprinting, basic vulnerability detection, and leak or weakness identification.',
      },
      {
        id: 'nextdetect',
        name: 'NextDetect',
        kind: 'official' as const,
        body: 'A lightweight extension used during reconnaissance to locate sensitive information, hidden directories, and asset positions.',
      },
      {
        id: 'erraticgopher',
        name: 'ErraticGopher',
        kind: 'github' as const,
        body: 'A desktop tool for authorized penetration testing and red-team work, published under the GitHub organization.',
      },
      {
        id: 'erraticvaelor',
        name: 'ErraticVaelor',
        kind: 'internal' as const,
        body: 'An internal autonomous offensive and defensive agent product, with no public repository or documentation.',
      },
      {
        id: 'open_artex',
        name: 'open_artex',
        kind: 'github' as const,
        body: 'An index of ARTEX derivative projects.',
      },
      {
        id: 'hello-writeup',
        name: 'hello-writeup',
        kind: 'github' as const,
        body: 'A CTF writeup repository.',
      },
    ],
  },
  articles: {
    title: 'Articles',
    kicker: 'Field notes',
    description: 'Technical writing from the Gh0xE9 team, published here as Markdown.',
    intro:
      'The team will publish its own technical writing here. New pieces carry a date and tags, and are listed in time order. We do not republish WeChat or other third-party originals.',
    empty: 'No published articles yet.',
    back: 'Back to articles',
    updated: 'Updated',
  },
  contact: {
    title: 'Contact',
    kicker: 'Get in touch',
    description: 'Reach Gh0xE9 through the existing official site, GitHub, X, or the WeChat official account.',
    intro:
      'The publicly verifiable channels are below. This site does not publish an email roster. If you are from a university or a community and want to say hello, start with these windows.',
    officialTitle: 'Existing site',
    wechatTitle: 'Official account',
    wechatAria: 'WeChat official account',
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
    'Gh0xE9(Ghost In The Bytes)는 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 핵심으로 하는 연구형 기술 팀이며, 연구 성과를 사용자가 직접 사용할 수 있는 제품과 플랫폼으로 만든다.',
  motto: '미세한 단서를 관찰해, 숨은 위험을 없앤다.',
  nav: {
    home: { label: '홈', sub: 'Home' },
    about: { label: '팀', sub: 'Team' },
    services: { label: '업무', sub: 'Work' },
    tools: { label: '제품', sub: 'Products' },
    articles: { label: '글', sub: 'Articles' },
    contact: { label: '연락', sub: 'Contact' },
  },
  home: {
    lede:
      '우리는 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 핵심으로 삼고, 인가된 레드팀 평가, 사고 대응과 포렌식, 코드 감사, CTF 개최와 훈련에서 쌓은 실전 경험을 제품 역량으로 응축해 더 넓은 산업에 개방한다.',
    readArticles: '글 읽기',
    meetTeam: '팀 소개',
    servicesKicker: '01 / Services',
    servicesTitle: '업무',
    servicesNote: '공개된 업무의 개요. 과장하지 않는다.',
    servicesLead:
      'Gh0xE9는 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 핵심으로 사용자를 위한 제품과 플랫폼을 자체 개발한다. 레드팀 평가, 사고 대응과 포렌식, CTF 훈련 등은 이를 뒷받침하는 역량이다. 여기는 개요만 적고, 자세한 안내는 업무 페이지에 있다.',
    seeServices: '업무 안내',
    toolsKicker: '02 / Products',
    toolsTitle: '제품',
    toolsNote: '공식 사이트 소개와 공개 GitHub 저장소에서 가져왔다.',
    allTools: '모든 제품과 프로젝트',
    githubOrg: 'GitHub 조직',
    articlesKicker: '03 / Articles',
    articlesTitle: '글',
    articlesNote: '팀의 기술 글을 이곳에 게시한다.',
    noArticles: '아직 게시된 글이 없다.',
    browseArticles: '글 목록',
  },
  about: {
    title: '팀',
    kicker: 'About the team',
    description:
      'Gh0xE9(Ghost In The Bytes)의 핵심 방향과 공개 정보를 소개한다.',
    intro:
      'Gh0xE9, 대외적으로는 Ghost In The Bytes. 팀은 차세대 네트워크 방어, APT 위협 정보, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스를 연구하는 데 위치하며, 실전 보안 경험을 바탕으로 연구 성과를 사용자가 직접 사용할 수 있는 제품과 플랫폼으로 만든다.',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'GitHub 조직의 소개문은 “Observe subtle clues to eliminate hidden risks.”이다. 우리는 이를 「미세한 단서를 관찰해, 숨은 위험을 없앤다」고 쓴다. 이것이 이 사이트의 목소리이며, 일의 방식이기도 하다.',
    identityBody:
      '이름 안의 0xE9는 x86 명령어에서 근거리 점프(JMP)다. 이것은 지어낸 창립 신화가 아니라, 이 포털이 자신을 알아보게 하는 그래픽 언어다. 바이트 속에서 단서를 보고, 어디로 점프할지를 정한다.',
    identityNote:
      'GitHub 조직은 2019년 2월 28일에 만들어졌다. 위치란에는 C:\\Windows\\lost+found\\etc가 공개되어 있다.',
  },
  services: {
    title: '업무',
    kicker: 'What we do',
    description:
      'Gh0xE9의 공개 업무: 네트워크 방어, APT 위협 정보 연구, 보안 보호, 비침습적 뇌-컴퓨터 인터페이스, 그리고 레드팀 평가, 사고 대응과 포렌식, 코드 감사, CTF 훈련 등 지원 역량.',
    intro:
      '더 깊은 이야기는 연락 페이지의 공개 창구로.',
    contactUs: '연락하기',
    existingSite: '기존 사이트',
    items: [
      {
        no: '01',
        title: '네트워크 방어',
        sub: 'Network Defense',
        body: '사이버 공간의 지속적 모니터링, 위협 헌팅, 방어 전략과 보안 운영 역량 구축.',
      },
      {
        no: '02',
        title: 'APT 위협 정보 연구',
        sub: 'APT Threat Intelligence Research',
        body: '지능형 지속 위협을 둘러싼 단서 발견, 귀속 분석, 정보 생산과 헌팅 방법 연구.',
      },
      {
        no: '03',
        title: '보안 보호',
        sub: 'Security Protection',
        body: '엔드포인트, 네트워크, 비즈니스 시스템을 위한 보호 제품과 보안 기준 역량.',
      },
      {
        no: '04',
        title: '비침습적 뇌-컴퓨터 인터페이스',
        sub: 'Non-invasive Brain-Computer Interface',
        body: '비침습적 뇌-컴퓨터 인터페이스의 연구, 엔지니어링, 보안과 프라이버시 보장.',
      },
      {
        no: '05',
        title: '레드팀 평가와 공방 훈련',
        sub: 'Red Team Assessment & Adversary Emulation',
        body: '인가 범위 내의 레드팀 평가, 공방 훈련과 공격 표면 검증.',
      },
      {
        no: '06',
        title: '사고 대응과 포렌식',
        sub: 'Incident Response & Forensics',
        body: '사고 대응, 침입 포렌식, 로그 및 모니터링 분석.',
      },
      {
        no: '07',
        title: '코드 감사',
        sub: 'Code Audit',
        body: '정적 분석, 취약점 보고, 그리고 수정 가이드.',
      },
      {
        no: '08',
        title: 'CTF 대회 개최와 훈련',
        sub: 'CTF Competition Hosting & Training',
        body: '대학과 커뮤니티를 위한 대회 개최, 그리고 그에 따른 역량 훈련.',
      },
    ],
  },
  tools: {
    title: '제품',
    kicker: 'Products & projects',
    description:
      'Gh0xE9가 공개 소개한 제품과 GitHub 저장소: EagleSword, NextAssets, NextDetect, ErraticGopher, open_artex, hello-writeup. 내부 제품 ErraticVaelor도 있다.',
    intro:
      '앞의 세 가지는 기존 공식 사이트의 제품 소개이고, ErraticGopher, open_artex, hello-writeup은 GitHub 조직의 공개 저장소다. ErraticVaelor는 내부 제품이며, 공개 저장소나 문서는 제공하지 않는다. 여기에서는 개요만 적는다. 악용 절차나 재현 과정은 제공하지 않는다.',
    openGithub: 'GitHub 조직 열기',
    officialKind: '공식 소개',
    githubKind: 'GitHub',
    internalKind: '내부',
    items: [
      {
        id: 'eaglesword',
        name: 'EagleSword',
        kind: 'official' as const,
        body: '자산 탐색, 취약점 검증, 내부 평가를 위한 가볍고 모듈화된 공격적 보안 테스트 도구. 공개 소개는 모듈성, 자동 탐색, 내부 네트워크 지원, 고성능 스캔을 강조한다.',
      },
      {
        id: 'nextassets',
        name: 'NextAssets',
        kind: 'official' as const,
        body: '버그 바운티, 침투 테스트, 훈련을 위한 지능형 자산 탐색. 외부 자산 탐색, 핑거프린팅, 기본 취약점 탐지, 정보 유출 및 취약 지점 식별.',
      },
      {
        id: 'nextdetect',
        name: 'NextDetect',
        kind: 'official' as const,
        body: '정찰 단계에서 민감 정보, 숨겨진 디렉터리, 자산 위치를 찾는 가벼운 확장.',
      },
      {
        id: 'erraticgopher',
        name: 'ErraticGopher',
        kind: 'github' as const,
        body: '인가된 침투 테스트와 레드팀 작업을 위한 데스크톱 도구. GitHub 조직에 공개되어 있다.',
      },
      {
        id: 'erraticvaelor',
        name: 'ErraticVaelor',
        kind: 'internal' as const,
        body: '내부에서 개발한 자율 공방 에이전트 제품이며, 공개 저장소나 문서를 제공하지 않는다.',
      },
      {
        id: 'open_artex',
        name: 'open_artex',
        kind: 'github' as const,
        body: 'ARTEX 파생 프로젝트의 인덱스 저장소.',
      },
      {
        id: 'hello-writeup',
        name: 'hello-writeup',
        kind: 'github' as const,
        body: 'CTF 라이트업 저장소.',
      },
    ],
  },
  articles: {
    title: '글',
    kicker: 'Field notes',
    description: 'Gh0xE9 팀의 기술 글. 이후 원고는 Markdown으로 이 코너에 게시된다.',
    intro:
      '팀은 여기에 자체 기술 글을 게시한다. 새 글에는 날짜와 태그가 붙고, 시간순으로 나열된다. 위챗이나 다른 플랫폼의 원문을 전재하지 않는다.',
    empty: '아직 게시된 글이 없다.',
    back: '글 목록으로',
    updated: '수정',
  },
  contact: {
    title: '연락',
    kicker: 'Get in touch',
    description: '기존 공식 사이트, GitHub, X, 위챗 공식 계정으로 Gh0xE9에 연락할 수 있다.',
    intro:
      '현재 공개적으로 확인할 수 있는 연락 방법은 아래와 같다. 이 사이트는 이메일 명단을 공개하지 않는다. 대학이나 커뮤니티에서 합류하고 싶다면, 먼저 이 창구로 인사를 건네면 된다.',
    officialTitle: '기존 사이트',
    wechatTitle: '공식 계정',
    wechatAria: '위챗 공식 계정',
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