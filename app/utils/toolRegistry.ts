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
    description: 'Convert "key=value" lines to JSON.',
    code: `const obj = {};
const lines = input.split('\\n');
for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    let separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) separatorIndex = trimmedLine.indexOf(':');
    
    if (separatorIndex !== -1) {
        const key = trimmedLine.substring(0, separatorIndex).trim();
        const value = trimmedLine.substring(separatorIndex + 1).trim();
        
        const keyParts = key.split('.');
        let current = obj;
        
        for (let i = 0; i < keyParts.length - 1; i++) {
            const part = keyParts[i];
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
        
        current[keyParts[keyParts.length - 1]] = value;
    }
}
return JSON.stringify(obj, null, 2);`
  },
  {
    id: 'json-minimizer',
    name: 'JSON Minimizer',
    description: 'Minify JSON by removing unnecessary whitespace.',
    code: `try {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
} catch (error) {
  return 'Error: Invalid JSON - ' + error.message;
}`
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON array to CSV (tab-separated).',
    code: `try {
  const data = JSON.parse(input);
  
  if (!Array.isArray(data) || data.length === 0) {
    return 'Error: Input must be a non-empty JSON array';
  }
  
  // Get all unique keys from all objects
  const keys = [...new Set(data.flatMap(obj => Object.keys(obj)))];
  
  // Create header row
  const header = keys.join('\\t');
  
  // Create data rows
  const rows = data.map(obj => {
    return keys.map(key => {
      const value = obj[key];
      if (value === null || value === undefined) return '';
      // Convert value to string and preserve actual newlines
      return String(value);
    }).join('\\t');
  });
  
  return [header, ...rows].join('\\n');
} catch (error) {
  return 'Error: Invalid JSON - ' + error.message;
}`
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV (tab-separated) to JSON array.',
    code: `try {
  const lines = input.trim().split('\\n');
  
  if (lines.length < 2) {
    return 'Error: CSV must have at least a header row and one data row';
  }
  
  // Parse header row
  const headers = lines[0].split('\\t');
  
  // Parse data rows
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\\t');
    const obj = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      // Try to parse as number if possible
      if (value === '') {
        obj[header] = '';
      } else if (!isNaN(value) && value.trim() !== '') {
        obj[header] = Number(value);
      } else {
        obj[header] = value;
      }
    });
    
    result.push(obj);
  }
  
  return JSON.stringify(result, null, 2);
} catch (error) {
  return 'Error: ' + error.message;
}`
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
