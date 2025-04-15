const fs = require("fs");
const path = require("path");

const inputName = process.argv[2];

if (!inputName) {
  console.error(
    "Por favor, forneça o nome da página. Ex: npm run criar-pagina MinhaPagina"
  );
  process.exit(1);
}

const toKebabCase = (str) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const kebabName = toKebabCase(inputName);
const folderPath = path.join("src/app", kebabName);
const filePath = path.join(folderPath, "page.tsx");
const filePathCss = path.join(folderPath, "page.css");

const content = `import "./page.css";

export default function ${inputName}() {
  return (
    <div className="container">
      <h1>${inputName}</h1>
    </div>
  );
}`;

const contentCss = `.container{
display:flex;
justify-content: center;
alingn-item center
}
`;

fs.mkdirSync(folderPath, { recursive: true });
fs.writeFileSync(filePath, content);
fs.writeFileSync(filePathCss,contentCss);
console.log(`Página ${inputName} criada em ${filePath}`);
