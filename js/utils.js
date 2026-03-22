/**
 * CASTRA PET - Utils
 * Utility functions.
 */

const Utils = {
    limparMascara: function(val) {
        return val ? val.replace(/\D/g, '') : '';
    },

    formatarCPF: function(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },

    formatarCEP: function(cep) {
        return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    },

    formatarTelefone: function(tel) {
        const n = tel.replace(/\D/g, '');
        if (n.length === 11) return n.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        if (n.length === 10) return n.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        return tel;
    },

    gerarID: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    debounce: function(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

window.Utils = Utils;
