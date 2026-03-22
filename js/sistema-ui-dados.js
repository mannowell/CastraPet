/**
 * CASTRA PET - Sistema UI e Dados
 * Notifications, Export, and History management.
 */

// ============================================================================
// MÓDULO DE NOTIFICAÇÕES
// ============================================================================
const Notificacoes = {
    mostrar: function(mensagem, tipo = 'info', duracao = 4000) {
        if ($('.toast').length > 3) $('.toast').first().remove();

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const toast = $(`
            <div class="toast active ${tipo}" style="display: none;">
                <i class="fas ${icons[tipo] || icons.info}"></i>
                <span>${mensagem}</span>
            </div>
        `);

        $('body').append(toast);
        toast.fadeIn().css('display', 'flex');

        setTimeout(() => {
            toast.fadeOut(() => toast.remove());
        }, duracao);
    },

    sucesso: function(msg) { this.mostrar(msg, 'success'); },
    erro: function(msg) { this.mostrar(msg, 'error'); },
    aviso: function(msg) { this.mostrar(msg, 'warning'); },
    informacao: function(msg) { this.mostrar(msg, 'info'); }
};

// ============================================================================
// MÓDULO DE EXPORTAÇÃO
// ============================================================================
const Exportacao = {
    exportarCSV: function(dados) {
        if (!dados || dados.length === 0) return;

        const headers = Object.keys(dados[0]).join(';');
        const rows = dados.map(row => 
            Object.values(row).map(val => `"${val}"`).join(';')
        ).join('\n');

        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `castrapet_export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    exportarJSON: function(dados) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dados, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", `castrapet_data_${Date.now()}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
};

// ============================================================================
// MÓDULO DE HISTÓRICO
// ============================================================================
const Historico = {
    buscar: function(termo) {
        const cadastros = JSON.parse(localStorage.getItem('castrapet_db') || '[]');
        if (!termo) return cadastros;

        return cadastros.filter(c => 
            (c.animal && c.animal.toLowerCase().includes(termo.toLowerCase())) ||
            (c.tutor && c.tutor.toLowerCase().includes(termo.toLowerCase())) ||
            (c.cpf && c.cpf.includes(termo))
        );
    }
};

// Exportar para escopo global
window.Notificacoes = Notificacoes;
window.Exportacao = Exportacao;
window.Historico = Historico;

$(document).ready(function() {
    console.log('Modules UI & Data ready.');
});
