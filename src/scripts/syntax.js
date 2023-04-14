
console.log('inside syntax js');
const main = document.querySelector('main');
const fragment = document.createDocumentFragment();
const buildDiv = (n) => {
	const div = document.createElement('div');
	div.innerHTML = `${n}`;
	div.style = `background-color: var(--color-${n})`;
	fragment.appendChild(div);
};
Array.from({ length: 34 }, (_, i) => buildDiv(i));
main.appendChild(fragment);
/* show bg color property on hover */
const btn = document.getElementById('show');
let isPropertyVisible = false;
btn.addEventListener('click', () => {
	isPropertyVisible = !isPropertyVisible;
	btn.textContent = isPropertyVisible ? 'hide' : 'show';
	const divList = document.querySelectorAll('div');
	if(isPropertyVisible) {
		const style = getComputedStyle(document.body);
		divList.forEach((div, i) => {
			const bg = style.getPropertyValue(`--color-${i}`);
			const propertyDetail = isPropertyVisible ? `<em>${bg}</em>`: ``;
			div.insertAdjacentHTML('beforeend', propertyDetail);
		});		
	} else {
		divList.forEach( (div, i) => div.innerHTML = i );
	}
});