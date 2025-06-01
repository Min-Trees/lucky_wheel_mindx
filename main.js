(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 7000; // 7 seconds
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');

	//=====< List of prizes >=====
	const listGift = [

		{
			text: 'Kẹo',
			percent: 20 / 100,
		},
		{
			text: 'Vòng tay',
			percent: 5 / 100,
		},
		{
			text: 'Móc khóa',
			percent: 5 / 100,
		},

        {
			text: 'Thạch Phô Mai',
			percent: 5 / 100,
		},
        {
			text: 'Bánh Gạo',
			percent: 25 / 100,
		},
        {
			text: 'Bánh xốp phô mai',
			percent: 10 / 100,
		},
        {
			text: 'Quạt MindX',
			percent: 10 / 100,
		},
		{
			text: 'Thạch bút chì',
			percent: 10/100,
		},
        {
			text: 'Túi Canvas Handmade',
			percent: 5 / 100,
		},
        {
			text: 'Quạt Handmade',
			percent: 5 / 100,
		},
        {
			text: 'Xếp hình rubik 3D',
			percent: 5 / 100,
		},
		{
			text: 'Bàn phím',
			percent: 0 / 100,
		},
		{
			text: 'Chuột',
			percent: 0 / 100,
		},
		{
			text: 'Balo',
			percent: 0 / 100,
		},
        {
			text: 'Bình Giữ nhiệt ',
			percent: 0 / 100,
		},
        {
			text: 'Hộp bút',
			percent: 0 / 100,
			
		},
	];

	//=====< Number of prizes >=====
	const size = listGift.length;

	//=====< Angle for each prize segment >=====
	const rotate = 360 / size;

	//=====< Skew angle for segments >=====
	const skewY = 90 - rotate;

	listGift.map((item, index) => {
		//=====< Create li element >=====
		const elm = document.createElement('li');

		//=====< Rotate and skew li elements >=====
		elm.style.transform = `rotate(${
			rotate * index
		}deg) skewY(-${skewY}deg)`;

		//=====< Alternate background colors and center text >=====
		if (index % 2 == 0) {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-1">
			<b>${item.text}</b>
		</p>`;
		} else {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-2">
		<b>${item.text}</b>
		</p>`;
		}

		//=====< Append to ul >=====
		wheel.appendChild(elm);
	});

	/********** Start function **********/
	const start = () => {
		if (isRotating) return;
		showMsg.innerHTML = '';
		isRotating = true;
		btnWheel.disabled = true; // Disable button during spin

		//=====< Generate random number 0 to 1 >=====
		const random = Math.random();

		//=====< Get prize >=====
		const gift = getGift(random);

		//=====< Calculate rotation: add 10 full rotations >=====
		currentRotate += 360 * 10;

		//=====< Rotate wheel >=====
		rotateWheel(currentRotate, gift.index);

		//=====< Show prize >=====
		showGift(gift);
	};

	/********** Rotate wheel function **********/
	const rotateWheel = (currentRotate, index) => {
		wheel.style.transition = `transform ${timeRotate}ms cubic-bezier(0.075, 0.8, 0.2, 1)`;
		wheel.style.transform = `rotate(${
			currentRotate - index * rotate - rotate / 2
		}deg)`;

		// Reset transition after it completes
		setTimeout(() => {
			wheel.style.transition = 'none';
			isRotating = false;
			btnWheel.disabled = false; // Re-enable button
		}, timeRotate);
	};

	/********** Get prize function **********/
	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			//=====< Accumulate prize percentages >=====
			currentPercent += item.percent;

			//=====< Add prize to list if random number is within current percentage >=====
			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});

		//=====< Return first prize in list or random prize as fallback >=====
		return list[0] || listGift[Math.floor(Math.random() * listGift.length)];
	};

	/********** Show prize function **********/
	const showGift = gift => {
		setTimeout(() => {
			showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
		}, timeRotate);
	};

	/********** Button click event **********/
	btnWheel.addEventListener('click', () => {
		start();
	});
})();