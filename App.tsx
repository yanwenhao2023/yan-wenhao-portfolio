import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  ExternalLink, 
  Layers, 
  PenTool, 
  Monitor,
  Sparkles,
  User,
  Copy,
  CheckCircle
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCES, SKILLS, PORTFOLIO_ITEMS } from './constants';
import { Project } from './types';
import ChatAssistant from './components/ChatAssistant';
import SectionWrapper from './components/SectionWrapper';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';

function App() {
  const [activeTab, setActiveTab] = useState<string>('全部');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');
  
  // Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Get unique categories and translate 'All' to '全部' if needed
  const uniqueCategories = ['全部', ...Array.from(new Set(PORTFOLIO_ITEMS.map(item => item.category)))];
  
  const filteredProjects = activeTab === '全部' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  // Scroll Spy Logic
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when element is in the middle of viewport
      threshold: 0
    });

    const sections = ['about', 'experience', 'skills', 'portfolio', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Helper for smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const handleContactClick = () => {
    // Remove hyphens for the clipboard content (e.g. 183-6705-5311 -> 18367055311)
    const cleanPhone = PERSONAL_INFO.phone.replace(/-/g, '');

    // Copy clean phone number
    navigator.clipboard.writeText(cleanPhone).then(() => {
      // Show specific short message
      showToast("手机号已复制完毕");
    });
  };

  const handleCopyInfo = (text: string, type: '邮箱' | '手机号') => {
    // If it's a phone number, clean it first
    const contentToCopy = type === '手机号' ? text.replace(/-/g, '') : text;
    
    navigator.clipboard.writeText(contentToCopy).then(() => {
      // Show generic success toast
      showToast(`${type}已复制成功`);
    });
  };

  const navItems = [
    { id: 'about', label: '关于' },
    { id: 'experience', label: '经历' },
    { id: 'skills', label: '技能' },
    { id: 'portfolio', label: '作品' },
    { id: 'contact', label: '联系' },
  ];

  return (
    <div className="min-h-screen relative font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navbar - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/20 px-6 py-4 flex justify-between items-center transition-all">
        <div 
          className="text-xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => scrollToSection('about')}
        >
          YAN WENHAO.
        </div>
        <div className="hidden md:flex gap-4 text-sm font-medium text-slate-500">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="w-11 h-11 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden hover:border-blue-400 hover:scale-110 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center p-0.5"
          aria-label="Contact"
        >
          <img 
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Yan&clothing=blazerAndShirt&accessories=glasses&backgroundColor=e2e8f0" 
            alt="Cartoon Avatar" 
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section id="about" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 mb-20 scroll-mt-28">
          <SectionWrapper className="flex-1 space-y-8">
            {/* Badge with interaction */}
            <div className="inline-flex flex-wrap items-center gap-3 px-5 py-3 bg-blue-50 text-blue-900 rounded-full text-sm font-bold shadow-sm border border-blue-100 hover:shadow-md transition-all cursor-default">
              <div className="flex items-center gap-1.5">
                <Briefcase size={16} className="text-blue-600" />
                <span>产品经理</span>
              </div>
              <span className="text-blue-300">|</span>
              <div className="flex items-center gap-1.5">
                <PenTool size={16} className="text-blue-600" />
                <span>UI设计师</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-slate-900">
              我是 <span className="relative inline-block">
                {PERSONAL_INFO.name}
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 -z-10"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl">
              8年经验，融合设计美学与产品逻辑。
              <br/>
              擅长视频结构化、B端系统全生命周期管理。
              <br/>
              致力于用理性的逻辑解决问题，用感性的设计打动用户。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <a 
                 href="#portfolio" 
                 onClick={(e) => {
                   e.preventDefault();
                   scrollToSection('portfolio');
                 }}
                 className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20 hover:scale-105 hover:shadow-xl hover:bg-slate-800 active:scale-95"
               >
                 查看作品 <ExternalLink size={16} />
               </a>
               <button 
                 onClick={handleContactClick}
                 className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 active:scale-95 flex items-center gap-2"
               >
                 联系我 <Copy size={16} className="text-slate-400" />
               </button>
            </div>
            
            {/* Stats */}
            <div className="pt-12 flex gap-8 text-slate-400">
               <div className="flex flex-col">
                 <span className="text-3xl font-bold text-slate-900">8+</span>
                 <span className="text-xs uppercase tracking-wider font-medium">年工作经验</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-3xl font-bold text-slate-900">50+</span>
                 <span className="text-xs uppercase tracking-wider font-medium">参与项目</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-3xl font-bold text-slate-900">100%</span>
                 <span className="text-xs uppercase tracking-wider font-medium">交付承诺</span>
               </div>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={200} className="flex-1 relative w-full max-w-md md:max-w-lg aspect-[4/5] md:aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-slate-100 rounded-[3rem] transform rotate-3 scale-95 opacity-50"></div>
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white group">
              <img 
                src={PERSONAL_INFO.avatar} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </SectionWrapper>
        </section>

        {/* Introduction Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-32">
           <SectionWrapper className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
             <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <User size={24} />
             </div>
             <h3 className="text-2xl font-bold mb-4">自我介绍</h3>
             <ul className="space-y-3 text-slate-600 leading-relaxed">
               {PERSONAL_INFO.intro.slice(0, 3).map((item, i) => (
                 <li key={i} className="flex gap-2">
                   <span className="text-blue-500 mt-1.5 min-w-[6px]">•</span>
                   <span>{item}</span>
                 </li>
               ))}
             </ul>
           </SectionWrapper>

           <SectionWrapper delay={100} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
             <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <GraduationCap size={24} />
             </div>
             <h3 className="text-2xl font-bold mb-4">教育背景</h3>
             <div className="mb-2">
                <div className="text-lg font-semibold">{EDUCATION.school}</div>
                <div className="text-slate-500">{EDUCATION.major} | {EDUCATION.degree}</div>
                <div className="text-sm text-slate-400 mt-1">{EDUCATION.period}</div>
             </div>
             <p className="text-slate-600 text-sm mt-4 border-t border-slate-100 pt-4">
               {EDUCATION.description}
             </p>
           </SectionWrapper>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="mb-32 scroll-mt-28">
          <SectionWrapper className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">工作经历</h2>
            <p className="text-slate-500">从UI设计到产品管理的职业进阶之路</p>
          </SectionWrapper>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {EXPERIENCES.map((exp, index) => (
              <SectionWrapper 
                key={index} 
                delay={index * 100}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-slate-500">
                  <div className="w-3 h-3 bg-slate-400 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                </div>
                
                {/* Experience Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                    <h3 className="font-bold text-lg text-slate-800">{exp.company}</h3>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                      {exp.role}
                    </span>
                  </div>
                  <time className="text-sm text-slate-400 mb-4 block">{exp.period}</time>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  
                  {exp.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">#{tag}</span>
                      ))}
                    </div>
                  )}

                  {exp.details && (
                    <ul className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                      {exp.details.slice(0, 3).map((detail, i) => (
                         <li key={i} className="text-xs text-slate-500 flex gap-2">
                           <span className="text-slate-300 mt-1 min-w-[10px]">▹</span>
                           {detail}
                         </li>
                      ))}
                      {exp.details.length > 3 && (
                        <li className="text-xs text-slate-400 italic pt-1">
                          ... 以及更多项目细节（点击右下角AI助理了解）
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </SectionWrapper>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-32 scroll-mt-28">
          <SectionWrapper className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">专业技能</h2>
            <p className="text-slate-500">工具与思维的双重武装</p>
          </SectionWrapper>

          <div className="grid md:grid-cols-3 gap-8">
            {['Product', 'Design', 'Tools'].map((category, idx) => (
              <SectionWrapper key={category} delay={idx * 150} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  {category === 'Product' && <Layers className="text-blue-500" />}
                  {category === 'Design' && <PenTool className="text-purple-500" />}
                  {category === 'Tools' && <Monitor className="text-emerald-500" />}
                  <h3 className="text-xl font-bold">{category === 'Product' ? '产品思维' : category === 'Design' ? '设计能力' : '软件工具'}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.filter(s => s.category === category).map(skill => (
                    <span 
                      key={skill.name} 
                      className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-100 hover:bg-slate-900 hover:text-white transition-colors cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </SectionWrapper>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="mb-32 scroll-mt-28">
          <SectionWrapper className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">精选作品</h2>
              <p className="text-slate-500">从 PRD 到 像素级 UI 的全案展示</p>
            </div>
            
            {/* Filter Tabs - Chinese */}
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === cat 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'bg-white text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <SectionWrapper 
                key={project.id} 
                delay={index * 50} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                <div onClick={() => setSelectedProject(project)}>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        查看详情
                      </button>
                    </div>
                  </div>
                  <div className="p-5 border border-t-0 border-slate-100 rounded-b-2xl">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">{project.category}</span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-4xl mx-auto text-center scroll-mt-28">
           <SectionWrapper className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">准备好开始下一个项目了吗？</h2>
               <p className="text-slate-300 mb-10 text-lg max-w-2xl mx-auto">
                 无论是产品规划、UI设计还是全链路的项目管理，我随时准备迎接挑战。
               </p>
               
               <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                 {/* Clickable Email Card */}
                 <button 
                   onClick={() => handleCopyInfo(PERSONAL_INFO.email, '邮箱')}
                   className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl transition-all border border-white/10 group cursor-pointer w-full md:w-auto text-left"
                 >
                   <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                     <Mail size={20} />
                   </div>
                   <div className="flex-1">
                     <div className="text-xs text-slate-400 uppercase">Email Me</div>
                     <div className="text-sm font-medium break-all">{PERSONAL_INFO.email}</div>
                   </div>
                 </button>
                 
                 {/* Clickable Phone Card */}
                 <button 
                   onClick={() => handleCopyInfo(PERSONAL_INFO.phone, '手机号')}
                   className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl transition-all border border-white/10 group cursor-pointer w-full md:w-auto text-left"
                 >
                   <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                     <Phone size={20} />
                   </div>
                   <div className="flex-1">
                     <div className="text-xs text-slate-400 uppercase">Call Me</div>
                     <div className="text-sm font-medium">{PERSONAL_INFO.phone}</div>
                   </div>
                 </button>
               </div>

               <p className="text-slate-500 text-sm">© 2024 Yan Wenhao Portfolio. Designed & Built with React.</p>
             </div>
           </SectionWrapper>
        </section>

      </main>

      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* AI Assistant Widget */}
      <ChatAssistant />

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      
    </div>
  );
}

export default App;