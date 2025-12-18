import { PersonalInfo, Experience, Education, Skill, Project } from './types';

export const PERSONAL_INFO: PersonalInfo = {
  name: "颜文豪",
  role: "产品经理 | 资深UI设计师",
  phone: "183-6705-5311",
  email: "405776632@qq.com",
  // Updated avatar to the new uploaded image
  avatar: "./yan-wenhao.jpg", 
  intro: [
    "8年工作经验，6年UI设计经验，2年半视频结构化产品经理经验。",
    "主导过B端视频结构化项目，经历过产品调研、竞品分析、功能结构搭建、需求评估、设计、开发、测试、上线的全生命周期。",
    "拥有较好与客户沟通的能力，能推动与管理各项目成员工作，使计划确保在照预期时间内完成。",
    "有较好的辨别真伪需求的意识，能快速察觉用户的真实需求，并引导其采用更合理且成本低的解决方案。",
    "思想积极乐观，不爱抱怨忽需求实现难度，会更多考虑如何高效解决问题。"
  ]
};

export const EDUCATION: Education = {
  school: "衢州学院",
  major: "计算机科学",
  degree: "本科",
  period: "2012.06 ~ 2016.06",
  description: "大学所学关于各类计算机语言和设计软件的使用，日常工作中能了解一些代码的运行逻辑。提需求的时候会考虑开发的实现难度。"
};

export const EXPERIENCES: Experience[] = [
  {
    company: "浙江云科科技有限公司",
    role: "产品经理",
    period: "2022.04 ~ 至今",
    tags: ["视频结构化", "安防监控", "B端产品"],
    description: "作为产品负责人，主要负责视频结构化系统的产品规划、设计与迭代，推动产品的实际应用，解决用户面临的实战问题。",
    details: [
      "负责视频结构化系统，在海量监控数据中快速识别人车目标，极大提高案剑侦破效率。",
      "项目目标：快速找人车线索、精准追踪、确认真实身份、支持多人协同办案、预警特定场景。",
      "构建以案件为源的系统工作模式，提升协同办案效率。",
      "设计人车布控的创建与审批流程，制定智能追踪逻辑。",
      "构建系统地图及其对应设备的操作与联动方案。",
      "协调开发团队对接各类数据库（人口库、暂口库等）。",
      "设计多种场景（入侵越界、聚集事件等）下的预警触发机制。",
      "构建并设定系统中不同角色的权限功能。",
      "把控页面视觉风格与交互流程，确保用户体验闭环。",
      "成果：系统已成功推广至温州市局、龙湾、瓯海、瑞安、龙港等各地区使用，使客户线索获取率提升数万倍。"
    ]
  },
  {
    company: "南京日冲软件股份有限公司",
    role: "UI设计师",
    period: "2020.11 ~ 2021.04",
    description: "主要负责公司的UI设计方面工作，具体包括：APP界面、小程序界面、场景页、BANNER、动效、部分插画等方面的设计。"
  },
  {
    company: "杭州荷银控股有限公司",
    role: "UI设计师",
    period: "2019.02 ~ 2020.11",
    description: "负责 APP UI、小程序、官网、H5以及部分平面设计的工作。"
  },
  {
    company: "杭州亨韵科技有限公司",
    role: "UI设计师",
    period: "2017.02 ~ 2019.02",
    description: "公司的项目主要是关于股票的APP界面设计，设计界面的同时也兼顾交互。日常也要做些LOGO、和一些平面类的项目。"
  }
];

export const SKILLS: Skill[] = [
  { name: "竞品分析和梳理产品框架", category: "Product" },
  { name: "原型图和功能交互图", category: "Product" },
  { name: "管理整个项目任务进度", category: "Product" },
  { name: "Xmind", category: "Tools" },
  { name: "Axure", category: "Tools" },
  { name: "飞书", category: "Tools" },
  { name: "APP、WEB等设计工作", category: "Design" },
  { name: "协同设计", category: "Design" },
  { name: "视频制作和后期处理", category: "Design" },
  { name: "XD/PS/AI", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "AE/剪映", category: "Tools" },
  { name: "3D设计", category: "Design" },
  { name: "AI绘图", category: "Design" },
  { name: "功能流程图绘制", category: "Product" },
  { name: "Blender", category: "Tools" },
  { name: "Stable Diffusion", category: "Tools" },
  { name: "ProcessOn/Draw.io", category: "Tools" }
];

