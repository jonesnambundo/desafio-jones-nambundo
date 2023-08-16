class CaixaDaLanchonete {
    // Função para calcular o valor de uma compra simples
    calcularValorCompra(formaDePagamento, itemCodigo, quantidade) {
        const item = `${itemCodigo},${quantidade}`;
        const itens = [item];
        return this.calcularValorDaCompra(formaDePagamento, itens);
    }

    // Função para calcular o valor total da compra com base nos itens e na forma de pagamento
    calcularValorDaCompra(formaDePagamento, itens) {
        const menu = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        let itemPrincipalPresente = false;
        let itemExtraPresente = false;

        for (const item of itens) {
            const [itemCodigo, quantidade] = item.split(',');
            
            // Verifique se o código do item existe no menu
            if (!menu.hasOwnProperty(itemCodigo)) {
                return "Item inválido!";
            }

            // Analisar quantidade para um inteiro
            const qtd = parseInt(quantidade);

            // Verifique se a quantidade é válida
            if (qtd <= 0) {
                return "Quantidade inválida!";
            }
            
            const precoItem = menu[itemCodigo].valor;
            valorTotal += precoItem * qtd;

            if (itemCodigo === 'cafe' || itemCodigo === 'sanduiche') {
                itemPrincipalPresente = true;
            }

            if (itemCodigo === 'chantily') {
                itemExtraPresente = true;
            }

            if (itemCodigo === 'queijo') {
                itemExtraPresente = true;
            }

            if (itemExtraPresente && !itemPrincipalPresente) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplicar acréscimo de 3% para pagamento a crédito
        }
        if (formaDePagamento!== "dinheiro" && formaDePagamento !== "debito" && formaDePagamento !== "credito") {
            return "Forma de pagamento inválida!";
        }
        return `R$ ${valorTotal.toFixed(2)}`;
    }
}

export { CaixaDaLanchonete };

