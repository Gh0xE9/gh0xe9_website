import type { Locale } from './i18n';

export const serviceNos = ['01', '02', '03', '04', '05', '06'] as const;
export type ServiceNo = (typeof serviceNos)[number];
export type FieldMode = 'loop' | 'timeline' | 'corridor' | 'signals' | 'protocol' | 'ground';

export type ServiceScene = {
  no: ServiceNo;
  mode: FieldMode;
  labels: string[];
  beats: [string, string, string];
};

const modes: Record<ServiceNo, FieldMode> = {
  '01': 'loop',
  '02': 'timeline',
  '03': 'corridor',
  '04': 'signals',
  '05': 'protocol',
  '06': 'ground',
};

const scenes: Record<Locale, Record<ServiceNo, ServiceScene>> = {
  zh: {
    '01': {
      no: '01',
      mode: 'loop',
      labels: ['ASSET', 'TRAFFIC', 'LOG', 'ALERT'],
      beats: [
        '面向网络空间的持续监测、威胁狩猎、防御策略设计与安全运营能力建设',
        '围绕资产、流量、日志与告警建立可落地的防御闭环',
        '我们关注的不只是发现风险，也包括把防御规则、响应流程和运营机制沉淀为可复用的产品能力。',
      ],
    },
    '02': {
      no: '02',
      mode: 'timeline',
      labels: ['EVENT', 'TRACE', 'SCOPE'],
      beats: [
        '面向安全事件提供事件响应、入侵取证以及日志与监测分析',
        '协助还原事件经过、定位影响范围并梳理处置要点',
        '相关经验会进一步沉淀为应急响应流程、检测规则与取证分析能力，服务于更广泛的安全防护场景。',
      ],
    },
    '03': {
      no: '03',
      mode: 'corridor',
      labels: ['SCOPE', 'PATH', 'HOLD'],
      beats: [
        '在明确授权范围内开展红队评估、攻防演练与攻击面验证',
        '围绕真实攻击路径检验防护体系的有效性',
        '评估结果用于发现防御短板、验证检测响应能力，并推动安全策略和产品能力持续改进。',
      ],
    },
    '04': {
      no: '04',
      mode: 'signals',
      labels: ['SIGNAL', 'TRACE', 'QUERY'],
      beats: [
        '围绕高级持续性威胁开展线索发现、归因分析、情报生产与狩猎方法研究',
        '关注攻击链中的弱信号、基础设施痕迹与行为模式',
        '致力于把分散的情报线索转化为可查询、可验证、可用于防御决策的情报能力。',
      ],
    },
    '05': {
      no: '05',
      mode: 'protocol',
      labels: ['PROTOCOL', 'DATAFLOW', 'SOFTWARE ONLY'],
      beats: [
        '聚焦非侵入式脑机接口的协议研究、软件仿真与交互流程验证',
        '当前仅在软件层面开展模拟，不涉及人体实验、临床用途或医疗诊断',
        '研究覆盖协议设计、数据流与处理流程、交互应用验证，以及数据安全、隐私保护与合规使用等问题。',
      ],
    },
    '06': {
      no: '06',
      mode: 'ground',
      labels: ['HOST', 'DESIGN', 'REVIEW'],
      beats: [
        '面向高校或政企提供 CTF 赛事承办、赛题设计与配套能力训练',
        '覆盖比赛组织、题目构建、环境保障和赛后复盘等环节',
        '我们希望通过赛事与训练，把实战经验转化为可学习、可复用的安全能力。',
      ],
    },
  },
  en: {
    '01': {
      no: '01',
      mode: 'loop',
      labels: ['ASSET', 'TRAFFIC', 'LOG', 'ALERT'],
      beats: [
        'Continuous monitoring, threat hunting, defensive strategy design, and security-operations capability building for cyberspace.',
        'Around assets, traffic, logs, and alerts we establish a defensive loop that can actually be run.',
        'We care not only about finding risk, but also about settling defensive rules, response processes, and operating mechanisms into reusable product capability.',
      ],
    },
    '02': {
      no: '02',
      mode: 'timeline',
      labels: ['EVENT', 'TRACE', 'SCOPE'],
      beats: [
        'For security incidents we provide incident response, intrusion forensics, and log and monitoring analysis,',
        'helping reconstruct what happened, locate the scope of impact, and sort out the points of handling.',
        'That experience is further settled into incident-response processes, detection rules, and forensic-analysis capability, in service of a wider range of protection scenarios.',
      ],
    },
    '03': {
      no: '03',
      mode: 'corridor',
      labels: ['SCOPE', 'PATH', 'HOLD'],
      beats: [
        'Within a clearly authorized scope we conduct red-team assessment, attack-defense exercises, and attack-surface validation,',
        'testing the effectiveness of a protection system along real attack paths.',
        'The results are used to find defensive gaps, verify detection and response capability, and drive continual improvement of security policy and product capability.',
      ],
    },
    '04': {
      no: '04',
      mode: 'signals',
      labels: ['SIGNAL', 'TRACE', 'QUERY'],
      beats: [
        'Around advanced persistent threats we conduct clue discovery, attribution analysis, intelligence production, and research on hunting methods.',
        'We attend to weak signals, infrastructure traces, and behavioral patterns in the attack chain,',
        'and work to turn scattered intelligence clues into intelligence capability that can be queried, verified, and used in defensive decisions.',
      ],
    },
    '05': {
      no: '05',
      mode: 'protocol',
      labels: ['PROTOCOL', 'DATAFLOW', 'SOFTWARE ONLY'],
      beats: [
        'We focus on protocol research, software simulation, and interaction-flow validation for non-invasive brain-computer interfaces.',
        'At present the work is simulation at the software layer only, and does not involve human experiments, clinical use, or medical diagnosis.',
        'The research covers protocol design, data flow and processing, validation of interactive applications, and questions of data security, privacy protection, and compliant use.',
      ],
    },
    '06': {
      no: '06',
      mode: 'ground',
      labels: ['HOST', 'DESIGN', 'REVIEW'],
      beats: [
        'For universities or government and enterprise we provide CTF competition hosting, challenge design, and supporting capability training,',
        'covering organization, challenge construction, environment support, and after-action review.',
        'We hope, through contests and training, to turn practical experience into security capability that can be learned and reused.',
      ],
    },
  },
  ko: {
    '01': {
      no: '01',
      mode: 'loop',
      labels: ['ASSET', 'TRAFFIC', 'LOG', 'ALERT'],
      beats: [
        '사이버 공간을 향한 지속 모니터링, 위협 헌팅, 방어 전략 설계, 보안 운영 역량 구축.',
        '자산, 트래픽, 로그, 경보를 중심으로 실제로 운영할 수 있는 방어 루프를 세운다.',
        '우리가 관심 갖는 것은 위험을 발견하는 일만이 아니라, 방어 규칙, 대응 절차, 운영 메커니즘을 재사용할 수 있는 제품 역량으로 응축하는 일이기도 하다.',
      ],
    },
    '02': {
      no: '02',
      mode: 'timeline',
      labels: ['EVENT', 'TRACE', 'SCOPE'],
      beats: [
        '보안 사고를 대상으로 사고 대응, 침입 포렌식, 로그 및 모니터링 분석을 제공하며,',
        '사건의 경과를 재구성하고 영향 범위를 파악하며 조치 요점을 정리하는 일을 돕는다.',
        '그 경험은 사고 대응 절차, 탐지 규칙, 포렌식 분석 역량으로 더 응축되어, 더 넓은 보안 방어 현장에 쓰인다.',
      ],
    },
    '03': {
      no: '03',
      mode: 'corridor',
      labels: ['SCOPE', 'PATH', 'HOLD'],
      beats: [
        '명확히 인가된 범위 안에서 레드팀 평가, 공방 훈련, 공격 표면 검증을 수행하며,',
        '실제 공격 경로를 따라 방어 체계의 유효성을 시험한다.',
        '평가 결과는 방어의 빈틈을 찾고, 탐지와 대응 역량을 검증하며, 보안 정책과 제품 역량의 지속적인 개선을 이끄는 데 쓰인다.',
      ],
    },
    '04': {
      no: '04',
      mode: 'signals',
      labels: ['SIGNAL', 'TRACE', 'QUERY'],
      beats: [
        '지능형 지속 위협을 둘러싸고 단서 발견, 귀속 분석, 정보 생산, 헌팅 방법 연구를 수행한다.',
        '공격 사슬 안의 약한 신호, 인프라 흔적, 행동 패턴에 주목하며,',
        '흩어진 정보 단서를 조회하고 검증하며 방어 결정에 쓸 수 있는 정보 역량으로 바꾸는 데 힘쓴다.',
      ],
    },
    '05': {
      no: '05',
      mode: 'protocol',
      labels: ['PROTOCOL', 'DATAFLOW', 'SOFTWARE ONLY'],
      beats: [
        '비침습적 뇌-컴퓨터 인터페이스의 프로토콜 연구, 소프트웨어 시뮬레이션, 상호작용 흐름 검증에 초점을 둔다.',
        '현재는 소프트웨어 계층의 모의만 수행하며, 인체 실험, 임상 용도, 의료 진단은 포함하지 않는다.',
        '연구는 프로토콜 설계, 데이터 흐름과 처리 과정, 상호작용 응용 검증, 그리고 데이터 보안, 프라이버시 보호, 준법 사용 등의 문제를 다룬다.',
      ],
    },
    '06': {
      no: '06',
      mode: 'ground',
      labels: ['HOST', 'DESIGN', 'REVIEW'],
      beats: [
        '대학 또는 정부·기업을 대상으로 CTF 대회 개최, 문제 설계, 그에 따른 역량 훈련을 제공하며,',
        '대회 조직, 문제 구축, 환경 보장, 사후 복기 등의 과정을 아우른다.',
        '우리는 대회와 훈련을 통해 실전 경험을 학습하고 재사용할 수 있는 보안 역량으로 바꾸기를 바란다.',
      ],
    },
  },
};

export function getServiceScene(locale: Locale, no: string): ServiceScene | undefined {
  if (!(serviceNos as readonly string[]).includes(no)) return undefined;
  return scenes[locale][no as ServiceNo];
}

export function getFieldMode(no: string): FieldMode {
  return modes[(no as ServiceNo) ?? '01'] ?? 'loop';
}
