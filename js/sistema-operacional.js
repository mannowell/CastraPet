/**
 * CASTRA PET - Sistema Operacional
 * Core logic for navigation, multi-step form and data management.
 */

// ============================================================================
// MÓDULO DE NAVEGAÇÃO ENTRE SEÇÕES
// ============================================================================
const Navigation = {
    irPara: function(secaoId) {
        $('.app-section').hide();
        $(`#section-${secaoId}`).fadeIn();
        
        // Ativar link no nav
        $('.nav-links a').removeClass('active');
        $(`.nav-links a[onclick*="${secaoId}"]`).addClass('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ============================================================================
// MÓDULO DE MÁSCARAS
// ============================================================================
const Mascaras = {
    inicializar: function() {
        $('.cpf-mask').mask('000.000.000-00');
        $('.phone-mask').mask('(00) 00000-0000');
        $('.cep-mask').mask('00000-000');
    }
};

// ============================================================================
// MÓDULO VIACEP
// ============================================================================
const ViaCEP = {
    buscar: async function() {
        const cep = $('#cep').val().replace(/\D/g, '');
        if (cep.length !== 8) {
            Notificacoes.erro('CEP inválido.');
            return;
        }
        
        Notificacoes.informacao('Buscando endereço...');
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            
            if (data.erro) {
                Notificacoes.erro('CEP não encontrado.');
                return;
            }
            
            $('#logradouro').val(data.logradouro);
            $('#bairro').val(data.bairro);
            $('#cidade_estado').val(`${data.localidade} / ${data.uf}`);
            
            Notificacoes.sucesso('Endereço preenchido!');
            $('#numero').focus();
        } catch (e) {
            Notificacoes.erro('Erro na busca do CEP.');
        }
    }
};

// ============================================================================
// MÓDULO DE FORMULÁRIO
// ============================================================================
const Formulario = {
    passoAtual: 1,
    totalPassos: 4,
    
    racas: {
        'CÃO': ['SRD (Vira-lata)', 'Poodle', 'Pinscher', 'Labrador', 'Golden Retriever', 'Bulldog Francês', 'Shih Tzu', 'Yorkshire', 'Beagle', 'Dachshund (Salsicha)'],
        'GATO': ['SRD (Vira-lata)', 'Persa', 'Siamês', 'Main Coon', 'Angorá', 'Bengal', 'Ragdoll', 'Sphynx']
    },

    inicializar: function() {
        $('.btn-next').on('click', () => this.avancarPasso());
        $('.btn-prev').on('click', () => this.voltarPasso());
        $('.btn-save').on('click', () => Cadastro.salvar());
        this.atualizarContador();
    },

    atualizarRacas: function() {
        const especie = $('#especie').val();
        const $racaSelect = $('#raca');
        
        $racaSelect.empty().append('<option value="">Selecione a raça...</option>');
        
        if (especie && this.racas[especie]) {
            this.racas[especie].forEach(r => {
                $racaSelect.append(`<option value="${r}">${r}</option>`);
            });
            $racaSelect.prop('disabled', false);
        } else {
            $racaSelect.prop('disabled', true);
        }
    },

    avancarPasso: function() {
        if (!this.validarPasso(this.passoAtual)) {
            Notificacoes.aviso('Preencha os campos obrigatórios.');
            return;
        }
        
        if (this.passoAtual < this.totalPassos) {
            this.passoAtual++;
            this.atualizarUI();
            if (this.passoAtual === 4) this.mostrarResumo();
        }
    },

    voltarPasso: function() {
        if (this.passoAtual > 1) {
            this.passoAtual--;
            this.atualizarUI();
        }
    },

    validarPasso: function(p) {
        let ok = true;
        $(`.form-step[data-step="${p}"] [required]`).each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                ok = false;
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });
        return ok;
    },

    atualizarUI: function() {
        $('.form-step').hide();
        $(`.form-step[data-step="${this.passoAtual}"]`).fadeIn();
        
        $('.step').removeClass('active completed');
        $('.step').each(function() {
            const s = parseInt($(this).data('step'));
            if (s < Formulario.passoAtual) $(this).addClass('completed');
            if (s === Formulario.passoAtual) $(this).addClass('active');
        });

        $('.btn-prev').toggle(this.passoAtual > 1);
        $('.btn-next').toggle(this.passoAtual < 4);
        $('.btn-save').toggle(this.passoAtual === 4);

        const titles = ['Informações do Animal', 'Informações do Tutor', 'Endereço', 'Revisão'];
        $('#step-title').html(`<i class="fas fa-paw me-2"></i>${titles[this.passoAtual-1]}`);
    },

    mostrarResumo: function() {
        const d = Cadastro.coletarDados();
        $('#review-content').html(`
            <div class="review-section">
                <h5>🐾 Animal</h5>
                <p><strong>Nome:</strong> ${d.animal} | <strong>Raça:</strong> ${d.raca}</p>
                <p><strong>Espécie:</strong> ${d.especie} | <strong>Idade:</strong> ${d.idade}</p>
            </div>
            <div class="review-section">
                <h5>👤 Tutor</h5>
                <p><strong>Nome:</strong> ${d.tutor}</p>
                <p><strong>WhatsApp:</strong> ${d.celular}</p>
            </div>
            <div class="review-section">
                <h5>📍 Endereço</h5>
                <p>${d.logradouro}, ${d.numero} - ${d.bairro}</p>
                <p>${d.cidade_estado}</p>
            </div>
        `);
    },

    atualizarContador: function() {
        const total = JSON.parse(localStorage.getItem('castrapet_db') || '[]').length;
        $('#total-cadastros').text(total);
    }
};

// ============================================================================
// MÓDULO DE CADASTRO
// ============================================================================
const Cadastro = {
    coletarDados: function() {
        const dados = {};
        $('#cadastro-form').find('input, select, textarea').each(function() {
            if (this.id) dados[this.id] = $(this).val();
        });
        return dados;
    },

    salvar: function() {
        const dados = this.coletarDados();
        const db = JSON.parse(localStorage.getItem('castrapet_db') || '[]');
        dados.id = Date.now();
        db.push(dados);
        localStorage.setItem('castrapet_db', JSON.stringify(db));
        
        Notificacoes.sucesso('Cadastro realizado!');
        Formulario.atualizarContador();
        setTimeout(() => Navigation.irPara('home'), 1500);
        
        // Reset form
        $('#cadastro-form')[0].reset();
        Formulario.passoAtual = 1;
        Formulario.atualizarUI();
    }
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
$(document).ready(function() {
    Mascaras.inicializar();
    Formulario.inicializar();
});

// Ocultar Overlay de Carregamento
$(window).on('load', function() {
    $('#loading-overlay').fadeOut();
});

window.Navigation = Navigation;
window.Formulario = Formulario;
window.Cadastro = Cadastro;
window.ViaCEP = ViaCEP;
