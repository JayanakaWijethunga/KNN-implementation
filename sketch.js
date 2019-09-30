
let knn;
let extractedFeatures;
let capturedVideo;
let ShowResult;
let ClassificationReady=false;


function setup(){

	//use p5 library to capture video from webcam

	createCanvas(640,480);
	capturedVideo=createCapture(VIDEO);
	capturedVideo.hide();

	//this featureExtractor which includes in ml5 libaray is used to load mobilenet feature extractor to this project

	extractedFeatures=ml5.featureExtractor('MobileNet',ModelReady);

	//this KNNClassifier() in ml5 helps to works with KNN classification in this project

	knn=ml5.KNNClassifier();


	ShowResult=createP("Need Training Data!");
	ShowResult.style('font-size','32pt');
}

function StartClassification(){

	//capture the logits of current frame of the video and store in logits constant

	const logist=extractedFeatures.infer(capturedVideo); 

	//classify the current frame
	knn.classify(logist,function(error,res){

		if(error){
	
			console.log(error);
	
	
		}else{
			ShowResult.html(res.label);
			
			StartClassification();
		}
	
	});

}


function keyTyped(){

	const logist=extractedFeatures.infer(capturedVideo);

	//to get the current logits in a tensor form we can use logist.dataSync() 

	if(key == "l"){
		console.log("Left");

		//add the logits of current frame to the relevent categry store

		knn.addExample(logist,"Left");
		
	}else if(key == "r"){
		console.log("Right");
		knn.addExample(logist,"Right");
		
	}else if(key == "u"){
		console.log("Up");
		knn.addExample(logist,"Up");
		
	}else if(key == "d"){
		console.log("Down");
		knn.addExample(logist,"Down");
		
	}
	else if(key == "s"){
		console.log("Save");
		save(knn,"model.json");
		
	}		

}

function ModelReady(){

console.log("Model is Loaded and Ready!");

}

function draw(){

image(capturedVideo,0,0);

//if there is any trained data just start the clasification
if(!ClassificationReady && knn.getNumLabels()>0){

	StartClassification();
	ClassificationReady=true;
}

}

