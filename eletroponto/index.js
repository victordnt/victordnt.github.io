var app = new Vue({
    el: "#app",
    data: {
        hora: "",
        totalConclusao: "08:00",
        pontos: [],
        entradas: [],
        saidas: [],
        agora: "",
        horaSaida: "",
    },
    computed: {
        horaAgora(){
            getHoraAgora = () => {
                var date = new Date();
                var hora = [];
                hora.push((date.getHours() < 10) ? "0" + date.getHours() : date.getHours());
                hora.push((date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes());
                return hora.join(":");
            };
            setInterval(() => {
                this.agora = getHoraAgora();
            }, 1000);
            return this.agora;
        },
        horaFim(){
            entradas = this.entradas;
            saidas = this.saidas;
            if (this.pontos.length > 2){
                if (this.pontos.length % 2 === 0){
                    entradas = this.entradas.reduce((a, b) => {
                        return this.somaTempo(a, b);
                    });
                    saidas = this.saidas.reduce((a, b) => {
                        return this.somaTempo(a, b);
                    });
                } else {
                    entradas = this.entradas.reduce((a, b) => {
                        return this.somaTempo(a, b);
                    });
                    saidas = this.saidas.reduce((a, b) => {
                        return this.somaTempo(a, b);
                    }, this.horaAgora);
                }
                this.horaSaida = this.diferencaTempo(entradas, saidas);
            } else if (this.pontos.length == 1)
                this.horaSaida = this.diferencaTempo(entradas[0], this.horaAgora);
            else if (this.pontos.length == 2)
                this.horaSaida = this.diferencaTempo(entradas[0], saidas[0]);
            return this.horaSaida;

        },
    },
    methods: {
        guardaTempo(){
            let hora = this.hora;
            if (hora && hora.length > 0){
                this.addPonto(hora);
            } else {
                this.addPonto(this.agora);
            }
            this.hora = undefined;
        },
        addPonto(ponto){
            this.pontos.push(ponto);
            if (this.pontos.length % 2 === 0)
                this.saidas.push(ponto);
            else
                this.entradas.push(ponto);
        }
        ,
        resetaValores(){
            this.hora = "";
            this.pontos = [];
            this.entradas = [];
            this.saidas = [];
            this.horaSaida = "";
        },
        diferencaTempo(inicio, fim){
            inicio = inicio.split(":");
            fim = fim.split(":");

            hora = fim[0] - inicio[0];
            minuto = fim[1] - inicio[1];

            if (minuto < 0 && hora < 0){
                minuto -= minuto*2;
            }else if (minuto < 0){
                hora--;
                minuto += 60;
            }
            if (hora==null || minuto==null){
                return "-"
            }
            hora = ((hora < 10 && hora > 0) ? "0" + hora : hora);
            minuto = ((minuto < 10) ? "0" + minuto : minuto);
            return hora + ":" + minuto;
        },
        somaTempo(inicio, fim){
            inicio = inicio.split(":");
            fim = fim.split(":");

            hora = parseInt(fim[0]) + parseInt(inicio[0]);
            minuto = parseInt(fim[1]) + parseInt(inicio[1]);
            if (minuto > 60){
                hora++;
                minuto -= 60;
            }

            hora = ((hora < 10) ? "0" + hora : hora);
            minuto = ((minuto < 10) ? "0" + minuto : minuto);
            return hora + ":" + minuto;
        },
    },
    mounted(){
        if (localStorage.hora){
            this.hora = localStorage.hora;
        }
        if (localStorage.pontos){
            this.pontos = localStorage.pontos.split(",");
        }
        if (localStorage.entradas){
            this.entradas = localStorage.entradas.split(",");
        }
        if (localStorage.saidas){
            this.saidas = localStorage.saidas.split(",");
        }
        if (localStorage.horaSaida){
            this.horaSaida = localStorage.horaSaida;
        }
        if (localStorage.totalConclusao){
            this.totalConclusao = localStorage.totalConclusao;
        }

    },
    watch: {
        hora(hora){
            localStorage.hora = hora;
        },
        pontos(pontos){
            localStorage.pontos = pontos;
        },
        entradas(entradas){
            localStorage.entradas = entradas;
        },
        saidas(saidas){
            localStorage.saidas = saidas;
        },
        horaSaida(horaSaida){
            localStorage.horaSaida = horaSaida;
        },
        totalConclusao(totalConclusao){
            localStorage.totalConclusao = totalConclusao;
        },
    },
});