class contaParquimetro {
    #saldo
    constructor() {
        this.#saldo = 0;
    }

    //Métodos
    depositar(valor){
        this.#saldo += valor;
    }

    temTroco(valor){
        return valor > 3;
    }

    saldoZero(){
        this.#saldo = 0;
    }

    get saldo(){
        return this.#saldo;
    }
}

class interfaceParquimetro {
    constructor(vaga) {
        this.vaga = vaga;        
    }

    //Métodos
    depositar(){
        const valorPago = parseFloat(document.getElementById("valorAdicionado").value);

        if (isNaN(valorPago) || valorPago < 1) {
            document.getElementById("valorTroco").textContent = "Valor mínimo para depósito é R$ 1,00";
            return;
        }

        this.vaga.depositar(valorPago);
        this.atualizarSaldo(this.vaga.saldo);
        this.troco();
        this.tempoPermitido();
    }

    atualizarSaldo(saldo){
        document.getElementById("valorSaldo").textContent = `Saldo: R$ ${saldo.toFixed(2)}`
        document.getElementById("valorAdicionado").value = ""
    }

    troco(){
        const saldoTroco = this.vaga.saldo;
        if(this.vaga.temTroco(saldoTroco)){
            let valorDevolvido = saldoTroco - 3;
            document.getElementById("valorTroco").textContent = `Seu troco é de R$ ${valorDevolvido.toFixed(2)}`;
        }else{
            document.getElementById("valorTroco").textContent = `Você não tem troco a receber`;            
        }
    }

    tempoPermitido(){
        let x, tempo;
        const saldoTempo = this.vaga.saldo;
        if(this.vaga.temTroco(saldoTempo)){
           x = 3;
           tempo = (4*(Math.pow(x,2)))+(29*x)-(3);
           document.getElementById("tempoPermanencia").textContent = `Seu tempo de permanência é de ${Math.round(tempo)} minutos.`
        }else{
            x = saldoTempo
            tempo = (4*(Math.pow(x,2)))+(29*x)-(3);
            document.getElementById("tempoPermanencia").textContent = `Seu tempo de permanência é de ${Math.round(tempo)} minutos.`
        }
    }

    limpar(){
        const saldolimpar = this.vaga.saldo;
        console.log(saldolimpar)
        if(saldolimpar>=1){
            document.getElementById("valorAdicionado").value = "";
            document.getElementById("valorTroco").textContent = "Imprimindo comprovante...";
            document.getElementById("tempoPermanencia").textContent = "";
            this.vaga.saldoZero();
            this.atualizarSaldo(this.vaga.saldo);
        }else{
            document.getElementById("valorAdicionado").value = "";
            document.getElementById("valorTroco").textContent = "";
            document.getElementById("tempoPermanencia").textContent = "";
            this.atualizarSaldo(this.vaga.saldo);
        }
    }
}

const conta = new contaParquimetro();
const park = new interfaceParquimetro(conta);