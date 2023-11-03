class Contato {
    constructor(nome, telefone, email) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }

    toString() {
        return `Nome: ${this.nome}, Telefone: ${this.telefone}, Email: ${this.email}`;
    }
}

class Cliente extends Contato {
    constructor(nome, telefone, email, empresa) {
        super(nome, telefone, email);
        this.empresa = empresa;
    }

    toString() {
        return super.toString() + `, Empresa: ${this.empresa}`;
    }
}

class Amigo extends Contato {
    constructor(nome, telefone, email, dataAniversario) {
        super(nome, telefone, email);
        this.dataAniversario = dataAniversario;
    }

    toString() {
        return super.toString() + `, Data de Aniversário: ${this.dataAniversario}`;
    }
}

class ColegaDeTrabalho extends Contato {
    constructor(nome, telefone, email, departamento) {
        super(nome, telefone, email);
        this.departamento = departamento;
    }

    toString() {
        return super.toString() + `, Departamento: ${this.departamento}`;
    }
}

let contatos = [];
let contatoIndex;

function adicionarContato() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const tipoContato = document.getElementById('tipoContato').value;
    const empresa = document.getElementById('empresa').value;
    const dataAniversario = document.getElementById('dataAniversario').value;
    const departamento = document.getElementById('departamento').value;

    let contato;

    if (tipoContato === 'Cliente') {
        contato = new Cliente(nome, telefone, email, empresa);
    } else if (tipoContato === 'Amigo') {
        contato = new Amigo(nome, telefone, email, dataAniversario);
    } else if (tipoContato === 'ColegaDeTrabalho') {
        contato = new ColegaDeTrabalho(nome, telefone, email, departamento);
    } else {
        contato = new Contato(nome, telefone, email);
    }

    contatos.push(contato);
    listarContatos();
    limparCampos();
}

function listarContatos() {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    for (const [index, contato] of contatos.entries()) {
        const item = document.createElement('li');
        item.textContent = `${index + 1}: ${contato.toString()}`;
        item.addEventListener('click', () => editarContato(index));
        lista.appendChild(item);
    }
}

function editarContato(index) {
    contatoIndex = index;
    const contato = contatos[index];

    document.getElementById('editar-nome').value = contato.nome;
    document.getElementById('editar-telefone').value = contato.telefone;
    document.getElementById('editar-email').value = contato.email;
    document.getElementById('editar-tipoContato').value = contato instanceof Cliente ? 'Cliente' :
        contato instanceof Amigo ? 'Amigo' : contato instanceof ColegaDeTrabalho ? 'ColegaDeTrabalho' : 'Contato';
    document.getElementById('editar-empresa').value = contato instanceof Cliente ? contato.empresa : '';
    document.getElementById('editar-dataAniversario').value = contato instanceof Amigo ? contato.dataAniversario : '';
    document.getElementById('editar-departamento').value = contato instanceof ColegaDeTrabalho ? contato.departamento : '';

    document.getElementById('editar-form').style.display = 'block';
}

function confirmarEdicao() {
    const nome = document.getElementById('editar-nome').value;
    const telefone = document.getElementById('editar-telefone').value;
    const email = document.getElementById('editar-email').value;
    const tipoContato = document.getElementById('editar-tipoContato').value;
    const empresa = document.getElementById('editar-empresa').value;
    const dataAniversario = document.getElementById('editar-dataAniversario').value;
    const departamento = document.getElementById('editar-departamento').value;

    let contato;

    if (tipoContato === 'Cliente') {
        contato = new Cliente(nome, telefone, email, empresa);
    } else if (tipoContato === 'Amigo') {
        contato = new Amigo(nome, telefone, email, dataAniversario);
    } else if (tipoContato === 'ColegaDeTrabalho') {
        contato = new ColegaDeTrabalho(nome, telefone, email, departamento);
    } else {
        contato = new Contato(nome, telefone, email);
    }

    contatos[contatoIndex] = contato;
    listarContatos();
    limparCampos();

    document.getElementById('editar-form').style.display = 'none';
}

function cancelarEdicao() {
    document.getElementById('editar-form').style.display = 'none';
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('empresa').value = '';
    document.getElementById('dataAniversario').value = '';
    document.getElementById('departamento').value = '';
}

function pesquisarContatos() {
    const nome = document.getElementById('pesquisar-nome').value;
    const resultados = contatos.filter(contato => contato.nome.toLowerCase().includes(nome.toLowerCase()));

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    for (const [index, contato] of resultados.entries()) {
        const item = document.createElement('li');
        item.textContent = `${index + 1}: ${contato.toString()}`;
        item.addEventListener('click', () => editarContato(index));
        lista.appendChild(item);
    }
}

function excluirContato() {
    if (contatoIndex >= 0 && contatoIndex < contatos.length) {
        contatos.splice(contatoIndex, 1);
        listarContatos();
        document.getElementById('editar-form').style.display = 'none';
    }
}

document.getElementById('tipoContato').addEventListener('change', function () {
    const tipoContato = this.value;
    document.getElementById('empresa').style.display = tipoContato === 'Cliente' ? 'block' : 'none';
    document.getElementById('dataAniversario').style.display = tipoContato === 'Amigo' ? 'block' : 'none';
    document.getElementById('departamento').style.display = tipoContato === 'ColegaDeTrabalho' ? 'block' : 'none';
});        