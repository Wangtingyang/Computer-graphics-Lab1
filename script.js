const colorPicker = new iro.ColorPicker(".main-color-block", {
  width: 120,
  color: "rgb(255, 255, 255)",
  borderWidth: 1,
  borderColor: "#fff",
  activeHandleRadius: 8,
});
const btnPick = document.querySelector(".pick");
const mainSelect = document.querySelector(".main-color-select");
const color2Select = document.querySelector(".color-2");
const color3Select = document.querySelector(".color-3");
const copy2Btn = document.querySelector(".copy-2");
const copy3Btn = document.querySelector(".copy-3");
const colorText2 = document.querySelector(".color-text-2");
const colorText3 = document.querySelector(".color-text-3");
const mainBlock = document.querySelector(".main-color-block");
const color2Block = document.querySelector(".color-2-block");
const color3Block = document.querySelector(".color-3-block");
const mainInput1 = document.querySelector(".main-input-1");
const mainInput2 = document.querySelector(".main-input-2");
const mainInput3 = document.querySelector(".main-input-3");
const mainInput4 = document.querySelector(".main-input-4");
const label1 = document.querySelector(".label-1");
const label2 = document.querySelector(".label-2");
const label3 = document.querySelector(".label-3");
const label4 = document.querySelector(".label-4");
const colorPickerB = document.querySelector(".main-color-block");
let mainChange = true;
//function
function rgb2cmyk(r,g,b){
	var k = Math.min(1-(r/255),1-(g/255),1-(b/255));
	var c = (1-(r/255)-k)/(1-k);
	var m = (1-(g/255)-k)/(1-k);
	var y = (1-(b/255)-k)/(1-k);
	return "cmyk("+c.toFixed(2)+","+m.toFixed(2)+","+y.toFixed(2)+","+k.toFixed(2)+")";
};
function cmyk2rgb(c,m,y,k){
	var r = 255*(1-c)*(1-k);
	var g = 255*(1-m)*(1-k);
	var b = 255*(1-y)*(1-k);
	return "rgb"+"("+r+", "+g+", "+b+")";
};
function rgb2lab(R,G,B){
	var r = R / 255.000;
	var g = G / 255.000;
	var b = B / 255.000;
	if ( r > 0.04045 ){
		r = Math.pow(( r + 0.055 ) / 1.055, 2.4);
	} else {
		r = r / 12.92;
	}
	if ( g > 0.04045 ){
		g = Math.pow(( g + 0.055 ) / 1.055, 2.4);
	} else {
		g = g / 12.92;
	}
	if ( b > 0.04045 ){
		b = Math.pow(( b + 0.055 ) / 1.055, 2.4);
	} else {
		b = b / 12.92;
	}
	var X = r * 0.412453 + g * 0.357580 + b * 0.180423;
	var Y = r * 0.212671 + g * 0.715160 + b * 0.072169;
	var Z = r * 0.019334 + g * 0.119193 + b * 0.950227;
	// XYZ range: 0~100
	X = X * 100.000;
	Y = Y * 100.000;
	Z = Z * 100.000;
	// Reference White Point
	var ref_X = 95.047;
	var ref_Y = 100.000;
	var ref_Z = 108.883;
	X = X / ref_X;
	Y = Y / ref_Y;
	Z = Z / ref_Z;
	// Lab
	if (X > 0.008856){
		X = Math.pow(X, 1/3.000);
	} else {
		X = ( 7.787 * X ) + ( 16 / 116.000 );
	}
	if (Y > 0.008856){
		Y = Math.pow(Y, 1/3.000);
	} else {
		Y = ( 7.787 * Y ) + ( 16 / 116.000 );
	}
	if (Z > 0.008856){
		Z = Math.pow(Z, 1/3.000);
	} else {
		Z = ( 7.787 * Z ) + ( 16 / 116.000 );
	}
	var L = ( 116.000 * Y ) - 16.000;
	var A = 500.000 * ( X - Y );
	var B = 200.000 * ( Y - Z );
	return "lab"+"("+L.toFixed(2)+","+A.toFixed(2)+","+B.toFixed(2)+")";
};
function lab2rgb(L,A,B){
    var y = ( L + 16) / 116;
    var x = A / 500 + y;
    var z = y - B / 200;

    if ( Math.pow(y,3) > 0.008856 ) y = Math.pow(y,3);
    else                      y = ( y - 16 / 116 ) / 7.787;
    if ( Math.pow(x,3) > 0.008856 ) x = Math.pow(x,3);
    else                      x = ( x - 16 / 116 ) / 7.787;
    if ( Math.pow(z,3) > 0.008856 ) z = Math.pow(z,3);
    else                      z = ( z - 16 / 116 ) / 7.787;

    var X = 95.047 * x ;
    var Y = 100.000 * y  ;
    var Z = 108.883 * z ;


    x = X / 100. ;
    y = Y / 100. ;
    z = Z / 100. ;

    var r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    var g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    var b = x *  0.0557 + y * -0.2040 + z *  1.0570;

    if ( r > 0.0031308 ) r = 1.055 * Math.pow(r , ( 1 / 2.4 ))  - 0.055;
    else                     r = 12.92 * r;
    if ( g > 0.0031308 ) g = 1.055 * Math.pow(g , ( 1 / 2.4 ) )  - 0.055;
    else                     g = 12.92 * g;
    if ( b > 0.0031308 ) b = 1.055 * Math.pow( b , ( 1 / 2.4 ) ) - 0.055;
    else                     b = 12.92 * b;

    R = r * 255.;
    G = g * 255.;
    B = b * 255.;
    return "rgb"+"("+R+", "+G+", "+B+")";
};
//init set
mainInput1.value = colorPicker.color.rgb["r"];
mainInput2.value = colorPicker.color.rgb["g"];
mainInput3.value = colorPicker.color.rgb["b"];
color2Block.style.backgroundColor = colorPicker.color.rgbString;
color3Block.style.backgroundColor = colorPicker.color.rgbString;
colorText3.value = rgb2cmyk(mainInput1.value,mainInput2.value,mainInput3.value);
colorText2.value = rgb2lab(mainInput1.value,mainInput2.value,mainInput3.value);

