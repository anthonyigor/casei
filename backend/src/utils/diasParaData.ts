export function diasParaData(dataAlvo: string): number {
    const [dia, mes, ano] = dataAlvo.split('/').map(Number);
    const dataFutura: Date = new Date(ano, mes - 1, dia);
    const hoje: Date = new Date();

    // Zerar as horas para comparar apenas os dias
    hoje.setHours(0, 0, 0, 0);
    dataFutura.setHours(0, 0, 0, 0);

    const diffTime: number = dataFutura.getTime() - hoje.getTime();
    const diffDias: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDias >= 0 ? diffDias : 0; // Retorna 0 se a data já passou
}

