// Troque pelo número real, formato: 55 + DDD + número
var TELEFONE = '5562996703535';

var formEl = document.getElementById('form');
if (formEl) {
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var texto =
      'Olá, gostaria de agendar uma consulta.\n\n' +
      'Nome: ' + document.getElementById('nome').value + '\n' +
      'Telefone: ' + document.getElementById('tel').value + '\n\n' +
      document.getElementById('msg').value;
    window.open('https://wa.me/' + TELEFONE + '?text=' + encodeURIComponent(texto), '_blank');
  });
}

var LOBOS = {
  fe: {
    nome: 'Lobo frontal esquerdo',
    texto: 'Controla a linguagem, o movimento do lado direito do corpo, o raciocínio lógico e o planejamento.',
    proc: ['Estimulação cerebral profunda (DBS)', 'Ressecção de tumores'],
    cond: ['Epilepsia frontal', 'Tumores cerebrais']
  },
  fd: {
    nome: 'Lobo frontal direito',
    texto: 'Responsável pela criatividade, pelas emoções, pelo movimento do lado esquerdo do corpo e pelas funções executivas.',
    proc: ['Mapeamento funcional', 'Craniotomia acordada'],
    cond: ['Tumores frontais', 'Epilepsia']
  },
  pe: {
    nome: 'Lobo parietal esquerdo',
    texto: 'Processa as sensações do lado direito do corpo, os cálculos matemáticos e a percepção espacial.',
    proc: ['Ressecção de lesões', 'Estimulação cortical'],
    cond: ['Dor neuropática', 'Tumores parietais']
  },
  pd: {
    nome: 'Lobo parietal direito',
    texto: 'Integra informações sensoriais, a consciência do próprio corpo e a atenção espacial.',
    proc: ['Mapeamento cortical', 'Ressecção guiada por imagem'],
    cond: ['Negligência hemiespacial', 'Tumores']
  },
  oe: {
    nome: 'Lobo occipital esquerdo',
    texto: 'Processa as informações visuais do campo visual direito.',
    proc: ['Ressecção de tumores occipitais', 'Estimulação visual cortical'],
    cond: ['Tumores occipitais', 'Epilepsia occipital']
  },
  od: {
    nome: 'Lobo occipital direito',
    texto: 'Processa as informações visuais do campo visual esquerdo.',
    proc: ['Microcirurgia', 'Radiocirurgia estereotáxica'],
    cond: ['Malformações arteriovenosas', 'Tumores']
  }
};

(function () {
  var svg = document.querySelector('.lobes');
  if (!svg) return;

  var areas = svg.querySelectorAll('.lobe');
  var selecionado = 'fe';

  function chips(el, itens) {
    if (!el) return;
    el.innerHTML = '';
    itens.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      el.appendChild(li);
    });
  }

  function mostrar(id) {
    var d = LOBOS[id];
    if (!d) return;

    var pTitulo = document.getElementById('pTitulo');
    var pTexto = document.getElementById('pTexto');
    var pProc = document.getElementById('pProc');
    var pCond = document.getElementById('pCond');

    if (pTitulo) pTitulo.textContent = d.nome;
    if (pTexto) pTexto.textContent = d.texto;
    if (pProc) chips(pProc, d.proc);
    if (pCond) chips(pCond, d.cond);

    areas.forEach(function (a) {
      a.classList.toggle('on', a.dataset.lobo === id);
    });
  }

  areas.forEach(function (a) {
    var id = a.dataset.lobo;
    a.addEventListener('mouseenter', function () { mostrar(id); });
    a.addEventListener('focus', function () { selecionado = id; mostrar(id); });
    a.addEventListener('click', function () { selecionado = id; mostrar(id); });
    a.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selecionado = id; mostrar(id); }
    });
  });

  svg.addEventListener('mouseleave', function () { mostrar(selecionado); });

  mostrar(selecionado);
})();
