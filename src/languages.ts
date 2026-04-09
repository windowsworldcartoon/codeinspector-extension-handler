/**
 * Built-in Language Definitions with Snippets
 */

import { Language, LanguageConfig, LanguageSnippet } from './index';

// JavaScript Snippets
const javascriptSnippets: LanguageSnippet[] = [
  {
    label: 'Function',
    prefix: 'fn',
    body: 'function ${1:name}(${2:params}) {\n\t${3:// body}\n}',
    scope: 'javascript'
  },
  {
    label: 'Arrow Function',
    prefix: 'afn',
    body: 'const ${1:name} = (${2:params}) => {\n\t${3:// body}\n};',
    scope: 'javascript'
  },
  {
    label: 'For Loop',
    prefix: 'for',
    body: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// body}\n}',
    scope: 'javascript'
  },
  {
    label: 'If Statement',
    prefix: 'if',
    body: 'if (${1:condition}) {\n\t${2:// body}\n}',
    scope: 'javascript'
  },
  {
    label: 'Try-Catch',
    prefix: 'try',
    body: 'try {\n\t${1:// body}\n} catch (${2:error}) {\n\t${3:// error handling}\n}',
    scope: 'javascript'
  },
  {
    label: 'Promise',
    prefix: 'promise',
    body: 'new Promise((${1:resolve}, ${2:reject}) => {\n\t${3:// body}\n});',
    scope: 'javascript'
  },
  {
    label: 'Async Function',
    prefix: 'async',
    body: 'async function ${1:name}(${2:params}) {\n\tawait ${3:// body}\n}',
    scope: 'javascript'
  },
  {
    label: 'Class',
    prefix: 'class',
    body: 'class ${1:Name} {\n\tconstructor(${2:params}) {\n\t\t${3:// initialization}\n\t}\n}',
    scope: 'javascript'
  },
  {
    label: 'console.log',
    prefix: 'log',
    body: 'console.log(${1:value});',
    scope: 'javascript'
  },
  {
    label: 'Object Literal',
    prefix: 'obj',
    body: 'const ${1:obj} = {\n\t${2:key}: ${3:value}\n};',
    scope: 'javascript'
  }
];

// TypeScript Snippets
const typescriptSnippets: LanguageSnippet[] = [
  ...javascriptSnippets,
  {
    label: 'Interface',
    prefix: 'interface',
    body: 'interface ${1:Name} {\n\t${2:property}: ${3:type};\n}',
    scope: 'typescript'
  },
  {
    label: 'Type Alias',
    prefix: 'type',
    body: 'type ${1:Name} = ${2:type};',
    scope: 'typescript'
  },
  {
    label: 'Enum',
    prefix: 'enum',
    body: 'enum ${1:Name} {\n\t${2:KEY} = "${3:value}"\n}',
    scope: 'typescript'
  },
  {
    label: 'Generic Function',
    prefix: 'genericfn',
    body: 'function ${1:name}<${2:T}>(${3:param}: ${2:T}): ${2:T} {\n\t${4:// body}\n}',
    scope: 'typescript'
  }
];

// HTML Snippets
const htmlSnippets: LanguageSnippet[] = [
  {
    label: 'HTML Document',
    prefix: 'html',
    body: [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '\t<meta charset="UTF-8">',
      '\t<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '\t<title>${1:Page Title}</title>',
      '</head>',
      '<body>',
      '\t${2:<!-- Content goes here -->}',
      '</body>',
      '</html>'
    ],
    scope: 'html'
  },
  {
    label: 'Div Element',
    prefix: 'div',
    body: '<div${1: class="${2:className}"}>${3:content}</div>',
    scope: 'html'
  },
  {
    label: 'Button',
    prefix: 'btn',
    body: '<button type="${1:button}">${2:Click me}</button>',
    scope: 'html'
  },
  {
    label: 'Form',
    prefix: 'form',
    body: '<form${1: action="${2:url}"} method="${3:POST}">\\n\\t${4:<!-- Form fields -->}\\n</form>',
    scope: 'html'
  },
  {
    label: 'Input Field',
    prefix: 'input',
    body: '<input type="${1:text}" name="${2:name}" placeholder="${3:placeholder}">',
    scope: 'html'
  },
  {
    label: 'Link',
    prefix: 'a',
    body: '<a href="${1:url}">${2:Link text}</a>',
    scope: 'html'
  }
];

