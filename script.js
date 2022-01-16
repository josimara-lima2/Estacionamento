var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = (Math.floor(mil % 60000) / 1000);
        return min + "m e " + sec + "s";
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var entradaString = String(entrada);
            var tempo = calcTempo(new Date().getTime() - new Date(entradaString).getTime());
            if (!confirm("O veiculo " + nome + " permaneceu por " + tempo + ". Deseja encerrar?")) {
                return;
            }
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td>" + veiculo.nome + "</td>\n                <td>" + veiculo.placa + "</td>\n                <td>" + veiculo.entrada + "</td>\n                <td>\n                <button class=\"delete\" data-placa=\"" + veiculo.placa + "\">x</button>\n                </td>\n            ";
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar(__spreadArrays(ler(), [veiculo]));
        }
        function render() {
            $("#patio").innerHTML = "";
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        return { ler: ler, salvar: salvar, remover: remover, adicionar: adicionar, render: render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        var nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os dados são obrigatórios");
            return;
        }
        patio().adicionar({ nome: nome, placa: placa, entrada: new Date().toISOString() }, true);
    });
})();
