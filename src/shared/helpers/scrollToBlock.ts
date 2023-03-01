export const scrollToBlock = (hash: string) => {
	if (!hash) return;
	setTimeout(() => {
		document.querySelector('#' + hash)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
		document.querySelector('.Header')?.classList.add('Header-scroll');
	}, 100);
	setTimeout(() => {
		window.scrollBy(0, -76);
	}, 900);
};
