import React, { useState } from 'react';
import Menu from './Menu';

function Home() {
    const [quote, setQuote] = useState([])
    const [author, setAuthor] = useState('')

    const onStartClick =() => {
        fetchQuote()
    }

    const fetchQuote = () => {
        const url= "https://favqs.com/api/qotd"
        fetch(url).then(response => response.json())
        .then(json => {
            let arr = json.quote.body.split(' ')
            let chunkedArr = chunkArray(arr)
        setQuote(chunkedArr)
        setAuthor(json.quote.author)
        })
        }
    
    const chunkArray = (myArray) => {
        let results = [];
        while (myArray.length) {
            let chunk = myArray.splice(0, 3).join(' ')
            results.push(chunk)
        }
        let newArray = []
        for(let i = 0; i < results.length; i++) {
            let index = results.indexOf(i)
            newArray.push({chunk: results[i], arrayIndex: i})
        }
        
        newArray.sort(() => Math.random() - 0.5);
        console.log(newArray);
        buttonFunction(); 
        return newArray;
    }

    const buttonFunction = () => {
        document.getElementById("submitButton").innerHTML = "<button onClick={onSubmit}>Submit</button>";
    }

    const onSubmit = () => {
        let correct = true;
        quote.map((q, index) => {
            if(q.arrayIndex !== )
        })

    }

    return (
        <div>
            <Menu/>
            <button onClick={() => onStartClick()}>Play!</button>
            {quote.map((q, index) => {   
                 return <div key={index}>
                        <input type="number" min="1" name="index + {index}"/>
                        {q.chunk}
                        </div>
                        }
            )}
            {author}
            <div id="submitButton"></div>
        </div>
    )    
}

export default Home;