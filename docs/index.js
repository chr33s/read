const createElement = (type, text = '') => {
  const el = document.createElement(type);
  el.innerText = text;
  return el;
};


(async () => {
  const res = await fetch('data/cache.json')
  const data = await res.json();

  const ul = document.querySelector('main ul');
  data.forEach((v) => {
    const li = createElement('li');
    const h2 = createElement('h2', v.title);
    const span = createElement('span', v.date);
    const p = createElement('p', v.content);

    li.appendChild(h2);
    li.appendChild(span);
    li.appendChild(p);

    ul.appendChild(li);
  })
})();
