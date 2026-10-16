(function () {
	var root = document.documentElement;

	function stored(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
	function store(key, value) { try { localStorage.setItem(key, value); } catch (e) { } }

	var saved = stored('luainkernel-theme');
	if (saved) root.setAttribute('data-theme', saved);

	var theme = document.getElementById('theme');
	if (theme) theme.addEventListener('click', function () {
		var dark = root.getAttribute('data-theme') === 'dark' ||
			(!root.hasAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
		var next = dark ? 'light' : 'dark';
		root.setAttribute('data-theme', next);
		store('luainkernel-theme', next);
	});

	var input = document.getElementById('q');
	if (!input) return;
	var cards = document.querySelectorAll('.card');
	var groups = document.querySelectorAll('section[data-group]');

	input.addEventListener('input', function () {
		var q = input.value.trim().toLowerCase();

		cards.forEach(function (c) {
			c.classList.toggle('hidden', q !== '' && c.textContent.toLowerCase().indexOf(q) < 0);
		});

		groups.forEach(function (g) {
			var any = g.querySelector('.card:not(.hidden)') !== null;
			g.classList.toggle('hidden', !any);
		});
	});
})();
