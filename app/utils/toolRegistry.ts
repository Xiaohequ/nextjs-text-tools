export interface Tool {
  id: string;
  name: string;
  description: string;
  // The function body as a string. It receives 'input' as an argument and should return a string.
  code: string;
  isCustom?: boolean;
}

export const DEFAULT_TOOLS: Tool[] = [
  {
    id: 'join-text',
    name: 'Join Text',
    description: 'Join all lines into a single line separated by commas.',
    code: `return input.split('\\n').map(line => line.trim()).filter(line => line.length > 0).join(',');`
  },
  {
    id: 'split-text',
    name: 'Split Text',
    description: 'Split text by commas into new lines.',
    code: `return input.split(',').map(part => part.trim()).join('\\n');`
  },
  {
    id: 'length-text',
    name: 'Length Text',
    description: 'Count characters and lines.',
    code: `const chars = input.length;
const lines = input.split('\\n').length;
return \`Characters: \${chars}\\nLines: \${lines}\`;`
  },
  {
    id: 'props-to-json',
    name: 'Properties to Json',
    description: 'Convert "key: value" lines to JSON.',
    code: `const obj = {};
input.split('\\n').forEach(line => {
  const [key, ...rest] = line.split(':');
  if (key && rest.length > 0) {
    obj[key.trim()] = rest.join(':').trim();
  }
});
return JSON.stringify(obj, null, 2);`
  }
];

export function executeTool(tool: Tool, input: string): string {
  try {
    // Create a function from the code string.
    // We wrap it to ensure it has access to 'input'.
    const func = new Function('input', tool.code);
    return func(input);
  } catch (error: any) {
    return `Error executing tool: ${error.message}`;
  }
}

const STORAGE_KEY = 'custom_text_tools';

export function loadCustomTools(): Tool[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCustomTool(tool: Tool) {
  const tools = loadCustomTools();
  const existingIndex = tools.findIndex(t => t.id === tool.id);

  if (existingIndex >= 0) {
    tools[existingIndex] = tool;
  } else {
    tools.push(tool);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
  return tools;
}

export function deleteCustomTool(toolId: string) {
  const tools = loadCustomTools().filter(t => t.id !== toolId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
  return tools;
}
