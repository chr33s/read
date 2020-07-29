const createElement = (type, text = '') => {
  const el = document.createElement(type);
  el.innerText = text;
  return el;
};

(async () => {
  const res = await fetch('data/cache.json')
  const data = await res.json();

  let read = JSON.parse(window.localStorage.getItem('read')) || [];

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

      if (!read.includes(v.url)) {
        read.push(v.url);
        a.classList.add('read');
      } else {
        read = read.filter((url) => url !== v.url);
        a.classList.remove('read');
      }
      window.localStorage.setItem('read', JSON.stringify(read));
    }
    a.onclick = onclick;
    a.ondblclick = (e) => {
      onclick(e);

      window.open(v.url);
    }

    li.appendChild(a);

    ul.appendChild(li);
  });

  const toggle = document.querySelector('header a');
  toggle.onclick = (e) => {
    e.preventDefault();

    if (toggle.innerHTML !== 'unread') {
      toggle.href = '#unread';
      toggle.innerHTML = 'unread';
    } else {
      toggle.href = '#all';
      toggle.innerHTML = 'all';
    }
    ul.classList.toggle('unread');
  }
})();
