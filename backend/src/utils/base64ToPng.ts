import { writeFile } from "fs";

export function base64ToPng(base64String: string, outputPath: string) {
    // Remove o prefixo se existir
    const base64Data = base64String.replace(/^data:image\/png;base64,/, "");
  
    // Cria o arquivo PNG
    writeFile(outputPath, base64Data, 'base64', (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo:', err);
      } else {
        console.log('Arquivo salvo com sucesso:', outputPath);
      }
    });
  }