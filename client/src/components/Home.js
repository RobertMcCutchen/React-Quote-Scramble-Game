import React, { useState } from 'react';
import Menu from './Menu';
import axios from 'axios';

function Home() {
    const [thequote, settheQuote] = useState('')
    const [quote, setQuote] = useState([])
    const [author, setAuthor] = useState('')
    const [choices, setChoices] = useState({})

    const onhandleChange = (e) => {
        setChoices({
            ...choices,
            [e.target.name]: e.target.value
        })
    }

    const revealSubmitButton = () => {
        let x = document.getElementById("submitButton")
        if (x.style.display === "none") {
          x.style.display = "block";
        } 
    }

    const onStartClick = () => {
        fetchQuote()
        revealSubmitButton()
    }

    const fetchQuote = () => {
        const url= "https://favqs.com/api/qotd"
        fetch(url).then(response => response.json())
        .then(json => {
            let arr = json.quote.body.split(' ')
            settheQuote(json.quote.body)
            let chunkedArr = chunkArray(arr)
        setQuote(chunkedArr)
        setAuthor(json.quote.author)
        })
        document.getElementById("resultsDiv").innerHTML = '';
        document.getElementById("quoteDiv").innerHTML = '';
        document.getElementById("authorDiv").innerHTML = '';
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
            newArray.push({chunk: results[i], arrayIndex: i + 1})
        }
        
        newArray.sort(() => Math.random() - 0.5);
        console.log(newArray);
        return newArray;
    }

    const onSubmit = (props) => {
        console.log(choices)
        console.log(quote.length)
        console.log(Object.keys(choices))
        console.log(Object.keys(choices).length)
        if(quote.length === Object.keys(choices).length) {
        let match = true;
        for(let i = 0; i < quote.length; i++) {
            if(quote[i].arrayIndex !== parseInt(choices[i])) {
                match = false;
                console.log(quote[i].arrayIndex + '-' + choices[i])
            }
        }
        console.log(match)
        if(match) {
            document.getElementById('resultsDiv').innerHTML = "Correct!"
        } else {
            document.getElementById('resultsDiv').innerHTML = "Sorry, that's incorrect."
        }
        document.getElementById('quoteDiv').innerHTML = `${thequote}`
        document.getElementById('authorDiv').innerHTML = `${author}`
    }}

        const onSave = () => {
            axios.post('http://localhost:8888/save',{
            quote, 
            author
        })
        }

    return (
        <div>
            <Menu/>
            <button onClick={() => onStartClick()}>Play!</button>
            {quote.map((q, index) => {   
                 return <div key={index}>
                        <input type="number" min="1" max={quote.length} name={index} onChange={(e) => onhandleChange(e)}/>
                        {q.chunk}
                        </div>
                        }
            )}
            {/* <button id="submitButton" onClick={() => onSubmit()} Style="display: none">Submit!</button> */}
            <div id="resultsDiv"></div>
            <div id="quoteDiv"></div>
            <div id="authorDiv"></div>
            {/* <button id="saveButton"  Style="display: block">Save this quote!</button> */}
        </div>
    )    
}

export default Home;