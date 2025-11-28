import React, { useState, useEffect } from 'react';
import { Tool } from '../utils/toolRegistry';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-coy.css';

interface ToolEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tool: Tool) => void;
    onDelete: (toolId: string) => void;
    initialTool: Tool | null;
}

const ToolEditor: React.FC<ToolEditorProps> = ({ isOpen, onClose, onSave, onDelete, initialTool }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (initialTool) {
            setName(initialTool.name);
            setDescription(initialTool.description);
            setCode(initialTool.code);
            setId(initialTool.id || Date.now().toString());
        } else {
            setName('');
            setDescription('');
            setCode('return input;');
            setId(Date.now().toString());
        }
    }, [initialTool, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            id,
            name,
            description,
            code,
            isCustom: true
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {initialTool?.id ? 'Edit Tool' : 'Create New Tool'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tool Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Reverse Text"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What does this tool do?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            JavaScript Code
                            <span className="ml-2 text-xs text-gray-500 font-normal">(available variable: <code>input</code>)</span>
                        </label>
                        <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <Editor
                                value={code}
                                onValueChange={code => setCode(code)}
                                highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                                padding={16}
                                className="font-mono text-sm bg-gray-50 dark:bg-gray-950 min-h-[16rem]"
                                textareaClassName="focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
                    {initialTool?.id ? (
                        <button
                            onClick={() => {
                                onDelete(id);
                                onClose();
                            }}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            Delete Tool
                        </button>
                    ) : (
                        <div></div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!name || !code}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Tool
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolEditor;
