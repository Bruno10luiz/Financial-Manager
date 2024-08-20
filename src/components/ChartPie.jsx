import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import useStock from '../hooks/useStock';

// Registrar componentes do Chart.js para uso no react-chartjs-2
ChartJS.register(ArcElement, Title, Tooltip, Legend)

export default function PieChart() {
    const { income, expense } = useStock()

    // Dados para o gráfico de pizza
    const data = {
        labels: ['Entradas', 'Saídas'],
        datasets: [
            {
                label: 'Transações',
                data: [income, expense],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(255, 99, 132, 0.6)',

                ],
                borderWidth: 1,
            },
        ],
    };

    // Opções de configuração do gráfico de pizza
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribuição de Transações',
            },
        },
    };

    return (
        <>
            <h1>Gráfico dos Gastos</h1>
            <div className="pie-chart">
                <Pie data={data} options={options} />
            </div>
        </>
    );
};