//events
copy2Btn.addEventListener("click", () => {
	navigator.clipboard.writeText(colorText2.value);
});

copy3Btn.addEventListener("click", () => {
	navigator.clipboard.writeText(colorText3.value);
});

colorPicker.on('color:change', function(color) {
	color2Block.style.backgroundColor = colorPicker.color.rgbString;
	color3Block.style.backgroundColor = colorPicker.color.rgbString;
	var rgb = colorPicker.color.rgbString.match(/([+-]?)+\d+(\.\d+)?/g);
	var index1 = mainSelect.selectedIndex;
	switch(mainSelect.options[index1].value)
	{
		case "rgb":
			mainInput1.value = rgb[0];
			mainInput2.value = rgb[1];
			mainInput3.value = rgb[2];
		break;
		case "lab":
			var lab=rgb2lab(rgb[0],rgb[1],rgb[2]).match(/([+-]?)+\d+(\.\d+)?/g);
			mainInput1.value = lab[0];
			mainInput2.value = lab[1];
			mainInput3.value = lab[2];
		break;
		case "cmyk":
			var cmyk=rgb2cmyk(rgb[0],rgb[1],rgb[2]).match(/([+-]?)+\d+(\.\d+)?/g);
			mainInput1.value = cmyk[0];
			mainInput2.value = cmyk[1];
			mainInput3.value = cmyk[2];
			mainInput4.value = cmyk[3];
	};
	var index2 = color2Select.selectedIndex;
	switch(color2Select.options[index2].value){
		case "rgb": colorText2.value = colorPicker.color.rgbString;break;
		case "lab": colorText2.value = rgb2lab(rgb[0],rgb[1],rgb[2]);break;
		case "cmyk":colorText2.value = rgb2cmyk(rgb[0],rgb[1],rgb[2]);break;
	};
	var index3 = color3Select.selectedIndex;
	switch(color3Select.options[index3].value){
		case "rgb": colorText3.value = colorPicker.color.rgbString;break;
		case "lab": colorText3.value = rgb2lab(rgb[0],rgb[1],rgb[2]);break;
		case "cmyk":colorText3.value = rgb2cmyk(rgb[0],rgb[1],rgb[2]);break;
	};
});


btnPick.addEventListener("click", () => {
	var rgb = new Array();
	var index1 = mainSelect.selectedIndex;
	switch(mainSelect.options[index1].value)
	{
		case "rgb":
			rgb[0]=mainInput1.value;
			rgb[1]=mainInput2.value;
			rgb[2]=mainInput3.value
		break;
		case "lab":
			rgb = lab2rgb(mainInput1.value,mainInput2.value,mainInput3.value).match(/([+-]?)+\d+(\.\d+)?/g);
		break;
		case "cmyk":
			rgb = cmyk2rgb(mainInput1.value,mainInput2.value,mainInput3.value,mainInput4.value).match(/([+-]?)+\d+(\.\d+)?/g);
		break;
	};
	colorPicker.color.rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };
});

