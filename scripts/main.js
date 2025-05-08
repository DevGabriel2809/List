function marcarComprado(checkbox) {
    const item = checkbox.closest('.item');
    if (checkbox.checked){
        item.classList.add('comprado');
    } else {
        item.classList.remove('comprado');
    }
    salvarDados();
}

// Adicionar Produto

let categoriaAtual =null;

function OpenForm(botao) {
    const categoria = botao.closest('.categoria').querySelector('.produtos');
    categoriaAtual = categoria;
    
    const modal = document.getElementById('form-modal');
    modal.classList.remove('hidden', 'saindo');
    modal.classList.add('entrando');
}

function CloseForm() {
    const modal = document.getElementById('form-modal');
    
    modal.classList.remove('entrando');
    modal.classList.add('saindo');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 400);

    limparCampos();
}

function limparCampos(){
    document.getElementById('nomeProd').value= ''
    document.getElementById('precoProd').value= ''
    document.getElementById('linkProd').value= ''
    document.getElementById('imgProd').value= ''
}

function AddProd(){
    const nome = document.getElementById('nomeProd').value;
    const preco = document.getElementById('precoProd').value;
    const link = document.getElementById('linkProd').value;
    const imagem = document.getElementById('imgProd').value;

    if (!nome || !preco || !link || !imagem){
        alert("Preencha todos os campos!!")
        return
    }

const novoItem = document.createElement('div');
novoItem.className = 'item';
novoItem.innerHTML = `
<img src=${imagem} alt"${nome}">
<div class="info">
    <h3>${nome}</h3>
    <p>Preço: <strong>${preco}</strong></p>
    <a href="${link}" target="_blank">Ver Produto"</a>
</div>
<div class="interactive">
    <div class="exclude">
        <img src="components/trash bin.svg" alt="Trash">
    </div>
    <div class="checkbox">
        <input type="checkbox" onchange="marcarComprado(this)">
    </div>
</div>
`;

categoriaAtual.appendChild(novoItem);
novoItem.querySelector('.exclude').addEventListener('click', () => {
    ExcluirProd = novoItem;
    const modal = document.getElementById('exclude-modal');
    modal.classList.remove('hidden', 'saindo');
    modal.classList.add('entrando');
});

CloseForm();
atualizarPlaceholders();
salvarDados();
}

// Excluir Produto

let ExcluirProd = null;

document.querySelectorAll('.exclude').forEach(botao=>{
    botao.addEventListener('click', () =>{
        ExcluirProd = botao.closest('.item');
        const modal = document.getElementById('exclude-modal');
        modal.classList.remove('hidden', 'saindo')
        modal.classList.add('entrando')
    })
})

function CloseExclude() {
    const modal = document.getElementById('exclude-modal');
    modal.classList.remove('entrando');
    modal.classList.add('saindo')

    setTimeout(() =>{
        modal.classList.add('hidden');
        modal.classList.remove('saindo')
    },400);
}

function ConfirmExclude(){
    if (ExcluirProd){
        ExcluirProd.remove()
        ExcluirProd = null
    }
    CloseExclude()
    atualizarPlaceholders();
    salvarDados();
}

// Atualizar PlaceHolders

function atualizarPlaceholders() {
    document.querySelectorAll('.produtos').forEach(prod => {
        const placeholder = prod.querySelector('.placeholder');
        if (!prod.querySelector('.item')) {
            if (!placeholder) {
                const msg = document.createElement('p');
                msg.classList.add('placeholder');
                msg.innerText = 'Adicione seus desejos';
                prod.appendChild(msg);
            }
        } else if (placeholder) {
            placeholder.remove();
        }
    });
}

// Criar Tabelas
function abrirModalLista() {
    const modal = document.getElementById('modal-lista');
    modal.classList.remove('hidden');
}

function fecharModalLista() {
    const modal = document.getElementById('modal-lista');
    modal.classList.add('hidden');
    document.getElementById('nomeLista').value = '';
}

function criarLista() {
    const nome = document.getElementById('nomeLista').value.trim();
    if (!nome) return;

    const nomesExistentes = Array.from(document.querySelectorAll('.categoria h2')).map(h2 => h2.textContent.trim().toLowerCase());
    if (nomesExistentes.includes(nome.toLowerCase())) {
        alert("Já existe uma lista com esse nome!");
        return;
    }

    const novaCategoria = document.createElement('div');
    novaCategoria.classList.add('categoria');
    novaCategoria.innerHTML = `
        <div class="categoria-header">
            <h2>${nome}</h2>
            <button class="add-btn" onclick="OpenForm(this)">+</button>
        </div>
        <div class="produtos">
            <p class="placeholder">Adicione seus desejos</p>
        </div>
    `;

    document.querySelector('.tabelas').appendChild(novaCategoria);
    fecharModalLista();
    salvarDados();

    document.querySelector('.welcome').style.display = 'none';

    const btnContainer = document.querySelector('.btn-container');
    btnContainer.classList.remove('hidden');
    btnContainer.classList.add('visible');
    


}

function abrirGerenciadorListas() {
    const listaUl = document.getElementById('listaCategorias');
    listaUl.innerHTML = '';
    
    document.querySelectorAll('.categoria').forEach((cat, i) => {
        const nome = cat.querySelector('h2').innerText;
        const li = document.createElement('li');
        li.innerHTML = `
            ${nome} 
            <button onclick="prepararExcluirLista(${i}, '${nome}')" class='botoes-modal del-btn'>
                Excluir
            </button>
        `;
        listaUl.appendChild(li);
    });

    document.getElementById('gerenciar-listas').classList.remove('hidden');
}

