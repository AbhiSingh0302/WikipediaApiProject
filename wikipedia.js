
// For hitting end point url
const endPointURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=';

// For hitting the pageid url
const linkID = 'http://en.wikipedia.org/?curid=';

const article = document.querySelector('article');
const searchInput = document.querySelector('input');
const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
    article.textContent = ""; // To empty the contents before event hit 
    e.preventDefault();
    const value = searchInput.value;
    fetchApi(value)
})

function fetchApi(value){
    fetch(endPointURL+value)
    .then(res=>{
        if(res.ok){
            return res.json()
        }
        else{
            throw Error("Something went wrong")
        }
        })
    .then(data=>{
        const dataArray = Object.values(data);
        const searchArray = Object.values(dataArray[2]);
        const resultArray = searchArray[1];
        for(let key of resultArray){
            // To display the contents of page
            const titleh2 = document.createElement('h2');
            const description = document.createElement('p');
            const link = document.createElement('a');
            link.setAttribute('href',linkID+key['pageid']);
            link.setAttribute('target','_blank');
            link.textContent = linkID+key['pageid'];
            description.innerHTML = key['snippet'];
            titleh2.append(document.createTextNode(key['title']));
            article.append(titleh2,link,description);
        }
    })
    .catch((error)=>{
        article.textContent = error;
    })
}

