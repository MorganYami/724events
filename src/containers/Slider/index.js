import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { displayMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    const byDateDesc = data?.focus?.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    ) || [];
    const timeoutId = useRef(null);
    const nextCard = () => {
        //corrected index: length-1
        setIndex((prevIndex) => (prevIndex === byDateDesc.length - 1 ? 0 : prevIndex + 1));
    };
    //added fonction for the radio buttons
    useEffect(() => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            nextCard();
        }, 5000);
    }, [index]);

    const handleRadioChange = (currentIndex) => {
        setIndex(currentIndex);
    };

    return (
        //line 38:using id in place of title : '{event.title}' => '{event.id}' 
        //line 5'3'+ : Corrected to use event : 'byDateDesc.map((_, radioIdx)' => 'byDateDesc.map((event, radioIdx)'
        //line 60: added onChange for radio buttons
        <div className="SlideCardList" data-testid="slider-testid">
            {byDateDesc.map((event, idx) => (
                <div
                    data-testid="slide-card-testid"
                    key={event.id}
                    className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
                        }`}
                >
                    <img src={event.cover} alt="forum" />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div>{displayMonth(new Date(event.date))}</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="SlideCard__paginationContainer">
                <div className="SlideCard__pagination">
                    {byDateDesc.map((event, radioIdx) => (
                        <input
                            key={event.id}
                            type="radio"
                            name="radio-button"
                            checked={index === radioIdx}
                            onChange={() => handleRadioChange(radioIdx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
