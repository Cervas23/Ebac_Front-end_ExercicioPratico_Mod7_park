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
        if(valor == 1 || valor == 1.75 || valor == 3){
            return false;
        }else{
            return true;
        }
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
        console.log(this.vaga.temTroco(saldoTroco))
        if(this.vaga.temTroco(saldoTroco)){
            if(saldoTroco>1 && saldoTroco<1.75){
                let valorDevolvido = saldoTroco - 1;
                document.getElementById("valorTroco").textContent = `Seu troco é de R$ ${valorDevolvido.toFixed(2)}`;
            }else if(saldoTroco>1.75 && saldoTroco<3){
                let valorDevolvido = saldoTroco - 1.75;
                document.getElementById("valorTroco").textContent = `Seu troco é de R$ ${valorDevolvido.toFixed(2)}`;  
            }else if(saldoTroco>3){
                let valorDevolvido = saldoTroco - 3;
                document.getElementById("valorTroco").textContent = `Seu troco é de R$ ${valorDevolvido.toFixed(2)}`;
            }  
        }else{
            document.getElementById("valorTroco").textContent = `Você não tem troco a receber`;            
        }
    }

    tempoPermitido(){
        let x, tempo;
        const saldoTempo = this.vaga.saldo;
        if(this.vaga.temTroco(saldoTempo)){
            if(saldoTempo>1 && saldoTempo<1.75){
                x = 1;
                tempo = (4*(Math.pow(x,2)))+(29*x)-(3);
                document.getElementById("tempoPermanencia").textContent = `Seu tempo de permanência é de ${Math.round(tempo)} minutos.`
            }else if(saldoTempo>1.75 && saldoTempo<3){
                x = 1.75;
                tempo = (4*(Math.pow(x,2)))+(29*x)-(3);
                document.getElementById("tempoPermanencia").textContent = `Seu tempo de permanência é de ${Math.round(tempo)} minutos.` 
            }else if(saldoTempo>3){
                x = 3;
                tempo = (4*(Math.pow(x,2)))+(29*x)-(3);
                document.getElementById("tempoPermanencia").textContent = `Seu tempo de permanência é de ${Math.round(tempo)} minutos.`
            }
        }else{
            x = saldoTempo
            tempo = (4*(Math.pow(x,2)))+(29*x)-(3);
            document.getElementById("tempoPermanencia").textContent = `Seu tempo de permanência é de ${Math.round(tempo)} minutos.`
        }
    }

    limpar(){
        const saldolimpar = this.vaga.saldo;
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