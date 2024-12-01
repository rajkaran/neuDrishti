// convert into class.

let circularSlides = [
    {id: 'wxDailyMenu', contentType: 'html', mediaElementId: '', displayFor: 15000},
    {id: 'wxVideoMenu', contentType: 'video', mediaElementId: 'wxTossingVeg', displayFor: 10000},
    {id: 'wxDeliciousMenu', contentType: 'html', mediaElementId: '', displayFor: 15000},
    {id: 'wxSidesMenu', contentType: 'html', mediaElementId: '', displayFor: 15000},
    {id: 'wxMorningMenu', contentType: 'html', mediaElementId: '', displayFor: 15000}
];

let index = 0;
let timeoutRef;

let makeDesignEditable = document.getElementsByClassName("wx-make-design-editable");
if(makeDesignEditable.length > 0){
    circleThroughArrayOnDemand()
}
else{
    // circleThroughArray();
}

function circleThroughArray(){
    clearTimeout(timeoutRef);
    timeoutRef = setTimeout(function(){ 
        const currentIndex = index;

        if(index == (circularSlides.length - 1)){ index = 0; }
        else{ index++; }

        anime({
            targets: document.getElementById(circularSlides[currentIndex].id),
            opacity: '0',
            visibility: 'hidden',
            duration: 1000,
            easing: 'easeInOutQuad'
        });

        anime({
            targets: document.getElementById(circularSlides[index].id),
            opacity: '1',
            visibility: 'visible',
            duration: 1000,
            easing: 'easeInOutQuad',
            begin: function() {
                if(circularSlides[index].contentType == 'video'){
                    document.getElementById(circularSlides[index].mediaElementId).play();
                }
            },
        });
        circleThroughArray();
    }.bind(this), circularSlides[index].displayFor);    
}

function circleThroughArrayOnDemand(){
    let containerForButtons = document.getElementById('buttonsContainer');
    
    if(containerForButtons){
        for(let i = 0, len = circularSlides.length; i < len; i++){
            
            // preset default visibility for each slide.
            let eachSlide = document.getElementById(circularSlides[i].id);
            if(eachSlide.style.opacity == 1){
                eachSlide.style.visibility = 'visible';
            }
            else{
                eachSlide.style.visibility = 'hidden';
            }

            let eachButton = document.createElement('button');
            eachButton.innerText = ".";
            eachButton.id = 'btn'+circularSlides[i].id;
            eachButton.className = "btn btn-sm rounded-circle mx-1 wx-demo-each-btn";

            if(i == 0) eachButton.classList.add('btn-success');
            else eachButton.classList.add('btn-secondary');

            eachButton.addEventListener('click', onClickEachButton);
            containerForButtons.appendChild(eachButton);
        }
    }
}

async function onClickEachButton(event){
    const btnIndex = await in2DArray(circularSlides, 'id', event.target.id.replace('btn',''));

    if(btnIndex != index){
        let currentSlide = document.getElementById(circularSlides[index].id) // currently open
        currentSlide.style.opacity = '0';
        currentSlide.style.visibility = 'hidden';

        let currentActiveBtn = document.getElementById('btn'+circularSlides[index].id) // currently open
        currentActiveBtn.classList.remove('btn-success');
        currentActiveBtn.classList.add('btn-secondary');

        let newSlide = document.getElementById(circularSlides[btnIndex].id) // clicked on
        newSlide.style.opacity = '1';
        newSlide.style.visibility = 'visible';
        event.target.classList.remove('btn-secondary');
        event.target.classList.add('btn-success');
        
        index = btnIndex;
    }
}

async function in2DArray(haystack, key, match){
    for(let i = 0, len = haystack.length; i < len; i++){
        if(haystack[i][key] == match) return i;
    }
}