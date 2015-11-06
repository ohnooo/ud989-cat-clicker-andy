
//*********** Data sets ***********//
var model = {
	'currentCat': null,
	'cats':[
		{
			'clickCount': 0,
			'name': 'Timmy',
			'imgSrc': 'cat_picture1.jpg',
			'imgAttribution': 'cat_picture1.jpg'
		},
		{
			'clickCount': 0,
			'name': 'Tom',
			'imgSrc': 'cat_picture2.jpg',
			'imgAttribution': 'cat_picture2.jpg'
		},
		{
			'clickCount': 0,
			'name': 'Sevo',
			'imgSrc': 'cat_picture3.jpg',
			'imgAttribution': 'cat_picture3.jpg'
		},
		{
			'clickCount': 0,
			'name': 'Steven',
			'imgSrc': 'cat_picture4.jpg',
			'imgAttribution': 'cat_picture4.jpg'
		},
		{
			'clickCount': 0,
			'name': 'stevy',
			'imgSrc': 'cat_picture1.jpg',
			'imgAttribution': 'cat_picture1.jpg'
		}
	]
};

//*********** Controller / Helper ***********//
var controller = {

	init: function(){
		// set default cat
		model.currentCat = model.cats[0];

		// set a new variable to easy access
		this.currentCat = model.currentCat;

		// Hide admin
		$('#admin-panel').hide();
		viewCatList.init();
		viewCat.init();
		viewAdmin.init();

	},

	getCats: function(){
		//console.log(model.cats);
		return model.cats;
	},

	setCurrentCat: function(selectedCat){
		// code goes here
		this.currentCat = selectedCat;
	},

	getCurrentCat: function(){
		return this.currentCat;
	},
	clickIncrement: function(){
		this.currentCat.clickCount++;
		viewCat.render();
	},
	setValue: function(name, url, count){
		this.currentCat.name=name;
		this.currentCat.imgSrc = url;
		this.currentCat.clickCount = count;
		viewCat.render();
	}

};

//*********** VIEW ***********//

var viewCatList = {
	init: function(){
		// store dom element for easy access later
		this.catList = $('.catList');

		this.render();
	},

	// render this view
	render: function(){
		// cat - get array of cats
		// elem - html elem
		// i - for loop
		var cat, elem, i;

		// get all cats
		var cats = controller.getCats();

		for(i=0; i<cats.length; i++){
			// put cats array in a cat variable
			cat = cats[i];

			// create html element
			elem = document.createElement('li');
			// li content set to cat's name
			elem.textContent = cat.name;

			// Create closure: instantly return cat index.
			elem.addEventListener('click', (function(catCopy){
				return function(){
					// this will indicate instantly which one is clicked
					//onsole.log(catCopy);
					controller.setCurrentCat(catCopy);

					// catView should render
					viewCat.render();
					viewAdmin.loadContent();
				}
			})(cat));

		this.catList.append(elem);

		};

	}// render
};

var viewCat = {
	init: function(){

		// get DOM element for easy access
		this.cat = $('.cat');
		this.catName = $('.catName');
		this.catCount = $('#catCount');
		this.catImg = $('img');

		// addEventListener
		$(this.catImg).on('click', function(){
			controller.clickIncrement();
		});

		this.render();

	},

	render: function(){

		var currentCat = controller.getCurrentCat();
		// Test Object
		// console.log('currentCat: ' + currentCat);
		// console.log('currentCat-clicks: ' + currentCat.clickCount);
		// console.log(this.catName);

		$(this.catName).text(currentCat.name);
		$(this.catCount).text(currentCat.clickCount);
		$(this.catImg).attr("src", currentCat.imgSrc);

	}

};

var viewAdmin ={
	init: function(){

		// set variable
		// Jquery elem variable
		this.name = $('input:text[name=name]');
		this.imgUrl = $('input:text[name=imgUrl]');
		this.clickCount = $('input:text[name=clickCount]');

		// set value <-- ............this should be set in the controller......
		this.loadContent();


		console.log('viewAdmin Initicated');
		$('#btnAdmin').click(function(e){
			e.preventDefault();
			//console.log('admin clicked');
			$('#admin-panel').show('slow');
		});

		// show admin panel
		$('#btnAdminCancel').click(function(e){
			e.preventDefault();
			$('#admin-panel').hide('slow');
			this.update();
		});

		// submit button
		$('#btnAdminSubmit').click(function(e){
			e.preventDefault();
			// get value
			var nameInputVal = $name.val();
			var imgUrlInputVal = $imgUrl.val();
			var clickInputVal = $clickCount.val();

			controller.setValue(nameInputVal, imgUrlInputVal, clickInputVal);
			// pass value to controller to get process
			// someFunction();
			// make sure the change the data of the currentcat

		});

	},
	loadContent: function(){
		var currentCat = controller.getCurrentCat();

		this.name.val(currentCat.name);
		this.imgUrl.val(currentCat.imgSrc);
		this.clickCount.val(currentCat.clickCount);

	}
};

// execute

controller.init();

/*

var cats = $(".cat");
var buttons = $("button");

function hideAllCats(){
	for (var i=0; i<cats.length; i++){
		$(cats[i]).hide();
	}
}

function bindButtonToCat(idNumber){
	$("#button"+idNumber).click(function(){
		hideAllCats();
		$("#cat"+idNumber).show();
	})
}

function bindCounterToCat(idNumber){
	var cat = "#cat"+idNumber
	$(cat).click(function(){
		var count = $(cat+" > .counter").text();
		count = parseInt(count) + 1;
		$(cat+" > .counter").text(count);
	})
}

for (var i=1; i<=buttons.length; i++){
	bindButtonToCat(i);
}

for (var i=1; i<=cats.length; i++){
	bindCounterToCat(i);
}

hideAllCats();
$("#cat1").show();

*/