export const PORTFOLIO_ITEMS: Project[] = [
  { 
    id: '1', 
    title: '安防监控指挥大屏', 
    category: 'B端平台', 
    image: 'https://picsum.photos/800/600?random=1',
    description: '为城市安防设计的大数据可视化指挥中心，集成实时监控、数据分析与应急调度功能。',
    background: '随着城市监控点位的增加，传统监控墙已无法满足高效指挥的需求，需要一个集成化、可视化的管理平台。',
    goal: '实现数据可视化、操作便捷化、决策智能化。',
    process: '通过实地调研指挥中心工作流程，定义了“监测-预警-处置”的核心交互逻辑，采用了深色科技感UI风格以减少长时间观看的视觉疲劳。',
    result: '提升了指挥中心的响应速度，获得客户高度认可。'
  },
  { 
    id: '2', 
    title: '视频结构化分析系统', 
    category: 'B端平台', 
    image: 'https://picsum.photos/800/600?random=2',
    description: '基于AI算法的视频分析平台，实现人车目标的快速识别与轨迹追踪。',
    background: '海量监控数据中快速识别人车目标需求迫切，传统人工回看效率极低。',
    goal: '快速找人车线索、精准追踪、确认真实身份、支持多人协同办案。',
    process: '构建以案件为源的系统工作模式，设计人车布控的创建与审批流程，制定智能追踪逻辑，并协调开发团队对接各类数据库。',
    result: '系统已成功推广至温州市局、龙湾、瓯海等各地区使用，使客户线索获取率提升数万倍。'
  },
  { 
    id: '3', 
    title: '金融股票交易APP', 
    category: '移动应用', 
    image: 'https://picsum.photos/400/800?random=3',
    description: '一款面向个人投资者的股票交易应用，注重实时性和交易操作的流畅度。',
    background: '现有交易软件界面复杂，新手用户上手门槛高。',
    goal: '简化交易流程，提供直观的行情分析图表。',
    process: '重构了核心交易链路，优化了K线图的交互体验，引入了自定义预警功能。',
    result: '用户日活提升20%，交易转化率提高15%。'
  },
  { 
    id: '4', 
    title: '企业官网重构', 
    category: '网页设计', 
    image: 'https://picsum.photos/800/600?random=4',
    description: '高端科技企业的品牌官网设计，强调品牌形象与技术实力的展示。',
    background: '旧版官网风格陈旧，无法匹配公司现有的技术领先形象。',
    goal: '打造国际化、现代化的品牌形象。',
    process: '运用WebGL技术增强视觉冲击力，重新梳理了产品展示架构。',
    result: '官网访问时长增加40%，品牌咨询量显著提升。'
  },
  { 
    id: '5', 
    title: '年度营销活动海报', 
    category: '视觉海报', 
    image: 'https://picsum.photos/600/800?random=5',
    description: '系列节日营销海报，用于社交媒体传播与线下物料。',
    background: '需要一套统一视觉语言的营销物料来配合年度大促。',
    goal: '吸引用户眼球，传达促销信息，提升品牌活力。',
    process: '结合3D元素与C4D渲染，创造了极具冲击力的视觉主图。',
    result: '点击率较往期提升35%。'
  },
  { 
    id: '6', 
    title: '3D 盲盒插画系列', 
    category: '插画', 
    image: 'https://picsum.photos/600/600?random=6',
    description: '为潮玩品牌设计的IP形象及场景插画。',
    background: '品牌需要年轻化，吸引Z世代用户。',
    goal: '创造可爱、独特的IP形象。',
    process: '使用Blender建模渲染，设计了6款不同主题的角色形象。',
    result: '周边产品销量火爆，IP形象深受用户喜爱。'
  },
  { 
    id: '7', 
    title: '智能布控PRD文档', 
    category: '产品文档', 
    image: 'https://picsum.photos/800/500?random=7',
    description: '详细的智能布控功能需求文档，包含流程图、时序图与原型。',
    background: '布控功能逻辑复杂，涉及多端联动与算法调度。',
    goal: '清晰定义功能边界与交互逻辑，确保开发准确实现。',
    process: '通过Axure绘制高保真原型，使用Visio绘制业务流程图，撰写详细的字段定义。',
    result: '开发返工率降低，测试用例覆盖率达到100%。'
  },
  { 
    id: '8', 
    title: '电商大促H5页面', 
    category: '移动应用', 
    image: 'https://picsum.photos/400/800?random=8',
    description: '双十一活动落地页，包含游戏互动与优惠券领取功能。',
    background: '大促期间流量巨大，需要高转化的落地页承接。',
    goal: '最大化用户留存与优惠券核销率。',
    process: '设计了轻量级的互动小游戏，优化了首屏加载速度。',
    result: '活动期间参与人数突破百万。'
  },
];

// Helper to stringify data for AI context
export const RESUME_CONTEXT = JSON.stringify({
  personal: PERSONAL_INFO,
  education: EDUCATION,
  experience: EXPERIENCES,
  skills: SKILLS
});