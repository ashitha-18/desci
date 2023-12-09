import React, { useState } from 'react';
import first from "../images/first.jpeg";
import colour from "../images/colour.jpeg";
import monkey from "../images/monkey.jpeg";
import arrow from "../images/arrow.png";
import './quiz.css';

const Quiz = () => {
    const [ans, setAns] = useState(0);
    const [color, setColor] = useState('');
    const [result, setResult] = useState('');
    const [freeTimeActivities, setFreeTimeActivities] = useState([]); 
    const [personalityValue, setPersonalityValue] = useState(10);
    const [showResult, setShowResult] = useState(false);


    const handleColorClick = (colorValue) => { 
        setColor(colorValue);
    };

   
    const handleFreeTimeCheckbox = (activity) => { 
        const updatedActivities = [...freeTimeActivities];

        // Check if the activity is already selected
        const index = updatedActivities.indexOf(activity);

        if (index === -1) {
            updatedActivities.push(activity);
        } else {
            updatedActivities.splice(index, 1);
        }

        setFreeTimeActivities(updatedActivities);
    };

    const handleSubmit = () => {
        // Calculate the result based on color and free time activities
        setShowResult(true);
        const activityScores = {
            'jog': 10,
            'catchUp': 8,
            'art': 2,
            'skill': 3,
            'nap': 0
        };

        const activityScore = freeTimeActivities.reduce((totalScore, activity) => {
            return totalScore + activityScores[activity];
        }, 0);

        setAns(color ? activityScore + parseInt(color) + personalityValue : activityScore);
        console.log("new " + ans);
        const animalData = determineAnimal(ans);
        console.log(animalData.animal);
        setResult(
            <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-4 text-black">Result</h1>
    <section className="text-center text-black">
      <p>After crunching the numbers, you are a...</p>
      <div className="w-32 h-32 rounded-full overflow-hidden mt-4 left-195">
        <img
          className="w-full h-full object-cover"
          src={animalData.imageSrc}
          alt={animalData.imageSrc}
        />
      </div>
      <h1 className="text-xl  text-black font-bold mt-4">{animalData.animal}</h1>
      <p className="mt-2 text-black">{animalData.description}</p>
    </section>
  </div>
        );
    };
    const determineAnimal = (ans) => {
        if (ans <= 10) {
            return { animal: 'Rabbit', imageSrc: 'https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', description: 'You are calm and peaceful ! Like to keep things organised ! Artistic person' };
        } else if (ans > 10 && ans <= 20) {
            return { animal: 'Meerkat', imageSrc: 'https://images.pexels.com/photos/1454786/pexels-photo-1454786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', description: 'You are selfless and caring ! little anxious and introvert' };
        } else if (ans > 20 && ans <= 30) {
            return { animal: 'Fox', imageSrc: 'https://images.pexels.com/photos/4934920/pexels-photo-4934920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', description: 'You are mischievous, skilful and self-assured' };
        } else if (ans > 30 && ans <= 36) {
            return { animal: 'Bear', imageSrc: 'https://images.pexels.com/photos/1466592/pexels-photo-1466592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', description: 'You are empathetic but a little fearful' };
        } else if (ans > 36 && ans <= 50) {
            return { animal: 'Lion', imageSrc: 'https://images.pexels.com/photos/5306143/pexels-photo-5306143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', description: 'You can be a great Leader ! Fearless and Brave' };
        }
    };

    const handlePersonalityChange = (event) => {
        setPersonalityValue(parseInt(event.target.value));
        console.log(personalityValue);
    };


    return (
    < div className='quizdiv relative p-8 absolute inset-0 top-45 flex items-center justify-center '> 
    <div>
    <article >
        <div
        className="w-full h-auto bg-contain bg-no-repeat bg-center relative p-8 absolute inset-0 top-44 flex items-center justify-center"
        style={{ backgroundImage: `url(${first})`, minHeight: '100vh'}}
        >
          <div
        className="w-full h-auto bg-contain bg-no-repeat bg-center relative p-8 absolute inset-0 top-44 flex items-center justify-center"
        style={{ backgroundImage: `url(${arrow})`, minHeight: '100vh'}}
        ></div>
        </div>
</article>
        <article  id="colorSection">
        <div
        className="w-full h-auto bg-contain bg-no-repeat bg-center relative p-8 absolute inset-0 top-44"
        id='maincolour'
        style={{ backgroundImage: `url(${colour})`, minHeight: '100vh'}}
        >
        <div className="mt-12 flex flex-wrap justify-center items-center space-x-1" style={{position: 'relative', top: '145px'}}>
            <div className="space-x-4">
                <label className="colorBlockSelection red">
                    <input
                        type="radio"
                        id="red"
                        name="color"
                        value="5"
                        onClick={() => handleColorClick(5)}
                        className="hidden"
                    />
                    <span className="radio-custom"></span>
                    <p className="text-red-600 font-bold">red</p>
                </label>
                <label className="colorBlockSelection blue">
                    <input
                        type="radio"
                        id="blue"
                        name="color"
                        value="2"
                        onClick={() => handleColorClick(5)}
                        className="hidden"
                    />
                    <span className="radio-custom"></span>
                    <p className="text-blue-600 font-bold">blue</p>
                </label>
                <label className="colorBlockSelection green">
                    <input
                        type="radio"
                        id="green"
                        name="color"
                        value="3"
                        onClick={() => handleColorClick(5)}
                        className="hidden"
                    />
                    <span className="radio-custom"></span>
                    <p className="text-green-600 font-bold">green</p>
                </label>
            </div>
            <div className="space-x-4">
                <label className="colorBlockSelection purple">
                    <input
                        type="radio"
                        id="purple"
                        name="color"
                        value="2"
                        onClick={() => handleColorClick(5)}
                        className="hidden"
                    />
                    <span className="radio-custom"></span>
                    <p className="text-purple-600 font-bold">purple</p>
                </label>
                <label className="colorBlockSelection yellow">
                    <input
                        type="radio"
                        id="yellow"
                        name="color"
                        value="4"
                        onClick={() => handleColorClick(5)}
                        className="hidden"
                    />
                    <span className="radio-custom"></span>
                    <p className="text-yellow-600 font-bold">yellow</p>
                </label>
                <label className="colorBlockSelection orange">
                    <input
                        type="radio"
                        id="orange"
                        name="color"
                        value="5"
                        onClick={() => handleColorClick(5)}
                        className="hidden"
                    />
                    <span className="radio-custom"></span>
                    <p className="text-orange-600 font-bold">orange</p>
                </label>
            </div>
        </div>
    </div>
</article>


<article className="mt-64 lg:mt-5 mx-auto lg: relative">
  <div
    className="w-full h-auto bg-contain bg-no-repeat bg-center relative p-0 text-center"
    style={{ backgroundImage: `url(${monkey})`, minHeight: '100vh', lg: { top: '10vh', marginTop: '0' } }}
  >
    <div className="absolute inset-0 flex top-52 left-28">
      <h1 className="text-lg mt-3 sm:text-xl lg:text-2xl font-bold text-gray-700">What do you like to do in your free time?</h1>
    </div>


    <div className="text-center absolute inset-0 top-300">
  <form action="index.html" method="post" className="space-y-4">
    <label className="block text-base lg:text-lg timeOption">
      <input
        type="checkbox"
        id="jog"
        name="time"
        value="jog"
        onChange={() => handleFreeTimeCheckbox('jog')}
        className="hidden"
      />
      <span className="radio2"></span>
      <span className="text-gray-700 cursor-pointer ml-2">A jog in the park</span>
    </label>

    <label className="block text-base lg:text-lg timeOption">
      <input
        type="checkbox"
        id="catchUp"
        name="time"
        value="catchUp"
        onChange={() => handleFreeTimeCheckbox('catchUp')}
        className="hidden"
      />
      <span className="text-gray-700 cursor-pointer ml-2">Catching up with friends</span>
    </label>

    <label className="block text-base lg:text-lg timeOption">
      <input
        type="checkbox"
        id="art"
        name="time"
        value="art"
        onChange={() => handleFreeTimeCheckbox('art')}
        className="hidden"
      />
      <span className="text-gray-700 cursor-pointer ml-2">Creating art</span>
    </label>

    <label className="block text-base lg:text-lg timeOption">
      <input
        type="checkbox"
        id="skill"
        name="time"
        value="skill"
        onChange={() => handleFreeTimeCheckbox('skill')}
        className="hidden"
      />
      <span className="text-gray-700 cursor-pointer ml-2">Learning a new skill</span>
    </label>

    <label className="block text-base lg:text-lg timeOption">
      <input
        type="checkbox"
        id="nap"
        name="time"
        value="nap"
        onChange={() => handleFreeTimeCheckbox('nap')}
        className="hidden"
      />
      <span className="text-gray-700 cursor-pointer ml-2">Taking a nap</span>
    </label>
  </form>

    </div>
    </div>
</article>



<article className="mt-0 lg:mt-20 mx-auto lg:relative">
  <div
    className="absolute inset-0 w-full h-auto bg-contain top-9 mt-0 bg-no-repeat bg-center"
    style={{ backgroundImage: `url(${monkey})`, minHeight: '100vh' }}
  >
    <div className="absolute inset-0 flex top-44 left-44">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700">What is your personality ?</h1>
    </div>

<div className="text-center absolute inset-0 top-300 h-8">
  <form action="index.html" method="post">
    <input
      type="range"
      min="0"
      max="20"
      value={personalityValue}
      onChange={handlePersonalityChange}
      className="w-100"
      style={{ maxWidth: '400px' }}
    />

    <div className="flex justify-between mt-2">
    <p className="introvert-label bg-black text-white p-2 rounded-lg ml-14">Introvert</p>
    <p className="extrovert-label bg-black text-white p-2 rounded-lg mr-14">Extrovert</p>
    </div>
  </form>

<div className="text-center mt-12">
  <a href="#resArrow">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSubmit}>
      Submit
    </button>
  </a>
</div>
</div>
</div>
</article>
{showResult && (
<article className="mt-40 lg:mt-40 mx-auto lg:relative">
  <div
    className="absolute inset-0 w-full h-auto bg-contain top-9 mt-0 bg-no-repeat bg-center"
    style={{ backgroundImage: `url(${monkey})`, minHeight: '100vh' }}
  >
  <div className="result ">
    {result}
  </div></div>
</article>)}

</div>
</div>

    );
}

export default Quiz;
