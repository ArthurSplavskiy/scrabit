export const createStickyNav = () => {
	const links = document.querySelectorAll('.anchor');
	const articleContent = document.querySelectorAll('.article-content h2');

	for (let i = 0; i < articleContent.length; i++) {
		articleContent[i].setAttribute('id', 'article-title-' + i);
	}

	if ('IntersectionObserver' in window) {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 1
		};

		let intersectHandler = function (entries: any) {
			entries.forEach(function (entry: any) {
				if (entry.isIntersecting) {
					links?.forEach(function (a, idx) {
						const b = a as HTMLElement;
						if (b.innerText == entry.target.innerText) {
							a.classList.add('is-active');
						} else {
							a.classList.remove('is-active');
						}
					});
				}
			});
		};

		const observer = new IntersectionObserver(intersectHandler, options);

		articleContent.length &&
			articleContent.forEach(function (target) {
				observer.observe(target);
			});
	}
};
