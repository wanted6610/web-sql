table = document.getElementById('base-table');
table.addEventListener('input', ResultFilter);

function ResultFilter(ev) {
  let select = [...table.querySelectorAll('tr:not(.search-visibility)')];
  let aSearch = [...table.querySelectorAll('th > input')];

  select.filter(function (el) {
    if (el.children[0].textContent.search(new RegExp(`${aSearch[0].value}`, 'i')) < 0) {
      el.style.display = 'none';
      return false;
    } else {
      return true;
    }
  }).filter(function (el) {
    if (el.children[1].textContent.search(new RegExp(`${aSearch[1].value}`, 'i')) < 0) {
      el.style.display = 'none';
      return false;
    } else {
      return true;
    }
  })
    .filter(function (el) {
      if (el.children[2].textContent.search(new RegExp(`${aSearch[2].value}`, 'i')) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        return true;
      }
    })
    .filter(function (el) {
      if (el.children[3].textContent.search(new RegExp(`${aSearch[3].value}`, 'i')) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        return true;
      }
    })
    .filter(function (el) {
      if (el.children[4].textContent.search(new RegExp(`${aSearch[4].value}`, 'i')) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        return true;
      }
    })
    .filter(function (el) {
      if (el.children[5].textContent.search(new RegExp(`${aSearch[5].value}`, 'i')) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        return true;
      }
    }).filter(function (el) {
      if (el.children[6].textContent.search(new RegExp(`${aSearch[6].value}`, 'i')) < 0) {
        el.style.display = 'none';
        return false;
      } else {
        el.style.display = '';
        return true;
      }
    });
}