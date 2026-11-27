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
    'Gh0xE9（Ghost In The Bytes）是一支安全团队：红队评估、蓝队响应与取证、代码审计，以及 CTF 赛事承办与训练。',
  motto: '观微知著，消隐于无形。',
  nav: {
    home: { label: '首页', sub: 'Home' },
    about: { label: '团队', sub: 'About' },
    services: { label: '业务', sub: 'Services' },
    tools: { label: '工具', sub: 'Tools' },
    articles: { label: '文章', sub: 'Articles' },
    contact: { label: '联系', sub: 'Contact' },
  },
  home: {
    lede:
      '我们做授权的红队评估、蓝队响应与取证、代码审计，也承办和训练 CTF。名字写在字节里：0xE9 是一次跳转，线索往往就在跳转之前。',
    readArticles: '阅读文章',
    meetTeam: '了解团队',
    servicesKicker: '01 / Services',
    servicesTitle: '业务',
    servicesNote: '公开介绍的工作概要，不做夸大。',
    servicesLead:
      '我们是一支综合性的团队。网络安全是工作的一部分，业务也向相邻的领域延伸。这里只作概要，详细说明在业务页。',
    seeServices: '查看业务说明',
    toolsKicker: '02 / Tools',
    toolsTitle: '工具',
    toolsNote: '来自官网介绍与 GitHub 公开仓库。',
    allTools: '全部工具与项目',
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
      '认识 Gh0xE9（Ghost In The Bytes）：公开可核验的团队介绍。',
    intro:
      'Gh0xE9，也写作 Ghost In The Bytes。下面只写有来源的公开事实，也不虚构奖项。',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'GitHub 组织的简介是「Observe subtle clues to eliminate hidden risks」。我们把它写成「观微知著，消隐于无形」。这是站点的声音，也是工作方式。',
    identityBody:
      '名称里的 0xE9，在 x86 指令里是一次近跳转（JMP）。这不是一段编造的创立神话，而是这个门户用来辨认自己的图形语言：在字节里看见线索，再决定跳到哪里。',
    identityNote:
      'GitHub 组织创建于 2019 年 2 月 28 日。定位一栏公开写着 C:\\Windows\\lost+found\\etc，我们不强行指定单一总部地址。',
  },
  services: {
    title: '业务',
    kicker: 'What we do',
    description:
      'Gh0xE9 的公开业务：红队渗透测试、蓝队应急响应与取证、代码审计、CTF 赛事承办与训练，以及脑机接口、生物安全、网络防御与军工。',
    intro:
      '前四项说明来自团队已有官网的公开介绍；其后为一并开展的其他业务。用来说明我们做什么，而不是一份报价单。如需进一步沟通，请走联系页的公开渠道。',
    contactUs: '联系我们',
    existingSite: '已有官网',
    items: [
      {
        no: '01',
        title: '红队渗透测试',
        sub: 'Red Team Penetration Testing',
        body: '面向网络与系统、Web 应用，以及社会工程与钓鱼演练的授权评估。',
      },
      {
        no: '02',
        title: '蓝队应急响应与取证',
        sub: 'Blue Team Incident Response & Forensics',
        body: '事件响应、入侵取证，以及日志与监测分析。',
      },
      {
        no: '03',
        title: '代码审计',
        sub: 'Code Audit',
        body: '静态分析、漏洞报告，以及修复建议。',
      },
      {
        no: '04',
        title: 'CTF 赛事承办与训练',
        sub: 'CTF Competition Hosting & Training',
        body: '面向高校与社区的比赛组织，以及配套的能力训练。',
      },
      {
        no: '05',
        title: '脑机接口',
        sub: 'Brain-Computer Interface',
        body: '脑机接口领域的研究与工程工作。',
      },
      {
        no: '06',
        title: '生物安全',
        sub: 'Biosecurity',
        body: '生物安全相关的防护与保障工作。',
      },
      {
        no: '07',
        title: '网络防御',
        sub: 'Network Defense',
        body: '面向网络空间的防御与安全保障。',
      },
      {
        no: '08',
        title: '军工',
        sub: 'Defense Industry',
        body: '面向军工领域的相关工作。',
      },
    ],
  },
  tools: {
    title: '工具',
    kicker: 'Tools & projects',
    description:
      'Gh0xE9 公开介绍过的工具与 GitHub 仓库：EagleSword、NextAssets、NextDetect，以及 ErraticGopher、open_artex、hello-writeup。另有内部产品 ErraticVaelor。',
    intro:
      '前三项摘自已有官网的产品介绍；ErraticGopher、open_artex 与 hello-writeup 是 GitHub 组织上的公开仓库。ErraticVaelor 是内部产品，不提供公开仓库或文档。这里只做概要说明，不提供利用步骤或复现过程。',
    openGithub: '打开 GitHub 组织',
    officialKind: '官方介绍',
    githubKind: 'GitHub',
    internalKind: '内部',
    items: [
      {
        id: 'eaglesword',
        name: 'EagleSword',
        kind: 'official' as const,
        body: '轻量、模块化的进攻性安全测试工具，用于资产发现、漏洞验证与内部评估。公开介绍强调模块化、自动化发现、内网辅助与高性能扫描。',
      },
      {
        id: 'nextassets',
        name: 'NextAssets',
        kind: 'official' as const,
        body: '面向漏洞赏金、渗透测试与演习的智能资产发现：外部资产发现、指纹识别、基础漏洞检测，以及信息泄露与薄弱点识别。',
      },
      {
        id: 'nextdetect',
        name: 'NextDetect',
        kind: 'official' as const,
        body: '侦察阶段使用的轻量扩展，用来定位敏感信息、隐藏目录与资产位置。',
      },
      {
        id: 'erraticgopher',
        name: 'ErraticGopher',
        kind: 'github' as const,
        body: '面向授权渗透测试与红队工作的桌面工具，源码公开在 GitHub 组织下。',
      },
      {
        id: 'erraticvaelor',
        name: 'ErraticVaelor',
        kind: 'internal' as const,
        body: '下一代主动进攻型人工智能武器（RCE 100%）。',
      },
      {
        id: 'open_artex',
        name: 'open_artex',
        kind: 'github' as const,
        body: 'ARTEX 衍生项目的索引仓库。',
      },
      {
        id: 'hello-writeup',
        name: 'hello-writeup',
        kind: 'github' as const,
        body: 'CTF writeup 仓库。',
      },
    ],
  },
  articles: {
    title: '文章',
    kicker: 'Field notes',
    description: 'Gh0xE9 团队的技术文章。后续新稿会以 Markdown 的形式发布在这个栏目。',
    intro:
      '团队会在这里发布自己的技术文章。新稿带有日期与标签，按时间排列。我们不转载公众号或其他平台的原文。',
    empty: '还没有已发布的文章。',
    back: '返回文章列表',
    updated: '更新',
  },
  contact: {
    title: '联系',
    kicker: 'Get in touch',
    description: '通过已有官网、GitHub、X 或微信公众号联系 Gh0xE9。',
    intro:
      '目前公开可核验的联系方式如下。本站不公布邮箱名册。高校与社区同伴若有意加入，可先通过这些窗口打招呼。',
    officialTitle: '已有官网',
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
    'Gh0xE9 — Ghost In The Bytes — is a security team working across red-team assessment, blue-team response and forensics, code audit, and CTF hosting and training.',
  motto: 'Observe subtle clues to eliminate hidden risks.',
  nav: {
    home: { label: 'Home', sub: '首页' },
    about: { label: 'Team', sub: '团队' },
    services: { label: 'Work', sub: '业务' },
    tools: { label: 'Tools', sub: '工具' },
    articles: { label: 'Articles', sub: '文章' },
    contact: { label: 'Contact', sub: '联系' },
  },
  home: {
    lede:
      'We do authorized red-team assessments, blue-team response and forensics, code audit, and CTF hosting and training. The name lives in the bytes: 0xE9 is a jump. The clue is usually just before it.',
    readArticles: 'Read the articles',
    meetTeam: 'Meet the team',
    servicesKicker: '01 / Services',
    servicesTitle: 'Work',
    servicesNote: 'A brief look at the work. No inflation.',
    servicesLead:
      'We are a comprehensive team. Cybersecurity is part of the work, which also extends into adjacent fields. This is only a brief note; the details are on the work page.',
    seeServices: 'See the work',
    toolsKicker: '02 / Tools',
    toolsTitle: 'Tools',
    toolsNote: 'From the official site and public GitHub repositories.',
    allTools: 'All tools and projects',
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
      'Gh0xE9 (Ghost In The Bytes): a sourced public introduction.',
    intro:
      'Gh0xE9, also written Ghost In The Bytes. What follows is sourced public fact. We do not invent awards.',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'The GitHub organization’s bio is “Observe subtle clues to eliminate hidden risks.” We write it in Chinese as 「观微知著，消隐于无形」. That is the voice of this site, and the way the work is done.',
    identityBody:
      'The 0xE9 in the name is a near jump (JMP) in x86. This is not an invented origin myth; it is the graphic language this portal uses to recognize itself: see the clue in the bytes, then decide where to jump.',
    identityNote:
      'The GitHub organization was created on 28 February 2019. The location field is published as C:\\Windows\\lost+found\\etc. We do not assert a single headquarters.',
  },
  services: {
    title: 'Work',
    kicker: 'What we do',
    description:
      'Gh0xE9’s public work: red-team penetration testing, blue-team incident response and forensics, code audit, CTF hosting and training, as well as brain-computer interface, biosecurity, network defense, and the defense industry.',
    intro:
      'The first four descriptions come from the team’s existing official site. The lines that follow are additional areas of work. They say what we do; they are not a rate card. For further conversation, use the public channels on the contact page.',
    contactUs: 'Contact us',
    existingSite: 'Existing site',
    items: [
      {
        no: '01',
        title: 'Red Team Penetration Testing',
        sub: '红队渗透测试',
        body: 'Authorized assessments of networks and systems, web applications, and social-engineering and phishing exercises.',
      },
      {
        no: '02',
        title: 'Blue Team Incident Response & Forensics',
        sub: '蓝队应急响应与取证',
        body: 'Incident response, intrusion forensics, and log and monitoring analysis.',
      },
      {
        no: '03',
        title: 'Code Audit',
        sub: '代码审计',
        body: 'Static analysis, vulnerability reports, and remediation guidance.',
      },
      {
        no: '04',
        title: 'CTF Competition Hosting & Training',
        sub: 'CTF 赛事承办与训练',
        body: 'Competition hosting for universities and communities, with supporting training.',
      },
      {
        no: '05',
        title: 'Brain-Computer Interface',
        sub: '脑机接口',
        body: 'Research and engineering in brain-computer interfaces.',
      },
      {
        no: '06',
        title: 'Biosecurity',
        sub: '生物安全',
        body: 'Protective work in biosecurity.',
      },
      {
        no: '07',
        title: 'Network Defense',
        sub: '网络防御',
        body: 'Defensive operations and protection in cyberspace.',
      },
      {
        no: '08',
        title: 'Defense Industry',
        sub: '军工',
        body: 'Work in the defense and military-industrial sector.',
      },
    ],
  },
  tools: {
    title: 'Tools',
    kicker: 'Tools & projects',
    description:
      'Tools and public repositories associated with Gh0xE9: EagleSword, NextAssets, NextDetect, ErraticGopher, open_artex, and hello-writeup. Also an internal product, ErraticVaelor.',
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
        body: 'Next-generation offensive AI weapon (RCE 100%).',
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
    'Gh0xE9(Ghost In The Bytes)는 레드팀 평가, 블루팀 대응과 포렌식, 코드 감사, CTF 개최와 훈련을 하는 보안 팀이다.',
  motto: '미세한 단서를 관찰해, 숨은 위험을 없앤다.',
  nav: {
    home: { label: '홈', sub: 'Home' },
    about: { label: '팀', sub: 'Team' },
    services: { label: '업무', sub: 'Work' },
    tools: { label: '도구', sub: 'Tools' },
    articles: { label: '글', sub: 'Articles' },
    contact: { label: '연락', sub: 'Contact' },
  },
  home: {
    lede:
      '우리는 인가된 레드팀 평가, 블루팀 대응과 포렌식, 코드 감사, 그리고 CTF 개최와 훈련을 한다. 이름은 바이트 안에 있다. 0xE9는 한 번의 점프이고, 단서는 대개 그 직전에 있다.',
    readArticles: '글 읽기',
    meetTeam: '팀 소개',
    servicesKicker: '01 / Services',
    servicesTitle: '업무',
    servicesNote: '공개된 업무의 개요. 과장하지 않는다.',
    servicesLead:
      '우리는 종합적인 팀이다. 사이버 보안은 업무의 한 부분이며, 인접한 분야로도 확장된다. 여기는 개요만 적고, 자세한 안내는 업무 페이지에 있다.',
    seeServices: '업무 안내',
    toolsKicker: '02 / Tools',
    toolsTitle: '도구',
    toolsNote: '공식 사이트와 공개 GitHub 저장소에서.',
    allTools: '모든 도구와 프로젝트',
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
      'Gh0xE9(Ghost In The Bytes)를 공개된 사실로 소개한다.',
    intro:
      'Gh0xE9, 대외적으로는 Ghost In The Bytes. 아래는 출처가 있는 공개 사실만 적는다. 수상 경력도 지어내지 않는다.',
    identityKicker: 'Identity',
    identityTitle: '观微知著',
    identityLede:
      'GitHub 조직의 소개문은 “Observe subtle clues to eliminate hidden risks.”이다. 우리는 이를 「미세한 단서를 관찰해, 숨은 위험을 없앤다」고 쓴다. 이것이 이 사이트의 목소리이며, 일의 방식이기도 하다.',
    identityBody:
      '이름 안의 0xE9는 x86 명령어에서 근거리 점프(JMP)다. 이것은 지어낸 창립 신화가 아니라, 이 포털이 자신을 알아보게 하는 그래픽 언어다. 바이트 속에서 단서를 보고, 어디로 점프할지를 정한다.',
    identityNote:
      'GitHub 조직은 2019년 2월 28일에 만들어졌다. 위치란에는 C:\\Windows\\lost+found\\etc가 공개되어 있다. 우리는 하나의 본사를 단정하지 않는다.',
  },
  services: {
    title: '업무',
    kicker: 'What we do',
    description:
      'Gh0xE9의 공개 업무: 레드팀 침투 테스트, 블루팀 사고 대응과 포렌식, 코드 감사, CTF 개최와 훈련, 그리고 뇌-컴퓨터 인터페이스, 생물 안전, 네트워크 방어, 방위 산업.',
    intro:
      '앞의 네 가지 설명은 기존 공식 사이트에 공개된 소개를 따른다. 그 아래는 함께 수행하는 다른 업무다. 우리가 무엇을 하는지를 말할 뿐, 견적서가 아니다. 더 깊은 이야기는 연락 페이지의 공개 창구로.',
    contactUs: '연락하기',
    existingSite: '기존 사이트',
    items: [
      {
        no: '01',
        title: '레드팀 침투 테스트',
        sub: 'Red Team Penetration Testing',
        body: '네트워크와 시스템, 웹 애플리케이션, 그리고 사회공학 및 피싱 훈련에 대한 인가된 평가.',
      },
      {
        no: '02',
        title: '블루팀 사고 대응과 포렌식',
        sub: 'Blue Team Incident Response & Forensics',
        body: '사고 대응, 침입 포렌식, 로그 및 모니터링 분석.',
      },
      {
        no: '03',
        title: '코드 감사',
        sub: 'Code Audit',
        body: '정적 분석, 취약점 보고, 그리고 수정 가이드.',
      },
      {
        no: '04',
        title: 'CTF 대회 개최와 훈련',
        sub: 'CTF Competition Hosting & Training',
        body: '대학과 커뮤니티를 위한 대회 개최, 그리고 그에 따른 역량 훈련.',
      },
      {
        no: '05',
        title: '뇌-컴퓨터 인터페이스',
        sub: 'Brain-Computer Interface',
        body: '뇌-컴퓨터 인터페이스 분야의 연구와 공학 작업.',
      },
      {
        no: '06',
        title: '생물 안전',
        sub: 'Biosecurity',
        body: '생물 안전 분야의 방어와 보호 업무.',
      },
      {
        no: '07',
        title: '네트워크 방어',
        sub: 'Network Defense',
        body: '사이버 공간의 방어와 안전 보장.',
      },
      {
        no: '08',
        title: '방위 산업',
        sub: 'Defense Industry',
        body: '방위 산업 분야의 관련 업무.',
      },
    ],
  },
  tools: {
    title: '도구',
    kicker: 'Tools & projects',
    description:
      'Gh0xE9가 공개 소개한 도구와 GitHub 저장소: EagleSword, NextAssets, NextDetect, ErraticGopher, open_artex, hello-writeup. 내부 제품 ErraticVaelor도 있다.',
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
        body: '차세대 능동 공격형 인공지능 무기(RCE 100%).',
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
