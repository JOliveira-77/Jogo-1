document.addEventListener('DOMContentLoaded', (event) => {
    const crossButton = document.getElementById('cross-button');
    const result = document.getElementById('result');
    const punnettSquare = document.getElementById('punnett-square');
    const probabilityChart = document.getElementById('probability-chart');

    crossButton.addEventListener('click', () => {
        const plant1Gene1 = document.getElementById('plant1-gene1').value;
        const plant1Gene2 = document.getElementById('plant1-gene2').value;
        const plant2Gene1 = document.getElementById('plant2-gene1').value;
        const plant2Gene2 = document.getElementById('plant2-gene2').value;

        const offspring = generateOffspring(plant1Gene1, plant1Gene2, plant2Gene1, plant2Gene2);
        displayResult(offspring);
        displayPunnettSquare(plant1Gene1, plant1Gene2, plant2Gene1, plant2Gene2, offspring);
        displayProbabilityChart(offspring);
    });

    function generateOffspring(g1p1, g2p1, g1p2, g2p2) {
        const possibleOffspring = [];
        possibleOffspring.push(g1p1 + g2p1);
        possibleOffspring.push(g1p1 + g2p2);
        possibleOffspring.push(g1p2 + g2p1);
        possibleOffspring.push(g1p2 + g2p2);

        return possibleOffspring;
    }

    function displayResult(offspring) {
        result.innerHTML = '<h2>Resultado do Cruzamento</h2>';
        offspring.forEach((combo) => {
            result.innerHTML += <p>${combo}</p>;
        });
    }

    function displayPunnettSquare(g1p1, g2p1, g1p2, g2p2, offspring) {
        punnettSquare.innerHTML = '<h2>Quadrado de Punnett</h2>';
        punnettSquare.innerHTML += `
            <table border="1">
                <tr>
                    <th></th>
                    <th>${g1p1}</th>
                    <th>${g1p2}</th>
                </tr>
                <tr>
                    <th>${g2p1}</th>
                    <td>${offspring[0]}</td>
                    <td>${offspring[1]}</td>
                </tr>
                <tr>
                    <th>${g2p2}</th>
                    <td>${offspring[2]}</td>
                    <td>${offspring[3]}</td>
                </tr>
            </table>
        `;
    }

    function displayProbabilityChart(offspring) {
        const alleleCounts = offspring.reduce((acc, genotype) => {
            acc[genotype] = (acc[genotype] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(alleleCounts);
        const data = Object.values(alleleCounts);

        const ctx = document.createElement('canvas');
        probabilityChart.innerHTML = '';
        probabilityChart.appendChild(ctx);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Descendentes',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
})