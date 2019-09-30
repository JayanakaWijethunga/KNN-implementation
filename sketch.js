
let extractedFeatures;
let capturedVideo;



function setup(){

	//use p5 library to capture video from webcam

	createCanvas(640,480);
	capturedVideo=createCapture(VIDEO);
	capturedVideo.hide();

	//this featureExtractor which includes in ml5 libaray is used to load mobilenet feature extractor to this project

	extractedFeatures=ml5.featureExtractor('MobileNet',ModelReady);


}

function mousePressed(){

 const getLogits = extractedFeatures.infer(capturedVideo);
 console.log(getLogits.dataSync());

}

function ModelReady(){

console.log("Model is Loaded and Ready!");

}

function draw(){

image(capturedVideo,0,0);



}

