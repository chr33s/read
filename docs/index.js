const createElement = (type, text = '') => {
  const el = document.createElement(type);
  el.innerText = text;
  return el;
};

(async () => {
  const res = await fetch('data/cache.json')
  const data = await res.json();

  const read = JSON.parse(window.localStorage.getItem('read')) || [];

  const ul = document.querySelector('main ul');
  data.forEach((v) => {
    const li = createElement('li');
    const a = createElement('a');
    const h2 = createElement('h2', v.title);
    const span = createElement('span', v.date);
    const p = createElement('p', v.content);

    a.appendChild(h2);
    a.appendChild(span);
    a.appendChild(p);
    if (read.includes(v.url)) {
      a.classList.add('read');
    }
    const onclick = (e) => {
      e.preventDefault();

      read.push(v.url);
      window.localStorage.setItem('read', JSON.stringify(read));
      a.classList.add('read');
    }

    a.onclick = onclick;
    a.ondblclick = (e) => {
      onclick(e);

      window.open(v.url);
    }

    li.appendChild(a);

    ul.appendChild(li);
  })
})();