// CSS Snippets
const cssSnippets: LanguageSnippet[] = [
  {
    label: 'CSS Rule',
    prefix: 'rule',
    body: '.${1:selector} {\n\t${2:property}: ${3:value};\n}',
    scope: 'css'
  },
  {
    label: 'Flexbox Container',
    prefix: 'flex',
    body: '.${1:container} {\n\tdisplay: flex;\n\tjustify-content: ${2:center};\n\talign-items: ${3:center};\n}',
    scope: 'css'
  },
  {
    label: 'Grid Container',
    prefix: 'grid',
    body: '.${1:container} {\n\tdisplay: grid;\n\tgrid-template-columns: ${2:1fr 1fr};\n\tgap: ${3:1rem};\n}',
    scope: 'css'
  },
  {
    label: 'Media Query',
    prefix: 'media',
    body: '@media (max-width: ${1:768px}) {\n\t${2:/* styles */}\n}',
    scope: 'css'
  },
  {
    label: 'Animation',
    prefix: 'anim',
    body: '@keyframes ${1:animName} {\n\tfrom { ${2:property}: ${3:value}; }\n\tto { ${2:property}: ${4:value}; }\n}',
    scope: 'css'
  }
];

// JSON Snippets
const jsonSnippets: LanguageSnippet[] = [
  {
    label: 'Object',
    prefix: 'obj',
    body: '{\n\t"${1:key}": ${2:value}\n}',
    scope: 'json'
  },
  {
    label: 'Array',
    prefix: 'arr',
    body: '[\n\t${1:item}\n]',
    scope: 'json'
  }
];

// Language Definitions
export const JAVASCRIPT: Language = new Language({
  id: 'javascript',
  name: 'JavaScript',
  extensions: ['.js', '.jsx', '.mjs'],
  aliases: ['js', 'node'],
  mimeTypes: ['application/javascript', 'text/javascript'],
  snippets: javascriptSnippets
});

export const TYPESCRIPT: Language = new Language({
  id: 'typescript',
  name: 'TypeScript',
  extensions: ['.ts', '.tsx'],
  aliases: ['ts'],
  mimeTypes: ['application/typescript', 'text/typescript'],
  snippets: typescriptSnippets
});

export const HTML: Language = new Language({
  id: 'html',
  name: 'HTML',
  extensions: ['.html', '.htm'],
  aliases: ['htm'],
  mimeTypes: ['text/html'],
  snippets: htmlSnippets
});

export const CSS: Language = new Language({
  id: 'css',
  name: 'CSS',
  extensions: ['.css'],
  mimeTypes: ['text/css'],
  snippets: cssSnippets
});

export const JSON: Language = new Language({
  id: 'json',
  name: 'JSON',
  extensions: ['.json'],
  mimeTypes: ['application/json'],
  snippets: jsonSnippets
});

// Language Registry
export class LanguageRegistry {
  private languages: Map<string, Language> = new Map();
  private extensionMap: Map<string, Language> = new Map();

  constructor() {
    // Register built-in languages
    this.register(JAVASCRIPT);
    this.register(TYPESCRIPT);
    this.register(HTML);
    this.register(CSS);
    this.register(JSON);
  }

  /**
   * Register a language
   */
  register(language: Language): void {
    this.languages.set(language.getId(), language);
    
    // Register all extensions for this language
    language.getExtensions().forEach(ext => {
      this.extensionMap.set(ext.toLowerCase(), language);
    });
  }

  /**
   * Get language by ID
   */
  getById(id: string): Language | undefined {
    return this.languages.get(id);
  }

  /**
   * Get language by file extension
   */
  getByExtension(extension: string): Language | undefined {
    return this.extensionMap.get(extension.toLowerCase());
  }

  /**
   * Get language by file path
   */
  getByFilePath(filePath: string): Language | undefined {
    const ext = '.' + filePath.split('.').pop()?.toLowerCase();
    return this.getByExtension(ext);
  }

  /**
   * Get all languages
   */
  getAll(): Language[] {
    return Array.from(this.languages.values());
  }

  /**
   * Get all snippets for a language
   */
  getSnippetsForLanguage(languageId: string): LanguageSnippet[] {
    const language = this.getById(languageId);
    return language ? language.getSnippets() : [];
  }

  /**
   * Search snippets by prefix
   */
  searchSnippets(query: string): LanguageSnippet[] {
    const results: LanguageSnippet[] = [];
    
    this.languages.forEach(language => {
      language.getSnippets().forEach(snippet => {
        if (snippet.prefix.includes(query.toLowerCase()) || 
            snippet.label.toLowerCase().includes(query.toLowerCase())) {
          results.push(snippet);
        }
      });
    });
    
    return results;
  }
}

// Global language registry instance
export const languageRegistry = new LanguageRegistry();