mainSelect.addEventListener("change", () => {
	var index1 = mainSelect.selectedIndex;
	switch(mainSelect.options[index1].value)
	{
		case "rgb":
			label1.innerHTML="R";
			label2.innerHTML="G";
			label3.innerHTML="B";
			label4.innerHTML="";
			mainInput4.value="";
		break;
		case "lab":
			label1.innerHTML="L";
			label2.innerHTML="A";
			label3.innerHTML="B";
			label4.innerHTML="";
			mainInput4.value="";
		break;
		case "cmyk":
			label1.innerHTML="C";
			label2.innerHTML="M";
			label3.innerHTML="Y";
			label4.innerHTML="K";
		break;
	};
	var rgb = colorPicker.color.rgbString.match(/([+-]?)+\d+(\.\d+)?/g);
	var index1 = mainSelect.selectedIndex;
	switch(mainSelect.options[index1].value)
	{
		case "rgb":
			mainInput1.value = rgb[0];
			mainInput2.value = rgb[1];
			mainInput3.value = rgb[2];
		break;
		case "lab":
			var lab=rgb2lab(rgb[0],rgb[1],rgb[2]).match(/([+-]?)+\d+(\.\d+)?/g);
			mainInput1.value = lab[0];
			mainInput2.value = lab[1];
			mainInput3.value = lab[2];
		break;
		case "cmyk":
			var cmyk=rgb2cmyk(rgb[0],rgb[1],rgb[2]).match(/([+-]?)+\d+(\.\d+)?/g);
			mainInput1.value = cmyk[0];
			mainInput2.value = cmyk[1];
			mainInput3.value = cmyk[2];
			mainInput4.value = cmyk[3];
	};
});
color2Select.addEventListener("change", () => {
	var rgb = colorPicker.color.rgbString.match(/([+-]?)+\d+(\.\d+)?/g);
	var index2 = color2Select.selectedIndex;
	switch(color2Select.options[index2].value){
		case "rgb": colorText2.value = colorPicker.color.rgbString;break;
		case "lab": colorText2.value = rgb2lab(rgb[0],rgb[1],rgb[2]);break;
		case "cmyk":colorText2.value = rgb2cmyk(rgb[0],rgb[1],rgb[2]);break;
	};
});
color3Select.addEventListener("change", () => {
	var rgb = colorPicker.color.rgbString.match(/([+-]?)+\d+(\.\d+)?/g);
	var index3 = color3Select.selectedIndex;
	switch(color3Select.options[index3].value){
		case "rgb": colorText3.value = colorPicker.color.rgbString;break;
		case "lab": colorText3.value = rgb2lab(rgb[0],rgb[1],rgb[2]);break;
		case "cmyk":colorText3.value = rgb2cmyk(rgb[0],rgb[1],rgb[2]);break;
	};
});

colorText2.addEventListener("change", () => {
	var str = colorText2.value.match(/([+-]?)+\d+(\.\d+)?/g);
	var rgb = new Array();
	var index = color2Select.selectedIndex;
	switch(color2Select.options[index].value)
	{
		case "rgb":
			rgb=str;
		break;
		case "lab":
			rgb = lab2rgb(str[0],str[1],str[2]).match(/([+-]?)+\d+(\.\d+)?/g);
		break;
		case "cmyk":
			rgb = cmyk2rgb(str[0],str[1],str[2],str[3]).match(/([+-]?)+\d+(\.\d+)?/g);
		break;
	};
	colorPicker.color.rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };
});

colorText3.addEventListener("change", () => {
	var str = colorText3.value.match(/([+-]?)+\d+(\.\d+)?/g);
	var rgb = new Array();
	var index = color3Select.selectedIndex;
	switch(color3Select.options[index].value)
	{
		case "rgb":
			rgb=str;
		break;
		case "lab":
			rgb = lab2rgb(str[0],str[1],str[2]).match(/([+-]?)+\d+(\.\d+)?/g);
		break;
		case "cmyk":
			rgb = cmyk2rgb(str[0],str[1],str[2],str[3]).match(/([+-]?)+\d+(\.\d+)?/g);
		break;
	};
	colorPicker.color.rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };
});

