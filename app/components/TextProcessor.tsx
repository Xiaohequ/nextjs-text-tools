'use client';

import React, { useState, useEffect } from 'react';
import { Tool, DEFAULT_TOOLS, loadCustomTools, saveCustomTool, deleteCustomTool, executeTool } from '../utils/toolRegistry';
import ToolGrid from './ToolGrid';
import ResultModal from './ResultModal';
import ToolEditor from './ToolEditor';

const TextProcessor: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [tools, setTools] = useState<Tool[]>([]);
    const [result, setResult] = useState('');
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingTool, setEditingTool] = useState<Tool | null>(null);

    useEffect(() => {
        // Load tools on client side
        const customTools = loadCustomTools();
        setTools([...DEFAULT_TOOLS, ...customTools]);
    }, []);

    const handleToolSelect = (tool: Tool) => {
        const output = executeTool(tool, inputText);
        setResult(output);
        setIsResultModalOpen(true);
    };

    const handleSaveTool = (tool: Tool) => {
        const updatedCustomTools = saveCustomTool(tool);
        setTools([...DEFAULT_TOOLS, ...updatedCustomTools]);
    };

    const handleDeleteTool = (toolId: string) => {
        const updatedCustomTools = deleteCustomTool(toolId);
        setTools([...DEFAULT_TOOLS, ...updatedCustomTools]);
    };

    const openEditor = (tool: Tool | null) => {
        setEditingTool(tool);
        setIsEditorOpen(true);
    };

    const handleCloneTool = (tool: Tool) => {
        const clonedTool: Tool = {
            ...tool,
            id: '', // Reset ID to create a new tool
            name: `${tool.name} (Copy)`,
            isCustom: true
        };
        setEditingTool(clonedTool);
        setIsEditorOpen(true);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
            <div className="relative text-center mb-16 pt-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200" />
                        <div className="relative bg-white dark:bg-gray-900 rounded-full p-4 ring-1 ring-gray-900/5 dark:ring-white/10">
                            <img src="/logo.png" alt="Text Tools Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
                        Text Tools
                    </h1>
                </div>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Transform your text instantly with our powerful tools, or create your own custom text processors using JavaScript.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Input Text
                </label>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here..."
                    className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-mono text-sm"
                />
            </div>

            <ToolGrid
                tools={tools}
                onToolSelect={handleToolSelect}
                onEditTool={openEditor}
                onCloneTool={handleCloneTool}
            />

            <ResultModal
                isOpen={isResultModalOpen}
                onClose={() => setIsResultModalOpen(false)}
                result={result}
            />

            <ToolEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onSave={handleSaveTool}
                onDelete={handleDeleteTool}
                initialTool={editingTool}
            />
        </div>
    );
};

export default TextProcessor;
