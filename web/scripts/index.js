'use strict'

document.addEventListener('alpine:init', () => {
	Alpine.data('app', () => ({
		flag: true,
		buttonLabel: "Start !",
		winValue: "+90 kg",

		async init() {
			this.resetItems();

			console.log("Ready!");
		},

		addLoseValueInput() {
			let loseValues = this.$refs.loseValues;

			// 新しい div 要素を作成
			const newDiv = document.createElement('div');
			newDiv.classList.add('input-group', 'mb-3');

			// span 要素を作成
			const newSpan = document.createElement('span');
			newSpan.classList.add('input-group-text');
			newSpan.textContent = 'はずれ値';

			// input 要素を作成
			const newInput = document.createElement('input');
			newInput.type = 'text';
			newInput.classList.add('form-control');
			newInput.placeholder = 'ルーレットが止まらない値';

			// button 要素を作成
			const newButton = document.createElement('button');
			newButton.classList.add('btn', 'btn-danger');
			newButton.type = 'button';
			newButton.textContent = '削除';
			newButton.setAttribute("x-on:click", "deleteElement($el)");

			// div に作成した要素を追加
			newDiv.appendChild(newSpan);
			newDiv.appendChild(newInput);
			newDiv.appendChild(newButton);

			loseValues.appendChild(newDiv);
		},

		deleteElement(elem) {
			elem.parentElement.remove();
		},

		deleteLoseValues() {
			this.$refs.loseValues.innerHTML = "";
		},

		padArrayTo12Multiple(array, times) {
			const remainder = array.length % times;
			if (remainder === 0) return array; // すでに12の倍数なら変更なし

			const padCount = times - remainder;
			const paddedArray = [...array];

			for (let i = 0; i < padCount; i++) {
				paddedArray.push(array[i % array.length]);
			}

			return paddedArray;
		},

		resetItems() {
			this.$refs.roulette.innerHTML = "";	// 現在の値を削除

			let items = [...this.$refs.loseValues.getElementsByTagName("input")]
				.map(input => input.value)
				.filter(value => value.trim() !== '');
			if (items.length < 3) {
				items = this.padArrayTo12Multiple(items, 3);
				items.push(this.winValue);
			}
			else {
				items.splice(3, 0, this.winValue);
			}

			if (items.length < 12) {
				items = this.padArrayTo12Multiple(items, 12);
			}

			items = [...items, ...items];
			//console.log(items);

			for (let i = 0; i < items.length; i++) {
				const newDiv = document.createElement('div');
				newDiv.classList.add('item');
				newDiv.textContent = items[i];
				this.$refs.roulette.appendChild(newDiv);
			}
		},

		start() {
			this.resetItems();
			this.runAnimation();
		},

		runAnimation() {
			if (this.flag === true) {
				this.$refs.roulette.classList.add("roulette-animation");
				let children = this.$refs.roulette.children;
				for (let i = 0; i < children.length; i++) {
					if (i !== 3) {
						children[i].classList.add("no-target");
						continue;
					}
					children[i].classList.add("target");
				}

				this.buttonLabel = "Reset";
				this.flag = false;
			}
			else {
				this.$refs.roulette.classList.remove("roulette-animation");
				let children = this.$refs.roulette.children;
				for (let i = 0; i < children.length; i++) {
					if (i !== 3) {
						children[i].classList.remove("no-target");
						continue;
					}
					children[i].classList.remove("target");
				}

				this.buttonLabel = "Start !";
				this.flag = true;
			}
		},


	}));
})

// window.Alpine = Alpine;
// Alpine.start();

