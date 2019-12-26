// import moment from './moment.min'
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
                entradas = this.entradas.reduce((a, b) => {
                    return this.somaTempo(a, b);
                });
                if (this.pontos.length % 2 === 0){
                    saidas = this.saidas.reduce((a, b) => {
                        return this.somaTempo(a, b);
                    });
                } else {
                    saidas = this.saidas.reduce((a, b) => {
                        return this.somaTempo(a, b);
                    }, this.horaAgora);
                }
                this.horaSaida = this.diferencaTempo(entradas, saidas);
            } else if (this.pontos.length == 1)
                this.horaSaida = this.diferencaTempo(entradas[0], this.horaAgora);
            else if (this.pontos.length == 0)
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
            let horaInicio = moment.duration()
                .add(Number(inicio[0]),'hours')
                .add(Number(inicio[1]),'minutes');
            let horaFim = moment.duration()
                .add(Number(fim[0]),'hours')
                .add(Number(fim[1]),'minutes');
            let res = moment.duration().add(horaFim).subtract(horaInicio);
            
            return this.formataTempo(res);
        },
        somaTempo(inicio, fim){
            inicio = inicio.split(":");
            fim = fim.split(":");
            let horaInicio = moment.duration().add(Number(inicio[0]),'hours').add(Number(inicio[1]),'minutes');
            let horaFim = moment.duration().add(Number(fim[0]),'hours').add(Number(fim[1]),'minutes');
            let res = moment.duration().add(horaInicio).add(horaFim);

            return this.formataTempo(res);
        },
        formataTempo(tempo){
            let hora = Math.floor(Math.abs(tempo.asHours()));
            let minuto = Math.abs(tempo.minutes());
            hora = ((hora < 10) ? "0" + hora : hora);
            minuto = ((minuto < 10) ? "0" + minuto : minuto);
            return ((tempo.minutes()<0 || tempo.asHours()<0)?"-":"+") + hora + ":" + minuto;
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