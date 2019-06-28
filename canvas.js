var canvas=document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c =canvas.getContext('2d');
/*
c.fillRect(100,100,50,50);
c.fillRect(200,500,50,50);
c.fillStyle="blue";
c.fillRect(600,400,50,50);

c.strokeStyle="red";
c.beginPath();
c.moveTo(50,200);
c.lineTo(100,300);
c.stroke();
*/
//var x=Math.random()*window.innerWidth;
//var y=Math.random()*window.innerHeight;

var mouse={
	x:undefined,
	y:undefined
}
window.addEventListener('mousemove',
	function(event){
		mouse.x=event.x;
		mouse.y=event.y;
	});
window.addEventListener('resize',
	function(){
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
	});

var colorArray=[
	'red','green','black','orange','blue','yellow',
];


function circle(x,y,x_inc,y_inc,radius)
{
	this.x=x;
	this.y=y;
	this.x_inc=x_inc;
	this.y_inc=y_inc;
	this.r=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.min=radius;
	this.draw=function()
	{
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		c.fillStyle=this.color;
		c.fill();
	}
	this.update=function()
	{
		if(this.x>innerWidth-this.r)
			this.x_inc-=1;
		if(this.x<this.r)
			this.x_inc+=1;
		if(this.y>innerHeight-this.r)
			this.y_inc-=1;
		if(this.y<this.r)
			this.y_inc+=1;

		this.x+=this.x_inc;
		this.y+=this.y_inc;

		//mouse event
		if(mouse.x-this.x < 50 &&mouse.x-this.x >-50 &&mouse.y-this.y < 50 &&mouse.y-this.y >-50 ){
			if(this.r<50)this.r+=1;
		}
		else if(this.r>this.min){
			this.r-=1;
		}

		this.draw();
	}
}

var circleArray=[];
console.log(canvas);
function init(){
	circleArray=[];
for(var i=0;i<1000;i++)
{
	var x=Math.random()*(innerWidth-radius*2)+radius;x_inc=(Math.random()-0.5);
	var y=Math.random()*(innerHeight-radius*2)+radius;y_inc=(Math.random()-0.5) ;
	var radius=Math.random()*5+1;
	 circleArray.push(new circle(x,y,x_inc,y_inc,radius));
}
}
function animate() {
	requestAnimationFrame(animate);//making frames
	c.clearRect(0,0,innerWidth,innerHeight);//clear canvas

	for(var i=0;i<1000;i++)
	circleArray[i].update();
}
init();
animate();
