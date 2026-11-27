import type { Locale } from './i18n';
import type { ServiceNo } from './service-scenes';

/* ============================================================
   Service deck content — one walkthrough per service.
   Every deck demos the ACTUAL business: what it is, then the
   real workflow stage by stage. No futurism, no metaphors —
   the instrument on the right acts out the stage you are on.
   ============================================================ */

export type DeckSceneKind = 'boot' | 'intro' | 'stage' | 'outro';

export type DeckScene = {
  kind: DeckSceneKind;
  /** short rail label, e.g. 启动 / 信息搜集 */
  name: string;
  /** mono tag line above the title */
  kicker: string;
  title: string;
  body?: string;
  lines?: string[];
  /** set on stage scenes: 1-based index + total, filled by the builder */
  stageNo?: number;
  stageCount?: number;
};

export type ServiceDeck = {
  no: ServiceNo;
  scenes: DeckScene[];
};

type DeckUi = {
  scrollHint: string;
  play: string;
  pause: string;
  backToServices: string;
  nextService: string;
  contact: string;
  sceneOf: string;
};

/* ---------------- 中文 ---------------- */

const zh: Record<ServiceNo, Omit<ServiceDeck, 'no'>> = {
  '01': {
    scenes: [
      {
        kind: 'boot',
        name: '启动',
        kicker: 'GH0XE9 / SERVICE 01',
        title: '网络防御',
        body: '面向网络空间的持续监测、威胁狩猎与防御体系建设。',
      },
      {
        kind: 'intro',
        name: '是什么',
        kicker: 'WHAT IT IS',
        title: '一条可落地的防御闭环',
        body: '围绕资产、流量、日志与告警建立防御闭环；发现风险之外，也把规则、流程与机制沉淀为可复用的产品能力。',
        lines: ['ASSET — 资产', 'TRAFFIC — 流量', 'LOG — 日志', 'ALERT — 告警'],
      },
      {
        kind: 'stage',
        name: '持续监测',
        kicker: 'MONITORING',
        title: '持续监测',
        body: '资产、流量、日志全量接入，哨戒线不间断扫描。',
        lines: ['全量遥测接入', '基线与异常比对', '7×24 值守'],
      },
      {
        kind: 'stage',
        name: '威胁狩猎',
        kicker: 'THREAT HUNTING',
        title: '威胁狩猎',
        body: '在噪声里主动寻找异常：弱信号关联、行为比对、假设驱动验证。',
        lines: ['弱信号关联', '行为模式比对', '假设驱动验证'],
      },
      {
        kind: 'stage',
        name: '防御闭环',
        kicker: 'DEFENSIVE LOOP',
        title: '防御闭环',
        body: '告警确认即处置：隔离、封禁、规则下发，结果回流监测。',
        lines: ['隔离与封禁', '检测规则下发', '处置结果回流'],
      },
      {
        kind: 'stage',
        name: '能力沉淀',
        kicker: 'CAPABILITY',
        title: '能力沉淀',
        body: '每一次处置都沉淀为检测规则、响应流程与运营机制，防御随时间变厚。',
        lines: ['检测规则库', '响应流程', '运营机制'],
      },
      {
        kind: 'outro',
        name: '跳转',
        kicker: 'EOF / JMP',
        title: '观微知著',
        body: '消隐于无形。',
      },
    ],
  },
  '02': {
    scenes: [
      {
        kind: 'boot',
        name: '启动',
        kicker: 'GH0XE9 / SERVICE 02',
        title: '应急响应',
        body: '事件响应、入侵取证、日志与监测分析。',
      },
      {
        kind: 'intro',
        name: '是什么',
        kicker: 'WHAT IT IS',
        title: '把事件还原成一条时间线',
        body: '面向安全事件提供响应、取证与监测分析：还原经过、定位影响范围、梳理处置要点。',
        lines: ['EVENT — 事件', 'TRACE — 痕迹', 'SCOPE — 范围'],
      },
      {
        kind: 'stage',
        name: '检测确认',
        kicker: 'DETECTION',
        title: '检测确认',
        body: '确认事件性质、严重程度与影响范围，启动对应级别的响应预案。',
        lines: ['告警确认与分级', '事件性质判定', '影响范围评估'],
      },
      {
        kind: 'stage',
        name: '抑制隔离',
        kicker: 'CONTAINMENT',
        title: '抑制隔离',
        body: '先止损：隔离受影响系统、应用临时修复，阻断扩散路径。',
        lines: ['隔离受影响系统', '临时修复措施', '阻断扩散路径'],
      },
      {
        kind: 'stage',
        name: '取证根除',
        kicker: 'ERADICATION',
        title: '取证根除',
        body: '镜像、日志与内存固定证据，还原攻击路径，找出根源并彻底清除。',
        lines: ['镜像与痕迹固定', '攻击路径还原', '清除后门与修补'],
      },
      {
        kind: 'stage',
        name: '恢复跟进',
        kicker: 'RECOVERY',
        title: '恢复跟进',
        body: '从可信备份恢复业务，持续监测验证，复盘沉淀为检测规则与流程。',
        lines: ['可信备份恢复', '持续监测验证', '复盘与规则沉淀'],
      },
      {
        kind: 'outro',
        name: '跳转',
        kicker: 'EOF / JMP',
        title: '观微知著',
        body: '消隐于无形。',
      },
    ],
  },
  '03': {
    scenes: [
      {
        kind: 'boot',
        name: '启动',
        kicker: 'GH0XE9 / SERVICE 03',
        title: '红队评估',
        body: '在明确授权范围内，以真实攻击者的视角检验防护体系。',
      },
      {
        kind: 'intro',
        name: '是什么',
        kicker: 'WHAT IT IS',
        title: '沿真实攻击路径检验防御',
        body: '红队评估、攻防演练与攻击面验证：发现防御短板、验证检测响应能力，推动安全策略与产品能力持续改进。',
        lines: ['SCOPE — 范围', 'PATH — 路径', 'HOLD — 驻留'],
      },
      {
        kind: 'stage',
        name: '授权范围',
        kicker: 'AUTHORIZATION',
        title: '授权范围',
        body: '先划定边界：明确目标范围与交战规则，什么能打、什么不能碰。',
        lines: ['目标边界确认', '交战规则', '应急联络机制'],
      },
      {
        kind: 'stage',
        name: '信息搜集',
        kicker: 'RECON',
        title: '信息搜集',
        body: '公开情报、暴露面、供应链入口——绘制目标的攻击面地图。',
        lines: ['OSINT 公开情报', '暴露面测绘', '供应链入口'],
      },
      {
        kind: 'stage',
        name: '打点突破',
        kicker: 'INITIAL ACCESS',
        title: '打点突破',
        body: '测绘目标资产，标记薄弱点，拿下第一个立足点。',
        lines: ['资产测绘', '薄弱点利用', '立足点建立'],
      },
      {
        kind: 'stage',
        name: '内网横向',
        kicker: 'LATERAL MOVEMENT',
        title: '内网横向',
        body: '沿真实路径验证纵深：入口利用、权限提升、横向移动、目标达成。',
        lines: ['入口利用', '权限提升', '横向移动'],
      },
      {
        kind: 'stage',
        name: '检测复盘',
        kicker: 'DETECTION & REPORT',
        title: '检测复盘',
        body: '记录每一步是否被发现、多快被发现，输出攻击路径报告与修复建议。',
        lines: ['检测覆盖与时效', '攻击路径报告', '修复建议与复测'],
      },
      {
        kind: 'outro',
        name: '跳转',
        kicker: 'EOF / JMP',
        title: '观微知著',
        body: '消隐于无形。',
      },
    ],
  },
  '04': {
    scenes: [
      {
        kind: 'boot',
        name: '启动',
        kicker: 'GH0XE9 / SERVICE 04',
        title: 'APT 威胁情报研究',
        body: '线索发现、归因分析、情报生产与狩猎方法研究。',
      },
      {
        kind: 'intro',
        name: '是什么',
        kicker: 'WHAT IT IS',
        title: '把弱信号变成可用情报',
        body: '围绕高级持续性威胁，把分散的情报线索转化为可查询、可验证、可用于防御决策的情报能力。',
        lines: ['SIGNAL — 信号', 'TRACE — 痕迹', 'QUERY — 查询'],
      },
      {
        kind: 'stage',
        name: '多源收集',
        kicker: 'COLLECTION',
        title: '多源收集',
        body: '内部遥测、开源情报、样本与回连数据，持续汇聚成原始线索池。',
        lines: ['内部日志与遥测', 'OSINT 开源情报', '样本与回连分析'],
      },
      {
        kind: 'stage',
        name: '处理去噪',
        kicker: 'PROCESSING',
        title: '处理去噪',
        body: '过滤冗余与虚假数据，规范化、分组、格式化，留下可分析的弱信号。',
        lines: ['去重与过滤', '格式规范化', '弱信号提取'],
      },
      {
        kind: 'stage',
        name: '分析归因',
        kicker: 'ANALYSIS',
        title: '分析归因',
        body: '多源交叉印证：关联基础设施与行为模式，归因并评定置信度。',
        lines: ['多源交叉印证', '基础设施关联', '归因与置信度'],
      },
      {
        kind: 'stage',
        name: '产出分发',
        kicker: 'DISSEMINATION',
        title: '产出分发',
        body: '产出可查询、可验证的情报与狩猎规则，反馈回流驱动下一轮收集。',
        lines: ['可查询情报库', '狩猎规则下发', '反馈回流迭代'],
      },
      {
        kind: 'outro',
        name: '跳转',
        kicker: 'EOF / JMP',
        title: '观微知著',
        body: '消隐于无形。',
      },
    ],
  },
  '05': {
    scenes: [
      {
        kind: 'boot',
        name: '启动',
        kicker: 'GH0XE9 / SERVICE 05',
        title: '非侵入式脑机接口',
        body: '协议研究、软件仿真与交互流程验证。',
      },
      {
        kind: 'intro',
        name: '是什么',
        kicker: 'WHAT IT IS',
        title: '仅在软件层面的研究验证',
        body: '当前仅在软件层面开展模拟，不涉及人体实验、临床用途或医疗诊断。',
        lines: ['PROTOCOL — 协议', 'DATAFLOW — 数据流', 'SOFTWARE ONLY — 仅软件'],
      },
      {
        kind: 'stage',
        name: '信号采集',
        kicker: 'ACQUISITION',
        title: '信号采集',
        body: '电极阵列采集微伏级脑电：采集协议、数据格式与传输设计，全程使用仿真数据源。',
        lines: ['电极阵列布局', '采样与量化', '仿真数据源'],
      },
      {
        kind: 'stage',
        name: '预处理',
        kicker: 'PREPROCESSING',
        title: '预处理',
        body: '带通滤波与伪迹剔除，把混着工频干扰、眼电肌电噪声的原始信号洗干净。',
        lines: ['带通滤波', '伪迹剔除', '基线校正'],
      },
      {
        kind: 'stage',
        name: '特征与解码',
        kicker: 'DECODING',
        title: '特征与解码',
        body: '提取与任务相关的时空频特征，用分类模型把特征映射为控制意图。',
        lines: ['特征提取', '模式分类', '意图解码'],
      },
      {
        kind: 'stage',
        name: '指令输出',
        kicker: 'OUTPUT & FEEDBACK',
        title: '指令输出',
        body: '解码结果转换为控制指令并验证反馈闭环——仅在软件仿真边界内进行。',
        lines: ['指令转换', '反馈闭环验证', '仅软件仿真'],
      },
      {
        kind: 'outro',
        name: '跳转',
        kicker: 'EOF / JMP',
        title: '观微知著',
        body: '消隐于无形。',
      },
    ],
  },
  '06': {
    scenes: [
      {
        kind: 'boot',
        name: '启动',
        kicker: 'GH0XE9 / SERVICE 06',
        title: 'CTF 赛事承办',
        body: '赛事承办、赛题设计与配套能力训练。',
      },
      {
        kind: 'intro',
        name: '是什么',
        kicker: 'WHAT IT IS',
        title: '把实战经验变成训练场',
        body: '面向高校与政企，覆盖比赛组织、题目构建、环境保障与赛后复盘。',
        lines: ['HOST — 承办', 'DESIGN — 命题', 'REVIEW — 复盘'],
      },
      {
        kind: 'stage',
        name: '赛制设计',
        kicker: 'FORMAT',
        title: '赛制设计',
        body: 'Jeopardy、AWD 或混合赛制选型，设定题目数量、方向覆盖与难度梯度。',
        lines: ['赛制选型', '方向覆盖', '难度梯度'],
      },
      {
        kind: 'stage',
        name: '赛题开发',
        kicker: 'DEVELOPMENT',
        title: '赛题开发',
        body: '覆盖 Web、Pwn、Reverse、Crypto 等方向，每题经过第三方全流程测试，排查非预期解。',
        lines: ['Web / Pwn', 'Reverse / Crypto', '全流程测试验证'],
      },
      {
        kind: 'stage',
        name: '平台保障',
        kicker: 'PLATFORM & OPS',
        title: '平台保障',
        body: '平台搭建、动态 flag 与判分链路、压力测试，赛中监控告警与反作弊。',
        lines: ['动态 flag 与判分', '压力测试', '赛中监控与反作弊'],
      },
      {
        kind: 'stage',
        name: '赛后复盘',
        kicker: 'REVIEW',
        title: '赛后复盘',
        body: '题解发布与数据复盘，题目开源沉淀，把实战经验变成可复用的训练资产。',
        lines: ['Writeup 发布', '数据复盘', '题目开源沉淀'],
      },
      {
        kind: 'outro',
        name: '跳转',
        kicker: 'EOF / JMP',
        title: '观微知著',
        body: '消隐于无形。',
      },
    ],
  },
};

