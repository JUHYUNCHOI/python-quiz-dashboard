const fs = require('fs');
const path = require('path');

// 파일 경로
const pageTsxPath = '/Users/juhyunchoi/Downloads/python-quiz-dashboard/app/learn/[lessonId]/page.tsx';
const lessonsDir = '/Users/juhyunchoi/Downloads/python-quiz-dashboard/app/learn/[lessonId]/data/lessons';

// lessons 디렉토리 생성
if (!fs.existsSync(lessonsDir)) {
  fs.mkdirSync(lessonsDir, { recursive: true });
}

// 파일 읽기
const content = fs.readFileSync(pageTsxPath, 'utf-8');

// lessonsData 시작 찾기
const lessonsStartMatch = content.match(/const lessonsData:\s*Record<string,\s*LessonData>\s*=\s*\{/);
if (!lessonsStartMatch) {
  console.log('❌ lessonsData를 찾을 수 없습니다.');
  process.exit(1);
}

const lessonsStart = lessonsStartMatch.index + lessonsStartMatch[0].length;
console.log('✓ lessonsData 시작:', lessonsStart);

// 각 레슨 시작 위치 찾기
const lessonPattern = /"(\d+|p\d+)":\s*\{\s*\n\s*id:\s*"\1"/g;
const lessonStarts = [];
let match;

while ((match = lessonPattern.exec(content)) !== null) {
  lessonStarts.push({
    id: match[1],
    pos: match.index
  });
}

console.log(`\n총 ${lessonStarts.length}개 레슨 발견:`);
lessonStarts.forEach(l => console.log(`  - 레슨 ${l.id}`));

// 중괄호 매칭으로 레슨 끝 찾기
function findLessonEnd(content, startPos) {
  // 레슨 시작 { 찾기
  let braceStart = content.indexOf('{', startPos);
  
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let i = braceStart;
  
  while (i < content.length) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    
    if (!inString) {
      if (char === '"' || char === "'") {
        inString = true;
        stringChar = char;
      } else if (char === '`') {
        inString = true;
        stringChar = '`';
      } else if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0) {
          return i + 1;
        }
      }
    } else {
      if (char === '\\') {
        i++; // 이스케이프 건너뛰기
      } else if (char === stringChar) {
        inString = false;
      }
    }
    i++;
  }
  
  return -1;
}

// 각 레슨 추출
const extracted = [];

lessonStarts.forEach((lesson, idx) => {
  const endPos = findLessonEnd(content, lesson.pos);
  
  if (endPos === -1) {
    console.log(`❌ 레슨 ${lesson.id}의 끝을 찾을 수 없습니다.`);
    return;
  }
  
  // 레슨 데이터 추출 (키 포함하여 { ... } 전체)
  const braceStart = content.indexOf('{', lesson.pos);
  const lessonData = content.slice(braceStart, endPos);
  
  // 파일로 저장
  const varName = lesson.id.startsWith('p') 
    ? `lesson${lesson.id.charAt(0).toUpperCase()}${lesson.id.slice(1)}`
    : `lesson${lesson.id}`;
  
  const filename = `lesson${lesson.id}.ts`;
  const filepath = path.join(lessonsDir, filename);
  
  const tsContent = `import { LessonData } from '../types';

export const ${varName}: LessonData = ${lessonData};
`;
  
  fs.writeFileSync(filepath, tsContent);
  
  extracted.push({
    id: lesson.id,
    varName: varName,
    filename: filename,
    size: lessonData.length
  });
  
  console.log(`✓ 레슨 ${lesson.id} 추출 완료: ${filename} (${lessonData.length} chars)`);
});

// index.ts 생성
let indexContent = `// 레슨 데이터 인덱스
import { LessonsData } from '../types';

`;

extracted.forEach(l => {
  indexContent += `import { ${l.varName} } from './lesson${l.id}';\n`;
});

indexContent += `
export const lessonsData: LessonsData = {
`;

extracted.forEach(l => {
  indexContent += `  "${l.id}": ${l.varName},\n`;
});

indexContent += `};
`;

fs.writeFileSync(path.join(lessonsDir, 'index.ts'), indexContent);

console.log(`\n✅ 완료! ${extracted.length}개 레슨 파일 생성됨`);
console.log(`📁 위치: ${lessonsDir}`);
console.log('\n생성된 파일들:');
extracted.forEach(l => console.log(`  - ${l.filename}`));
console.log('  - index.ts');
