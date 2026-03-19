// Mise à jour de la date et l'heure automatiquement
function updateDateTime() {
    const now = new Date();
    document.getElementById('dateTime').innerText = now.toLocaleString('fr-FR');
}
setInterval(updateDateTime, 1000);

let rowCount = 0;

function addRow() {
    rowCount++;
    const tbody = document.getElementById('tableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="denom"></td>
        <td><input type="number" class="qte" value="0" oninput="calculateRow(this)"></td>
        <td><input type="number" class="pu" value="0" oninput="calculateRow(this)"></td>
        <td class="pt">0</td>
        <td><input type="number" class="paye" value="0" oninput="calculateRow(this)"></td>
        <td class="reste">0</td>
        <td><button class="btn-del" onclick="removeRow(this)">✕</button></td>
    `;
    tbody.appendChild(row);
}

function calculateRow(element) {
    const row = element.parentElement.parentElement;
    const qte = parseFloat(row.querySelector('.qte').value) || 0;
    const pu = parseFloat(row.querySelector('.pu').value) || 0;
    const paye = parseFloat(row.querySelector('.paye').value) || 0;

    const pt = qte * pu;
    const reste = pt - paye;

    row.querySelector('.pt').innerText = pt.toFixed(2);
    row.querySelector('.reste').innerText = reste.toFixed(2);

    updateGrandTotal();
}

function updateGrandTotal() {
    let totalPrix = 0, totalPaye = 0, totalReste = 0;

    document.querySelectorAll('.pt').forEach(el => totalPrix += parseFloat(el.innerText));
    document.querySelectorAll('.paye').forEach(el => totalPaye += parseFloat(el.value) || 0);
    document.querySelectorAll('.reste').forEach(el => totalReste += parseFloat(el.innerText));

    document.getElementById('totalPrix').innerText = totalPrix.toFixed(2) + " Fc";
    document.getElementById('totalPaye').innerText = totalPaye.toFixed(2) + " Fc";
    document.getElementById('totalReste').innerText = totalReste.toFixed(2) + " Fc";
}

function removeRow(btn) {
    btn.parentElement.parentElement.remove();
    updateGrandTotal();
}

// Ajouter une première ligne au chargement
window.onload = addRow;