const uiZh: DeckUi = {
  scrollHint: '滚动 / 方向键 翻页',
  play: '放映',
  pause: '暂停',
  backToServices: '返回业务列表',
  nextService: '下一项业务',
  contact: '联系我们',
  sceneOf: ' / ',
};

/* ---------------- English ---------------- */

const en: Record<ServiceNo, Omit<ServiceDeck, 'no'>> = {
  '01': {
    scenes: [
      {
        kind: 'boot',
        name: 'Boot',
        kicker: 'GH0XE9 / SERVICE 01',
        title: 'Network Defense',
        body: 'Continuous monitoring, threat hunting, and defensive capability building for cyberspace.',
      },
      {
        kind: 'intro',
        name: 'What',
        kicker: 'WHAT IT IS',
        title: 'A defensive loop that actually runs',
        body: 'Around assets, traffic, logs and alerts we build a defensive loop — and settle rules, processes and mechanisms into reusable product capability.',
        lines: ['ASSET', 'TRAFFIC', 'LOG', 'ALERT'],
      },
      {
        kind: 'stage',
        name: 'Monitoring',
        kicker: 'MONITORING',
        title: 'Continuous monitoring',
        body: 'Assets, traffic and logs fully connected; the watch line never stops scanning.',
        lines: ['Full telemetry intake', 'Baseline vs. anomaly', '24/7 watch'],
      },
      {
        kind: 'stage',
        name: 'Hunting',
        kicker: 'THREAT HUNTING',
        title: 'Threat hunting',
        body: 'Actively looking for anomalies in the noise: weak-signal correlation, behavior matching, hypothesis-driven verification.',
        lines: ['Weak-signal correlation', 'Behavior matching', 'Hypothesis-driven'],
      },
      {
        kind: 'stage',
        name: 'The loop',
        kicker: 'DEFENSIVE LOOP',
        title: 'Closing the loop',
        body: 'A confirmed alert triggers action: isolate, block, ship rules — results flow back into monitoring.',
        lines: ['Isolate & block', 'Ship detection rules', 'Feed results back'],
      },
      {
        kind: 'stage',
        name: 'Capability',
        kicker: 'CAPABILITY',
        title: 'Capability, settled',
        body: 'Every response settles into detection rules, response processes and operating mechanisms.',
        lines: ['Rule library', 'Response process', 'Operating mechanism'],
      },
      {
        kind: 'outro',
        name: 'Jump',
        kicker: 'EOF / JMP',
        title: 'See the small, know the large',
        body: 'And vanish without a trace.',
      },
    ],
  },
  '02': {
    scenes: [
      {
        kind: 'boot',
        name: 'Boot',
        kicker: 'GH0XE9 / SERVICE 02',
        title: 'Incident Response',
        body: 'Incident response, intrusion forensics, log and monitoring analysis.',
      },
      {
        kind: 'intro',
        name: 'What',
        kicker: 'WHAT IT IS',
        title: 'Rebuild the incident as a timeline',
        body: 'For security incidents: respond, forensicate, analyze — reconstruct what happened, locate the impact, sort out the handling.',
        lines: ['EVENT', 'TRACE', 'SCOPE'],
      },
      {
        kind: 'stage',
        name: 'Detection',
        kicker: 'DETECTION',
        title: 'Detection & triage',
        body: 'Confirm the incident’s nature, severity and blast radius; trigger the matching response plan.',
        lines: ['Confirm & triage', 'Nature of the event', 'Impact assessment'],
      },
      {
        kind: 'stage',
        name: 'Containment',
        kicker: 'CONTAINMENT',
        title: 'Containment',
        body: 'Stop the bleeding first: isolate affected systems, apply interim fixes, cut off spread paths.',
        lines: ['Isolate systems', 'Interim fixes', 'Cut spread paths'],
      },
      {
        kind: 'stage',
        name: 'Eradication',
        kicker: 'ERADICATION',
        title: 'Forensics & eradication',
        body: 'Preserve images, logs and memory as evidence; rebuild the attack path, find the root cause and remove it completely.',
        lines: ['Evidence preserved', 'Attack path rebuilt', 'Backdoors removed, holes patched'],
      },
      {
        kind: 'stage',
        name: 'Recovery',
        kicker: 'RECOVERY',
        title: 'Recovery & follow-up',
        body: 'Restore from trusted backups, keep monitoring to verify, and settle the review into rules and processes.',
        lines: ['Trusted-backup restore', 'Monitoring to verify', 'Review settles into rules'],
      },
      {
        kind: 'outro',
        name: 'Jump',
        kicker: 'EOF / JMP',
        title: 'See the small, know the large',
        body: 'And vanish without a trace.',
      },
    ],
  },
  '03': {
    scenes: [
      {
        kind: 'boot',
        name: 'Boot',
        kicker: 'GH0XE9 / SERVICE 03',
        title: 'Red Team Assessment',
        body: 'Testing the protection system from a real attacker’s view, within a clearly authorized scope.',
      },
      {
        kind: 'intro',
        name: 'What',
        kicker: 'WHAT IT IS',
        title: 'Test defense along real attack paths',
        body: 'Red-team assessment, attack-defense exercises and attack-surface validation — finding gaps, verifying detection and response, driving continual improvement.',
        lines: ['SCOPE', 'PATH', 'HOLD'],
      },
      {
        kind: 'stage',
        name: 'Scope',
        kicker: 'AUTHORIZATION',
        title: 'Authorized scope',
        body: 'The boundary comes first: targets and rules of engagement — what may be hit, what is off-limits.',
        lines: ['Target boundary', 'Rules of engagement', 'Emergency contacts'],
      },
      {
        kind: 'stage',
        name: 'Recon',
        kicker: 'RECON',
        title: 'Reconnaissance',
        body: 'OSINT, exposed surface, supply-chain entries — drawing the target’s attack-surface map.',
        lines: ['OSINT', 'Exposure mapping', 'Supply-chain entries'],
      },
      {
        kind: 'stage',
        name: 'Initial access',
        kicker: 'INITIAL ACCESS',
        title: 'Gaining the foothold',
        body: 'Chart the target’s assets, exploit the weak points, take the first foothold.',
        lines: ['Asset charting', 'Weak-point exploitation', 'Foothold established'],
      },
      {
        kind: 'stage',
        name: 'Lateral',
        kicker: 'LATERAL MOVEMENT',
        title: 'Lateral movement',
        body: 'Verify depth along real paths: entry, privilege escalation, lateral movement, objective reached.',
        lines: ['Entry exploitation', 'Privilege escalation', 'Lateral movement'],
      },
      {
        kind: 'stage',
        name: 'Report',
        kicker: 'DETECTION & REPORT',
        title: 'Detection & debrief',
        body: 'Record whether — and how fast — each step was detected; deliver the attack-path report and remediation advice.',
        lines: ['Detection coverage & timing', 'Attack-path report', 'Fixes & retest'],
      },
      {
        kind: 'outro',
        name: 'Jump',
        kicker: 'EOF / JMP',
        title: 'See the small, know the large',
        body: 'And vanish without a trace.',
      },
    ],
  },
  '04': {
    scenes: [
      {
        kind: 'boot',
        name: 'Boot',
        kicker: 'GH0XE9 / SERVICE 04',
        title: 'APT Threat Intelligence',
        body: 'Clue discovery, attribution analysis, intelligence production and hunting-method research.',
      },
      {
        kind: 'intro',
        name: 'What',
        kicker: 'WHAT IT IS',
        title: 'Turn weak signals into usable intel',
        body: 'Around advanced persistent threats: turn scattered clues into intelligence that can be queried, verified, and used in defensive decisions.',
        lines: ['SIGNAL', 'TRACE', 'QUERY'],
      },
      {
        kind: 'stage',
        name: 'Collection',
        kicker: 'COLLECTION',
        title: 'Multi-source collection',
        body: 'Internal telemetry, OSINT, samples and C2 data flow into a raw clue pool.',
        lines: ['Internal logs & telemetry', 'OSINT feeds', 'Sample & C2 analysis'],
      },
      {
        kind: 'stage',
        name: 'Processing',
        kicker: 'PROCESSING',
        title: 'Processing & denoising',
        body: 'Filter out redundant and false data; normalize, group and format — the weak signals remain.',
        lines: ['Dedupe & filter', 'Normalization', 'Weak-signal extraction'],
      },
      {
        kind: 'stage',
        name: 'Analysis',
        kicker: 'ANALYSIS',
        title: 'Analysis & attribution',
        body: 'Multi-source cross-checking: correlate infrastructure and behavior, attribute, assign confidence.',
        lines: ['Cross-source proof', 'Infrastructure correlation', 'Attribution & confidence'],
      },
      {
        kind: 'stage',
        name: 'Dissemination',
        kicker: 'DISSEMINATION',
        title: 'Production & dissemination',
        body: 'Ship queryable, verifiable intelligence and hunting rules; feedback drives the next collection round.',
        lines: ['Queryable intel base', 'Hunting rules shipped', 'Feedback loop'],
      },
      {
        kind: 'outro',
        name: 'Jump',
        kicker: 'EOF / JMP',
        title: 'See the small, know the large',
        body: 'And vanish without a trace.',
      },
    ],
  },
  '05': {
    scenes: [
      {
        kind: 'boot',
        name: 'Boot',
        kicker: 'GH0XE9 / SERVICE 05',
        title: 'Non-invasive BCI',
        body: 'Protocol research, software simulation and interaction-flow validation.',
      },
      {
        kind: 'intro',
        name: 'What',
        kicker: 'WHAT IT IS',
        title: 'Software-layer research only',
        body: 'Simulation at the software layer only — no human experiments, no clinical use, no medical diagnosis.',
        lines: ['PROTOCOL', 'DATAFLOW', 'SOFTWARE ONLY'],
      },
      {
        kind: 'stage',
        name: 'Acquisition',
        kicker: 'ACQUISITION',
        title: 'Signal acquisition',
        body: 'Electrode arrays capture microvolt-level EEG: acquisition protocol, data format, transport — on simulated data only.',
        lines: ['Electrode montage', 'Sampling & quantization', 'Simulated data source'],
      },
      {
        kind: 'stage',
        name: 'Preprocessing',
        kicker: 'PREPROCESSING',
        title: 'Preprocessing',
        body: 'Band-pass filtering and artifact removal clean the raw signal of line noise, ocular and muscle artifacts.',
        lines: ['Band-pass filtering', 'Artifact removal', 'Baseline correction'],
      },
      {
        kind: 'stage',
        name: 'Decoding',
        kicker: 'DECODING',
        title: 'Features & decoding',
        body: 'Extract task-related spatio-temporal-spectral features; a classifier maps them to control intent.',
        lines: ['Feature extraction', 'Pattern classification', 'Intent decoding'],
      },
      {
        kind: 'stage',
        name: 'Output',
        kicker: 'OUTPUT & FEEDBACK',
        title: 'Command output',
        body: 'Decoded intent becomes control commands with a verified feedback loop — inside the software-simulation boundary.',
        lines: ['Command translation', 'Feedback-loop check', 'Simulation only'],
      },
      {
        kind: 'outro',
        name: 'Jump',
        kicker: 'EOF / JMP',
        title: 'See the small, know the large',
        body: 'And vanish without a trace.',
      },
    ],
  },
  '06': {
    scenes: [
      {
        kind: 'boot',
        name: 'Boot',
        kicker: 'GH0XE9 / SERVICE 06',
        title: 'CTF Hosting',
        body: 'Competition hosting, challenge design and supporting capability training.',
      },
      {
        kind: 'intro',
        name: 'What',
        kicker: 'WHAT IT IS',
        title: 'Turn real experience into a training ground',
        body: 'For universities, government and enterprise: organization, challenge construction, environment support and after-action review.',
        lines: ['HOST', 'DESIGN', 'REVIEW'],
      },
      {
        kind: 'stage',
        name: 'Format',
        kicker: 'FORMAT',
        title: 'Format design',
        body: 'Jeopardy, AWD or hybrid — set the challenge count, category coverage and difficulty curve.',
        lines: ['Format selection', 'Category coverage', 'Difficulty curve'],
      },
      {
        kind: 'stage',
        name: 'Development',
        kicker: 'DEVELOPMENT',
        title: 'Challenge development',
        body: 'Web, Pwn, Reverse, Crypto and more — every challenge passes a third-party full-run test to rule out unintended solves.',
        lines: ['Web / Pwn', 'Reverse / Crypto', 'Full-run testing'],
      },
      {
        kind: 'stage',
        name: 'Platform',
        kicker: 'PLATFORM & OPS',
        title: 'Platform & live ops',
        body: 'Platform setup, dynamic flags and judging pipeline, stress tests — plus live monitoring and anti-cheat during the game.',
        lines: ['Dynamic flags & judging', 'Stress testing', 'Live monitoring & anti-cheat'],
      },
      {
        kind: 'stage',
        name: 'Review',
        kicker: 'REVIEW',
        title: 'After-action review',
        body: 'Write-ups and data review, challenges open-sourced — real experience becomes reusable training material.',
        lines: ['Write-ups published', 'Data review', 'Open-source legacy'],
      },
      {
        kind: 'outro',
        name: 'Jump',
        kicker: 'EOF / JMP',
        title: 'See the small, know the large',
        body: 'And vanish without a trace.',
      },
    ],
  },
};

