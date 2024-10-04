$(document).ready(function () {
    
    // Máscaras de input
    $('#telefone').mask('(00) 00000-0000', {
        placeholder: '(DDD) 12345-6789'
    });

    $('#cpf').mask('000.000.000-00', {
        placeholder: '123.456.789-00'
    });

    $('#cep').mask('00000-000', {
        placeholder: '01234-567'
    });

    // Validação do formulário
    $('form').validate({
        rules: {
            nome: {
                required: true,
                minlength: 5, // Nome completo deve ter no mínimo 5 caracteres
                nomeSobrenome: true // Validação personalizada para nome e sobrenome
            },
            email: {
                required: true,
                email: true, // Validação padrão de email
                regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Validação adicional com regex
            },
            telefone: {
                required: true,
                minlength: 15 // O telefone com máscara deve ter 15 caracteres completos (com DDD)
            },
            endereco: {
                required: true,
                minlength: 10, // Endereço deve ter pelo menos 10 caracteres
                enderecoCompleto: true // Validação personalizada para endereço rigoroso
            },
            cep: {
                required: true,
                regex: /^[0-9]{5}-[0-9]{3}$/ // CEP deve seguir o formato correto
            },
            cpf: {
                required: true,
                cpfValido: true // Validação personalizada para verificar se o CPF é válido
            }
        },
        messages: {
            nome: {
                required: "O nome é obrigatório.",
                nomeSobrenome: "Por favor, insira seu nome e sobrenome completos.",
                minlength: "O nome deve ter pelo menos 5 caracteres."
            },
            email: {
                required: "O e-mail é obrigatório.",
                email: "Por favor, insira um e-mail válido.",
                regex: "O e-mail deve ter um formato válido."
            },
            telefone: {
                required: "O telefone é obrigatório.",
                minlength: "Por favor, insira o telefone no formato correto (ex: (DDD) 12345-6789)."
            },
            endereco: {
                required: "O endereço é obrigatório.",
                minlength: "O endereço deve ter pelo menos 10 caracteres.",
                enderecoCompleto: "O endereço deve conter o nome da rua, número e cidade."
            },
            cep: {
                required: "O CEP é obrigatório.",
                regex: "O CEP deve estar no formato correto (ex: 01234-567)."
            },
            cpf: {
                required: "O CPF é obrigatório.",
                cpfValido: "Por favor, insira um CPF válido."
            }
        },
        submitHandler: function(form) {
            alert("Sua requisição foi enviada para análise, parabéns pela aquisição!");
            form.reset();
        },
        invalidHandler: function(form, validator) {
            alert("Por favor, preencha todos os campos corretamente para prosseguir com a compra!");
        }
    });

    // Validação personalizada para nome completo (nome e sobrenome)
    $.validator.addMethod("nomeSobrenome", function (value, element) {
        return value.trim().split(' ').length >= 2;
    }, "Por favor, insira o nome e o sobrenome.");

    // Validação personalizada para endereço completo
    $.validator.addMethod("enderecoCompleto", function (value, element) {
        var temNumero = /\d+/; // Verifica se tem números
        var temLetras = /[A-Za-z]+/; // Verifica se tem letras
        var palavras = value.trim().split(' ').length; // Verifica quantas palavras tem

        return temNumero.test(value) && temLetras.test(value) && palavras >= 3;
    }, "O endereço deve conter o nome da rua, número e cidade.");

    // Validação personalizada para CPF
    $.validator.addMethod("cpfValido", function (value, element) {
        value = value.replace(/[^\d]+/g,''); // Remove caracteres especiais do CPF
        if(value.length != 11) return false;
        var soma = 0, resto;
        if (/^(\d)\1+$/.test(value)) return false; // Verifica se todos os dígitos são iguais
        for (var i = 1; i <= 9; i++) soma += parseInt(value.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(value.substring(9, 10))) return false;
        soma = 0;
        for (var i = 1; i <= 10; i++) soma += parseInt(value.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(value.substring(10, 11))) return false;
        return true;
    }, "Por favor, insira um CPF válido.");

    // Validação personalizada com Regex
    $.validator.addMethod("regex", function(value, element, regex) {
        return this.optional(element) || regex.test(value);
    }, "Por favor, insira um valor válido.");
});