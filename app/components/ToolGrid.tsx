import React from 'react';
import { Tool } from '../utils/toolRegistry';

interface ToolGridProps {
    tools: Tool[];
    onToolSelect: (tool: Tool) => void;
    onEditTool: (tool: Tool) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, onToolSelect, onEditTool }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {tools.map((tool) => (
                <div key={tool.id} className="relative group">
                    <button
                        onClick={() => onToolSelect(tool)}
                        className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 text-left flex flex-col h-full"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{tool.description}</p>
                    </button>
                    {tool.isCustom && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditTool(tool);
                            }}
                            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Edit Tool"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={() => onEditTool({ id: '', name: 'New Tool', description: '', code: 'return input;', isCustom: true })}
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-gray-500 hover:text-blue-600 dark:text-gray-400"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="font-medium">Create Tool</span>
            </button>
        </div>
    );
};

export default ToolGrid;