const uiEn: DeckUi = {
  scrollHint: 'Scroll / arrow keys',
  play: 'Play',
  pause: 'Pause',
  backToServices: 'Back to services',
  nextService: 'Next service',
  contact: 'Contact us',
  sceneOf: ' / ',
};

/* ---------------- 한국어 ---------------- */

const ko: Record<ServiceNo, Omit<ServiceDeck, 'no'>> = {
  '01': {
    scenes: [
      {
        kind: 'boot',
        name: '부팅',
        kicker: 'GH0XE9 / SERVICE 01',
        title: '네트워크 방어',
        body: '사이버 공간을 향한 지속 모니터링, 위협 헌팅, 방어 체계 구축.',
      },
      {
        kind: 'intro',
        name: '정의',
        kicker: 'WHAT IT IS',
        title: '실제로 돌아가는 방어 루프',
        body: '자산, 트래픽, 로그, 경보를 중심으로 방어 루프를 세우고, 규칙·절차·메커니즘을 재사용 가능한 역량으로 응축한다.',
        lines: ['ASSET — 자산', 'TRAFFIC — 트래픽', 'LOG — 로그', 'ALERT — 경보'],
      },
      {
        kind: 'stage',
        name: '지속 모니터링',
        kicker: 'MONITORING',
        title: '지속 모니터링',
        body: '자산·트래픽·로그를 전량 접속하고, 감시선이 쉬지 않고 스캔한다.',
        lines: ['전량 텔레메트리', '기준선 대비 이상', '24/7 감시'],
      },
      {
        kind: 'stage',
        name: '위협 헌팅',
        kicker: 'THREAT HUNTING',
        title: '위협 헌팅',
        body: '노이즈 속에서 이상을 능동적으로 찾는다: 약한 신호 연관, 행동 비교, 가설 검증.',
        lines: ['약신호 연관', '행동 패턴 비교', '가설 기반 검증'],
      },
      {
        kind: 'stage',
        name: '방어 루프',
        kicker: 'DEFENSIVE LOOP',
        title: '방어 루프',
        body: '경보가 확인되면 즉시 조치: 격리, 차단, 규칙 배포 — 결과는 모니터링으로 환류한다.',
        lines: ['격리와 차단', '탐지 규칙 배포', '결과 환류'],
      },
      {
        kind: 'stage',
        name: '역량 응축',
        kicker: 'CAPABILITY',
        title: '역량 응축',
        body: '모든 조치가 탐지 규칙, 대응 절차, 운영 메커니즘으로 응축된다.',
        lines: ['탐지 규칙库', '대응 절차', '운영 메커니즘'],
      },
      {
        kind: 'outro',
        name: '점프',
        kicker: 'EOF / JMP',
        title: '미세함을 보고 큰것을 안다',
        body: '흔적 없이 사라진다.',
      },
    ],
  },
  '02': {
    scenes: [
      {
        kind: 'boot',
        name: '부팅',
        kicker: 'GH0XE9 / SERVICE 02',
        title: '사고 대응',
        body: '사고 대응, 침입 포렌식, 로그·모니터링 분석.',
      },
      {
        kind: 'intro',
        name: '정의',
        kicker: 'WHAT IT IS',
        title: '사고를 타임라인으로 재구성',
        body: '보안 사고에 대해 대응·포렌식·분석을 제공하고, 경과 재구성과 영향 범위 파악, 조치 요점 정리를 돕는다.',
        lines: ['EVENT — 사건', 'TRACE — 흔적', 'SCOPE — 범위'],
      },
      {
        kind: 'stage',
        name: '탐지 확인',
        kicker: 'DETECTION',
        title: '탐지 확인',
        body: '사건의 성격, 심각도와 영향 범위를 확인하고 해당 등급의 대응 계획을 가동한다.',
        lines: ['경보 확인·분류', '사건 성격 판정', '영향 범위 평가'],
      },
      {
        kind: 'stage',
        name: '억제 격리',
        kicker: 'CONTAINMENT',
        title: '억제 격리',
        body: '먼저 손실을 멈춘다: 영향받은 시스템을 격리하고 임시 조치로 확산 경로를 차단한다.',
        lines: ['시스템 격리', '임시 조치', '확산 경로 차단'],
      },
      {
        kind: 'stage',
        name: '포렌식·근절',
        kicker: 'ERADICATION',
        title: '포렌식과 근절',
        body: '이미지·로그·메모리를 증거로 고정하고 공격 경로를 재구성해 근원을 찾아 완전히 제거한다.',
        lines: ['증거 고정', '공격 경로 재구성', '백도어 제거·패치'],
      },
      {
        kind: 'stage',
        name: '복구 추적',
        kicker: 'RECOVERY',
        title: '복구와 추적',
        body: '신뢰 백업에서 업무를 복구하고 지속 모니터링으로 검증하며, 복기를 규칙과 절차로 응축한다.',
        lines: ['신뢰 백업 복구', '지속 모니터링 검증', '복기와 규칙 응축'],
      },
      {
        kind: 'outro',
        name: '점프',
        kicker: 'EOF / JMP',
        title: '미세함을 보고 큰것을 안다',
        body: '흔적 없이 사라진다.',
      },
    ],
  },
  '03': {
    scenes: [
      {
        kind: 'boot',
        name: '부팅',
        kicker: 'GH0XE9 / SERVICE 03',
        title: '레드팀 평가',
        body: '명확히 인가된 범위 안에서, 실제 공격자의 시점으로 방어 체계를 시험한다.',
      },
      {
        kind: 'intro',
        name: '정의',
        kicker: 'WHAT IT IS',
        title: '실제 공격 경로로 방어를 검증',
        body: '레드팀 평가, 공방 훈련, 공격 표면 검증 — 방어의 빈틈을 찾고 탐지·대응 역량을 검증한다.',
        lines: ['SCOPE — 범위', 'PATH — 경로', 'HOLD — 상주'],
      },
      {
        kind: 'stage',
        name: '인가 범위',
        kicker: 'AUTHORIZATION',
        title: '인가 범위',
        body: '경계가 먼저다: 목표 범위와 교전 규칙 — 무엇을 칠 수 있고 무엇이 금지인지.',
        lines: ['목표 경계 확인', '교전 규칙', '비상 연락 체계'],
      },
      {
        kind: 'stage',
        name: '정보 수집',
        kicker: 'RECON',
        title: '정보 수집',
        body: '공개 정보, 노출면, 공급망 진입로 — 대상의 공격 표면 지도를 그린다.',
        lines: ['OSINT 공개 정보', '노출면 측량', '공급망 진입로'],
      },
      {
        kind: 'stage',
        name: '거점 확보',
        kicker: 'INITIAL ACCESS',
        title: '거점 확보',
        body: '대상 자산을 측량하고 취약점을 이용해 첫 번째 거점을 확보한다.',
        lines: ['자산 측량', '취약점 이용', '거점 수립'],
      },
      {
        kind: 'stage',
        name: '내부 측면 이동',
        kicker: 'LATERAL MOVEMENT',
        title: '내부 측면 이동',
        body: '실제 경로로 깊이를 검증한다: 진입, 권한 상승, 측면 이동, 목표 달성.',
        lines: ['진입 이용', '권한 상승', '측면 이동'],
      },
      {
        kind: 'stage',
        name: '탐지 복기',
        kicker: 'DETECTION & REPORT',
        title: '탐지 복기',
        body: '매 단계가 발견되었는지, 얼마나 빨리 발견되었는지 기록하고 공격 경로 보고서와 수정 권고를 낸다.',
        lines: ['탐지 커버·시효', '공격 경로 보고서', '수정 권고·재시험'],
      },
      {
        kind: 'outro',
        name: '점프',
        kicker: 'EOF / JMP',
        title: '미세함을 보고 큰것을 안다',
        body: '흔적 없이 사라진다.',
      },
    ],
  },
  '04': {
    scenes: [
      {
        kind: 'boot',
        name: '부팅',
        kicker: 'GH0XE9 / SERVICE 04',
        title: 'APT 위협 정보 연구',
        body: '단서 발견, 귀속 분석, 정보 생산과 헌팅 방법 연구.',
      },
      {
        kind: 'intro',
        name: '정의',
        kicker: 'WHAT IT IS',
        title: '약한 신호를 쓸 수 있는 정보로',
        body: '지능형 지속 위협을 둘러싸고, 흩어진 단서를 조회·검증·방어 결정에 쓸 수 있는 정보 역량으로 바꾼다.',
        lines: ['SIGNAL — 신호', 'TRACE — 흔적', 'QUERY — 조회'],
      },
      {
        kind: 'stage',
        name: '다중 소스 수집',
        kicker: 'COLLECTION',
        title: '다중 소스 수집',
        body: '내부 텔레메트리, 공개 정보, 샘플과 C2 데이터가 원시 단서 풀로 모인다.',
        lines: ['내부 로그·텔레메트리', 'OSINT 피드', '샘플·C2 분석'],
      },
      {
        kind: 'stage',
        name: '처리·잡음 제거',
        kicker: 'PROCESSING',
        title: '처리와 잡음 제거',
        body: '중복·허위 데이터를 걸러내고 정규화·그룹화·형식화해 분석 가능한 약한 신호만 남긴다.',
        lines: ['중복 제거·필터링', '정규화', '약신호 추출'],
      },
      {
        kind: 'stage',
        name: '분석·귀속',
        kicker: 'ANALYSIS',
        title: '분석과 귀속',
        body: '다중 소스 교차 확인: 인프라와 행동 패턴을 연관하고 귀속하며 신뢰도를 매긴다.',
        lines: ['교차 소스 입증', '인프라 연관', '귀속과 신뢰도'],
      },
      {
        kind: 'stage',
        name: '생산·배포',
        kicker: 'DISSEMINATION',
        title: '생산과 배포',
        body: '조회·검증 가능한 정보와 헌팅 규칙을 생산하고, 피드백이 다음 수집을 이끈다.',
        lines: ['조회 가능한 정보库', '헌팅 규칙 배포', '피드백 루프'],
      },
      {
        kind: 'outro',
        name: '점프',
        kicker: 'EOF / JMP',
        title: '미세함을 보고 큰것을 안다',
        body: '흔적 없이 사라진다.',
      },
    ],
  },
  '05': {
    scenes: [
      {
        kind: 'boot',
        name: '부팅',
        kicker: 'GH0XE9 / SERVICE 05',
        title: '비침습적 뇌-컴퓨터 인터페이스',
        body: '프로토콜 연구, 소프트웨어 시뮬레이션, 상호작용 흐름 검증.',
      },
      {
        kind: 'intro',
        name: '정의',
        kicker: 'WHAT IT IS',
        title: '소프트웨어 계층의 연구뿐',
        body: '현재는 소프트웨어 계층의 모의만 수행하며, 인체 실험·임상 용도·의료 진단은 포함하지 않는다.',
        lines: ['PROTOCOL — 프로토콜', 'DATAFLOW — 데이터 흐름', 'SOFTWARE ONLY'],
      },
      {
        kind: 'stage',
        name: '신호 수집',
        kicker: 'ACQUISITION',
        title: '신호 수집',
        body: '전극 어레이로 미세 전압 뇌파를 수집한다: 수집 프로토콜, 데이터 형식, 전송 설계 — 전 과정 시뮬레이션 데이터 사용.',
        lines: ['전극 몽타주', '샘플링·양자화', '시뮬레이션 데이터원'],
      },
      {
        kind: 'stage',
        name: '전처리',
        kicker: 'PREPROCESSING',
        title: '전처리',
        body: '대역 통과 필터와 아티팩트 제거로 전원 잡음, 안구·근전 노이즈가 섞인 원시 신호를 정제한다.',
        lines: ['대역 통과 필터', '아티팩트 제거', '기저선 보정'],
      },
      {
        kind: 'stage',
        name: '특징·디코딩',
        kicker: 'DECODING',
        title: '특징과 디코딩',
        body: '과제 관련 시공간·주파수 특징을 추출하고 분류 모델로 제어 의도에 매핑한다.',
        lines: ['특징 추출', '패턴 분류', '의도 디코딩'],
      },
      {
        kind: 'stage',
        name: '명령 출력',
        kicker: 'OUTPUT & FEEDBACK',
        title: '명령 출력',
        body: '디코딩된 의도를 제어 명령으로 변환하고 피드백 루프를 검증한다 — 소프트웨어 시뮬레이션 경계 안에서만.',
        lines: ['명령 변환', '피드백 루프 검증', '시뮬레이션 한정'],
      },
      {
        kind: 'outro',
        name: '점프',
        kicker: 'EOF / JMP',
        title: '미세함을 보고 큰것을 안다',
        body: '흔적 없이 사라진다.',
      },
    ],
  },
  '06': {
    scenes: [
      {
        kind: 'boot',
        name: '부팅',
        kicker: 'GH0XE9 / SERVICE 06',
        title: 'CTF 대회 개최',
        body: '대회 개최, 문제 설계와 그에 따른 역량 훈련.',
      },
      {
        kind: 'intro',
        name: '정의',
        kicker: 'WHAT IT IS',
        title: '실전 경험을 훈련장으로',
        body: '대학과 정부·기업을 대상으로 대회 조직, 문제 구축, 환경 보장, 사후 복기를 아우른다.',
        lines: ['HOST — 개최', 'DESIGN — 출제', 'REVIEW — 복기'],
      },
      {
        kind: 'stage',
        name: '대회 방식',
        kicker: 'FORMAT',
        title: '대회 방식 설계',
        body: 'Jeopardy, AWD 또는 혼합 방식을 선택하고 문제 수, 방향 커버리지와 난이도 곡선을 정한다.',
        lines: ['방식 선택', '방향 커버리지', '난이도 곡선'],
      },
      {
        kind: 'stage',
        name: '문제 개발',
        kicker: 'DEVELOPMENT',
        title: '문제 개발',
        body: 'Web, Pwn, Reverse, Crypto 등 방향을 커버하고, 모든 문제는 제3자 전 과정 테스트로 비예상 풀이를 걸러낸다.',
        lines: ['Web / Pwn', 'Reverse / Crypto', '전 과정 테스트'],
      },
      {
        kind: 'stage',
        name: '플랫폼 보장',
        kicker: 'PLATFORM & OPS',
        title: '플랫폼과 운영 보장',
        body: '플랫폼 구축, 동적 flag와 채점 링크, 부하 테스트 — 대회 중 모니터링 경보와 부정 방지까지.',
        lines: ['동적 flag·채점', '부하 테스트', '실시간 모니터링·부정 방지'],
      },
      {
        kind: 'stage',
        name: '사후 복기',
        kicker: 'REVIEW',
        title: '사후 복기',
        body: '풀이 공개와 데이터 복기, 문제 오픈소스화 — 실전 경험을 재사용 가능한 훈련 자산으로 만든다.',
        lines: ['Writeup 공개', '데이터 복기', '오픈소스 응축'],
      },
      {
        kind: 'outro',
        name: '점프',
        kicker: 'EOF / JMP',
        title: '미세함을 보고 큰것을 안다',
        body: '흔적 없이 사라진다.',
      },
    ],
  },
};

const uiKo: DeckUi = {
  scrollHint: '스크롤 / 방향키',
  play: '재생',
  pause: '일시정지',
  backToServices: '서비스 목록으로',
  nextService: '다음 서비스',
  contact: '문의하기',
  sceneOf: ' / ',
};

/* ---------------- accessors ---------------- */

const decks: Record<Locale, Record<ServiceNo, Omit<ServiceDeck, 'no'>>> = { zh, en, ko };
const uis: Record<Locale, DeckUi> = { zh: uiZh, en: uiEn, ko: uiKo };

export function getServiceDeck(locale: Locale, no: ServiceNo): ServiceDeck {
  const base = decks[locale][no] ?? decks.zh[no];
  /* annotate stage scenes with their 1-based index and total */
  const stageCount = base.scenes.filter((s) => s.kind === 'stage').length;
  let k = 0;
  const scenes = base.scenes.map((s) =>
    s.kind === 'stage' ? { ...s, stageNo: ++k, stageCount } : s,
  );
  return { no, scenes };
}

export function getDeckUi(locale: Locale): DeckUi {
  return uis[locale] ?? uis.zh;
}