function fecharGerenciadorListas() {
    document.getElementById('gerenciar-listas').classList.add('hidden');
}

let listaParaExcluir = null;

function prepararExcluirLista(index, nome) {
    listaParaExcluir = document.querySelectorAll('.categoria')[index];
    document.querySelector('#confirmar-exclusao-lista .texto-confirmacao').innerText = `Certeza que deseja excluir "${nome}"?`;
    document.getElementById('confirmar-exclusao-lista').classList.remove('hidden');
}

function fecharConfirmacaoExcluirLista() {
    const confirm = document.getElementById('confirmar-exclusao-lista');
    confirm.classList.remove('entrando');
    confirm.classList.add('saindo');

    setTimeout(() => {
        confirm.classList.add('hidden');
        confirm.classList.remove('saindo');
        listaParaExcluir = null;
    }, 400);
}



function atualizarGerenciadorListas() {
    const listaUl = document.getElementById('listaCategorias');
    listaUl.innerHTML = '';
    
    document.querySelectorAll('.categoria').forEach((cat, i) => {
        const nome = cat.querySelector('h2').innerText;
        const li = document.createElement('li');
        li.innerHTML = `
            ${nome}
            <button onclick="prepararExcluirLista(${i}, '${nome}')" class='botoes-modal del-btn'>Excluir</button>
        `;
        listaUl.appendChild(li);
    });
}

function confirmarExcluirLista() {
    if (listaParaExcluir) {
        listaParaExcluir.remove();
        listaParaExcluir = null;
        fecharConfirmacaoExcluirLista();

        const qtdRestante = document.querySelectorAll('.categoria').length;
        if (qtdRestante === 0) {
            document.querySelector('.welcome').style.display = 'block';
        
            const btnContainer = document.querySelector('.btn-container');
            btnContainer.classList.remove('visible');
            btnContainer.classList.add('saindo');
        
            setTimeout(() => {
                btnContainer.classList.add('hidden');
                btnContainer.classList.remove('saindo');
            }, 400);
        
            fecharGerenciadorListas();
        }
        
        
    }

    atualizarGerenciadorListas();
    salvarDados();

}

// Excluir todas as listas

function confirmarExcluirTodasListas() {
    if (confirm("Tem certeza que deseja excluir TODAS as listas? Isso removerá tudo.")) {
        document.querySelectorAll('.categoria').forEach(cat => cat.remove());
        document.querySelector('.welcome').style.display = 'block';

        const btnContainer = document.querySelector('.btn-container');
        btnContainer.classList.remove('visible');
        btnContainer.classList.add('saindo');

        setTimeout(() => {
            btnContainer.classList.add('hidden');
            btnContainer.classList.remove('saindo');
        }, 400);

        fecharGerenciadorListas();
        atualizarGerenciadorListas();
        salvarDados();
    }
}


//  Salvar dados 

function salvarDados() {
    const categorias = document.querySelectorAll('.categoria');
    const dados = [];

    categorias.forEach(cat => {
        const nome = cat.querySelector('h2').innerText;
        const produtos = [];
        cat.querySelectorAll('.item').forEach(item => {
            produtos.push({
                nome: item.querySelector('h3').innerText,
                preco: item.querySelector('strong').innerText,
                link: item.querySelector('a').href,
                imagem: item.querySelector('img').src,
                comprado: item.querySelector('input[type="checkbox"]').checked
            });
        });

        dados.push({ nome, produtos });
    });

    localStorage.setItem('nexyListas', JSON.stringify(dados));
}

// Carregar dados (SEMPRE EM ÚLTIMO)

function carregarDados() {
    const dados = JSON.parse(localStorage.getItem('nexyListas'));
    if (!dados) return;

    dados.forEach(lista => {
        const novaCategoria = document.createElement('div');
        novaCategoria.classList.add('categoria');
        novaCategoria.innerHTML = `
            <div class="categoria-header">
                <h2>${lista.nome}</h2>
                <button class="add-btn" onclick="OpenForm(this)">+</button>
            </div>
            <div class="produtos">
                ${lista.produtos.length === 0 ? '<p class="placeholder">Adicione seus desejos</p>' : ''}
            </div>
        `;

        const prodContainer = novaCategoria.querySelector('.produtos');

        lista.produtos.forEach(prod => {
            const novoItem = document.createElement('div');
            novoItem.className = 'item';
            novoItem.innerHTML = `
                <img src="${prod.imagem}" alt="${prod.nome}">
                <div class="info">
                    <h3>${prod.nome}</h3>
                    <p>Preço: R$<strong>${prod.preco}</strong></p>
                    <a href="${prod.link}" target="_blank">Ver Produto</a>
                </div>
                <div class="interactive">
                    <div class="exclude">
                        <img src="components/trash bin.svg" alt="Trash">
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" ${prod.comprado ? 'checked' : ''} onchange="marcarComprado(this)">
                    </div>
                </div>
            `;

            novoItem.querySelector('.exclude').addEventListener('click', () => {
                ExcluirProd = novoItem;
                document.getElementById('exclude-modal').classList.remove('hidden', 'saindo');
                document.getElementById('exclude-modal').classList.add('entrando');
            });

            prodContainer.appendChild(novoItem);
        });

        document.querySelector('.tabelas').appendChild(novaCategoria);
    });

    // Mostrar ou esconder boas-vindas/botões
    if (dados.length > 0) {
        document.querySelector('.welcome').style.display = 'none';
        document.querySelector('.btn-container').style.display = 'flex';
    }
}

window.onload = carregarDados;
