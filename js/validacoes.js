/**
 * CASTRA PET - Validações
 * Form validation logic.
 */

const Validacoes = {
    validarCPF: function(cpf) {
        if (!cpf) return false;
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.substring(10, 11));
    },

    validarTelefone: function(tel) {
        return tel && tel.replace(/\D/g, '').length >= 10;
    },

    validarCEP: function(cep) {
        return cep && cep.replace(/\D/g, '').length === 8;
    },

    campoObrigatorio: function(valor) {
        return valor && valor.toString().trim() !== '';
    },

    validarEmTempoReal: function(el) {
        const $el = $(el);
        const val = $el.val();
        const id = $el.attr('id');
        let valido = true;

        if ($el.prop('required') && !this.campoObrigatorio(val)) {
            valido = false;
        } else {
            if (id === 'cpf') valido = this.validarCPF(val);
            if (id === 'cep') valido = this.validarCEP(val);
            if (id === 'celular') valido = this.validarTelefone(val);
        }

        $el.toggleClass('is-invalid', !valido).toggleClass('is-valid', valido);
        return valido;
    }
};

window.Validacoes = Validacoes;
