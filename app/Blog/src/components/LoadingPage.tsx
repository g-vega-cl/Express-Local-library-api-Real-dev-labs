import React from 'react';

const LoadingPage = () => {
    const funFacts = ["The Earl of Sandwich, John Montagu, who lived in the 1700s, reportedly invented the sandwich so he wouldn’t have to leave his gambling table to eat", "Elephants can't jump",
"There are no muscles in your fingers: Their function is controlled by muscles in your palms and arms."];

    return (
        <div>
            <h2>We are loading your books, please be patient, you will only need to wait once...</h2>
            <h3 style={{marginTop: 20 }}>Fun facts:</h3>
            <ul>
                {funFacts.map((funFact, index) => {
                    return(
                        <li style={{marginTop: 10}} key={`fun-fact-${index}`}>
                            <p>{funFact}</p>
                        </li>
                    )
                })}

            </ul>
        </div>
    );
}

export default LoadingPage;