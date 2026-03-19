document.addEventListener('DOMContentLoaded', () => {
    
    const btnFacture = document.getElementById('btn-facture');
    const btnDette = document.getElementById('btn-dette');

    // Redirection vers la page Facture
    btnFacture.addEventListener('click', () => {
        window.location.href = 'facture.html'; 
    });

    // Redirection vers la page Carnet de Dette
    btnDette.addEventListener('click', () => {
        window.location.href = 'dette.html';
    });
});
// Afficher la date du jour
document.getElementById('current-date').innerText = new Date().toLocaleDateString();

function ajouterLigne() {
    const table = document.getElementById('invoice-body');
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Description"></td>
        <td><input type="number" class="qty" value="1" oninput="calculerTotal()"></td>
        <td><input type="number" class="price" value="0" oninput="calculerTotal()"></td>
        <td class="line-total">0</td>
        <td><button class="btn-delete" onclick="supprimerLigne(this)">X</button></td>
    `;
}

function supprimerLigne(btn) {
    btn.parentElement.parentElement.remove();
    calculerTotal();
}

function calculerTotal() {
    const rows = document.querySelectorAll('#invoice-body tr');
    let totalFC = 0;
    const taux = parseFloat(document.getElementById('taux-change').value) || 1;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const lineTotal = qty * price;
        
        row.querySelector('.line-total').innerText = lineTotal.toLocaleString();
        totalFC += lineTotal;
    });

    const totalUSD = totalFC / taux;

    document.getElementById('grand-total-fc').innerText = totalFC.toLocaleString();
    document.getElementById('grand-total-usd').innerText = totalUSD.toFixed(2);
}

function genererPDF() {
    const element = document.getElementById('facture-container');
    const opt = {
        margin: 10,
        filename: 'Facture_HT.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}

// Initialiser le calcul
calculerTotal();
function genererPDF() {
    const element = document.getElementById('facture-container');
    const opt = {
        margin: [10, 10, 20, 10], // Marge augmentée en bas pour le copyright
        filename: 'Facture_HT_Bureautique.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}
// --- LOGIQUE D'INCRÉMENTATION DU NUMÉRO DE FACTURE ---

function initialiserNumeroFacture() {
    // On récupère le dernier index enregistré, sinon on commence à 0
    let dernierIndex = localStorage.getItem('dernierIndexFacture') || 0;
    
    // On incrémente pour la nouvelle facture
    let nouvelIndex = parseInt(dernierIndex) + 1;
    
    // On formate le nombre avec des zéros devant (ex: 001, 002)
    let numeroFormate = nouvelIndex.toString().padStart(3, '0');
    
    // On affiche le numéro final
    const affichage = document.getElementById('facture-numero');
    affichage.innerText = `${numeroFormate}/HT/026`;
    
    // On sauvegarde le nouvel index pour la prochaine fois
    localStorage.setItem('dernierIndexFacture', nouvelIndex);
}

// Appeler la fonction au chargement de la page
window.onload = function() {
    initialiserNumeroFacture();
    // Votre code existant pour la date et les calculs
    document.getElementById('current-date').innerText = new Date().toLocaleDateString();
    calculerTotal();
};

// --- LE RESTE DE VOTRE CODE (calculerTotal, ajouterLigne, etc.) ---

