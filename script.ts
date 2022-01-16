interface Veiculo{
    nome:string;
    placa:string;
    entrada: Date | string;

}

interface  Array < T >  { 
    find ( predicate : ( valor : T ,  index : number ,  obj : Array < T > )  =>  boolean ,  thisArg ?: any ) : T  |  undefined ; 
}
(function(){
    const $ = (query:string): HTMLInputElement | null => document.querySelector(query)

    function calcTempo(mil:number){
        const min = Math.floor(mil / 60000)
        const sec = (Math.floor(mil%60000)/1000)

        return `${min}m e ${sec}s`
    }
    function patio(){
        function ler():Veiculo[]{
            return localStorage.patio ? JSON.parse(localStorage.patio) : []
        }
        function salvar(veiculos:Veiculo[]){
            localStorage.setItem("patio", JSON.stringify(veiculos))
        }
        function remover(placa:string){
            
            const {entrada, nome} = ler().find(veiculo => veiculo.placa === placa)
            const entradaString = String(entrada)
            const tempo = calcTempo( new Date().getTime() - new Date(entradaString).getTime())
            if(!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)){
                return
            }
            salvar(ler().filter(veiculo => veiculo.placa !== placa))
            render()
        }
        function adicionar(veiculo:Veiculo, salva?:boolean){
            const row = document.createElement("tr")
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                <button class="delete" data-placa="${veiculo.placa}">x</button>
                </td>
            `
            row.querySelector(".delete")?.addEventListener("click", function(){
                remover(this.dataset.placa)
            })

            $("#patio")?.appendChild(row)
            if(salva) salvar([...ler(),veiculo])
        }
        function render(){
            $("#patio")!.innerHTML = ""
            const patio = ler()
            if(patio.length){
                patio.forEach((veiculo) => adicionar(veiculo))
            }
        }

        return {ler,salvar,remover,adicionar,render}
    }
    patio().render()
    $("#cadastrar")?.addEventListener("click",() => {
        const nome = $("#nome")?.value
        const placa = $("#placa")?.value

        if(!nome || !placa){
            alert("Os dados são obrigatórios")
            return
        }
        patio().adicionar({nome,placa,entrada:new Date().toISOString()},true)
    })

})();