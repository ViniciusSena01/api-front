import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: false,
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent implements OnInit, OnDestroy {
  // Dados do formulário de endereço
  cep: string = '';
  rua: string = '';
  bairro: string = '';
  cidade: string = '';
  uf: string = '';
  numero: string = '';
  complemento: string = '';

  // Configurações do wizard de checkout
  etapa: 'endereco' | 'entrega' | 'pagamento' | 'sucesso' = 'endereco';
  tipoEntrega: 'expressa' | 'padrao' = 'padrao';
  valorFrete: number = 0;
  metodoPagamento: 'pix' | 'cartao' = 'pix';

  // Dados do formulário do cartão
  numeroCartao: string = '';
  nomeTitular: string = '';
  dataValidade: string = '';
  cvv: string = '';
  parcelas: number = 1;

  // Informações de PIX e Sucesso do pedido
  numeroPedido: string = '';
  pixCopiaCola: string = '';
  pixQRCodeUrl: string = '';
  pixKeyCopied: string = '';

  // Variáveis para o resumo de preço
  totalProdutos: number = 0;
  totalPedido: number = 0;
  quantidadeItens: number = 0;

  carrinhoSubscription!: Subscription;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Escuta as alterações do carrinho de forma reativa
    this.carrinhoSubscription = this.carrinhoService.itens$.subscribe(itens => {
      this.quantidadeItens = itens.reduce((total, item) => total + item.quantidade, 0);
      this.totalProdutos = this.carrinhoService.obterPrecoTotal();
      this.atualizarTotalPedido();

      // Se o carrinho for esvaziado manualmente e não for a tela de sucesso, redireciona para a vitrine
      if (itens.length === 0 && this.etapa !== 'sucesso') {
        this.router.navigate(['/produtos']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.carrinhoSubscription) {
      this.carrinhoSubscription.unsubscribe();
    }
  }

  // Define o tipo de entrega e ajusta o preço do frete
  selecionarEntrega(tipo: 'expressa' | 'padrao'): void {
    this.tipoEntrega = tipo;
    this.valorFrete = tipo === 'expressa' ? 25.00 : 0;
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalProdutos = this.carrinhoService.obterPrecoTotal();
    this.atualizarTotalPedido();
  }

  selecionarMetodo(metodo: 'pix' | 'cartao'): void {
    this.metodoPagamento = metodo;
    this.atualizarTotalPedido();
  }

  // Faz o cálculo final do pedido (PIX tem 10% de desconto)
  atualizarTotalPedido(): void {
    const desconto = this.metodoPagamento === 'pix' ? (this.totalProdutos * 0.1) : 0;
    this.totalPedido = this.totalProdutos + this.valorFrete - desconto;
  }

  // Avança no wizard de checkout
  proximaEtapa(): void {
    if (this.etapa === 'endereco') {
      this.etapa = 'entrega';
    } else if (this.etapa === 'entrega') {
      this.etapa = 'pagamento';
    } else if (this.etapa === 'pagamento') {
      this.concluirPedido();
    }
  }

  // Volta uma etapa no wizard de checkout
  voltarEtapa(): void {
    if (this.etapa === 'entrega') {
      this.etapa = 'endereco';
    } else if (this.etapa === 'pagamento') {
      this.etapa = 'entrega';
    } else if (this.etapa === 'endereco') {
      this.router.navigate(['/carrinho']);
    }
  }

  // Simula a finalização do pedido
  concluirPedido(): void {
    this.numeroPedido = Math.floor(10000000 + Math.random() * 90000000).toString();

    if (this.metodoPagamento === 'pix') {
      this.pixCopiaCola = `00020101021226830014BR.GOV.BCB.PIX0136d859fa24-6b94-4351-8fa7-1c029d997d5avinissaogames5204000053039865405${this.totalPedido.toFixed(2)}5802BR5915Vinissao Games6009Salvador62070503***`;
      this.pixQRCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(this.pixCopiaCola)}`;
    }

    // Esvazia o carrinho de compras do usuário
      this.etapa = 'sucesso';
    this.carrinhoService.limparCarrinho();

  }

  // Copia o código PIX Copia e Cola para o clipboard
  copiarPixKey() {
    navigator.clipboard.writeText(this.pixCopiaCola);
    this.pixKeyCopied = '✓ Copiado!';
    setTimeout(() => {
      this.pixKeyCopied = '';
    }, 2000);
  }

  // Métodos de formatação para exibição do cartão de crédito
  formatarNomeCartao(): string {
    return this.nomeTitular.toUpperCase() || 'NOME IMPRESSO';
  }

  formatarNumeroCartao(): string {
    return this.numeroCartao
      .replace(/\D/g, '')
      .match(/.{1,4}/g)
      ?.join(' ') || '•••• •••• •••• ••••';
  }

  formatarDataValidade(): string {
    const limpo = this.dataValidade.replace(/\D/g, '');
    if (limpo.length >= 4) {
      return `${limpo.slice(0, 2)}/${limpo.slice(2, 4)}`;
    }
    return this.dataValidade || 'MM/AA';
  }

  formatarCvv(): string {
    return this.cvv.replace(/\D/g, '').slice(0, 3);
  }
}
