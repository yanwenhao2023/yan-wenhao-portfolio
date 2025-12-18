import React, { useEffect } from 'react';
import { X, Calendar, Target, Award, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 md:h-80 shrink-0 bg-slate-100">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-2">
              {project.category}
            </span>
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <p className="text-xl text-slate-600 mb-8 font-light leading-relaxed">
            {project.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <Layers size={20} />
                <h3 className="font-bold">项目背景</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{project.background || "暂无详细背景描述。"}</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-3 text-purple-600">
                <Target size={20} />
                <h3 className="font-bold">项目目标</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{project.goal || "暂无详细目标描述。"}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Calendar size={20} className="text-slate-400" />
                工作内容 & 过程
              </h3>
              <p className="text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-200">
                {project.process || "暂无详细过程描述。"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Award size={20} className="text-amber-500" />
                项目成果
              </h3>
              <p className="text-slate-600 leading-relaxed pl-7 border-l-2 border-amber-200">
                {project.result || "暂无详细成果描述。"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium text-sm"
          >
            关闭详情
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
